export default function Banner() {
    return (
        <div className="hidden sm:block p-2 sm:p-4 mx-auto max-w-2xl text-center">
            <h2 className="text-sm sm:text-base font-semibold leading-7 text-lime-800">Forstå det du spiser med</h2>
            <a href="/">
                <p className="text-2xl sm:p-2 sm:pb-4 font-bold tracking-tight text-gray-900 sm:text-4xl" >
                    Matoppslaget
                </p>
            </a>
        </div>
    )
}