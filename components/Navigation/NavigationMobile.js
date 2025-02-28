"use client";
import { get, list } from "@/app/api/api";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Burger from "../../assets/Icons/hamburger.png";
import Search from "../../assets/Icons/search.png";
import { useRouter, usePathname } from "next/navigation";
import User from "../../assets/Icons/user.png";
import Cart from "../../assets/Icons/shopping-bag.png";
import { currencyFormat } from "@/helpers/functions";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import {
  useCartBadge,
  useCategoryTree,
  useLandingPages,
  useNewProducts,
  useWishlistBadge,
} from "@/hooks/ecommerce.hooks";

const NavigationMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: categories } = useCategoryTree();
  const { data: landingPagesList } = useLandingPages();
  const { data: products } = useNewProducts();
  const { data: cartCount, refetch } = useCartBadge();
  const { data: wishlistCount } = useWishlistBadge();

  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [activeCategory, setActiveCategory] = useState({
    id: undefined,
    data: [],
    parentCategory: undefined,
    firstCategory: null,
  });
  const [lastActiveCategory, setLastActiveCategory] = useState({
    id: undefined,
    data: [],
    parentCategory: undefined,
  });
  let exActiveIds = [];
  const [activeImage, setActiveImage] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm?.length >= 3) {
      router.push(`/search?search=${searchTerm}`);
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (menuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    handleBodyOverflow();
  }, [menuOpen]);
  useEffect(() => {
    if (!pathname?.includes("/")) {
      setActiveCategory({
        id: categories[0]?.id ?? 0,
        data: categories[0]?.children ?? [],
        parentCategory: categories[0]?.id ?? 0,
        firstCategory: true,
      });
    }
  }, [categories]);

  const [generateBreadcrumbs, setGenerateBreadcrumbs] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScrollIconDisappear = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setSearchVisible(true);
      } else {
        setSearchVisible(false);
      }
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScrollIconDisappear);
    return () => {
      window.removeEventListener("scroll", handleScrollIconDisappear);
    };
  }, []);

  useEffect(() => {
    if (pathname?.includes("/korpa/")) {
      refetch();
      router?.refresh();
    }
  }, [pathname]);

  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: searchData, isFetching } = useQuery({
    queryKey: ["searchData", debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch?.length >= 3) {
        return await list(`/products/search/list`, {
          search: debouncedSearch,
        }).then((res) => {
          return res?.payload;
        });
      }
    },
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const categoriesMain = [
    { name: "Brendovi", slug: "/brendovi" },
    { name: "Blog", slug: "/blog" },
    { name: "Maloprodaje", slug: "/maloprodaje" },
    { name: "Kontakt", slug: "/kontakt" },
  ];

  return (
    <>
      <div className="xl:hidden w-full z-[2000] sticky top-0 bg-white bg-opacity-90 backdrop-blur-md">
        <div className="w-[95%] py-3 mx-auto flex justify-between items-center">
          <div onClick={() => setMenuOpen(true)}>
            <Image alt={``} src={Burger} width={30} height={30} />
          </div>
          <Link href="/">
            <div className="relative">
              <Image
                alt={`logo`}
                src={"/logo-londessa.png"}
                width={150}
                height={33}
              />
            </div>
          </Link>
          <div className="relative flex items-center gap-4">
            {" "}
            {pathname === "/" ? (
              <div
                className={
                  searchVisible
                    ? `visible transition-all duration-500 opacity-100`
                    : `invisible transition-all duration-500 opacity-0`
                }
              >
                <Image
                  src="/search.png"
                  id="search"
                  width={22}
                  height={22}
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            ) : (
              <div>
                <Image
                  src={Search}
                  id="search"
                  width={22}
                  height={22}
                  onClick={() => setSearchOpen(true)}
                />
              </div>
            )}
            <Link href={`/nalog`}>
              <Image src={User} width={33} height={33} />
            </Link>
            <Link href="/korpa">
              <div className="relative">
                <Image src={Cart} width={33} height={33} />
                {cartCount > 0 && (
                  <span className="absolute text-white text-xs -top-1 right-0 bg-[#e10000] px-1 py-0 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>{" "}
      </div>
      <div
        className={
          searchVisible
            ? `text-white ${
                pathname === "/" ? `flex items-center justify-center` : `hidden`
              } md:hidden bg-transparent  invisible sticky top-[60px] transition-all duration-500 opacity-0 z-[4000] `
            : `text-white ${
                pathname === "/" ? `flex items-center justify-center` : `hidden`
              } md:hidden bg-transparent visible sticky top-[60px] z-[4000] transition-all duration-500 opacity-100 `
        }
      >
        <form
          className="w-[95%] mx-auto h-12 mt-12 py-2 flex items-center absolute"
          onClick={() => setSearchOpen(true)}
        >
          <div
            type="text"
            className="w-full h-full bg-transparent focus:border-white focus:outline-none focus:ring-0 placeholder:text-white text-white text-xs border-white border  rounded-lg py-2 pl-8 mix-blend-difference placeholder:text-xs"
            placeholder="Pretraga"
            onChange={(e) => setSearchTerm(e.target.value)}
            onMouseDown={() => setSearchOpen(true)}
          />
          <h1 className="absolute left-8 text-sm">Pretraga</h1>
          <i className="text-xs text-white fa-solid fa-search absolute left-2 top-5"></i>
        </form>
      </div>
      <div
        className={
          menuOpen
            ? `translate-x-0 flex flex-col h-screen z-[5000] w-full duration-500 transition-all fixed bg-white top-0 left-0`
            : `-translate-x-full flex flex-col h-screen z-[5000] w-full duration-500 transition-all fixed bg-white top-0 left-0`
        }
      >
        <div className="w-[95%]  mx-auto flex items-center justify-between py-3.5">
          <Image src="/logo-londessa.png" width={150} height={150} alt="logo" />
          <i
            className="fas fa-times text-2xl"
            onClick={() => setMenuOpen(false)}
          ></i>
        </div>
        <div className="w-[95%] flex flex-wrap flex-row gap-7 mx-auto mt-5 border-b border-b-[#e5e7eb]">
          {categories?.map((category) => {
            const isActive = activeCategory?.parentCategory === category?.id;
            return category?.children ? (
              <div
                className="flex flex-row items-center justify-between gap-5"
                key={category?.id}
              >
                <h1
                  className={
                    isActive
                      ? `font-bold uppercase text-[0.9rem]`
                      : `uppercase text-[0.9rem]`
                  }
                  onClick={() => {
                    setActiveCategory({
                      id: category?.id,
                      data: category?.children,
                      parentCategory: category?.id,
                      firstCategory: true,
                    });
                    setActiveImage(category?.image);
                    setGenerateBreadcrumbs(category?.name);
                  }}
                >
                  {category?.name}
                </h1>
              </div>
            ) : (
              <Link
                href={`/${category?.link?.link_path}`}
                className={`uppercase text-[0.9rem]`}
                onClick={() => {
                  setMenuOpen(false);
                  setActiveCategory({
                    id: categories[0]?.id,
                    data: categories[0]?.children,
                    parentCategory: categories[0]?.id,
                  });
                  setActiveImage(categories[0]?.image);
                  setGenerateBreadcrumbs();
                  setLastActiveCategory({
                    id: categories[0]?.id,
                    data: categories[0]?.children,
                  });
                }}
              >
                {category?.name}
              </Link>
            );
          })}
          <div
            className="self-end justify-self-end ml-auto relative"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <Link href="/lista-zelja"> Lista želja</Link>
            <span className="absolute -top-2 -right-1 bg-[#e10000] rounded-full text-white px-1 text-xs">
              {wishlistCount}
            </span>
          </div>
        </div>

        <div className="w-[95%] mx-auto mt-5">
          <button
            className="flex items-center justify-between w-full gap-5"
            onClick={() => {
              let datatmp = [];
              let imagetmp = "";
              const data = categories?.map((category) => {
                if (category?.id === activeCategory?.parentCategory) {
                  datatmp = category?.children;
                }
              });
              const image = categories?.map((category) => {
                if (category?.id === activeCategory?.parentCategory) {
                  imagetmp = category?.image;
                }
              });
              setActiveCategory({
                id: activeCategory?.parentCategory,
                data: datatmp,
                parentCategory: activeCategory?.parentCategory,
                firstCategory: true,
              });
              setActiveImage(imagetmp);
              setGenerateBreadcrumbs();
            }}
          >
            {!activeCategory?.firstCategory && (
              <div className={`w-full flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-chevron-left text-base"></i>
                  <h1 className="text-[0.9rem] font-normal">Nazad</h1>
                </div>
                <Link
                  href={`/${activeCategory?.id}`}
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveCategory({
                      id: categories[0]?.id,
                      data: categories[0]?.children,
                      parentCategory: categories[0]?.id,
                    });
                    setActiveImage(categories[0]?.image);
                    setGenerateBreadcrumbs();
                    setLastActiveCategory({
                      id: categories[0]?.id,
                      data: categories[0]?.children,
                    });
                  }}
                  className={`text-[0.9rem] font-normal text-[#CA965C]`}
                >
                  Pogledaj sve
                </Link>
              </div>
            )}
          </button>
        </div>

        <div className="mt-5 w-[95%] overflow-y-auto mx-auto flex flex-col gap-5">
          {activeCategory?.data?.length > 0 &&
            activeCategory?.data?.map((category) => {
              return (
                <div
                  className="flex flex-row w-full items-center justify-between gap-5"
                  key={category?.id}
                >
                  {category?.children?.length > 0 ? (
                    <div
                      className={`${
                        activeCategory.firstCategory
                          ? `uppercase flex flex-row w-full items-center justify-between`
                          : `uppercase flex flex-row w-full items-center justify-between`
                      } text-[0.9rem]`}
                      onClick={() => {
                        setLastActiveCategory({
                          id: category?.id,
                          data: category?.children,
                        });
                        setActiveCategory({
                          id: category?.id,
                          data: category?.children,
                          parentCategory: activeCategory?.parentCategory,
                        });
                        setActiveImage(category?.image);
                        setGenerateBreadcrumbs((prev) => {
                          if (prev) {
                            return `${prev} / ${category?.name}`;
                          } else {
                            return `${category?.name}`;
                          }
                        });
                        exActiveIds.push(category?.id);
                      }}
                    >
                      <h1>{category?.name}</h1>
                      {category?.children?.length > 0 && (
                        <i className="fas fa-chevron-right"></i>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={`/${category?.link?.link_path}`}
                      className={`${
                        activeCategory.firstCategory
                          ? `uppercase w-full`
                          : `w-full`
                      } ${
                        pathname?.includes(category?.slug)
                          ? `text-[#e10000]`
                          : `text-black`
                      } text-[0.9rem]`}
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveCategory({
                          id: categories[0]?.id,
                          data: categories[0]?.children,
                          parentCategory: categories[0]?.id,
                        });
                        setActiveImage(categories[0]?.image);
                        setGenerateBreadcrumbs();
                        setLastActiveCategory({
                          id: categories[0]?.id,
                          data: categories[0]?.children,
                        });
                      }}
                    >
                      {category?.name}
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
        <div className="flex flex-col mt-10 w-[95%] mx-auto gap-3">
          {landingPagesList?.items?.map((item, index) => {
            return (
              <Link
                onClick={() => {
                  setMenuOpen(false);
                }}
                href={`/promo/${item?.slug}`}
                className="text-red-500 text-[1.2rem] uppercase animate-pulse"
              >
                {item?.name}
              </Link>
            );
          })}
          {categoriesMain?.map((category) => (
            <Link
              onClick={() => {
                setMenuOpen(false);
              }}
              href={`${category?.slug}`}
              className={`text-[1.2rem] uppercase`}
            >
              {category?.name}
            </Link>
          ))}
        </div>
      </div>
      {menuOpen && (
        <div
          className="fixed top-0 left-0 bg-black bg-opacity-40 h-screen w-screen z-[4000]"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      {searchOpen && (
        <div className="fixed top-0 left-0 bg-white  w-screen h-screen z-[10000]">
          <div className="w-[95%] mt-6 mx-auto flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative w-[90%] ">
              <input
                type="text"
                className="w-full border  border-[#191919] focus:border-[#191919] focus:outline-none focus:ring-0 placeholder:text-base rounded-lg pl-10"
                placeholder="Unesite pojam za pretragu "
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <i className="fas fa-search absolute top-1/2 transform -translate-y-1/2 text-sm left-3 text-[#191919]"></i>
              {searchTerm?.length >= 1 && searchTerm?.length < 3 ? (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 py-2">
                  <span className={`text-[0.8rem] font-normal text-red-500`}>
                    Unesite najmanje 3 karaktera.
                  </span>
                </div>
              ) : null}
            </form>
            <p
              className="text-xs"
              onClick={() => {
                setSearchOpen(false);
                setSearchTerm("");
              }}
            >
              Otkaži
            </p>
          </div>
          {searchData?.items?.length > 0 && searchTerm?.length > 0 && (
            <div className="w-[95%] mx-auto mt-5">
              <h1 className="text-[1rem] font-normal">Rezultati pretrage</h1>
              <div className="flex flex-col gap-5 mt-3">
                {searchData?.items?.slice(0, 6)?.map((item) => {
                  return (
                    <Link
                      href={`/${item?.link?.link_path}`}
                      onClick={(e) => {
                        setSearchData([]);
                        setSearchOpen(false);
                        handleSearch(e);
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex flex-row items-center gap-5">
                        <div className="w-[60px] h-[60px] relative">
                          <Image
                            src={item.image[0]}
                            alt={``}
                            fill
                            className={`object-cover rounded-full`}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <h1 className="text-[0.9rem] font-normal">
                            {item?.basic_data?.name}
                          </h1>
                          <h1 className="text-[0.9rem] w-fit bg-[#f8ce5d] px-2 font-bold text-center">
                            {currencyFormat(
                              item?.price?.price?.discount ??
                                item?.price?.price?.original
                            )}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {searchData?.items?.length > 6 && (
                  <Link
                    href={`/search?search=${searchTerm}`}
                    className={`text-[0.9rem] text-center text-white bg-[#191919] mt-4 py-3 w-[80%] mx-auto font-normal`}
                    onClick={(e) => {
                      setSearchData([]);
                      setSearchOpen(false);
                      handleSearch(e);
                      setSearchTerm("");
                    }}
                  >
                    {`Pogledaj sve rezultate ( još ${
                      searchData?.pagination?.total_items -
                      (searchData?.items?.length > 6
                        ? 6
                        : searchData?.items?.length)
                    } )`}
                  </Link>
                )}
              </div>
            </div>
          )}
          {isFetching && (
            <div className={`w-[95%] mx-auto text-center mt-5`}>
              <i className={`fas fa-spinner fa-spin text-xl text-black`}></i>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavigationMobile;
