import SearchPage from "@/components/SearchPage/SearchPage";
import { Suspense } from "react";

const Search = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default Search;

export const metadata = {
    title: "Pretraga | Londessa",
    description: "Dobrodošli na Londessa Online Shop",

    robots: "index, follow",
    openGraph: {
        title: "Pretraga | Londessa",
        description: "Dobrodošli na Londessa Online Shop",
        type: "website",
        locale: "sr_RS",
    },
};
