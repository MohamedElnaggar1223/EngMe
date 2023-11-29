import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
const TeacherProfile = lazy(() => import("./components/studentInterface/teacherProfile/TeacherProfile"))
import Layout from "./components/Layout"
import StudentProfile from "./components/studentInterface/studentProfile/StudentProfile"
import HomeLayout from "./components/studentInterface/HomeLayout"
const Programs = lazy(() => import("./components/studentInterface/programs/Programs"))
import Login from "./components/studentInterface/authentication/login/Login"
import Signup from "./components/studentInterface/authentication/signup/Signup"
const Exam = lazy(() => import("./components/studentInterface/programs/Current/Exam"))
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const Quiz = lazy(() => import("./components/studentInterface/programs/Current/Quiz"))
const Assessment = lazy(() => import("./components/studentInterface/programs/Current/Assessment"))

const queryClient = new QueryClient()

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomeLayout />} />
					<Route path='teacherprofile'>
						<Route index element={
							<Suspense>
								<TeacherProfile />
							</Suspense>
						} />
					</Route>
					<Route path='profile'>
						<Route index element={<StudentProfile />} />
					</Route>
					<Route path='programs'>
						<Route index element={
							<Suspense>
								<Programs />
							</Suspense>
						} />
					</Route>
					<Route path='login'>
						<Route index element={<Login />} />
					</Route>
					<Route path='signup'>
						<Route index element={<Signup />} />
					</Route>
					<Route path='exam'>
						<Route index element={
							<Suspense>
								<Exam />
							</Suspense>
						} />
					</Route>
					<Route path='quiz'>
						<Route index element={
							<Suspense>
								<Quiz />
							</Suspense>
						} />
					</Route>
					<Route path='assessment'>
						<Route index element={
							<Suspense>
								<Assessment />
							</Suspense>
						} />
					</Route>
				</Route>
			</Routes>
		</QueryClientProvider>
	)
}

export default App
