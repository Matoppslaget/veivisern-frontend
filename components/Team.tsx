import Image from 'next/image';
import mailtoHref from './MailToLink';
import PrimaryLink from './PrimaryLink';

export default function Team() {
  return (
    <div>
      <div className="p-4 flex justify-center">
        <h1 className="text-3xl">Teamet bak</h1>
      </div>
      <div className="p-4 grid grid-cols-3">
        <Image
          className="p-4 justify-self-start"
          src="/Francesca profil.png"
          alt="Francesca"
          width="520"
          height="520"
        ></Image>
        <Image
          className="p-4 justify-self-start"
          src="/Sander profil.png"
          alt="Sander"
          width="520"
          height="520"
        ></Image>
        <Image
          className="p-4 justify-self-end"
          src="/Anders profil.png"
          alt="Anders"
          width="520"
          height="520"
        ></Image>
      </div>
      <div className="p-4">
        <p className="text-md p-1 text-center">
          Teamet som har laget Matoppslaget er Anders, Sander og Francesca.{' '}
        </p>
        <p className="hidden md:visible text-md text-center">
          Vi jobber i det daglige med utvikling og bygge programvare.
        </p>
        <p className="hidden text-md text-center">
          Vi synes det burde være lettere å forstå maten vi spiser, og det er
          det vi ønsker å oppnå med Matoppslaget.
        </p>
        <p className="text-md p-1 text-center">
          Gi oss gjerne en tilbakemelding, enten du har ris eller ros. Vi ønsker
          å lage en så god opplevelse som mulig.
        </p>
        <p className="text-md p-1 text-center">
          Takk for at du bruker Matoppslaget!
        </p>
      </div>
      <div className="flex justify-center">
        <PrimaryLink
          buttonText="Gi tilbakemelding"
          buttonHref={mailtoHref}
        />
      </div>
    </div>
  );
}
