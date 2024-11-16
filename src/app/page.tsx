"use client"

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    React.useEffect(() => {
        router.push("/dashboard");
    }
    , []);

    return (
        <div className="font-sans">
            <h1>HomePage</h1>
        </div>
    )
}