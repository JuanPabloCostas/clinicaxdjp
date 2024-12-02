"use client"

import { useContext, useState } from "react"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import { Label } from "./label"

import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
import { authContext } from "@/contexts/AuthContext"


export default function LoginForm() {

    const { login } = useContext(authContext);

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [loading, setloading] = useState(false)

    const router = useRouter();

    const successToast = () => {
        toast.success("Login exitoso");
    }

    const errorToast = () => {
        toast.error("Login fallido", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setloading(true)

        const reqBody = {
            email: loginData.email,
            password: loginData.password
        }

        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()) as any

        if(response.code === 200) {
            successToast()
            login(response.user)
            await new Promise(resolve => setTimeout(resolve, 500));
            router.push("/dashboard")
        } else {
            errorToast()
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        
        setloading(false)


    }
    
    return (
        <div className="flex flex-col items-start gap-8 bg-white p-8 w-full">
            <ToastContainer />
            <div className="w-full space-y-2">
                <Label className="w-full" htmlFor="email">Correo</Label>
                <Input placeholder="Escribe tu correo electronico" id="email" name="email" type="email" onChange={e => setLoginData({...loginData, email: e.target.value})}/>
            </div>
            <div className="w-full space-y-2">
                <Label className="w-full" htmlFor="password">Contraseña</Label>
                <Input placeholder="Escribe tu contraseña" type="password" id="password" onChange={e => setLoginData({...loginData, password: e.target.value})}/>
            </div>
            {/* <div className="flex items-center justify-center gap-2">
                <Checkbox id="r1" />
                <Label htmlFor="r1">Recordar datos</Label>
            </div> */}
            <div className="w-full space-y-2 flex flex-row justify-between">
                <Button className="mx-auto" variant="green" onClickCapture={handleSubmit} disabled={loading}>Iniciar Sesion</Button>
            </div>
        </div>
    )
}