import ProgramExploreCourseComments from '../../../studentInterface/programs/Explore/ProgramComments/ProgramExploreCourseComments'
import ProgramProps from '../../../../interfaces/ProgramProps'

export default function Discussions(program: ProgramProps) 
{
    return <ProgramExploreCourseComments NoAdd={true} program={program} />
}
