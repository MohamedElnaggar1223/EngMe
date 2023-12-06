import { collection, doc, query, and, where, getDoc, getDocs, updateDoc, limit } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setExamSessionTime } from "./setExamSessionTime"

export const setSubmitExamSessionAssessment = async (studentId: string, assessmentId: string) => {
    const examSessionRef = collection(db, 'examSession')
    const studentAssessmentRef = collection(db, 'studentAssessment')
    const assessmentDoc = doc(db, 'assessments', assessmentId)

    const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)), limit(1))
    const queryStudentAssessment = query(studentAssessmentRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)))
    const assessmentData = await getDoc(assessmentDoc)
    const studentAssessmentDocs = await getDocs(queryStudentAssessment)
    const examSessionData = await getDocs(queryExamSession)

    const orderedAssessmentsArray = studentAssessmentDocs.docs.slice().sort((a, b) => {
        const dateA = a.data().createdAt.toDate();
        const dateB = b.data().createdAt.toDate();
      
        // Compare the dates for sorting
        return dateB - dateA;
      })

    //@ts-expect-error anyerr
    const correctOptions = assessmentData?.data()?.questions.map(question => {
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
      const answers = orderedAssessmentsArray[0]?.data()?.answers
      //@ts-expect-error anyerror
      const results = correctOptions.map((option, index) => {
        if(typeof answers[index] === 'object')
        {
          const objectAnswers = Object.values(answers[index]).map((answer, indexOfAnswer) => Number(option[indexOfAnswer]) === Number(answer))
          return objectAnswers.every(Boolean)
        }
        else return answers[index] === Number(option)
      })
    //@ts-expect-error anyerror
    const grade = (((results.slice().filter(res => !!res)).length / results.length) * 100).toFixed(2)
    
    const studentAssessmentDoc = doc(db, 'studentAssessment', orderedAssessmentsArray[0]?.id)

    await updateDoc(studentAssessmentDoc, {...orderedAssessmentsArray[0].data(), grade})
    await setExamSessionTime(examSessionData.docs[0].id)
}