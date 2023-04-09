import { useEffect, useState } from "react"
import Header from "./components/header"
import ListAdder from "./components/list-adder"
import { Comfortaa } from "next/font/google"
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import robot from '../assets/images/robot.gif'

const comf = Comfortaa({
  subsets: ["latin"],
  weight: "400",
  display: "auto",
  preload: true,
  adjustFontFallback: false
})

const MAX_TEXT = 30;
const backend_url = "http://localhost:8080"

export default function Home() {
  const [ingredients, setIngredients] = useState([""])
  const [allergies, setAllergies] = useState([""])
  const [preferences, setPreferences] = useState("")
  const [allergyClick, setAllergyClick] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gotResponse, setGotResponse] = useState(false)
  const [res, setRes] = useState("")
  const [error, setError] = useState("")
  const [typedText, setTypedText] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(false)

  // Assumption: The user is in general good.
  // useEffect(() => {
  //   console.log("useeffect trigger")
  //   if((ingredients[0].length > 0) && !btnIsDisabled) {
  //     console.log("in if")
  //     setBtnIsDisabled(false);
  //   }else{
  //     console.log("in else")
  //     setBtnIsDisabled(true);
  //   }
  // }, [ingredients])

  async function sendRequestToAI() {
    // console.log(ingredients)
    // console.log(allergies)
    // console.log(preferences)
    try {
      setLoading(true)
      const response = await axios.post(backend_url + "/get-query", {
        item_list: ingredients,
        allergies: allergies,
        preferences: preferences
      })
      setLoading(false)
      setRes(response.data)
      setGotResponse(true)
      setIngredients([""])
      setAllergies([""])
      setAllergyClick(false)
      setPreferences("")
    } catch (e: any) {
      setLoading(false)
      setError(e.response)
    }
  }

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < res.length) {
        setTypedText(prevTypedText => prevTypedText + res[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [res])

  return (
    <main className="">
      <Header />
      { error != "" ? 
        <>
          <p style={{color: "red"}}>{error}</p>
        </>
        :
        <></>
      }
      {!loading ?
        <>
          {!gotResponse ?
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
              <div className="max-w-2xl mx-auto">
                <ListAdder name="Ingredients" arr={ingredients} setArr={setIngredients} maxText={MAX_TEXT} />
              </div>
              {allergyClick ?
                <div className="max-w-2xl mx-auto mt-16">
                  <ListAdder name="Allergies" arr={allergies} setArr={setAllergies} maxText={MAX_TEXT} />
                </div>
                :
                <div className="flex justify-center items-center mt-16">
                  <button className="flex items-center justify-center w-80 h-10 rounded-md bg-green-500 hover:bg-green-600 text-white focus:outline-none" onClick={() => setAllergyClick(true)}>
                    <p>Add Allergies</p>
                  </button>
                </div>
              }
              <div className="flex justify-center items-center mt-16">
                <textarea value={preferences} onChange={(e) => setPreferences(e.target.value)} className={comf.className} style={{ outline: "none", color: "black", borderRadius: "3px 3px 3px 3px", paddingLeft: "5px", paddingTop: "5px" }} name="preferences" cols={50} rows={8} placeholder="Preferences..." maxLength={250} />
              </div>

              <div className="flex justify-center items-center mt-16 ">
                <button style={{ width: "80px" }} className={`flex items-center justify-center h-10 rounded-md ${!btnIsDisabled ? "bg-green-500 hover:bg-green-600" : "bg-green-900"} text-white focus:outline-none`} onClick={sendRequestToAI} disabled={btnIsDisabled}>
                  <p>Send</p>
                </button>
              </div>
              <div className="h-12" />
            </div>
            :
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
              <div className="max-w-2xl mx-auto">
                <p dangerouslySetInnerHTML={{__html:typedText}}></p>
              </div>
              <div className="flex justify-center items-center mt-16">
                  <button className="flex items-center justify-center w-80 h-10 rounded-md bg-green-500 hover:bg-green-600 text-white focus:outline-none" onClick={() => setGotResponse(false)}>
                    <p>Generate New Menu</p>
                  </button>
                </div>
              <div className="h-12" />
            </div>
          }
        </>
        :
        <div className="h-screen w-screen flex items-center justify-center">
          <Image
            src={robot}
            alt="robot cooking gif"
            height={90}
            width={120}
          />
        </div>
      }
    </main>
  )
}
