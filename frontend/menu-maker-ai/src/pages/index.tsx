import { useState } from "react"
import Header from "./components/header"
import ListAdder from "./components/list-adder"

export default function Home() {
  const [ingredients, setIngredients] = useState([""])
  const MAX_TEXT = 30;
  return (
    <main className="">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-2xl mx-auto">
          <ListAdder name="Ingredients" arr={ingredients} setArr={setIngredients} maxText={MAX_TEXT}/>
        </div>
      </div>
    </main>
  )
}
