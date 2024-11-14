"use client"

import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Input } from "./input"
import { Label } from "./label"


export default function LoginForm() {
    
    return (
        <div className="flex flex-col items-start gap-8 bg-white p-8 w-full">
            <div className="w-full space-y-2">
                <Label className="w-full" htmlFor="email">Correo</Label>
                <Input placeholder="Escribe tu correo electronico" id="email" name="email" type="email" />
            </div>
            <div className="w-full space-y-2">
                <Label className="w-full" htmlFor="password">Contraseña</Label>
                <Input placeholder="Escribe tu contraseña" type="password" id="password"/>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Checkbox id="r1" />
                <Label htmlFor="r1">Recordar datos</Label>
            </div>
            <div className="w-full space-y-2 flex flex-row justify-between">
                <Button className="mx-auto" variant="green">Iniciar Sesion</Button>
            </div>
        </div>
    )
}