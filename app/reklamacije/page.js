import Reklamacije from "@/components/Reklamacije/Reklamacije";
export const metadata = {
  title: "Reklamacije | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Reklamacije | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

const ReklamacijePage = () => {
  return <Reklamacije />;
};

export default ReklamacijePage;
