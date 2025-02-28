import { company_data } from "@/_lib/company_data";
import { get } from "@/app/api/api";

export const getRobots = (robots) => {
  if (robots?.follow === null && robots?.index === null) {
    robots = { index: true, follow: true };
  }

  return robots;
};

export const handleCategoryRobots = (strana, filteri, sort, viewed, robots) => {
  if (robots?.follow === null && robots?.index === null) {
    robots = { index: true, follow: true };
  }

  switch (true) {
    case filteri?.length > 0:
      return { index: false, follow: false };
    case sort?.length > 0:
      return { index: false, follow: false };
    case Number(strana) > 1:
      return { index: false, follow: true };
    case viewed > Number(process.env.PAGINATION_LIMIT):
      return { index: false, follow: true };
    default:
      return robots;
  }
};

export const generateProductSchema = (product, product_gallery, canonical) => {
  if (product) {
    const {
      data: {
        item: {
          basic_data: { name, sku },
          price: {
            price: { original, discount },
            discount: { active },
            currency,
          },
          inventory: { inventory_defined },
        },
      },
    } = product;
    const { gallery } = product_gallery;
    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: name,
      image: gallery?.[0]?.image,
      sku: sku,
      offers: {
        "@type": "Offer",
        url: canonical,
        priceCurrency: currency?.toUpperCase(),
        price: original,
        availability: inventory_defined
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    };
  }
};

export const generateBreadcrumbSchema = (
  parents = [],
  name = "",
  path,
  base_url
) => {
  let slug_path = path?.join("/");

  let breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          name: "Početna",
          "@id": `${base_url}`,
        },
      },
    ],
  };

  parents?.map((parent, index) => {
    breadcrumb.itemListElement.push({
      "@type": "ListItem",
      position: index + 2,
      item: {
        name: `${base_url}/${parent?.link?.link_path}`,
        "@id": `${base_url}/${parent?.link?.link_path}`,
      },
    });
  });
  breadcrumb.itemListElement.push({
    "@type": "ListItem",
    position: parents?.length + 2,
    item: {
      name: `${base_url}/${slug_path}`,
      "@id": `${base_url}/${slug_path}`,
    },
  });
  return breadcrumb;
};

export const getCompanyData = (base_url) => {
  let name = process.env["NAME"];
  let phone = process.env["TELEPHONE"];
  let email = process.env["EMAIL"];
  let street_address = process.env["STREET_ADDRESS"];
  let city = process.env["CITY"];
  let postal_code = process.env["POSTAL_CODE"];
  let address_country = process.env["ADDRESS_COUNTRY"];

  return {
    name: name,
    phone: phone,
    email: email,
    street_address: street_address,
    city: city,
    postal_code: postal_code,
    address_country: address_country,
    base_url: base_url,
  };
};

export const generateOrganizationSchema = (base_url) => {
  let { default: default_data, stores } = company_data;
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Store"],
    name: default_data?.name,
    url: `${base_url}`,
    logo: `${base_url}/images/logo-red.png`,
    telephone: default_data?.telephone,
    email: default_data?.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: default_data?.street_address,
      addressLocality: default_data?.city,
      postalCode: default_data?.postal_code,
      addressCountry: default_data?.address_country,
    },
    image: `${base_url}/logo-londessa.png`,
    branchOf: (stores ?? [])?.map((item) => {
      return {
        "@type": "Store",
        name: item?.name,
        telephone: item?.telephone,
        email: item?.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: item?.street_address,
          addressLocality: item?.city,
          postalCode: item?.postal_code,
          addressCountry: item?.address_country,
        },
        image: `${base_url}/logo-londessa.png`,
      };
    }),
  };
};

export const getLoggedInStatus = async (customer_token) => {
  return await get(`/customers/sign-in/login-status`, customer_token)?.then(
    (res) => {
      if (res?.payload) {
        return res?.payload?.status;
      } else {
        return false;
      }
    }
  );
};
