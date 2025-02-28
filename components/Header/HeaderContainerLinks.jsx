"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/app/api/cartContext";
import { list } from "@/app/api/api";

const HeaderContainerLinks = ({ categoriesMain }) => {
  const [, , , , , , openHeader, mutateOpenHeader, , mutateChooseCategory] =
    useCartContext();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  const [landingPagesList, setLandingPagesList] = useState([]);

  useEffect(() => {
    const getLandingPages = async () => {
      const data = await list(`/landing-pages/list`).then((response) =>
        setLandingPagesList(response?.payload)
      );
    };
    getLandingPages();
  }, []);

  const [activeCategory, setActiveCategory] = useState({
    id: null,
    name: null,
    slug: null,
    data: [],
  });

  return (
    <div>
      {categoriesMain?.map((category, index) =>
        category?.children?.length > 0 ? (
          <button
            onClick={() => {
              setIsActive(category?.slug);
            }}
            key={index}
            className={`${
              isActive===category?.slug || pathname.includes(category?.slug)
                ? "border-b-2 border-black"
                : ""
            } mx-2 text-sm font-normal text-black uppercase 2xl:mr-8`}
          >
            {category?.name}
          </button>
        ) : (
          <Link
            href={`${category?.slug}`}
            key={index}
            className={`${
              (isActive || pathname) === category?.slug
                ? "border-b-2 border-black"
                : ""
            } mx-2 text-sm font-normal text-black uppercase 2xl:mr-8`}
            onClick={() => {
              setIsActive(category?.slug);
              mutateOpenHeader(false);
            }}
          >
            {category?.name}
          </Link>
        )
      )}
    </div>
  );
};

export default HeaderContainerLinks;
