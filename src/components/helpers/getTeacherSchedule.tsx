import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherSchedule = async(teacherId: string) => {
    const teacherScheduleRef = collection(db, 'teacherSchedule')
    const queryTeacherSchedule = query(teacherScheduleRef, where('teacherId', '==', teacherId))

    const teacherScheduleDocs = await getDocs(queryTeacherSchedule)

    if(teacherScheduleDocs.docs.length > 0)
    {
        const teacherScheduleData = {...teacherScheduleDocs.docs[0].data(), id: teacherScheduleDocs.docs[0].id}

        return teacherScheduleData
    }
}