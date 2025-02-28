import Link from "next/link";
import MaloprodajePage from "@/components/MaloprodajePage/MaloprodajePage";

const Maloprodaje = () => {
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>Maloprodaje</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          Maloprodaje
        </h1>
      </div>
      <MaloprodajePage />
    </>
  );
};

export default Maloprodaje;

export const metadata = {
  title: "Maloprodaje | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Maloprodaje | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

