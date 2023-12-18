import { collection, addDoc, Timestamp, query, where, getDocs, updateDoc } from "firebase/firestore"
import { auth, db } from "../../firebase/firebaseConfig"
import axios from "axios";
import { CalendarApiClient } from 'google-calendar-api-client'; 

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const setStudentBookConsultation = async(studentId: string, teacherId: string, userData: unknown) => {
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
            console.log(slot.startTime)
            console.log(slot.endTime)
            const startTime = slot.startTime.split(' ')[1] === 'PM' ? Number(slot.startTime.split(' ')[0]) + 12 : Number(slot.startTime.split(' ')[0])
            console.log(startTime)
            const endTime = slot.endTime.split(' ')[1] === 'PM' ? Number(slot.endTime.split(' ')[0]) + 12 : Number(slot.endTime.split(' ')[0])
            console.log(endTime)

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
                    console.log(match)
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
            const formattedEndTime = endTime.toISOString();

            
            const newSession = {
                teacherId,
                studentId,
                startTime,
                endTime,
                status: 'accepted'
            }

            // console.log(userData.accessToken)
            
            // const addedSession = await addDoc(consultationSessionsRef, newSession)

        //     const loadGoogleApi = () => {
        //     gapi.load('client', () => {
        //         gapi.client.init({
        //             apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        //             clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        //             scope: "https://www.googleapis.com/auth/calendar.events",
        //             discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        //         }).then(() => {
        //             const calendar = new CalendarApiClient({
        //                 apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        //                 clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        //                 scope: "https://www.googleapis.com/auth/calendar.events",
        //                 discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        //             });

        //             console.log('tetstbadan')
        
        //             const event = {
        //                 summary: 'Consultation Session',
        //                 start: {
        //                     dateTime: startTime.toISOString(),
        //                     timeZone: 'UTC',
        //                 },
        //                 end: {
        //                     dateTime: endTime.toISOString(),
        //                     timeZone: 'UTC',
        //                 },
        //             }

        //             const meet = calendar.createEvent(event)

        //             console.log(meet)
        //         })
        //     })
        // }

        // loadGoogleApi()

            // meet?.then((e) => console.log(e))

            // const { gapi } = window

            console.log(import.meta.env.VITE_GOOGLE_API_KEY, import.meta.env.VITE_GOOGLE_CLIENT_ID)

            const response = await axios.post(`http://localhost:3001/create-meeting`, {
                startTime: formattedStartTime ?? new Date().toISOString(),
                endTime: formattedEndTime ?? new Date().toISOString(), // Replace with your logic for endTime
                // Add any other necessary parameters
              });

            console.log(response.data)

            // gapi.load('client', () => {
            //     // gapi.client.setApiKey(import.meta.env.VITE_GOOGLE_API_KEY)
            //     gapi.client.init({
            //         apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            //         clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            //         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            //         scope: 'https://www.googleapis.com/auth/calendar.events',
            //         // hosted_domain: 'http://localhost:5173'
            //     }).then(() => {
            //         gapi.client.calendar.events.insert({

            //         })
            //     })
            //     // console.log(gapi.client.calendar)
            //     // console.log(gapi.client.calendar.calendarList.list())
            // })

            // const createEventInGoogleCalendar = async (startTime, endTime, eventName) => {
            //     try {
            //       const calendarApiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
              
            //       const response = await axios.post(calendarApiUrl, {
            //         summary: eventName,
            //         start: { dateTime: startTime.toISOString() },
            //         end: { dateTime: endTime.toISOString() },
            //         'apiKey': import.meta.env.VITE_GOOGLE_API_KEY,
            //         'clientId': import.meta.env.VITE_GOOGLE_CLIENT_ID
            //       }, {
            //         headers: {
            //           'Content-Type': 'application/json',
            //           'Authorization': `Bearer ${import.meta.env.VITE_GOOGLE_API_KEY}`, // Replace with your actual API key
            //         },
            //       });
              
            //       return response.data.id; // Return the event ID
            //     } catch (error) {
            //       console.error('Error creating event in Google Calendar:', error);
            //       throw error;
            //     }
            //   };

            //   console.log(createEventInGoogleCalendar(startTime, endTime, 'firstEvent'))
            // const start = () => {
            //     gapi.client.init({
            //         apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            //         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            //         clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            //         scope: 'profileCalendar'
            //     }).then(() => {
            //         return gapi.client.calendar.calendarList.list()
            //     }).then((response) => {
            //         console.log(response)
            //     })
            // }

            // gapi.load('client', start)


            // const initGoogleAPI = () => {
            //     window.gapi.load('client:auth2', () => {
            //       window.gapi.client.init({
            //         apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            //         clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            //         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            //         scope: 'https://www.googleapis.com/auth/calendar.events',
            //       }).then(() => {
            //         // Check if the user is already signed in
            //         const authInstance = window.gapi.auth2.getAuthInstance();
            //         if (authInstance.isSignedIn.get()) {
            //           // If signed in, create the event
            //           createEvent();
            //         } else {
            //           // If not signed in, initiate the sign-in process
            //           authInstance.signIn().then(() => {
            //             createEvent();
            //           });
            //         }
            //       });
            //     });
            //   };
            
            //   const createEvent = () => {
            //     const event = {
            //       summary: 'New Meeting',
            //       start: {
            //         dateTime: '2023-01-01T10:00:00',
            //         timeZone: 'America/New_York', // Adjust the time zone accordingly
            //       },
            //       end: {
            //         dateTime: '2023-01-01T11:00:00',
            //         timeZone: 'America/New_York',
            //       },
            //       conferenceData: {
            //         createRequest: {
            //           requestId: 'testId', // Generate a unique request ID
            //           conferenceSolutionKey: {
            //             type: 'hangoutsMeet',
            //           },
            //         },
            //       },
            //     };
            
            //     // Make a request to the Calendar API to insert the event
            //     window.gapi.client.calendar.events.insert({
            //       calendarId: 'primary', // Use 'primary' for the user's primary calendar
            //       resource: event,
            //     }).then((response) => {
            //       console.log('Event created:', response.result);
            
            //       // Extract the Google Meet link from the response
            //       const link = response.result.hangoutLink;
            //       console.log(link)
            //     }).catch((error) => {
            //       console.error('Error creating event:', error);
            //     });
            //   };

            //   initGoogleAPI()

            // const auth = gapi.auth2.getAuthInstance()
            // gapi.load('client', () => {
            //     gapi.auth.authorize(
            //         {
            //             client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            //             scope: 'https://www.googleapis.com/auth/calendar.events',
            //         },
            //         (response) => {
            //             console.log(response)
            //         }
            //     )
            // })
            // gapi.auth2.getAuthInstance().signIn()

        //     const handleClientLoad = async () => {

        //         gapi.auth2.init({
        //             // apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        //             // clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        //             // discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        //             // scope: 'https://www.googleapis.com/auth/calendar.events',
        //             client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        //             scope: 'profile meets'
        //         }).then(async () => {
        //             const auth = gapi.auth2.getAuthInstance();

        //             auth.signIn().then(async () => {
        //                 const event = {
        //                     summary: 'Consultation Session',
        //                     start: {
        //                         dateTime: startTime.toISOString(),
        //                         timeZone: 'UTC',
        //                     },
        //                     end: {
        //                         dateTime: endTime.toISOString(),
        //                         timeZone: 'UTC',
        //                     },
        //                 }
            
        //                 const response = await gapi.client.calendar.events.insert({
        //                     calendarId: 'primary', // Use 'primary' for the user's primary calendar
        //                     resource: event,
        //                 })
    
        //                 console.log(response)
            
        //                 const meetLink = response.result.hangoutLink
            
        //                 console.log("sss", meetLink)
        //             })

        //         })
    
    
        // }
        // handleClientLoad()

            // gapi.client.init({
            //     apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            //     clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            //     discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            //     scope: 'https://www.googleapis.com/auth/calendar.events',
            // }).then(() => {
            //     console.log('test')
            // })

            // gapi.load('client', () => {
            //     gapi.auth2.init({
            //         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            //         scope: 'https://www.googleapis.com/auth/calendar.events'
            //     }).then(() => {
            //         console.log(gapi.auth2.getAuthInstance())
            //     })
            // })
            // const auth = new gapi.auth2.GoogleAuth().isSignedIn
            // const test = new gapi.auth2.SigninOptionsBuilder()
            // const testagain = new gapi.client.HttpRequest()
            // const testagainandagain = gapi.client.calendar.calendarList.list()
            // console.log(auth)
            // const loadFunctions = async () => {
            //     console.log('hi')
            //     console.log((await auth.signIn()).getAuthResponse().access_token)
            //     // console.log(testagainandagain)
            // }

            // loadFunctions()
            console.log('hiiii')

            // console.log(meetLink)

            // await updateDoc(addedSession, { meetLink })

            // const calendarIDRequest = await axios.get(
            //     `https://www.googleapis.com/calendar/v3/users/me/calendarList?key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
            //     {
            //         withCredentials: false,
            //         params: {
            //             Authorization: `Bearer ${auth.currentUser?.getIdToken()}`,
            //             setAuthorization: `Bearer ${auth.currentUser?.getIdToken()}`,
            //             'Access-Control-Allow-Origin': 'http://localhost:5173',
            //             setContentType: 'application/json',
            //             'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            //             'Access-Control-Allow-Headers': 'Content-Type',
            //             "Content-Type": 'application/json',
            //             Accept: 'application/json'
            //         },
            //         headers: {
            //             Authorization: `Bearer ${auth.currentUser?.getIdToken()}`,
            //             setAuthorization: `Bearer ${auth.currentUser?.getIdToken()}`,
            //             'Access-Control-Allow-Origin': 'http://localhost:5173',
            //             setContentType: 'application/json',
            //             'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            //             'Access-Control-Allow-Headers': 'Content-Type',
            //             "Content-Type": 'application/json',
            //             Accept: 'application/json'
            //         },
            //     }
            // );

            // const calendarId = calendarIDRequest.data.items[0]?.id

            // const response = await axios.post(
            //     'https://cors-anywhere.herokuapp.com/https://www.googleapis.com/calendar/v3/calendars/primary/events',
            //     {
            //         summary: 'Consultation Session',
            //         start: { dateTime: formattedStartTime },
            //         end: { dateTime: formattedEndTime },
            //         conferenceData: {
            //         createRequest: { requestId: addedSession.id, conferenceSolutionKey: { type: 'hangoutsMeet' } },
            //         },
            //     },
            //     {
            //         withCredentials: false,
            //         headers: {
            //             Authorization: `Bearer ${auth.currentUser?.getIdToken()}`,
            //             setAuthorization: `Bearer ${auth.currentUser?.getIdToken()}`,
            //             'Access-Control-Allow-Origin': '*',
            //             setContentType: 'application/json',
            //             'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            //             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            //             "Content-Type": 'application/json',
            //             Accept: 'application/json'
            //         }
            //     }
            // )

            // console.log(response.data.hangoutLink)
            
            // console.log(response.data)

            // await updateDoc(addedSession, { meetLink: response.data.hangoutLink })
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