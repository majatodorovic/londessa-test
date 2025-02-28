"use client";
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../assets/Icons/master (1).webp";
import Image2 from "../../assets/Icons/visa.webp";
import Image3 from "../../assets/Icons/bancaIntesa.webp";
import Image4 from "../../assets/Icons/img1.webp";
import Image5 from "../../assets/Icons/img.webp";
import Image6 from "../../assets/Icons/img3.webp";
import Image7 from "../../assets/Icons/img4.webp";
import Image8 from "../../assets/Icons/american.webp";
import Instagram from "../../assets/Icons/instagram.png";
import Youtube from "../../assets/Icons/youtube.png";
import Facebook from "../../assets/Icons/facebook.png";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [open, setOpen] = useState({
    id: null,
  });

  const pathname = usePathname();

  return (
    <div className="max-md:mt-[3rem] mt-[7.75rem] bg-[#f7f7f7]">
      <div className="mx-[5rem] max-xl:flex-col py-[2.625rem] flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white">
        <div>
          <Link href={`/`}>
            <Image src={"/logo2.png"} width={320} height={45} alt="Londessa" />
          </Link>
        </div>
        <div className="flex max-xl:flex-col max-xl:gap-[2rem] max-xl:mt-10 items-center gap-[5.625rem]">
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Besplatna dostava za
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Iznos preko <span className="text-[#CA965C]">6.000 RSD</span>
            </h1>
          </div>{" "}
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Rok isporuke do
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              <span className="text-[#CA965C]">2</span> radna dana
            </h1>
          </div>{" "}
          <div className="flex flex-col font-bold items-center text-center justify-center gap-1">
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              Povrat robe
            </h1>
            <h1 className="text-[#171717] uppercase text-[0.813rem]">
              U roku od <span className="text-[#CA965C]">14</span> dana
            </h1>
          </div>
        </div>
        <div className="flex max-xl:mt-10 items-center gap-[1.938rem]">
          <a href="https://www.instagram.com/londessa.rs/" target={"_blank"}>
            <Image
              src={Instagram}
              width={30}
              height={30}
              alt="Instagram"
              className="hover:scale-110 transition-all duration-300"
            />
          </a>
          <a
            href="https://www.facebook.com/flert.parfemi.srbija?ref=hl"
            target={"_blank"}
          >
            <Image
              src={Facebook}
              width={30}
              height={30}
              alt="Instagram"
              className="hover:scale-110 transition-all duration-300"
            />
          </a>
        </div>
      </div>
      <div className="mx-[5rem] max-md:w-[95%] max-md:mx-auto py-[2.75rem] mt-[1.75rem] max-xl:flex-col flex items-center justify-between border-l-0 border-t-0 border-r-0 border-b-2 border-b-white text-[#191919]">
        <div className="flex items-center max-md:hidden max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-5 max-md:w-full md:gap-[100px] 2xl:gap-[150px] 3xl:gap-[220px]">
          <div className="flex flex-col self-start gap-[40px] max-md:self-center">
            <h1 className="text-[1.063rem] font-bold">Korisnička podrška</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/strana/kako-kupiti" && "text-[#CA965C]"
                }`}
                href="/strana/kako-kupiti"
              >
                Kako kupiti
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/strana/reklamacije" && "text-[#CA965C]"
                }`}
                href="/strana/reklamacije"
              >
                Reklamacije
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/strana/povrat-sredstava" && "text-[#CA965C]"
                }`}
                href="/strana/povrat-sredstava"
              >
                Povrat sredstava
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/zamena-za-isti-artikal" && "text-[#CA965C]"
                }`}
                href="/zamena-za-isti-artikal"
              >
                Zamena za isti artikal
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/zamena-za-drugi-artikal" && "text-[#CA965C]"
                }`}
                href="/zamena-za-drugi-artikal"
              >
                Zamena za drugi artikal
              </Link>
              <Link
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/strana/pravo-na-odustajanje" &&
                  "text-[#CA965C]"
                }`}
                href="/strana/pravo-na-odustajanje"
              >
                Pravo na odustajanje
              </Link>
            </div>
          </div>
          <div className="flex flex-col self-start gap-[40px] max-md:self-center">
            <h1 className="text-[1.063rem] font-bold">O nama</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                href={`/strana/o-nama`}
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === `/strana/o-nama` && "text-[#CA965C]"
                }`}
              >
                Više o kompaniji Londessa
              </Link>

              <Link
                href={`/stranica-u-izradi`}
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/stranica-u-izradi" && "text-[#CA965C]"
                }`}
              >
                Ponude za posao
              </Link>

              <Link
                href={`/maloprodaje`}
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/maloprodaje" && "text-[#CA965C]"
                }`}
              >
                Naše prodavnice
              </Link>
            </div>
          </div>
          <div className="flex max-[493px]:mt-10 flex-col self-start gap-[40px] max-md:self-center">
            <h1 className="text-[1.063rem] font-bold">Možda te interesuje</h1>
            <div className="flex flex-col items-start gap-[0.4rem] text-[0.813rem] font-normal">
              <Link
                href={`/parfemi/zenski-parfemi`}
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/parfemi/zenski-parfemi" && "text-[#CA965C]"
                }`}
              >
                Ženski parfemi
              </Link>
              <Link
                href={`/parfemi/muski-parfemi`}
                className={`cursor-pointer hover:text-[#CA965C] ${
                  pathname === "/parfemi/muski-parfemi" && "text-[#CA965C]"
                }`}
              >
                Muški parfemi
              </Link>
            </div>
          </div>
        </div>
        <div className="flex md:hidden items-center max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-5 max-md:w-full md:gap-[100px] 2xl:gap-[150px] 3xl:gap-[220px]">
          <div
            onClick={() => setOpen({ id: open?.id === 1 ? null : 1 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center"
          >
            <h1 className="text-[1.063rem] font-bold">Korisnička podrška</h1>
            {open?.id === 1 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal">
                <Link
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/strana/kako-kupiti" && "text-[#CA965C]"
                  }`}
                  href="/strana/kako-kupiti"
                >
                  Kako kupiti
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/strana/reklamacije" && "text-[#CA965C]"
                  }`}
                  href="/strana/reklamacije"
                >
                  Reklamacije
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/strana/povrat-sredstava" && "text-[#CA965C]"
                  }`}
                  href="/povrat-sredstava"
                >
                  Povrat sredstava
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/zamena-za-isti-artikal" && "text-[#CA965C]"
                  }`}
                  href="/zamena-za-isti-artikal"
                >
                  Zamena za isti artikal
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/zamena-za-drugi-artikal" && "text-[#CA965C]"
                  }`}
                  href="/zamena-za-drugi-artikal"
                >
                  Zamena za drugi artikal
                </Link>
                <Link
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/strana/pravo-na-odustajanje" &&
                    "text-[#CA965C]"
                  }`}
                  href="/strana/pravo-na-odustajanje"
                >
                  Pravo na odustajanje
                </Link>
              </div>
            )}
          </div>
          <div
            onClick={() => setOpen({ id: open?.id === 2 ? null : 2 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center text-center"
          >
            <h1 className="text-[1.063rem] font-bold">O nama</h1>
            {open?.id === 2 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal">
                <Link
                  href={`/strana/o-nama`}
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/strana/o-nama" && "text-[#CA965C]"
                  }`}
                >
                  Više o kompaniji Londessa
                </Link>

                <Link
                  href={`/stranica-u-izradi`}
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/stranica-u-izradi" && "text-[#CA965C]"
                  }`}
                >
                  Ponude za posao
                </Link>

                <Link
                  href={`/maloprodaje`}
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/maloprodaje" && "text-[#CA965C]"
                  }`}
                >
                  Naše prodavnice
                </Link>
              </div>
            )}
          </div>
          <div
            onClick={() => setOpen({ id: open?.id === 3 ? null : 3 })}
            className="flex flex-col self-start gap-[40px] max-md:self-center"
          >
            <h1 className="text-[1.063rem] font-bold">Možda te interesuje</h1>
            {open?.id === 3 && (
              <div className="flex flex-col items-center justify-center gap-[0.4rem] text-[0.813rem] font-normal">
                <Link
                  href={`/parfemi/zenski-parfemi`}
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/parfemi/zenski-parfemi" && "text-[#CA965C]"
                  }`}
                >
                  Ženski parfemi
                </Link>
                <Link
                  href={`/parfemi/muski-parfemi`}
                  className={`cursor-pointer hover:text-[#CA965C] ${
                    pathname === "/parfemi/muski-parfemi" && "text-[#CA965C]"
                  }`}
                >
                  Muški parfemi
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex max-xl:mt-5 flex-col max-md:mt-10 self-start gap-[1.25rem] max-xl:w-full xl:max-w-[450px] 2xl:max-w-[450px] 3xl:max-w-[578px]">
          <div className="flex items-center gap-1 ">
            <div>
              <Link
                href="http://www.mastercard.com/rs/consumer/credit-cards.html"
                target="_blank"
              >
                <Image
                  src={Image1}
                  width={84}
                  height={30}
                  alt="Master Card"
                  className="object-scale-down"
                />
              </Link>
            </div>
            <div>
              <Link
                href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html"
                target="_blank"
              >
                <Image
                  src={Image2}
                  width={50}
                  height={30}
                  alt="Master Card"
                  className="object-scale-down"
                />
              </Link>
            </div>
            <div>
              <Link href="https://www.bancaintesa.rs" target="_blank">
                <Image
                  src={Image3}
                  width={140}
                  height={70}
                  alt="Master Card"
                  className="object-scale-down"
                />
              </Link>
            </div>
            <div>
              <Image
                src={Image4}
                width={44}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image5}
                width={44}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image6}
                width={50}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image7}
                width={56}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
            <div>
              <Image
                src={Image8}
                width={43}
                height={30}
                alt="Master Card"
                className="object-scale-down"
              />
            </div>
          </div>
          <p className="text-[0.813rem] font-normal text-[#191919] ">
            Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a
            plaćanje se vrši isključivo u dinarima. Isporuka se vrši SAMO na
            teritoriji Republike Srbije.
          </p>
          <p className="text-[0.813rem] font-normal text-[#191919] ">
            Nastojimo da budemo što precizniji u opisu proizvoda, prikazu slika
            i samih cena, ali ne možemo garantovati da su sve informacije
            kompletne i bez grešaka. Svi artikli prikazani na sajtu su deo naše
            ponude i ne podrazumeva da su dostupni u svakom trenutku.
          </p>
        </div>
      </div>
      <div className="mx-[5rem] max-md:flex-col max-md:gap-10 max-md:w-[95%] max-md:mx-auto py-[1.25rem] flex items-center justify-between">
        <div className="flex max-md:flex-wrap items-center gap-2">
          <Link
            href="/strana/uslovi-koriscenja"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#CA965C] cursor-pointer ${
              pathname === "/strana/uslovi-koriscenja" && "text-[#CA965C]"
            }`}
          >
            Uslovi korišćenja •
          </Link>
          <Link
            href="/strana/zastita-privatnosti"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#CA965C] cursor-pointer ${
              pathname === "/strana/zastita-privatnosti" && "text-[#CA965C]"
            }`}
          >
            Zaštita privatnosti •
          </Link>
          <Link
            href="/strana/isporuka"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#CA965C] cursor-pointer ${
              pathname === "/strana/isporuka" && "text-[#CA965C]"
            }`}
          >
            Isporuka •
          </Link>
          <Link
            href="/strana/najcesca-pitanja"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#CA965C] cursor-pointer ${
              pathname === "/strana/najcesca-pitanja" && "text-[#CA965C]"
            }`}
          >
            Najčešća pitanja •
          </Link>
          <Link
            href="/strana/kolacici"
            className={`text-[0.813rem] font-normal text-[#191919] hover:text-[#CA965C] cursor-pointer ${
              pathname === "/strana/kolacici" && "text-[#CA965C]"
            }`}
          >
            Politika o 'Kolačićima'
          </Link>
        </div>
        <p className="text-[0.813rem] font-normal text-[#191919] ">
          &copy; {new Date().getFullYear()} Londessa | Sva prava zadržana.
          Powered by{" "}
          <a
            href="https://www.croonus.com"
            target={"_blank"}
            className="hover:text-[#CA965C] cursor-pointer bganimatethumb relative"
          >
            Croonus Technologies
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
