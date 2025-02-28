import { get as GET } from "@/app/api/api";
import { notFound, permanentRedirect as redirect } from "next/navigation";
import { headers } from "next/headers";
import { getRobots, handleCategoryRobots } from "@/_functions/functions";
import Category from "@/app/kategorije/[...path]/page";
import ProductDetailPage from "@/app/proizvod/[...path]/page";
import { ProductPage } from "@/components/ProductDetails/ProductPage";

const handleData = async (slug) => {
  return await GET(`/slugs/product-categories?slug=${slug}`).then((res) => {
    return res?.payload;
  });
};

const fetchCategorySEO = async (slug) => {
  return await GET(`/categories/product/single/seo/${slug}`).then(
    (response) => {
      return response?.payload;
    }
  );
};

const getProductSEO = async (id) => {
  return await GET(`/product-details/seo/${id}`).then((response) => {
    return response?.payload;
  });
};

const DynamicPage = async ({ params: { path }, params, searchParams }) => {
  const str = path?.join("/");
  const data = await handleData(str);
  const headers_list = headers();
  console.log(data);
  switch (true) {
    case data?.type === "category" &&
      data?.status === true &&
      data?.redirect_url === false:
      const base_url = headers_list.get("x-base_url");

      return (
        <Category
          params={params}
          searchParams={searchParams}
          base_url={base_url}
        />
      );
    case data?.type === "product" &&
      data?.status === true &&
      data?.redirect_url === false:
      const canonical = headers_list.get("x-canonical");
      return (
        <ProductPage
          canonical={canonical}
          id={data?.id}
          path={path}
          categoryId={path[path?.length - 2] ?? "*"}
        />
      );
    case data?.status === false:
      return notFound();
    default:
      redirect(`/${data?.redirect_url}`);
  }
};

export default DynamicPage;

const defaultMetadata = {
  title: "Početna | Londessa",
  description: "Dobrodošli na Londessa Online Shop",
  robots: "index, follow",
  openGraph: {
    title: "Početna | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

export async function generateMetadata({
  params: { path },
  searchParams: { filteri, sort, viewed, strana },
}) {
  const str = path?.join("/");
  const data = await handleData(str);
  const headersList = headers();
  let canonical = headersList?.get("x-pathname");

  switch (true) {
    case data?.status === false &&
      data?.type === null &&
      data?.id === null &&
      data?.redirect_url === false:
      return {};

    case data?.type === "category" &&
      data?.status &&
      data?.redirect_url === false:
      const category = await fetchCategorySEO(data?.id);
      if (category) {
        let {
          meta_title: title,
          meta_keywords: keywords,
          meta_description: description,
          meta_image: image,
          meta_canonical_link: canonical_link,
          meta_robots: robots,
          social: {
            share_title = "",
            share_description = "",
            share_image = "",
          },
        } = category;

        return {
          title: title ?? "",
          description: description ?? "",
          keywords: keywords ?? "",
          image: image ?? "",
          alternates: {
            canonical: `${canonical_link ?? canonical}`,
          },
          openGraph: {
            title: `${share_title}` ?? "",

            description: share_description ?? "",
            images: [
              {
                url: share_image ?? "",
                width: 800,
                height: 600,
                alt: share_description ?? "",
                title: share_title ?? "",
                description: share_description ?? "",
              },
            ],
          },
          robots: handleCategoryRobots(strana, filteri, sort, viewed, robots),
        };
      } else {
        return {};
      }

    case data?.type === "product" &&
      data?.status &&
      data?.redirect_url === false:
      const productSEO = await getProductSEO(data?.id);
      let robots = getRobots(productSEO?.meta_robots);
      const image = productSEO?.meta_image || "";
      if (productSEO) {
        return {
          alternates: {
            canonical: `${productSEO?.meta_canonical_link ?? canonical}`,
          },
          description:
            `${productSEO?.meta_title} - ${productSEO?.meta_description}` ?? "",
          keywords: productSEO?.meta_keywords ?? "",
          openGraph: {
            title:
              `${productSEO?.social?.share_title ?? productSEO?.meta_title}` ??
              "",
            description:
              productSEO?.social?.share_description ??
              productSEO?.meta_description ??
              "",
            type: "website",
            images: [
              {
                url: productSEO?.social?.share_image ?? image,
                width: 800,
                height: 800,
                alt:
                  productSEO?.social?.share_description ??
                  productSEO?.meta_description,
              },
            ],
          },
          robots: robots,
          title: `${productSEO?.meta_title}` ?? "",
        };
      } else {
        return defaultMetadata;
      }
  }
}
