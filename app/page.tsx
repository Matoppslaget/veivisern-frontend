export default function Introduction() {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            UP orakel viser vei
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            Endelig kan du få kontroll på hva du spiser.
                        </p>
                    </div>
                    <div>
                        <div className="mt-10">
                            {/* Decorative image grid */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                            >
                                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                <img
                                                    alt=""
                                                    src="https://images.matprat.no/aksdg7tjvc-jumbotron/large/s%C3%B8tsaker_2.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    alt=""
                                                    src="https://s3.eu-west-1.amazonaws.com/bhi.no/s3fs-public/styles/topbanner/public/aktuelt/artikkel%20om%20ultra-prosessert%20mat%20-%20av%20marit%20kolby%20ved%20oslo%20nye%20h%C3%B8yskole.jpg.webp?VersionId=r1TN58xzwdkpBokDjFQqypPhnqpZMl0J&itok=oJJ0b9W9"
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    alt=""
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuaQXtqmMc5p4aP51u_u16xP2s9jfu0NonNw&s"
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    alt=""
                                                    src="https://image.forskning.no/2132357.webp?imageId=2132357&width=960&height=548&format=jpg"
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    alt=""
                                                    src="https://www.biobalance.no/wp-content/uploads/sites/46/2022/02/fiber-kostfiber-stor-guide.jpg"
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    alt=""
                                                    src="https://www.dagbladet.no/images/74287171.jpg?imageId=74287171&x=0&y=0&cropw=100&croph=99.473684210526&width=386&height=221"
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                <img
                                                    alt=""
                                                    src="https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1650/qykwhcf1dhaqs7qkok1v/fersk-frukt-og-gront"
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="/search"
                                className="inline-block rounded-md border border-transparent bg-lime-700 px-8 py-3 text-center font-medium text-white hover:bg-lime-600"
                            >
                                Søk etter produkter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
