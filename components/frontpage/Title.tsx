import VeivisernButton from "../common/VeivisernButton";

export default function Title() {
    return (
        <>
            <div className="sm:max-w-lg">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Orakelet viser vei
                </h1>
                <p className=" text-gray-500 mt-2 sm:mt-4 text-md sm:text-xl ">
                    Endelig kan du få kontroll på hva du spiser
                </p>
            </div>
            <VeivisernButton buttonText="Søk etter produkter" buttonHref="/search" />
        </>
    )
}