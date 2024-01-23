import { doc, updateDoc, collection, Timestamp, addDoc, arrayUnion, getDocs, query, where, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { setNotification } from "./setNotification";

export const setLessonData = async(title: string, description: string, lesson?: unknown, course?: unknown, file?: unknown, fileType?: unknown, duration?: string, order?: number) => {
    const storage = getStorage();
    const storagePath = fileType === 'video/mp4' ? 'Videos/' : 'Pdfs/';
    //@ts-expect-error file
    const storageRef = ref(storage, storagePath + file.name);

    //@ts-expect-error course
    const programDoc = doc(db, 'programs', course?.programId)

    const programData = await getDoc(programDoc)
    
    if(lesson)
    {
        //@ts-expect-error course
        const lessonDoc = doc(db, 'lessons', lesson.id)
        
        //@ts-expect-error course
        if(lesson?.duration !== duration && duration)
        {
            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)

            //@ts-expect-error duration
            const courseDuration = course?.duration
    
            const totalCourseDuration = parseInt(courseDuration?.split(' ')[0]) * 3600 + parseInt(courseDuration?.split(' ')[2]) * 60 + parseInt(courseDuration?.split(' ')[4])

            //@ts-expect-error duration
            const newDuration = lesson?.duration ? (parseFloat(duration) + totalCourseDuration - lesson?.duration).toString() : (parseFloat(duration) + totalCourseDuration).toString()
            
            const sec_num = parseInt(newDuration, 10)
            const hours_duration = Math.floor(sec_num / 3600);
            const minutes_duration = Math.floor((sec_num - (hours_duration * 3600)) / 60)
            const seconds_duration = sec_num - (hours_duration * 3600) - (minutes_duration * 60);

            const finalDuration = `${hours_duration} Hours ${minutes_duration} Minutes ${seconds_duration} Seconds`

            // const secondsAddedToMinutes = Number(duration?.split(' ')[4]) / 60
            // const hoursAddedToMinutes = Number(duration?.split(' ')[0]) * 60
            // //@ts-expect-error duration
            // const minutesAdded = Number(duration?.split(' ')[2]) + secondsAddedToMinutes + hoursAddedToMinutes - Number(lesson?.duration?.split(' ')[2]) - (Number(lesson?.duration?.split(' ')[0]) * 60) - (Number(lesson?.duration?.split(' ')[4]) / 60)
            // //@ts-expect-error course
            // const courseMinutes = Number(course?.duration?.split(' ')[4] / 60) + Number(course?.duration?.split(' ')[2]) + (Number(course?.duration?.split(' ')[0]) * 60)
            // const totalMins = courseMinutes + minutesAdded
            // const mins_num = parseFloat(totalMins.toFixed(2))
            // const hours   = Math.floor(mins_num / 60);
            // const minutes = Math.floor((mins_num - ((hours * 3600)) / 60));
            // const seconds = Math.floor((mins_num * 60) - (hours * 3600) - (minutes * 60));

            // const Hours   = String(hours).length   > 1 ? hours.toString()   : '0' + hours
            // const Minutes = String(minutes).length > 1 ? minutes.toString() : '0' + minutes
            // const Seconds = String(seconds).length > 1 ? seconds.toString() : '0' + seconds

            // const durationAdded = `${Hours} Hours ${Minutes} Minutes ${Seconds} Seconds`

            await updateDoc(courseDoc, { duration: `${finalDuration}` })
        }
        //@ts-expect-error duration
        else if(!duration && lesson?.duration)
        {
            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)

            //@ts-expect-error duration
            const courseDuration = course?.duration
    
            const totalCourseDuration = parseInt(courseDuration?.split(' ')[0]) * 3600 + parseInt(courseDuration?.split(' ')[2]) * 60 + parseInt(courseDuration?.split(' ')[4])

            //@ts-expect-error duration
            const newDuration = (totalCourseDuration - lesson?.duration).toString()
            
            const sec_num = parseInt(newDuration, 10)
            const hours_duration = Math.floor(sec_num / 3600);
            const minutes_duration = Math.floor((sec_num - (hours_duration * 3600)) / 60)
            const seconds_duration = sec_num - (hours_duration * 3600) - (minutes_duration * 60);

            const finalDuration = `${hours_duration} Hours ${minutes_duration} Minutes ${seconds_duration} Seconds`

            await updateDoc(courseDoc, { duration: `${finalDuration}` })
        }

        //@ts-expect-error file
        await uploadBytes(storageRef, file)

        const updatedLesson = {
            title,
            description,
            content: {
                type: storagePath,
                //@ts-expect-error file
                content: file.name
            },
            duration
        }

        const studentProgramsRef = collection(db, 'studentProgram')

        const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', programData.id))

        const studentProgramsData = await getDocs(studentProgramsQuery)

        const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

        const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

        const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', programData.data()?.teacherId))

        const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

        const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)
        
        await updateDoc(lessonDoc, updatedLesson)
        await setNotification(`${programData.data()?.name}'s Lesson(s) have been updated!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
    }
    else
    {
        if(course)
        {
            const lessonsRef = collection(db, 'lessons')

            const newLesson = {
                title,
                order,
                description,
                duration,
                createdAt: Timestamp.now(),
                //@ts-expect-error course
                courseId: course.id,
                content: {
                    type: storagePath,
                    //@ts-expect-error file
                    content: file.name
                }
            }

            //@ts-expect-error file
            await uploadBytes(storageRef, file)

            const addedLesson = await addDoc(lessonsRef, newLesson)

            //@ts-expect-error course
            const courseDoc = doc(db, 'courses', course.id)

            if(duration)
            {
                //@ts-expect-error duration
                const courseDuration = course?.duration
    
                const totalCourseDuration = parseInt(courseDuration?.split(' ')[0]) * 3600 + parseInt(courseDuration?.split(' ')[2]) * 60 + parseInt(courseDuration?.split(' ')[4])
                
                const newDuration = (parseFloat(duration) + totalCourseDuration).toString()
                
                const sec_num = parseInt(newDuration, 10)
                const hours_duration = Math.floor(sec_num / 3600);
                const minutes_duration = Math.floor((sec_num - (hours_duration * 3600)) / 60)
                const seconds_duration = sec_num - (hours_duration * 3600) - (minutes_duration * 60);

                const finalDuration = `${hours_duration} Hours ${minutes_duration} Minutes ${seconds_duration} Seconds`


                // console.log(durationFormatted)

                // const secondsAddedToMinutes = Number(durationFormatted?.split(' ')[4]) / 60
                // const hoursAddedToMinutes = Number(durationFormatted?.split(' ')[0]) * 60
                // //@ts-expect-error duration
                // const courseMinutes = Number(course?.duration?.split(' ')[4] / 60) + Number(course?.duration?.split(' ')[2]) + (Number(course?.duration?.split(' ')[0]) * 60)  
                
                // console.log('secondsAddedToMinutes', secondsAddedToMinutes)
                // console.log('hoursAddedToMinutes', hoursAddedToMinutes)
                // console.log('courseMinutes', courseMinutes)

                // const minutesAdded = Number(durationFormatted?.split(' ')[2]) + secondsAddedToMinutes + hoursAddedToMinutes + courseMinutes
    
                // console.log('minutesAdded', minutesAdded)

                // const mins_num = parseFloat(minutesAdded.toFixed(2))
                // const hours   = Math.floor(mins_num / 60);
                // const minutes = Math.floor((mins_num - ((hours * 3600)) / 60));
                // const seconds = Math.floor((mins_num * 60) - (hours * 3600) - (minutes * 60));


                // console.log('mins_num', mins_num)
                // console.log('hours', hours)
                // console.log('minutes', minutes)
                // console.log('seconds', seconds)
    
                // const Hours   = String(hours).length   > 1 ? hours.toString()   : '0' + hours;
                // const Minutes = String(minutes).length > 1 ? minutes.toString() : '0' + minutes;
                // const Seconds = String(seconds).length > 1 ? seconds.toString() : '0' + seconds;

                // console.log('Hours', Hours)
                // console.log('Minutes', Minutes)
                // console.log('Seconds', Seconds)

                // const durationAdded = `${Hours} Hours ${Minutes} Minutes ${Seconds} Seconds`

                // console.log('durationAdded', durationAdded)

                await updateDoc(courseDoc, { lessons: arrayUnion(addedLesson.id), duration: `${finalDuration}` })
            }
            else
            {
                await updateDoc(courseDoc, { lessons: arrayUnion(addedLesson.id) })
            }

            const studentProgramsRef = collection(db, 'studentProgram')

            const studentProgramsQuery = query(studentProgramsRef, where('programId', '==', programData.id))

            const studentProgramsData = await getDocs(studentProgramsQuery)

            const studentPrograms = studentProgramsData.docs.map(doc => doc.data().studentId)

            const studentFollowTeacherRef = collection(db, 'studentFollowTeacher')

            const studentFollowTeacherQuery = query(studentFollowTeacherRef, where('teacherId', '==', programData.data()?.teacherId))

            const studentFollowTeacherData = await getDocs(studentFollowTeacherQuery)

            const studentFollowTeacher = studentFollowTeacherData.docs.map(doc => doc.data().studentId)
            
            
            await setNotification(`New Lesson has been uploaded for ${programData.data()?.name}!`, [...studentPrograms, programData.data()?.teacherId], [...studentFollowTeacher], `/programs/current/${programData.id}`)
        }
    }
}