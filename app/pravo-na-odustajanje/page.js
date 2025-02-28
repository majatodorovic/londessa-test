import PravoNaOdustajanje from "@/components/PravoNaOdustajanje/PravoNaOdustajanje";
export const metadata = {
  title: "Pravo na odustajanje | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Pravo na odustajanje | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

const PravoNaOdustajanjePage = () => {
  return <PravoNaOdustajanje />;
};

export default PravoNaOdustajanjePage;
