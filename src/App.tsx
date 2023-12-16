import { Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
const TeacherProfile = lazy(() => import("./components/studentInterface/teacherProfile/TeacherProfile"))
import Layout from "./components/Layout"
const StudentProfile = lazy(() => import("./components/studentInterface/studentProfile/StudentProfile"))
const Programs = lazy(() => import("./components/studentInterface/programs/Programs"))
import Login from "./components/authentication/login/Login"
const Signup = lazy(() => import("./components/authentication/signup/Signup"))
const Exam = lazy(() => import("./components/studentInterface/programs/Current/Exam"))
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthProvider from "./components/authentication/auth/AuthProvider"
import PrivateRoute from "./components/authentication/auth/PrivateRoute"
import PrefetchPrograms from "./components/authentication/auth/PrefetchPrograms"
import TeacherLayout from "./components/TeacherLayout"
import Lesson from "./components/studentInterface/programs/Current/Lesson"
import { BrowserView, MobileView } from "react-device-detect"
const TeacherInterfaceTeacherProfile = lazy(() => import("./components/teacherInterface/teacherProfile/TeacherInterfaceTeacherProfile"))
const TeacherProgramsPage = lazy(() => import("./components/teacherInterface/programs/TeacherProgramsPage"))
const ExamBank = lazy(() => import("./components/studentInterface/exambank/ExamBank"))
const KnowledgeBank = lazy(() => import("./components/studentInterface/knowledgebank/KnowledgeBank"))
const Quiz = lazy(() => import("./components/studentInterface/programs/Current/Quiz"))
const Assessment = lazy(() => import("./components/studentInterface/programs/Current/Assessment"))

const queryClient = new QueryClient()

function App() {
	
	return (
		<>
		<BrowserView>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Routes>
						<Route element={<PrefetchPrograms />}>
							<Route path='/' element={
								<PrivateRoute>
									{{
										student: <Layout />,
										teacher: <TeacherLayout />
									}}
								</PrivateRoute>
							}>
									<Route index element={
										<PrivateRoute>
											{{
												student: <Suspense>
															<StudentProfile />
														</Suspense>,
												teacher: <Suspense>
															<TeacherInterfaceTeacherProfile />
														</Suspense>
											}}
										</PrivateRoute>
									} />
									<Route path='teacherprofile'>
										<Route index element={
											<PrivateRoute>
													{{
														student: <Suspense>
																	<TeacherProfile />
																</Suspense>
													}}
											</PrivateRoute>
										} />
									</Route>
									
									<Route path='programs'>
										<Route index element={
											<PrivateRoute>
												{{
													student: <Suspense>
																<Programs />
															</Suspense>,
													teacher: <Suspense>
																<TeacherProgramsPage />
															</Suspense>
												}}
											</PrivateRoute>
										} />
									</Route>

									<Route path='teacherprofile/:id'>
										<Route index element={
											<PrivateRoute>
												{{
													student:
														<Suspense>
															<TeacherProfile />
														</Suspense>
												}}
											</PrivateRoute>
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
											<PrivateRoute>
												{{
													student:
														<Suspense>
															<Exam />
														</Suspense>
												}}
											</PrivateRoute>
										} />
									</Route>
									<Route path='quiz/:id'>
										<Route index element={
											<PrivateRoute>
												{{
													student:
														<Suspense>
															<Quiz />
														</Suspense>
												}}
											</PrivateRoute>
										} />
									</Route>
									<Route path='assessment/:id'>
										<Route index element={
											<PrivateRoute>
												{{
													student: 
														<Suspense>
															<Assessment />
														</Suspense>
												}}
											</PrivateRoute>
										} />
									</Route>
									<Route path='lesson/:id'>
										<Route index element={
											<PrivateRoute>
												{{
													student: 
														<Suspense>
															<Lesson />
														</Suspense>
												}}
											</PrivateRoute>
										} />
									</Route>
									<Route path='knowledgebank'>
										<Route index element={
											<PrivateRoute>
												{{
													student:
														<Suspense>
															<KnowledgeBank />
														</Suspense>
												}}
											</PrivateRoute>
										} />
									</Route>
									<Route path='exambank'>
										<Route index element={
											<PrivateRoute>
												{{
													student: 
														<Suspense>
															<ExamBank />
														</Suspense>
												}}
											</PrivateRoute>
										} />
									</Route>
							</Route>
						</Route>
					</Routes>
				</AuthProvider>
			</QueryClientProvider>
		</BrowserView>
		<MobileView>
			<h1>No Mobile View!</h1>
		</MobileView>
		</>
	)
}

export default App
