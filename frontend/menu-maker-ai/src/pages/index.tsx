import { useState } from "react"
import Header from "./components/header"
import ListAdder from "./components/list-adder"

export default function Home() {
  const [ingredients, setIngredients] = useState([""])
  const [allergies, setAllergies] = useState([""])
  const [allergyClick, setAllergyClick] = useState(false)
  const MAX_TEXT = 30;
  return (
    <main className="">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-2xl mx-auto">
          <ListAdder name="Ingredients" arr={ingredients} setArr={setIngredients} maxText={MAX_TEXT}/>
        </div>
        { allergyClick ? 
        <div className="max-w-2xl mx-auto mt-16">
          <ListAdder name="Allergies" arr={allergies} setArr={setAllergies} maxText={MAX_TEXT}/>
        </div> 
        : 
        <div className="flex justify-center items-center mt-16">
            <button className="flex items-center justify-center w-80 h-10 rounded-md bg-green-500 hover:bg-green-600 text-white focus:outline-none" onClick={() => setAllergyClick(true)}>
              <p>Add Allergies</p>
            </button>
        </div>
        }
      </div>
    </main>
  )
}
