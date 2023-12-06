import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
const TeacherProfile = lazy(() => import("./components/studentInterface/teacherProfile/TeacherProfile"))
import Layout from "./components/Layout"
import StudentProfile from "./components/studentInterface/studentProfile/StudentProfile"
const Programs = lazy(() => import("./components/studentInterface/programs/Programs"))
import Login from "./components/authentication/login/Login"
const Signup = lazy(() => import("./components/authentication/signup/Signup"))
const Exam = lazy(() => import("./components/studentInterface/programs/Current/Exam"))
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthProvider from "./components/authentication/auth/AuthProvider"
import StudentPrivateRoute from "./components/authentication/auth/StudentPrivateRoute"
import PrefetchPrograms from "./components/authentication/auth/PrefetchPrograms"
const ExamBank = lazy(() => import("./components/studentInterface/exambank/ExamBank"))
const KnowledgeBank = lazy(() => import("./components/studentInterface/knowledgebank/KnowledgeBank"))
const Quiz = lazy(() => import("./components/studentInterface/programs/Current/Quiz"))
const Assessment = lazy(() => import("./components/studentInterface/programs/Current/Assessment"))

const queryClient = new QueryClient()

function App() {
	
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Routes>
					<Route element={<PrefetchPrograms />}>
						<Route path='/' element={
							<StudentPrivateRoute>
								<Layout />
							</StudentPrivateRoute>
						}>
								<Route index element={
									<StudentPrivateRoute>
										<StudentProfile />
									</StudentPrivateRoute>
								} />
								<Route path='teacherprofile'>
									<Route index element={
										<StudentPrivateRoute>
											<Suspense>
												<TeacherProfile />
											</Suspense>
										</StudentPrivateRoute>
									} />
								</Route>
								
								<Route path='programs'>
									<Route index element={
										<StudentPrivateRoute>
											<Suspense>
												<Programs />
											</Suspense>
										</StudentPrivateRoute>
									} />
								</Route>
								
							<Route path='login'>
								<Route index element={<Login />} />
							</Route>
							<Route path='signup'>
								<Route index element={
									<Suspense>
										<Signup />
									</Suspense>
								} />
							</Route>
								<Route path='exam/:id'>
									<Route index element={
										<StudentPrivateRoute>
											<Suspense>
												<Exam />
											</Suspense>
										</StudentPrivateRoute>
									} />
								</Route>
								<Route path='quiz/:id'>
									<Route index element={
										<StudentPrivateRoute>
											<Suspense>
												<Quiz />
											</Suspense>
										</StudentPrivateRoute>
									} />
								</Route>
								<Route path='assessment/:id'>
									<Route index element={
										<StudentPrivateRoute>
											<Suspense>
												<Assessment />
											</Suspense>
										</StudentPrivateRoute>
									} />
								</Route>
								<Route path='knowledgebank'>
									<Route index element={
										<StudentPrivateRoute>
											<Suspense>
												<KnowledgeBank />
											</Suspense>
										</StudentPrivateRoute>
									} />
								</Route>
								<Route path='exambank'>
									<Route index element={
										<StudentPrivateRoute>
											<Suspense>
												<ExamBank />
											</Suspense>
										</StudentPrivateRoute>
									} />
								</Route>
						</Route>
					</Route>
				</Routes>
			</AuthProvider>
		</QueryClientProvider>
	)
}

export default App
