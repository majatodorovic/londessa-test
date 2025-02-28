import Anketa from "@/components/Anketa/Anketa";

const AnketaPage = async () => {
  return <Anketa />;
};

export default AnketaPage;

export const metadata = {
  title: "Anketa | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Anketa | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

