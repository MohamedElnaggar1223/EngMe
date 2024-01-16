import { collection, query, where, getDocs, and, Timestamp } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"

export const getTeacherAvailable = async(teacherId: string) => {
    const teacherScheduleRef = collection(db, 'teacherSchedule')
    const queryTeacherSchedule = query(teacherScheduleRef, where('teacherId', '==', teacherId))

    const teacherScheduleDoc = await getDocs(queryTeacherSchedule)

    if(teacherScheduleDoc.docs.length > 0)
    {
        const teacherSlots = teacherScheduleDoc.docs[0].data().slots

        let gapCount = 0

        //@ts-expect-error tserror
        teacherSlots.sort((a, b) => (a.startTime > b.startTime) ? 1 : -1)

        // Iterate through slots to calculate gaps
        for (let i = 0; i < teacherSlots.length - 1; i++) 
        {
            const currentEndTime = new Date('2022-01-01 ' + teacherSlots[i].endTime).getTime()
            const nextStartTime = new Date('2022-01-01 ' + teacherSlots[i + 1].startTime).getTime()

            const timeDifference = (nextStartTime - currentEndTime) / (1000 * 60);

            // If the gap is 1 hour or more, count each hour as a separate gap
            if (timeDifference >= 60) 
            {
                gapCount += Math.floor(timeDifference / 60);
            }
        }

        const teacherConsults = await getDocs(query(collection(db, 'consultationSessions'), and(where('teacherId', '==', teacherId), where('startTime', '>=', Timestamp.now()))))

        return gapCount > teacherConsults.docs.length
    }
}