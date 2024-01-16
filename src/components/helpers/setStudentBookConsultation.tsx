import { collection, addDoc, Timestamp, query, where, getDocs, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import axios from "axios";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const setStudentBookConsultation = async(studentId: string, teacherId: string) => {
    console.log(studentId, teacherId)
    const consultationSessionsRef = collection(db, 'consultationSessions')
    const teacherScheduleRef = collection(db, 'teacherSchedule')

    const queryTeacherConsults = query(consultationSessionsRef, where('teacherId', '==', teacherId)) 

    const queryTeacherSchedule = query(teacherScheduleRef, where('teacherId', '==', teacherId))

    const teacherScheduleDoc = await getDocs(queryTeacherSchedule)
    const teacherConsults = await getDocs(queryTeacherConsults)

    if(teacherScheduleDoc.docs.length > 0)
    {
        const teacherSchedule = {...teacherScheduleDoc.docs[0].data()}
        const currentDate = Timestamp.now().toDate()

        //@ts-expect-error anytype
        const teacherSlots = teacherSchedule.slots.map(slot => {

            const startTime = slot.startTime.split(' ')[1] === 'PM' ? Number(slot.startTime.split(' ')[0]) === 12 ? 12 :  Number(slot.startTime.split(' ')[0]) + 12 : Number(slot.startTime.split(' ')[0])

            const endTime = slot.endTime.split(' ')[1] === 'PM' ? Number(slot.endTime.split(' ')[0]) === 12 ? 12 : Number(slot.endTime.split(' ')[0]) + 12 : Number(slot.endTime.split(' ')[0])

            const dayNumbers = []
            for(let i = startTime; i < endTime; i++)
            {
                dayNumbers.push(`${slot.day} ${i}`)
            }

            return dayNumbers
        })

        const flatTeacherSlots = teacherSlots.flat()
        
        const dayNumbers = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => day.toLowerCase());
        //@ts-expect-error anytype
        const teacherAvailableDays = teacherSchedule.slots.map(slot => slot.day)
        
        //@ts-expect-error anytype
        const closestDay = teacherAvailableDays.slice().reduce((closest, day) => {
        const dayNumber = dayNumbers.indexOf(day.toLowerCase());
        const difference = Math.abs(currentDate.getDay() - dayNumber);
        
        return (difference < closest.difference) ? { name: day, difference } : closest;
        }, { name: null, difference: Infinity }).name

        const formattedClosestDay = `${closestDay} ${currentDate.getHours() + 1}`

        let startIndex = null
        while(startIndex === null)
        {
            //@ts-expect-error anytype
            let match = flatTeacherSlots.find(date => date === formattedClosestDay)
            if(match)
            {
                startIndex = flatTeacherSlots.indexOf(match)
            }
            else
            {
                //@ts-expect-error anytype
                match = flatTeacherSlots.find(date => (date.split(" ")[0] === formattedClosestDay.split(" ")[0]) && Number(date.split(" ")[1]) > Number(formattedClosestDay.split(" ")[1]))
                if(match)
                {
                    startIndex = flatTeacherSlots.indexOf(match)
                }
                else
                {
                    const tmp = formattedClosestDay.split(" ")[0]
                    //@ts-expect-error anytype
                    match = getIndexOfClosestDay(tmp, flatTeacherSlots.map(slot => slot.split(" ")[0]))
                    startIndex = match
                }
            }
        }

        const firstHalf = flatTeacherSlots.slice(startIndex)
        const secondHalf = flatTeacherSlots.slice(0 ,startIndex)

        const finalArray = firstHalf.concat(secondHalf)
        
        const consultsDates = teacherConsults.docs.map(doc => `${daysOfWeek[doc.data().startTime.toDate().getDay()]} ${doc.data().startTime.toDate().getHours()}`)
        //@ts-expect-error anytype
        const filteredArray = finalArray.filter(date => !consultsDates.includes(date))

        if(filteredArray.length > 0)
        {
            const consultationDate = filteredArray[0]
            const startTime = getNextDate(consultationDate)
            const endTime = getNextDate(consultationDate)

            endTime.setHours(endTime.getHours() + 1)

            const formattedStartTime = startTime.toISOString();

            
            const newSession = {
                teacherId,
                studentId,
                startTime,
                endTime,
                status: 'accepted'
            }

            console.log('TEST BOTTOM')

            const addedSession = await addDoc(consultationSessionsRef, newSession)

            const response = await axios.get(`https://engmebackendzoom.onrender.com/start-zoom-auth?startTime=${encodeURIComponent(formattedStartTime ?? "hello")}&consultationId=${addedSession.id}`)

            console.log(response.status)
            console.log(response.data)

            if(response.data.link)
            {
                console.log(response.data.link)
                window.location.href = response.data.link
            }
            else
            {
                await deleteDoc(addedSession)
            }
        }
    }

}


//@ts-expect-error anytype
function getIndexOfClosestDay(targetDay, otherDays) 
{
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const targetIndex = daysOfWeek.indexOf(targetDay);
    
    if (targetIndex === -1) {
      console.error('Invalid target day:', targetDay);
      return -1;
    }

    //@ts-expect-error anytype
    const differences = otherDays.map(day => day !== targetDay ? Math.abs(daysOfWeek.indexOf(day) - targetIndex) : Infinity);
  
    const minDifference = Math.min(...differences);
  
    const indexOfClosestDay = differences.indexOf(minDifference);

  
    return indexOfClosestDay;
}

//@ts-expect-error anytype
function getNextDate(inputString) 
{
    const weekdayMapping = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 0
    };

    const [weekday, hour] = inputString.split(' ');
    
    const currentDate = Timestamp.now().toDate();

    //@ts-expect-error anytype
    let daysUntilNextWeekday = (weekdayMapping[weekday] + 7 - currentDate.getDay()) % 7;

    if(daysUntilNextWeekday === 0)
    {
        if(currentDate.getHours() > Number(hour))
        {
            daysUntilNextWeekday = 7
        }
    }

    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + daysUntilNextWeekday);
    nextDate.setHours(parseInt(hour, 10), 0, 0, 0);

    return nextDate;
}