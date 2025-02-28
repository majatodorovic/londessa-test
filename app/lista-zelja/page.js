import WishlistPage from "@/components/Wishlist/Wishlist";
export const metadata = {
  title: "Lista želja | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Lista želja | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

const Wishlist = async () => {
  return <WishlistPage />;
};

export default Wishlist;
