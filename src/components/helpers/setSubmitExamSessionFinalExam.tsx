import { collection, doc, query, and, where, getDoc, getDocs, updateDoc, limit, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setExamSessionTime } from "./setExamSessionTime"

export const setSubmitExamSessionFinalExam = async (studentId: string, finalExamId: string) => {
    const examSessionRef = collection(db, 'examSession')
    const studentFinalExamRef = collection(db, 'studentFinalExam')
    const finalExamDoc = doc(db, 'finalExams', finalExamId)

    const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('finalExamId', '==', finalExamId)), limit(1))
    const queryStudentFinalExam = query(studentFinalExamRef, and(where('studentId', '==', studentId), where('finalExamId', '==', finalExamId)))
    const finalExamData = await getDoc(finalExamDoc)
    const studentFinalExamDocs = await getDocs(queryStudentFinalExam)
    const examSessionData = await getDocs(queryExamSession)

    const orderedFinalExamsArray = studentFinalExamDocs.docs.slice().sort((a, b) => {
        const dateA = a.data().createdAt.toDate();
        const dateB = b.data().createdAt.toDate();
      
        // Compare the dates for sorting
        return dateB - dateA;
      })

    //@ts-expect-error anyerr
    const correctOptions = finalExamData?.data()?.questions.map(question => {
        if(question.type === 'dropdowns')
        {
          const correctOptions = [question.firstCorrect, question.secondCorrect, question.thirdCorrect, question.fourthCorrect]
          return correctOptions
        }
        else
        {
          return question.correctOption
        }
      })
      const answers = orderedFinalExamsArray[0]?.data()?.answers
      //@ts-expect-error anyerror
      const results = correctOptions.map((option, index) => {
        if(typeof answers[index] === 'object')
        {
          const objectAnswers = Object.values(answers[index]).map((answer, indexOfAnswer) => option[indexOfAnswer] === answer)
          return objectAnswers.every(Boolean)
        }
        else if(Array.isArray(option))
        {
          const arrayAnswers = Object.values(answers[index]).map((answer) => option.includes(answer))
          return arrayAnswers.every(Boolean)
        }
        else return answers[index] === Number(option)
      })
    //@ts-expect-error anyerror
    const grade = (((results.slice().filter(res => !!res)).length / results.length) * 100).toFixed(2)

    if(Number(grade) > 85)
    {
        const studentProgramCertificateRef = collection(db, 'studentProgramCertificate')
        const queryStudentProgramCertificate = query(studentProgramCertificateRef, and(where('studentId', '==', studentId), where('programId', '==', finalExamData.data()?.programId)))

        const studentProgramCertificateData = await getDocs(queryStudentProgramCertificate)

        if(studentProgramCertificateData.docs.length === 0)
        {
            const newStudentProgramCertificate = {
                studentId,
                programId: finalExamData.data()?.programId,
                status: 'pending'
            }
    
            await addDoc(studentProgramCertificateRef, newStudentProgramCertificate)
        }

    } 
    
    const studentFinalExamDoc = doc(db, 'studentFinalExam', orderedFinalExamsArray[0]?.id)

    await updateDoc(studentFinalExamDoc, {...orderedFinalExamsArray[0].data(), grade})
    await setExamSessionTime(examSessionData.docs[0].id)
}