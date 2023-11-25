import { Route, Routes } from "react-router-dom"
import TeacherProfile from "./components/studentInterface/teacherProfile/TeacherProfile"
import Layout from "./components/Layout"
import StudentProfile from "./components/studentInterface/studentProfile/StudentProfile"

function App() {

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='teacherprofile'>
					<Route index element={<TeacherProfile />} />
				</Route>
				<Route path='studentprofile'>
					<Route index element={<StudentProfile />} />
				</Route>
			</Route>
		</Routes>
	)
}

export default App
