import LoginForm from "@/components/LoginForm";

export default function page() {

    return (
        <div className="w-1/2 min-w-fit mx-auto">
            <div className="w-full inline-flex flex-col gap-7 items-center">
                <div className="flex flex-col gap-20 items-center">
                    <h2 className="text-9xl">MEDIAMIN</h2>
                    <h3 className="text-4xl">Inicia Sesion</h3>
                </div>
                <div className="w-full">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}