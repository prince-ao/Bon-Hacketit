import { useState } from "react"
import Header from "./components/header"
import ListAdder from "./components/list-adder"

export default function Home() {
  const [ingredients, setIngredients] = useState([""])
  const MAX_TEXT = 30;
  return (
    <main className="">
      <Header />
      <div className="md:container md:mx-auto px-36">
        <ListAdder name="Ingredients" arr={ingredients} setArr={setIngredients} maxText={MAX_TEXT}/>
      </div>
    </main>
  )
}
