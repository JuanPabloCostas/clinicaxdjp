"use client";

import { User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
    currentUser?: User;
    login: (data: User) => void;
    logout: () => void;
}

export const authContext = createContext<AuthContext>({
    currentUser: undefined,
    login: () => {},
    logout: () => {}
});

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentUser, setcurrentUser] = useState<User>();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if(currentUser) {
            if (pathname === "/login") router.push("/dashboard");
        } else {
            // if (pathname !== "/login") router.push("/login");
        }
    }, [currentUser, pathname]);

    const login = (data: User) => {
        setcurrentUser(data);
    }

    const logout = () => {
        setcurrentUser(undefined);
    }

    return (
        <authContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </authContext.Provider>
    )
}