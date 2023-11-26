import { Route, Routes } from "react-router-dom"
import TeacherProfile from "./components/studentInterface/teacherProfile/TeacherProfile"
import Layout from "./components/Layout"
import StudentProfile from "./components/studentInterface/studentProfile/StudentProfile"
import HomeLayout from "./components/studentInterface/HomeLayout"
import Programs from "./components/studentInterface/programs/Programs"
import Login from "./components/studentInterface/authentication/login/Login"
import Signup from "./components/studentInterface/authentication/signup/Signup"

function App() {

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<HomeLayout />} />
				<Route path='teacherprofile'>
					<Route index element={<TeacherProfile />} />
				</Route>
				<Route path='profile'>
					<Route index element={<StudentProfile />} />
				</Route>
				<Route path='programs'>
					<Route index element={<Programs />} />
				</Route>
				<Route path='login'>
					<Route index element={<Login />} />
				</Route>
				<Route path='signup'>
					<Route index element={<Signup />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
