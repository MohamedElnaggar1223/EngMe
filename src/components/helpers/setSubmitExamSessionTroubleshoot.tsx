import { collection, doc, query, and, where, getDoc, getDocs, updateDoc, limit, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setExamSessionTime } from "./setExamSessionTime"

export const setSubmitExamSessionTroubleshoot = async (studentId: string, troubleshootId: string) => {
  try
  {
    const examSessionRef = collection(db, 'examSession')
    const studentTroubleshootRef = collection(db, 'studentTroubleshoot')
    const troubleshootDoc = doc(db, 'troubleshoot', troubleshootId)

    console.log(studentId, troubleshootId)

    const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('troubleshootId', '==', troubleshootId)), limit(1))
    const queryStudentTroubleshoot = query(studentTroubleshootRef, and(where('studentId', '==', studentId), where('troubleshootId', '==', troubleshootId)))
    const troubleshootData = await getDoc(troubleshootDoc)
    const studentTroubleshootDocs = await getDocs(queryStudentTroubleshoot)
    const examSessionData = await getDocs(queryExamSession)

    const orderedTroubleshootsArray = studentTroubleshootDocs.docs.slice().sort((a, b) => {
        const dateA = a.data().createdAt.toDate();
        const dateB = b.data().createdAt.toDate();
      
        // Compare the dates for sorting
        return dateB - dateA;
      })

    //@ts-expect-error anyerr
    const correctOptions = troubleshootData?.data()?.questions.map(question => {
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
      const answers = orderedTroubleshootsArray[0]?.data()?.answers
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

      console.log("answers: ", answers)
      console.log("results: ", results)
    const questions = troubleshootData?.data()?.questions as []
    //@ts-expect-error anyerror
    const wrongQuestions = results.slice().reduce((acc, option, index) => {
        if(!option)
        {
          acc.push(questions[index])
        }
        return acc
    }, []) 

    console.log("wrongQuestions: ", wrongQuestions)
    console.log("questions: ", questions)

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
        await updateDoc(doc(troubleshootref, troubleshootdocs.docs[0].id), { questions: [...wrongQuestions] })
    }

    //@ts-expect-error anyerror
    const grade = (((results.slice().filter(res => !!res)).length / results.length) * 100).toFixed(2)

    console.log("grade: ", grade)
    
    const studentTroubleshootDoc = doc(db, 'studentTroubleshoot', orderedTroubleshootsArray[0]?.id)

    await updateDoc(studentTroubleshootDoc, {...orderedTroubleshootsArray[0].data(), grade})
    await setExamSessionTime(examSessionData.docs[0].id, studentId, `/troubleshootexam`)
  }
  catch(e)
  {
    console.log(e)
  }
}