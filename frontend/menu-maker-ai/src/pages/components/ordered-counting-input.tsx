import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

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
            <h3>{count + 1})</h3>
            <div className="flex flex-row justify-evenly">
                <div style={{ color: "black" }}>
                    <input type="text" value={text} onChange={handleTextChange} />
                </div>
                <div><p>{counter}</p></div>
            </div>
        </div>
    )
}