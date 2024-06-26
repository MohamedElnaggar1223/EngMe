import { collection, doc, query, and, where, getDoc, getDocs, updateDoc, limit, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setExamSessionTime } from "./setExamSessionTime"

export const setSubmitExamSessionAssessment = async (studentId: string, assessmentId: string) => {
  try
  {

    const examSessionRef = collection(db, 'examSession')
    const studentAssessmentRef = collection(db, 'studentAssessment')
    const assessmentDoc = doc(db, 'assessments', assessmentId)

    const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)), limit(1))
    const queryStudentAssessment = query(studentAssessmentRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)))
    const assessmentData = await getDoc(assessmentDoc)
    const studentAssessmentDocs = await getDocs(queryStudentAssessment)
    const examSessionData = await getDocs(queryExamSession)
    const courseDoc = doc(db, 'courses', assessmentData.data()?.courseId)
    const courseData = await getDoc(courseDoc)

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
          const objectAnswers = Object.values(answers[index]).map((answer, indexOfAnswer) => option[indexOfAnswer] === answer)
          return objectAnswers.every(Boolean)
        }
        else if(Array.isArray(option))
        {
          //@ts-expect-error answer
          const arrayAnswers = Object.values(answers[index]).map((answer) => option.includes(answer.toString()))
          return arrayAnswers.every(Boolean)
        }
        else return Number(answers[index]) === Number(option)
      })

    const questions = assessmentData?.data()?.questions as []
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
    
    const studentAssessmentDoc = doc(db, 'studentAssessment', orderedAssessmentsArray[0]?.id)

    await updateDoc(studentAssessmentDoc, {...orderedAssessmentsArray[0].data(), grade})
    await setExamSessionTime(examSessionData.docs[0].id, studentId, `/programs/current/${courseData.data()?.programId}`)
  }
  catch(e)
  {
    console.log(e)
  }
}