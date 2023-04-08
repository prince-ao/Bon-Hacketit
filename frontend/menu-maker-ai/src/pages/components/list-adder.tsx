import { useState, Dispatch, SetStateAction } from "react"
import OrderedCountingInput from "./ordered-counting-input"
import {Libre_Baskerville, Gloria_Hallelujah} from "next/font/google"

const libre = Libre_Baskerville({
    subsets: ["latin"],
    weight: "400",
    display: "auto",
    preload: true,
    adjustFontFallback: false
})

export default function ListAdder(
        {name, arr, setArr, maxText}: 
        {name: string, arr: string[], setArr: Dispatch<SetStateAction<string[]>>, maxText: number}
    ) {
    
    return (
    <div className="flex flex-col">
        <div className="text-3xl mb-4">
            <h2 className={libre.className}>{name}:</h2>
        </div>
        <div>
            {arr.map((v, i) => {
                const [tempText, setTempText] = useState(v);
                return(
                    <OrderedCountingInput count={i} text={tempText} setText={setTempText} maxText={maxText}/>
                )
            })}
        </div>
    </div>
  )
}