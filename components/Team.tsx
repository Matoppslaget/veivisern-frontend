import Image from "next/image"

export default function Team() {
    return (
        <div>
            <div className="p-4 flex justify-center">
                <h1 className="text-3xl">Team</h1>
            </div>
            <div className="p-4 grid grid-cols-2">
                <Image className="p-4 justify-self-end" src="/Anders profil.png" alt="Anders profil" width="520" height="520"></Image>
                <Image className="p-4 justify-self-start" src="/Sander profil.png" alt="Sander profil" width="520" height="520"></Image>
            </div >
        </div >
    )
}/*  */