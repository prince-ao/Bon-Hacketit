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

    
    const makeChanges = (index: number, change: string) => {
        let newArr = arr;
        newArr[index] = change
        setArr(newArr)
        console.log("being called")
    }
    
    return (
    <div className="flex flex-col">
        <div className="text-3xl mb-4">
            <h2 className={libre.className}>{name}:</h2>
        </div>
        <div className="flex flex-col space-y-4">
            {arr.map((v, i) => {
                return(
                    <OrderedCountingInput count={i} text={v} setText={makeChanges} maxText={maxText}/>
                )
            })}
        </div>
        <div className="flex justify-center items-center mt-4">
            <button className="flex items-center justify-center w-10 h-10 rounded-md bg-green-500 hover:bg-green-600 text-white focus:outline-none" onClick={() => {
                setArr([...arr, ""]);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11 9V1h-2v8H1v2h8v8h2v-8h8V9h-8z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
  )
}