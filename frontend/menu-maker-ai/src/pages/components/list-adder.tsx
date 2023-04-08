import { useState, Dispatch, SetStateAction } from "react"
import OrderedCountingInput from "./ordered-counting-input"

export default function ListAdder(
        {name, arr, setArr, maxText}: 
        {name: string, arr: string[], setArr: Dispatch<SetStateAction<string[]>>, maxText: number}
    ) {
    
    return (
    <div>
        <h2>{name}:</h2>
        {arr.map((v, i) => {
            const [tempText, setTempText] = useState(v);
            return(
                <OrderedCountingInput count={i} text={tempText} setText={setTempText} maxText={maxText}/>
            )
        })}
    </div>
  )
}