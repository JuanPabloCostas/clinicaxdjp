import { Button } from "../button";

export default function AppHeader({metadata} : { metadata: {title: string}}) {

    return (
        <div className="flex flex-col items-start gap-6 self-stretch">
            <div className="flex justify-between items-center self-stretch">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <p className="text-4xl font-semibold">{metadata.title}</p>
                    </div>
                    <div className="flex px-2 py-2 justify-center items-center gap-2 rounded-lg border-[1.5px] bg-[#31723417]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                            <circle cx="3" cy="3" r="3" fill="#098833"/>
                        </svg>
                        <p className="text-sm font-medium">Operational</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Button variant="green">
                        Share
                    </Button>
                </div>
            </div>
        </div>
    )
}