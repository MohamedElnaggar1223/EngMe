import { collection, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore"
import { auth, db } from "../../firebase/firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { getStorage, ref, uploadBytes } from "firebase/storage"

export const setTeacherRequest = async(firstname?: string, lastname?: string, email?: string, number?: string, why?: string, occupation?: string, file?: unknown, request?: {id: string, name: string, email: string, number: string}, password?: string) => {
    if(request && password)
    {
        console.log('Hello')
        const teacherRequestRef = doc(db, 'teacherRequest', request.id)

        createUserWithEmailAndPassword(auth, request.email, password)
        .then(async (user) => {
            const uid = user.user.uid
            const teacherRef = doc(db, 'teachers', uid)
    
            await setDoc(teacherRef, {
                friends: [],
                name: request.name,
                email: request.email,
                image: '',
                programs: [],
                occupation,
                title: 'Professor in Human Biology',
                university: 'The German University in Cairo',
                averageRating: 0,
                profileViews: 0
            })
    
            const scheduleRef = collection(db, 'teacherSchedule')
            await addDoc(scheduleRef, {
                numberOfDays: 6,
                slots: [
                    {
                        day: 'Sunday',
                        endTime: '2 PM',
                        startTime: '1 PM'
                    }
                ],
                teacherId: uid
            })
            
            const userRef = collection(db, 'users')
            await addDoc(userRef, {
                userId: request.email,
                role: 'teacher',
                number: request.number
            })
        })

        await deleteDoc(teacherRequestRef)
    }
    else
    {
        const teacherRequestRef = collection(db, 'teacherRequest')

        const storage = getStorage()
        //@ts-expect-error file
        const storageRef = ref(storage, 'CVs/' + file.name)
        //@ts-expect-error file
        await uploadBytes(storageRef, file)
    
        const newTeacherRequest = {
            name: `${firstname} ${lastname}`,
            email,
            number,
            occupation,
            why,
            //@ts-expect-error file
            cv: file.name
        }
    
        await addDoc(teacherRequestRef, newTeacherRequest)
    }
}