import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import {Libre_Baskerville, Dosis} from "next/font/google"

const libre = Libre_Baskerville({
    subsets: ["latin"],
    weight: "400",
    display: "auto",
    preload: true,
    adjustFontFallback: false
})

const dosis = Dosis({
    subsets: ["latin"],
    weight: "400",
    display: "auto",
    preload: true,
    adjustFontFallback: false
})

export default function OrderedCountingInput(
    { count, text, setText, maxText }:
        { count: number, text: string, setText: (index: number, change: string) => void, maxText: number }
) {
    const [counter, setCounter] = useState(maxText)
    const [tempText, setTempText] = useState(text)
    function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
        const backspace = e.target.value.length < text.length
        const counter_b = counter <= 0
        if (!backspace && !counter_b) {
            setCounter(counter - 1);
        }
        else if (backspace){
            setCounter(counter + (text.length - e.target.value.length));
        }
        console.log(counter)
        if (counter <= 0) {
            return;
        }
        setTempText(e.target.value)
        setText(count, e.target.value);
    }

    return (
        <div className="flex flex-row ml-16 items-center">
            <div className="text-xl mr-8">
                <h3 className={libre.className}>{count + 1})</h3>
            </div>
            <div className="flex flex-row justify-evenly">
                <div style={{ color: "black" }} className="">
                    <input style={{height: "40px", outline: "none", borderRadius: "3px 0 0 3px", fontSize: "20px"}}className={dosis.className} type="text" value={tempText} onChange={handleTextChange} />
                </div>
                <div style={{borderRadius: "0 3px 3px 0"}} className="bg-zinc-50 px-4 flex items-center"><p className="text-black">{counter}</p></div>
            </div>
        </div>
    )
}