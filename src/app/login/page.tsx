import LoginForm from "@/components/LoginForm";

export default function page() {

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/3 min-w-fit mx-auto">
                <div className="w-full inline-flex flex-col gap-7 items-center">
                    <div className="flex flex-col gap-10 items-center">
                        <h2 className="text-8xl font-lexend_zetta">MEDIAMIN</h2>
                        <h3 className="text-4xl">Inicia Sesion</h3>
                    </div>
                    <div className="w-full">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}