import IndexSlider from "@/components/IndexSlider/IndexSlider";
import { get, list } from "./api/api";
import RecommendedCategories from "@/components/sections/homepage/RecommendedCategories";
import NewCategoriesSections from "@/components/NewCategoriesSection/NewCategoriesSection";
import NewsLetterInstagramSection from "@/components/NewsLetterInstgramSection/NewsLetterInstagramSection";
import RecommendedProducts from "@/components/sections/homepage/RecommendedProducts";
import { headers } from "next/headers";
import { generateOrganizationSchema } from "@/_functions/functions";

const getBanners = () => {
  return get("/banners/index_slider").then((res) => res?.payload);
};

const getMobileBanners = () => {
  return get("/banners/index_slider_mobile").then((res) => res?.payload);
};

const getBannersCategories = () => {
  return get("/banners/index-first-banner").then((res) => res?.payload);
};

const getRecommendedProducts = () => {
  return list("/products/section/list/recommendation").then(
    (res) => res?.payload?.items
  );
};

const getNew = () => {
  return list("/categories/section/recommended").then((res) => res?.payload);
};

const Home = async () => {
  const [
    banners,
    recommendedProducts,
    categories,
    mobileBanners,
    recommendedCategories,
  ] = await Promise.all([
    getBanners(),
    getRecommendedProducts(),
    getBannersCategories(),
    getMobileBanners(),
    getNew(),
  ]);

  const headers_list = headers();
  const base_url = headers_list.get("x-base_url");

  const schema = generateOrganizationSchema(base_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="block relative overflow-hidden">
        <div
          className={`relative transition-all duration-300 ${!banners?.length && !mobileBanners?.length
              ? "h-0 overflow-hidden hidden max-sm:-mt-[80px]" // Nema nijednog banera
              : banners?.length && !mobileBanners?.length
                ? "h-[700px] max-sm:h-0" // Samo desktop
                : !banners?.length && mobileBanners?.length
                  ? "h-0 max-sm:h-[400px]" // Samo mobilni
                  : "h-[700px] max-sm:h-[400px]" // Oba postoje
            }`}
          id="slider"
        >
          <IndexSlider banners={banners} mobileBanners={mobileBanners} />
        </div>



        {recommendedProducts?.length > 0 && (
          <div className="overflow-hidden">
            <RecommendedProducts
              recommendedProducts={recommendedProducts}
              action4={`Izdvajamo za Vas`}
            />
          </div>
        )}
        {categories?.length > 0 && (
          <RecommendedCategories categories={categories} />
        )}
        {recommendedCategories?.length > 0 && (
          <NewCategoriesSections categories={recommendedCategories} />
        )}
        <NewsLetterInstagramSection />
      </div>
    </>
  );
};

export default Home;

export const revalidate = 30;

const getSEO = () => {
  return get("/homepage/seo").then((response) => response?.payload);
};

export const generateMetadata = async () => {
  const data = await getSEO();
  const header_list = headers();
  let canonical = header_list.get("x-pathname");
  return {
    title: data?.meta_title ?? "Početna | Londessa",
    description: data?.meta_description ?? "Dobrodošli na Londessa Online Shop",
    alternates: {
      canonical: data?.meta_canonical_link ?? canonical,
    },
    robots: {
      index: data?.meta_robots?.index ?? true,
      follow: data?.meta_robots?.follow ?? true,
    },
    openGraph: {
      title: data?.social?.share_title ?? "Početna | Londessa",
      description:
        data?.social?.share_description ?? "Dobrodošli na Londessa Online Shop",
      type: "website",
      images: [
        {
          url: data?.social?.share_image ?? "",
          width: 800,
          height: 600,
          alt: "Londessa",
        },
      ],
      locale: "sr_RS",
    },
  };
};
