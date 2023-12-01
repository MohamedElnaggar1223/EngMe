import { Suspense, lazy, useContext } from 'react'
const ProgramExploreCourseCard = lazy(() => import('./ProgramExploreCourseCard'))
import { Stack } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { ProgramExploreContext } from './ProgramsExplore'
import CourseProps from '../../../../interfaces/CourseProps'

export default function ProgramExploreCourseComponents() 
{
    const queryClient = useQueryClient()
    //@ts-expect-error context
    const { pageShowed } = useContext(ProgramExploreContext)
    const coursesData = queryClient.getQueryData(['courses', pageShowed])

    console.log(coursesData)

    //@ts-expect-error course
    const displayedCourses = coursesData?.map((course, index) => (
        <Suspense>
            <ProgramExploreCourseCard index={index} course={course as CourseProps} />
        </Suspense>
    )) ?? []

    return (
        <Stack
            direction='column'
            mx={14}
        >
            {displayedCourses}
        </Stack>
    )
}
