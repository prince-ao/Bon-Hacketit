import Image from 'next/image'
import logo from '../../assets/images/logo.png'
import {Parisienne, Yeseva_One, Gloria_Hallelujah, Abril_Fatface} from "next/font/google"
import { useRouter } from 'next/navigation';

const abril = Abril_Fatface({
    subsets: ["latin"],
    weight: "400",
    display: "auto",
    preload: true,
    adjustFontFallback: false
})

export default function Header({wlogin, welcome}: {wlogin: boolean, welcome: string}) {
    const router = useRouter();
    return (
        <nav className="flex flex-row shadow-md shadow-gray-500">
            <div onClick={() => router.push("/")} className="basis-1/6">
                <Image 
                    src={logo}
                    alt="Logo for menu make ai"
                    width={70}
                    style={{marginLeft: "10%", marginTop: "5%"}}
                />
            </div>
            <div className="basis-4/6 flex items-center"> 
                <div className='text-6xl'>
                    <h1  className={abril.className}>Menu Maker AI</h1>
                </div>
            </div>
            { wlogin ? 
            <div className="basis-1/6 flex items-center">
                <button onClick={() => router.push("/login")}style={{ width: "80px" }}  className="flex items-center justify-center h-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white focus:outline-none" >
                    <p>login</p>
                </button>
            </div>
            :
            welcome != "" ?
            <div className="basis-1/6 flex items-center">
                <p>Welcome, {welcome}</p>
            </div>
            :
            <div></div>
            }
        </nav>
    )
}