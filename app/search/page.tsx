import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function Home() {
    return (
        <div>
            <div className="p-4 px-10 mx-auto max-w-4xl">
                <div className="p-2 px-4 bg-white rounded-xl shadow-sm flex justify-between space-x-4 border">
                    <input placeholder="Søk etter produkt..." type="text" className="w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-1 focus:ring-green-700 focus:ring-opacity-50 focus:outline-none sm:text-sm sm:leading-6" ></input>
                    <MagnifyingGlassIcon className=" text-gray-500 w-10 h-10 justify-end hover:cursor-pointer hover:text-black"></MagnifyingGlassIcon>
                </div>
            </div>
            <div className="border">
                <div className=" px-10 grid grid-cols-2 space-x-10 justify-items-center">
                    <div className="border"> Innhold 1</div>
                    <div className="border"> Innhold 2</div>
                </div>
            </div>
        </div>
    )
}