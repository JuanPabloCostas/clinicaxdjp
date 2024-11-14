import LoginForm from "@/components/LoginForm";

export default function page() {

    return (
        <div className="flex flex-col items-center justify-center gap-5 h-screen w-screen">
                <div className="max-w-full flex flex-col gap-10 items-center text-center">
                    <h2 className="text-7xl font-lexend_zetta max-w-full text-center">MEDIAMIN</h2>
                    <h3 className="text-3xl">Inicia Sesion</h3>
                </div>
                <div className="w-1/3">
                    <LoginForm />
                </div>
        </div>
    )
}