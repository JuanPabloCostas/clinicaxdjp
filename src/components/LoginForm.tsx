"use client"

import { Input } from "./input"
import { Label } from "./label"


export default function LoginForm() {
    
    return (
        <div className="flex flex-col items-start gap-8">
            <div className="mx-auto max-w-xs space-y-2">
                <Label htmlFor="email">Insert Email</Label>
                <Input placeholder="Enter email" id="email" name="email" type="email" />
            </div>
        </div>
    )
}