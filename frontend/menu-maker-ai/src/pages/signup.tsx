import { useState } from "react"
import Header from "./components/header"
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/navigation';
import Link from "next/link";

const backend_url = "http://localhost:8080"

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter();

    async function signup() {
        if(username == "" || password == ""){
            setError(true)
            return
        }else{
            setError(false)
        }
        try{
            const resp = await axios.post(backend_url+"/sign-up", {
                username,
                password
            })
            localStorage.setItem("user", username)
            router.push("/")
        }catch(e: any){
            setError(true)
        }
    }

    return (
        <div>
            <Head>
                <title>login</title>
            </Head>
            <Header wlogin={false} welcome={""}/>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="flex flex-col max-w-2xl mx-auto">
                    {
                        !error ?
                        <div></div>
                        :
                        <div><p style={{color: "red"}}>Invalid Login</p></div>
                    }
                    <div style={{color: "black"}} className="flex flex-col justify-center items-center mt-16">
                        <h2 style={{color: "white"}}>Username:</h2>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                    </div> 
                    <div style={{color: "black"}} className="flex flex-col justify-center items-center mt-16">
                        <h2 style={{color: "white"}}>Password:</h2>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                    </div>
                    <div className="flex justify-center items-center mt-16">
                        <button style={{ width: "80px" }} className="flex items-center justify-center h-10 rounded-md bg-green-500 hover:bg-green-600 text-white focus:outline-none" onClick={() => signup()}>
                            <p>Signup</p>
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-16">
                        <Link href="/login">
                            <p style={{color: "blue"}}>Login</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}