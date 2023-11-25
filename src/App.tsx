import { Route, Routes } from "react-router-dom"
import TeacherProfile from "./components/studentInterface/teacherProfile/TeacherProfile"
import Layout from "./components/Layout"

function App() {

	return (
		<Routes>
		<Route path='/' element={<Layout />}>
			<Route path='teacherprofile'>
				<Route index element={<TeacherProfile />} />
			</Route>
		</Route>
		</Routes>
	)
}

export default App
