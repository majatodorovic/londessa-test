"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import HeaderIcons from "./HeaderIcons";
import SearchProducts from "./SearchProducts";
import Translate from "../Translate/Translate";
import { usePathname } from "next/navigation";
import { useCategoryTree, useLandingPages } from "@/hooks/ecommerce.hooks";

const Header = () => {
  const { data: categories } = useCategoryTree();
  const { data: landingPagesList } = useLandingPages();
  const [menuOpen, setMenuOpen] = useState(false);
  const categoriesMain = [
    { name: "Početna", slug: "/", isCategory: false, id: 0 },
    { name: "Asortiman", slug: "/", isCategory: false, id: "asortiman" },
    { name: "Brendovi", slug: "/brendovi", isCategory: false },
    { name: "Blog", slug: "/blog", isCategory: false },
    { name: "Maloprodaje", slug: "/maloprodaje", isCategory: false },
    { name: "Kontakt", slug: "/kontakt", isCategory: false },
  ];

  const [activeCategory, setActiveCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug: null,
    data: categories ?? [],
    image: null,
  });

  const [activeSubCategory, setActiveSubCategory] = useState({
    open: false,
    id: null,
    name: null,
    slug_path: null,
    data: [],
    image: null,
  });

  const resetActiveCategory = () => {
    setActiveCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: categories ?? [],
      image: null,
    });
    setActiveSubCategory({
      open: false,
      id: null,
      name: null,
      slug: null,
      data: [],
      image: null,
    });
    setMenuOpen(false);
  };

  const [visible, setVisible] = useState("");

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY < 40)
        return setVisible(
          "sticky top-0 translate-y-0 transition-all duration-500"
        );
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll) {
        setVisible(
          "sticky top-0 -translate-y-full transition-all duration-500"
        );
        resetActiveCategory();
      } else {
        setVisible("sticky top-0 translate-y-0 transition-all duration-500");
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pathname = usePathname();
  return (
    <>
      <header
        className={`max-xl:hidden ${visible} w-full z-[100] relative bg-white border-b-4 border-topHeader `}
        id="header"
      >
        <HeaderTop />
        <div className="py-5 px-[3rem] flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo-londessa.png"
              width={100}
              height={39}
              className="object-cover"
              alt="logo"
            />
          </Link>

          <div
            className={`xl:mr-[13%] 2xl:mr-[15%] 3xl:mr-[22%] flex items-center gap-4`}
          >
            {categoriesMain?.map((category, index) => {
              const isCategory = category?.isCategory ?? true;
              let id = category?.id;

              if (id === "asortiman") {
                return (
                  <div key={index}>
                    <button
                      onMouseEnter={() => {
                        setMenuOpen(!menuOpen);
                      }}
                      className={`text-[13px] uppercase block text-black w-fit relative activeCategoryHover`}
                    >
                      {category?.name}
                    </button>
                  </div>
                );
              } else {
                return (
                  <Link
                    href={`${category?.slug}`}
                    key={index}
                    onClick={resetActiveCategory}
                  >
                    <span
                      className={`text-[13px] uppercase block text-black w-fit relative activeCategoryHover ${
                        pathname?.includes(category?.slug) && category?.id !== 0
                          ? "activeCategory"
                          : pathname === category?.slug && category?.id === 0
                          ? "activeCategory"
                          : ""
                      }`}
                    >
                      {category?.name}
                    </span>
                  </Link>
                );
              }
            })}
          </div>

          <SearchProducts />
          <div>
            <Translate />
          </div>
          <HeaderIcons />
        </div>
        {menuOpen && (
          <div
            onMouseLeave={() => {
              setActiveCategory({
                id: null,
                name: null,
                slug: null,
                data: categories ?? [],
                image: null,
                open: false,
              });
              setMenuOpen(false);
            }}
            className={`absolute top-[110px] right-0 w-full bg-white z-[100] max-lg:hidden`}
          >
            <div className={`px-20 py-6 relative h-full pb-2`}>
              <div className={`flex justify-between h-full`}>
                <div className={`flex gap-x-[10rem] pb-2`}>
                  <div className={`flex flex-col items-start justify-start`}>
                    {landingPagesList?.items?.map((item, index) => {
                      return (
                        <Link
                          onClick={resetActiveCategory}
                          href={`/promo/${item?.slug}`}
                          className={`uppercase text-red-500 hover:translate-x-5 hover:text-slate-500 transition-all duration-300 text-lg font-medium mb-1 block`}
                        >
                          {item?.name}
                        </Link>
                      );
                    })}
                    {activeCategory?.data?.map((category, index) => {
                      return category?.children?.length > 0 ? (
                        <button
                          key={index}
                          className={`${
                            category?.id === activeSubCategory?.id
                              ? "font-bold"
                              : "font-normal"
                          } text-lg uppercase hover:underline block text-black`}
                          onClick={() => {
                            setActiveSubCategory({
                              id:
                                category?.id === activeSubCategory?.id
                                  ? null
                                  : category?.id,
                              name:
                                category?.name === activeSubCategory?.name
                                  ? null
                                  : category?.name,
                              slug_path:
                                category?.slug_path ===
                                activeSubCategory?.slug_path
                                  ? null
                                  : category?.slug_path,
                              data:
                                category?.children === activeSubCategory?.data
                                  ? []
                                  : category?.children,
                              open: !activeSubCategory?.open,
                              image: category?.image ?? null,
                            });
                          }}
                        >
                          {category?.name}
                        </button>
                      ) : (
                        <Link
                          href={`/${category?.link?.link_path}`}
                          key={index}
                          className={`${
                            category?.id === activeCategory?.id
                              ? "activeCategory"
                              : "font-normal"
                          } text-lg uppercase hover:underline block text-black`}
                          onClick={() => {
                            setActiveCategory({
                              id: null,
                              name: null,
                              slug: null,
                              data: categories ?? [],
                              image: null,
                              open: false,
                            });
                            setMenuOpen(false);
                          }}
                        >
                          {category?.name}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="h-full">
                    <h3 className="text-[15px] uppercase text-black font-bold mb-4">
                      {activeSubCategory?.name}
                    </h3>
                    {activeSubCategory?.name && (
                      <Link
                        className={`text-[15px] font-normal text-[#CA965C] hover:underline pb-7`}
                        href={`/${activeSubCategory?.slug_path}`}
                        onClick={() => {
                          resetActiveCategory();
                          setMenuOpen(false);
                        }}
                      >
                        Pogledaj sve
                      </Link>
                    )}

                    <div className="h-full flex mt-3 flex-col flex-wrap gap-x-[3.3rem] gap-y-[0.1rem] max-h-[180px]">
                      {activeSubCategory &&
                        activeSubCategory?.data?.map((childCategory) => (
                          <Link
                            href={`/${childCategory?.link?.link_path}`}
                            onClick={resetActiveCategory}
                            key={childCategory?.id}
                            className={`text-[15px] lowercase text-black first-letter:uppercase block hover:underline ${
                              pathname?.includes(childCategory?.slug_path)
                                ? "font-bold"
                                : "font-normal"
                            }`}
                          >
                            {childCategory.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div className={`ml-auto`}>
                  <div className="relative aspect-video h-[200px]">
                    {(activeCategory?.image || activeSubCategory?.image) && (
                      <Image
                        src={
                          activeSubCategory?.image
                            ? activeSubCategory?.image
                            : activeCategory?.image
                        }
                        alt="img-modal"
                        fill
                        priority
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <div
        onClick={() => {
          setActiveCategory({
            open: false,
            id: null,
            name: null,
            slug: null,
            data: categories ?? [],
            image: null,
          });
        }}
        className={
          activeCategory?.open
            ? "fixed top-0 left-0 h-screen w-screen transition-all duration-500 bg-black/50 backdrop-blur-md opacity-100 visible z-[99]"
            : "fixed top-0 left-0 h-screen w-screen transition-all duration-500 bg-black/50 backdrop-blur-md opacity-0 invisible z-[99]"
        }
      />
    </>
  );
};

export default Header;
