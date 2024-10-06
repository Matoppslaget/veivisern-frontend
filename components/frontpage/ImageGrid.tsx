export default function ImageGrid() {
    return (
        <div>
            <div className="mt-20 sm:mx-16">
                <div
                    aria-hidden="true"
                    className="pointer-events-none xl:absolute xl:inset-y-0 xl:mx-auto xl:w-full xl:max-w-7xl"
                >
                    <div className="xl:relative xl:left-1/3 xl:top-[73%] xl:-translate-y-2/3">
                        <div className="flex items-center space-x-4 sm:space-x-8 xl:space-x-12">
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 sm:gap-y-8">
                                <div className="flex-shrink-0 h-20 w-28 sm:h-40 sm:w-52 overflow-hidden rounded-lg ">
                                    <img
                                        alt=""
                                        src="https://images.matprat.no/aksdg7tjvc-jumbotron/large/s%C3%B8tsaker_2.jpg"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="flex-shrink-0 h-20 w-28 sm:h-40 sm:w-52 overflow-hidden rounded-lg">
                                    <img
                                        alt=""
                                        src="https://s3.eu-west-1.amazonaws.com/bhi.no/s3fs-public/styles/topbanner/public/aktuelt/artikkel%20om%20ultra-prosessert%20mat%20-%20av%20marit%20kolby%20ved%20oslo%20nye%20h%C3%B8yskole.jpg.webp?VersionId=r1TN58xzwdkpBokDjFQqypPhnqpZMl0J&itok=oJJ0b9W9"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 sm:gap-y-8">
                                <div className="h-20 w-28 sm:h-40 sm:w-52 overflow-hidden rounded-lg">
                                    <img
                                        alt=""
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuaQXtqmMc5p4aP51u_u16xP2s9jfu0NonNw&s"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="h-20 w-28 sm:h-40 sm:w-52 overflow-hidden rounded-lg">
                                    <img
                                        alt=""
                                        src="https://image.forskning.no/2132357.webp?imageId=2132357&width=960&height=548&format=jpg"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="h-20 w-28 sm:h-40 sm:w-52 overflow-hidden rounded-lg">
                                    <img
                                        alt=""
                                        src="https://www.biobalance.no/wp-content/uploads/sites/46/2022/02/fiber-kostfiber-stor-guide.jpg"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 sm:gap-y-8">
                                <div className="h-20 w-28 sm:h-40 sm:w-52 overflow-hidden rounded-lg">
                                    <img
                                        alt=""
                                        src="https://www.dagbladet.no/images/74287171.jpg?imageId=74287171&x=0&y=0&cropw=100&croph=99.473684210526&width=386&height=221"
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="h-20 w-28 sm:h-40 sm:w-52 overflow-hidden rounded-lg">
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
            </div>
        </div>
    )
}