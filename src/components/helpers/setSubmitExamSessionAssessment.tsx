import { collection, doc, query, and, where, getDoc, getDocs, updateDoc, limit } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { setExamSessionTime } from "./setExamSessionTime"

export const setSubmitExamSessionAssessment = async (studentId: string, assessmentId: string) => {
    const examSessionRef = collection(db, 'examSession')
    const studentAssessmentRef = collection(db, 'studentAssessment')
    const assessmentDoc = doc(db, 'assessments', assessmentId)

    const queryExamSession = query(examSessionRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)), limit(1))
    const queryStudentAssessment = query(studentAssessmentRef, and(where('studentId', '==', studentId), where('assessmentId', '==', assessmentId)), limit(1))
    const assessmentData = await getDoc(assessmentDoc)
    const studentAssessmentDocs = await getDocs(queryStudentAssessment)
    const examSessionData = await getDocs(queryExamSession)

    //@ts-expect-error anyerr
    const correctOptions = assessmentData?.data()?.questions.map(question => question.correctOption)
    const answers = studentAssessmentDocs.docs[0]?.data()?.answers
    //@ts-expect-error anyerror
    const results = correctOptions.map((option, index) => answers[index] === Number(option))
    //@ts-expect-error anyerror
    const grade = (((results.slice().filter(res => !!res)).length / results.length) * 100).toFixed(2)
    
    const studentAssessmentDoc = doc(db, 'studentAssessment', studentAssessmentDocs.docs[0]?.id)

    await updateDoc(studentAssessmentDoc, {...studentAssessmentDocs.docs[0].data(), grade})
    await setExamSessionTime(examSessionData.docs[0].id)
}