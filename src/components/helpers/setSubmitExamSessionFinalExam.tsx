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
          //@ts-expect-error answer
          const arrayAnswers = Object.values(answers[index]).map((answer) => option.includes(answer.toString()))
          return arrayAnswers.every(Boolean)
        }
        else return answers[index] === Number(option)
      })

      const questions = finalExamData?.data()?.questions as []
      //@ts-expect-error anyerror
      const wrongQuestions = results.slice().reduce((acc, option, index) => {
          if(!option)
          {
            acc.push(questions[index])
          }
          return acc
      }, []) 
  
      const troubleshootref = collection(db, 'troubleshoot')
      const troubleshootquery = query(troubleshootref, where('studentId', '==', studentId))
      const troubleshootdocs = await getDocs(troubleshootquery)
      if(troubleshootdocs.docs.length === 0)
      {
          const newTroubleshoot = {
              studentId,
              questions: wrongQuestions
          }
          await addDoc(troubleshootref, newTroubleshoot)
      }
      else
      {
          await updateDoc(doc(troubleshootref, troubleshootdocs.docs[0].id), { questions: troubleshootdocs.docs[0].data().questions ? [...troubleshootdocs.docs[0].data().questions, ...wrongQuestions] : [...wrongQuestions] })
      }
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
    await setExamSessionTime(examSessionData.docs[0].id, studentId, `/programs/current/${finalExamData.data()?.programId}`)
}