import { getProgramComments } from "./getProgramComments"

export const getTeacherProgramsComments = async(programsIds: string[]) => {
    const programsComments = programsIds.map(async (program) => {
        const programComments = await getProgramComments(program)
        return programComments
    })

    const finalProgramsComments = await Promise.all(programsComments)
    return finalProgramsComments
}