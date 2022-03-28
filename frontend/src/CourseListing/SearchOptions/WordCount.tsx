import { ChangeEvent, useState } from "react"

const WordCount = () => {
    const [wordCount, setWordCount] = useState<string>('')
    const updateHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setWordCount(event.target.value)
    }

    return <form>
        <label>Word Count</label><br/>
        <select id='WordCount' onChange={updateHandler}>
            <option value=''>--</option>
            <option value='2000'>2000 words</option>
            <option value='4000'>4000 words</option>
            <option value='6000'>6000 words</option>
        </select>
    </form>
}


export default WordCount