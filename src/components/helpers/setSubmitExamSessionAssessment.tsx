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
  console.log("studentAnswer: ", studentAnswer)
  console.log("correctAnswer: ", correctAnswer)
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

    console.log(orderedNormalizedCorrect)
    console.log(orderedNormalizedStudent)

    return orderedNormalizedCorrect.every((val, index) => val === orderedNormalizedStudent[index]);
  }

  // Direct comparison of normalized values
  return normalizedCorrect === normalizedStudent;
}

export const setSubmitExamSessionAssessment = async (studentId: string, assessmentId: string) => {
  try {

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
      if (question.type === 'dropdowns') {
        const correctOptions = { 0: question.firstCorrect, 1: question.secondCorrect, 2: question.thirdCorrect, 3: question.fourthCorrect }
        return correctOptions
      }
      else {
        return question.correctOption
      }
    })

    console.log(correctOptions)


    const answers = orderedAssessmentsArray[0]?.data()?.answers
    console.log(answers)

    if (answers.length < correctOptions.length) {
      const remainingAnswers = correctOptions.length - answers.length
      const newAnswers = Array(remainingAnswers).fill(['-9999'])
      answers.push(...newAnswers)
    }

    //@ts-expect-error anyerror
    const results = correctOptions.map((option, index) => {
      if (typeof option === 'object' && !Array.isArray(option)) {
        return compareObjects(option, answers[index])
      }
      else return checkAnswer(option, typeof answers[index] === 'object' ? Object.values(answers[index]) : answers[index])
    })

    const questions = assessmentData?.data()?.questions as []
    //@ts-expect-error anyerror
    const wrongQuestions = results.slice().reduce((acc, option, index) => {
      if (!option) {
        acc.push(questions[index])
      }
      return acc
    }, [])

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

    console.log(results)

    const grade = Number((results.filter(Boolean).length / results.length * 100).toFixed(2))

    const studentAssessmentDoc = doc(db, 'studentAssessment', orderedAssessmentsArray[0]?.id)

    await updateDoc(studentAssessmentDoc, { ...orderedAssessmentsArray[0].data(), grade })
    await setExamSessionTime(examSessionData.docs[0].id, studentId, `/programs/current/${courseData.data()?.programId}`)
  }
  catch (e) {
    console.log(e)
  }
}