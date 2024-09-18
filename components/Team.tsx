import { Button } from "@material-tailwind/react"
import Image from "next/image"
import mailtoHref from "./MailToLink"

export default function Team() {
    return (
        <div>
            <div className="p-4 flex justify-center">
                <h1 className="text-3xl">Teamet bak</h1>
            </div>
            <div className="p-4 grid grid-cols-2">
                <Image className="p-4 justify-self-end" src="/Anders profil.png" alt="Anders" width="520" height="520"></Image>
                <Image className="p-4 justify-self-start" src="/Sander profil.png" alt="Sander" width="520" height="520"></Image>
            </div >
            <div className="p-4">
                <p className="text-md p-1 text-center">Teamet som har laget UP orakel er Anders og Sander. </p>
                <p className="hidden md:visible text-md text-center">Vi har utdanning fra NTNU og jobber til daglig med å programmere og bygge programvare.</p>
                <p className="hidden text-md text-center">Vi synes det burde være lettere å forstå det vi spiser, og det er det vi ønsker å oppnå med UP Orakel.</p>
                <p className="text-md p-1 text-center">Gi oss gjerne en tilbakemelding, enten du har ris eller ros. Vi ønsker å lage en så god opplevelse som mulig.</p>
                <p className="text-md p-1 text-center">Takk for at du bruker UP orakel!</p>
            </div>
            <div className="flex justify-center">
                <a
                    href={mailtoHref}
                    className="rounded-md border border-transparent bg-lime-700 px-8 py-3 text-center font-medium text-white hover:bg-lime-600"
                >
                    Gi tilbakemelding
                </a>
            </div>
        </div >
    )
}