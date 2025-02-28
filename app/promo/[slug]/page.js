import LandingPage from "@/components/PromoPage/LandingPage";

const PromoPage = async ({ params: { slug } }) => {
  return (
    <>
      <LandingPage slug={slug} />
    </>
  );
};

export default PromoPage;

export const metadata = {
  title: "Promocije | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Promocije | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};
