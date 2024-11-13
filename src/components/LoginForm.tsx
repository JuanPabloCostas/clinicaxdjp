"use client"

import { Input } from "./input"
import { Label } from "./label"


export default function LoginForm() {
    
    return (
        <div className="flex flex-col items-start gap-8 bg-white p-8 w-full">
            <div className=" w-full space-y-2">
                <Label className="w-full" htmlFor="email">Correo</Label>
                <Input placeholder="Escribe tu correo electronico" id="email" name="email" type="email" />
            </div>
        </div>
    )
}