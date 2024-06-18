import Navbar from '@/components/page_components/NavBar';
import Sidebar from '@/components/page_components/Sidebar/Sidebar';
import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className="container mx-auto">
            <div className=" bg-stone-50 h-screen overflow-y-auto">
                <Sidebar />
                <Navbar />

                <div className="flex-grow p-10 space-y-3">
                    <h1 className="text-3xl text-center font-bold">

                        Vår visjon
                    </h1>
                    <p className="mt-4 text-center text-xl">
                        La det være enkelt å spise god mat av god kvalitet
                    </p>
                    <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>

                    <div className='text-3xl text-center font-semibold'>Teamet</div>
                    <p className="text-center text-xl ">

                        Eller <a className="text-blue-500 hover:text-blue-600 hover:underline" href='https://www.sanders.technology'>Sanders</a> som vi liker å kalle oss.
                    </p>
                    <div className="flex justify-center flex-wrap gap-4 p-4">
                        <div className="flex-1 min-w-[200px] max-w-[500px] bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="object-cover responsive h-auto">
                                <a href='https://www.linkedin.com/in/sandernordeide/' target="_blank" rel="noopener noreferrer" className="hover:border-2">
                                    <Image
                                        src="/Sander profil.png"
                                        alt="Sander Nordeide"
                                        priority={true}
                                        width={500}
                                        height={300}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="flex-1 min-w-[200px] max-w-[500px] bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="object-cover responsive h-auto">
                                <a href='https://www.linkedin.com/in/anders-helgeland-vandvik-bb2630137/' target="_blank" rel="noopener noreferrer" className="hover:border-2">
                                    <Image
                                        src="/Anders profil.png"
                                        alt="Anders Vandvik"
                                        width={500}
                                        height={300}
                                        className="h-auto"
                                    />
                                </a>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AboutPage;