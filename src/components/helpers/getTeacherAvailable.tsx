import { collection, query, where, getDocs, Timestamp } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import moment from 'moment';

export const getTeacherAvailable = async(teacherId: string) => {
    const teacherScheduleRef = collection(db, 'teacherSchedule')
    const queryTeacherSchedule = query(teacherScheduleRef, where('teacherId', '==', teacherId))

    console.log(teacherId)

    const teacherScheduleDoc = await getDocs(queryTeacherSchedule)

    if(teacherScheduleDoc.docs.length > 0)
    {
        const teacherSlots = teacherScheduleDoc.docs[0].data().slots

        let gapCount = 0;

        // Iterate through teacherSlots to calculate gaps
        for (let i = 0; i < teacherSlots.length; i++) {
            const currentEndTime = moment('2022-01-01 ' + teacherSlots[i].endTime, 'YYYY-MM-DD h A').toDate().getTime();
            const nextStartTime = moment('2022-01-01 ' + teacherSlots[i].startTime, 'YYYY-MM-DD h A').toDate().getTime();

            // Calculate time difference in minutes
            const timeDifference = (currentEndTime - nextStartTime) / (1000 * 60);

            // If the gap is 1 hour or more, count each hour as a separate gap
            if (timeDifference >= 60) {
                gapCount += Math.floor(timeDifference / 60);
            }
        }

        console.log(gapCount)

        const teacherConsultsRef = collection(db, 'consultationSessions')
        const queryTeacherConsults = query(teacherConsultsRef, where('teacherId', '==', teacherId))
        const teacherConsults = await getDocs(queryTeacherConsults)

        const filteredTeacherConsults = teacherConsults.docs.slice().filter(doc => doc.data().startTime > Timestamp.now())

        return gapCount > filteredTeacherConsults.length
    }
}