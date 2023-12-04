import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const setStudentAssessment = async (studentId: string, assessmentId: string) => {
    const studentAssessmentRef = collection(db, 'studentAssessment')
    const studentExamSession = collection(db, 'examSession')
    const assessmentRef = doc(db, 'assessments', assessmentId)

    const assessment = await getDoc(assessmentRef)

    const minutesToAdd = assessment.data()?.duration.split(" ")[0]

    const currentTime = Timestamp.now().toDate()
    currentTime.setMinutes(currentTime.getMinutes() + Number(minutesToAdd))


    const newStudentAssessment = {
        studentId,
        assessmentId,
        grade: 0,
    }

    const newStudentAssessmentSession = {
        studentId,
        type: 'assessment',
        assessmentId,
        startTime: Timestamp.now(),
        endTime: Timestamp.fromDate(currentTime),
        lastQuestion: 0
    }

    await addDoc(studentAssessmentRef, newStudentAssessment)
    await addDoc(studentExamSession, newStudentAssessmentSession)
}