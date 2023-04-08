import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import {Libre_Baskerville, Gloria_Hallelujah} from "next/font/google"

const libre = Libre_Baskerville({
    subsets: ["latin"],
    weight: "400",
    display: "auto",
    preload: true,
    adjustFontFallback: false
})

const gloria = Gloria_Hallelujah({
    subsets: ["latin"],
    weight: "400",
    display: "auto",
    preload: true,
    adjustFontFallback: false
})

export default function OrderedCountingInput(
    { count, text, setText, maxText }:
        { count: number, text: string, setText: Dispatch<SetStateAction<string>>, maxText: number }
) {
    const [counter, setCounter] = useState(maxText)
    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        const backspace = e.target.value.length < text.length
        const counter_b = counter <= 0
        if (!backspace && !counter_b) {
            setCounter(counter - 1);
        }
        else if (backspace){
            setCounter(counter + 1);
        }
        console.log(counter)
        if (counter <= 0) {
            return;
        }
        setText(e.target.value);
    }

    return (
        <div className="flex flex-row justify-evenly">
            <div className="text-xl">
                <h3 className={libre.className}>{count + 1})</h3>
            </div>
            <div className="flex flex-row justify-evenly">
                <div style={{ color: "black" }}>
                    <input className={gloria.className} type="text" value={text} onChange={handleTextChange} />
                </div>
                <div><p>{counter}</p></div>
            </div>
        </div>
    )
}