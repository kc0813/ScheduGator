import { ChangeEvent, useState } from "react"

const Semester = () => {
    const [semester, setSemester] = useState<string>('')
    const updateHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSemester(event.target.value)
    }

    return <form>
        <label><small>Semester</small></label><br/>
        <select id='Semester' onChange={updateHandler}>
            <option value=''>--</option>
            <option value='Spring22'>Spring 2022</option>
            <option value='Summer22'>Summer 2022</option>
            <option value='Fall22'>Fall 2022</option>
        </select>
    </form>
}


export default Semester