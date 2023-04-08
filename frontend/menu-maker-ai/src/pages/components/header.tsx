import Image from 'next/image'
import logo from '../../assets/images/logo.png'
import {Parisienne, Yeseva_One, Gloria_Hallelujah, Abril_Fatface} from "next/font/google"

const abril = Abril_Fatface({
    subsets: ["latin"],
    weight: "400",
    display: "auto",
    preload: true,
    adjustFontFallback: false
})

export default function Header() {
  return (
    <nav className="flex flex-row shadow-md shadow-gray-500">
        <div className="basis-1/6">
            <Image 
                src={logo}
                alt="Logo for menu make ai"
                width={70}
                style={{marginLeft: "10%", marginTop: "5%"}}
            />
        </div>
        <div className="basis-5/6 flex items-center"> 
            <div className='text-6xl'>

                <h1  className={abril.className}>Menu Maker AI</h1>
            </div>
        </div>
    </nav>
  )
}