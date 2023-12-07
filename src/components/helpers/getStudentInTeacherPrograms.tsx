import { getStudentCount } from "./getStudentCount"

export const getStudentInTeacherPrograms = async(programsIds: string[]) => {
    const studentProgramData = programsIds.map(async (program) => {
        const programStudentsCount = await getStudentCount(program)
        return programStudentsCount
    })

    const finalCountData = await Promise.all(studentProgramData)
    const finalCount = finalCountData.slice().reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return finalCount
}