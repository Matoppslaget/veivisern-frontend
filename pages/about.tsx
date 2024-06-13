// pages/OmOss.tsx
import Navbar from '@/components/page_components/NavBar';

const AboutPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen overflow-y-auto bg-stone-50">
        <Navbar />
        <div className="flex-grow p-10">
          <h1 className="text-4xl font-bold">Om Oss</h1>
          <p className="mt-4 text-lg">
            Velkommen til vår side! Vi er dedikert til å tilby den beste tjenesten for å søke etter og evaluere matprodukter. Vårt team består av eksperter som brenner for mat og teknologi.
          </p>
          <p className="mt-4 text-lg">
            Vår visjon er å gjøre det enklere for forbrukere å finne kvalitetsprodukter som oppfyller deres behov og preferanser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;