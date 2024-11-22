import { collection, doc, query, and, where, getDoc, getDocs, updateDoc, limit, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setExamSessionTime } from "./setExamSessionTime"

function compareObjects(obj1: object, obj2: object) {
  // Get all keys from both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // First check if they have the same number of keys
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if every key in obj1 exists in obj2 and has equivalent value
  return keys1.every(key => {
    // Check if the key exists in obj2
    if (!(key in obj2)) {
      return false;
    }

    //@ts-expect-error value
    const val1 = obj1[key];
    //@ts-expect-error value
    const val2 = obj2[key];

    console.log(val1)
    console.log(val2)

    // If both are strings or both are numbers, do direct comparison
    if (typeof val1 === typeof val2) {
      console.log(val1 === val2)
      return val1 === val2;
    }

    // If one is string and one is number, try numeric comparison
    if ((typeof val1 === 'string' || typeof val1 === 'number') &&
      (typeof val2 === 'string' || typeof val2 === 'number')) {
      // Convert both to numbers and compare
      console.log(Number(val1) === Number(val2))
      return Number(val1) === Number(val2);
    }

    // For other types, return false
    return false;
  });
}

function checkAnswer(correctAnswer: unknown, studentAnswer: unknown) {
  // Helper function to normalize a single value
  const normalizeValue = (value: unknown) => {
    // Convert to number if it's a numeric string
    //@ts-expect-error value
    if (typeof value === 'string' && !isNaN(value)) {
      return Number(value);
    }
    return value;
  };

  // Helper function to normalize an array or single value
  const normalize = (value: unknown) => {
    if (Array.isArray(value)) {
      // If array has one element, normalize that element
      if (value.length === 1) {
        return normalizeValue(value[0]);
      }
      // If array has multiple elements, normalize each
      return value.map(normalizeValue);
    }
    return normalizeValue(value);
  };

  // Normalize both answers
  const normalizedCorrect = normalize(correctAnswer);
  const normalizedStudent = normalize(studentAnswer);

  // If both are arrays, compare them
  if (Array.isArray(normalizedCorrect) && Array.isArray(normalizedStudent)) {
    if (normalizedCorrect.length !== normalizedStudent.length) {
      return false;
    }
    const orderedNormalizedCorrect = normalizedCorrect.sort((a, b) => a - b)
    const orderedNormalizedStudent = normalizedStudent.sort((a, b) => a - b)

    return orderedNormalizedCorrect.every((val, index) => val === orderedNormalizedStudent[index]);
  }

  // Direct comparison of normalized values
  return normalizedCorrect === normalizedStudent;
}

export const setSubmitExamSessionQuiz = async (studentId: string, quizId: string) => {
  const examSessionRef = collection(db, 'examSession')
  const studentQuizRef = collection(db, 'studentQuiz')
  const quizDoc = doc(db, 'quizzes', quizId)

  const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('quizId', '==', quizId)), limit(1))
  const queryStudentQuiz = query(studentQuizRef, and(where('studentId', '==', studentId), where('quizId', '==', quizId)))
  const quizData = await getDoc(quizDoc)
  const studentQuizDocs = await getDocs(queryStudentQuiz)
  const examSessionData = await getDocs(queryExamSession)

  console.log(quizData)
  console.log(studentQuizDocs)
  console.log(examSessionData)

  const orderedQuizzesArray = studentQuizDocs.docs.slice().sort((a, b) => {
    const dateA = a.data().createdAt.toDate();
    const dateB = b.data().createdAt.toDate();

    // Compare the dates for sorting
    return dateB - dateA;
  })

  console.log(orderedQuizzesArray)

  //@ts-expect-error anyerr
  const correctOptions = quizData?.data()?.questions.map(question => {
    if (question.type === 'dropdowns') {
      const correctOptions = { 0: question.firstCorrect, 1: question.secondCorrect, 2: question.thirdCorrect, 3: question.fourthCorrect }
      return correctOptions
    }
    else {
      return question.correctOption
    }
  })

  console.log(correctOptions)

  const answers = orderedQuizzesArray[0]?.data()?.answers

  if (answers.length < correctOptions.length) {
    const remainingAnswers = correctOptions.length - answers.length
    const newAnswers = Array(remainingAnswers).fill(['-9999'])
    answers.push(...newAnswers)
  }

  console.log(answers)

  //@ts-expect-error anyerror
  const results = correctOptions.map((option, index) => {
    if (typeof option === 'object' && !Array.isArray(option)) {
      return compareObjects(option, answers[index])
    }
    else return checkAnswer(option, typeof answers[index] === 'object' ? Object.values(answers[index]) : answers[index])
  })

  console.log(results)

  const questions = quizData?.data()?.questions as []

  console.log(questions)

  //@ts-expect-error anyerror
  const wrongQuestions = results.slice().reduce((acc, option, index) => {
    if (!option) {
      acc.push(questions[index])
    }
    return acc
  }, [])

  console.log(wrongQuestions)

  const troubleshootref = collection(db, 'troubleshoot')
  const troubleshootquery = query(troubleshootref, where('studentId', '==', studentId))
  const troubleshootdocs = await getDocs(troubleshootquery)
  if (troubleshootdocs.docs.length === 0) {
    const newTroubleshoot = {
      studentId,
      questions: wrongQuestions
    }
    await addDoc(troubleshootref, newTroubleshoot)
  }
  else {
    await updateDoc(doc(troubleshootref, troubleshootdocs.docs[0].id), { questions: troubleshootdocs.docs[0].data().questions ? [...troubleshootdocs.docs[0].data().questions, ...wrongQuestions] : [...wrongQuestions] })
  }
  //@ts-expect-error anyerror
  const grade = (results.slice().filter(res => !!res)).length
  // const grade = (((results.slice().filter(res => !!res)).length / results.length) * 100).toFixed(2)

  const courseDoc = doc(db, 'courses', quizData.data()?.courseId)
  const courseData = await getDoc(courseDoc)

  const studentQuizDoc = doc(db, 'studentQuiz', orderedQuizzesArray[0]?.id)

  await updateDoc(studentQuizDoc, { ...orderedQuizzesArray[0].data(), grade })
  await setExamSessionTime(examSessionData.docs[0].id, studentId, `/programs/current/${courseData.data()?.programId}`)
}