
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Stranica u izradi | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Stranica u izradi | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};


const PageInConstruction = () => {
  return (
    <>
      <div className="flex flex-col mt-[0rem] lg:mt-[9rem] items-center constructionHolder">
        <div className="relative z-[49] col-span-1 rounded-lg w-[300px] h-[300px] positionImage">
          <Image
            src={`/icons/under-construction.png`}
            alt="Croonus"
            height={150}
            width={150}
            style={{ objectFit: "contain" }}
            className="object-scale-down max-sm:w-[100%]"
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-opacity-50 constructionText text-center">
          <p className="font-medium">
            Izvinite, stranica je trenutno u izradi.
          </p>
          <Link
            href="/"
            className="bg-[#CA965C] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4"
          >
            Idite na početnu
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageInConstruction;
