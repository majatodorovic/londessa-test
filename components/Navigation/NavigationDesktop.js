"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCartContext } from "@/app/api/cartContext";
import { useState, useCallback, useEffect, useRef } from "react";
import { get, list } from "@/app/api/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoDark from "../../assets/Logo/Croonus-logo-dark.png";
import LogoLight from "../../assets/Logo/Croonus-logo-light.png";
import User from "../../assets/Icons/user.png";
import Wishlist from "../../assets/Icons/heart.png";
import Cart from "../../assets/Icons/shopping-bag.png";
import Search from "../../assets/Icons/search.png";
import { currencyFormat } from "@/helpers/functions";
import { Prices } from "@/_components/prices";

const NavigationDesktop = () => {
  const pathname = usePathname();
  const { push: navigate, asPath } = useRouter();

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cart, , wishList] = useCartContext();
  const [wishListCount, setWishListCount] = useState(0);
  let category = false;
  if (pathname === "/") {
    category = false;
  } else {
    category = true;
  }
  useEffect(() => {
    const getCategories = async () => {
      const data = await get("/categories/product/tree").then((response) =>
        setCategories(response?.payload)
      );
    };
    getCategories();
  }, []);

  const getCartCount = useCallback(() => {
    get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  const getWishlistCount = useCallback(() => {
    get("/wishlist/badge-count")
      .then((response) => {
        setWishListCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  useEffect(() => {
    getWishlistCount();
  }, [getWishlistCount, wishList, wishListCount]);

  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart, cartCount]);
  console.log(searchTerm);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm?.length >= 3) {
      router.push(`/search?search=${searchTerm}`);
      setSearchTerm("");
    } else {
      return;
    }
  };
  const [isActive, setIsActive] = useState(categories[0]?.id ?? null);
  const [activeCategory, setActiveCategory] = useState();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const category = categories.filter((category) => category?.id === isActive);
    setIsActive(category[0]?.id);
  }, [isActive]);

  useEffect(() => {
    const slider = document.getElementById("slider");
    const sliderHeight = slider?.offsetHeight;
    setHeight(sliderHeight);
  });
  const [open, setOpen] = useState(false);
  const [isActiveSubcategory, setIsActiveSubcategory] = useState({
    id: undefined,
    slug: undefined,
  });
  const [activeSubSubCategory, setActiveSubSubCategory] = useState();
  const [background, setBackground] = useState("transparent");

  useEffect(() => {
    if (category) {
      setBackground("white");
    }

    function handleScroll() {
      if (category) {
        setBackground("white");
      } else {
        if (window.scrollY > 0 && !category) {
          setBackground("white");
        } else {
          setBackground("transparent");
        }
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [category, background]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible((scrollY === 0 && pathname === "/") || (open && scrollY > 0));
      pathname?.includes("/kategorija" || "") &&
        setVisible(false) &&
        setOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, pathname]);

  useEffect(() => {
    setVisible(true);
  }, [open]);

  useEffect(() => {
    if (categories) {
      setIsActive(categories[0]?.id);
      setActiveCategory(categories[0]);
    }
  }, [categories]);
  const router = useRouter();
  useEffect(() => {
    if (pathname?.includes("/korpa/")) {
      getCartCount();
      router?.refresh();
    }
  }, [pathname]);

  useEffect(() => {
    const handleMouseOutsideOfBrowserViewport = (event) => {
      if (event.clientY <= 0) {
        setOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseOutsideOfBrowserViewport);
    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseOutsideOfBrowserViewport
      );
    };
  }, []);

  useEffect(() => {
    if (pathname?.includes("/kategorija" || "")) {
      setOpen(false);
      setVisible(false);
    }
  }, [pathname]);

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (searchTerm?.length > 0) {
      const getData = async (search) => {
        await list(`/products/search/list`, {
          search: search,
        }).then((response) => {
          setSearchData(response?.payload);
          setLoading(false);
        });
      };
      getData(searchTerm);
    }
  }, [searchTerm]);

  const searchRef = useRef(null);
  const searchImgRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !searchImgRef.current.contains(event.target)
      ) {
        setSearchTerm("");
        setSearchData([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const [landingPagesList, setLandingPagesList] = useState([]);

  useEffect(() => {
    const getLandingPages = async () => {
      const data = await list(`/landing-pages/list`).then((response) =>
        setLandingPagesList(response?.payload)
      );
    };
    getLandingPages();
  }, []);
  return (
    <>
      <div
        className={`max-lg:hidden sticky top-0 z-[54] flex items-center justify-between w-full bg-${
          category ? `white` : `${background}`
        } ${background === "white" ? `bg-opacity-70 backdrop-blur` : ``}`}
        id="navigation"
      >
        <div
          className={`absolute top-0 h-[4.719rem] ${
            background === "white" ? `bg-opacity-90 backdrop-blur` : `pt-8`
          } px-[3%] z-[54] flex items-center justify-between w-full bg-${
            category ? `white` : `${background}`
          }  transition-all duration-500`}
        >
          <div
            className="flex items-center gap-20 "
            // onMouseEnter={() => {
            //   if (background === "white") {
            //     setOpen(true);
            //   }
            // }}
          >
            <Link href="/">
              {open || background === "white" ? (
                <Image
                  onClick={() => {
                    setOpen(false);
                    setVisible(false);
                  }}
                  src={LogoDark}
                  width={110}
                  height={110}
                  alt=""
                />
              ) : (
                <Image
                  onClick={() => {
                    setOpen(false);
                    setVisible(false);
                  }}
                  src={LogoLight}
                  width={110}
                  height={110}
                  alt=""
                />
              )}
            </Link>
            <div
              className="flex flex-row items-center gap-5 "
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              {categories?.map((category, index) => {
                const isActiveCategory = isActive === category?.id;

                return (
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                    key={category?.id}
                    className={`uppercase ${
                      (isActiveCategory && !open && background === "transparent"
                        ? `text-white`
                        : isActiveCategory && !open && background === "white"
                        ? `text-black`
                        : !isActiveCategory &&
                          !open &&
                          background === "transparent" &&
                          `text-white`) ||
                      ((open &&
                        isActiveCategory &&
                        background === "transparent") ||
                      (open && isActiveCategory && background === "white")
                        ? `bg-black text-white`
                        : `text-black`) ||
                      (open && isActiveCategory && background === "white"
                        ? `bg-red-500 text-white`
                        : `bg-red-500 text-white`)
                    } px-5 py-1 text-[0.8rem] rounded cursor-pointer`}
                    onMouseEnter={() => {
                      setIsActive(category?.id);
                      setActiveCategory(category);
                      setActiveSubSubCategory();
                    }}
                  >
                    {category?.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-5 relative">
              <Image
                ref={searchImgRef}
                src={Search}
                width={20}
                height={20}
                alt=""
                onClick={handleSearch}
                className={
                  background === "white"
                    ? "cursor-pointer "
                    : "cursor-pointer invert"
                }
              />
              <form
                onSubmit={(e) => handleSearch(e)}
                className={`${
                  searchTerm?.length > 0 ? `w-[25rem]` : `w-60`
                } transition-all duration-500 relative`}
              >
                <input
                  type="text"
                  placeholder="PRETRAGA"
                  className={`bg-transparent border-l-0 w-full border-t-0 border-r-0 border-b ${
                    background === "white"
                      ? "border-b-black text-black"
                      : "border-b-white focus:border-b-white placeholder:text-white text-white"
                  }  focus:ring-0 placeholder:text-sm text-sm p-0 focus:border-b-black  focus:outline-none`}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setLoading(true);
                  }}
                  value={searchTerm}
                />
                <div
                  ref={searchRef}
                  className={`${
                    searchTerm?.length > 0
                      ? `absolute flex flex-col h-[420px] hidescrollbar overflow-y-auto bg-white top-[30px] right-0 w-full border rounded-b-lg`
                      : `hidden`
                  } `}
                >
                  {searchData?.items?.length > 0 && searchTerm?.length > 0 && (
                    <div className="w-[95%] mx-auto mt-5">
                      <h1 className="text-[1rem] font-normal">
                        Rezultati pretrage
                      </h1>
                      <div className="flex flex-col gap-5 mt-3 pb-5">
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
                                  <Prices
                                    price={item?.price}
                                    inventory={item?.inventory}
                                    type={"default"}
                                  />
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {loading && (
                    <div className={`w-[95%] mx-auto text-center mt-5`}>
                      <i
                        className={`fas fa-spinner fa-spin text-xl text-black`}
                      ></i>
                    </div>
                  )}
                  {!loading && (
                    <div
                      className={`sticky bottom-0 w-full bg-croonus-2 py-2 mt-auto text-center hover:bg-opacity-80`}
                    >
                      <button
                        onClick={() => {
                          handleSearch();
                          setSearchData([]);
                        }}
                        className={`text-white w-full h-full font-light text-center`}
                      >
                        Prikaži sve rezultate (
                        {searchData?.pagination?.total_items > 10
                          ? `još ${searchData?.pagination?.total_items - 10}`
                          : `Pretraži`}
                        )
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/nalog">
                <Image
                  src={User}
                  width={40}
                  height={40}
                  alt=""
                  className={
                    background === "white" ? "wiggle" : "invert wiggle"
                  }
                />
              </Link>
              <Link href="/lista-zelja">
                {" "}
                <div className="relative">
                  <Image
                    src={Wishlist}
                    width={30}
                    height={30}
                    alt=""
                    className={
                      background === "white" ? "wiggle" : "invert wiggle"
                    }
                  />
                  <span className="absolute -top-2.5 text-white -right-1 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
                    {wishListCount}
                  </span>
                </div>
              </Link>
              <a href="/korpa">
                <div className="relative">
                  <Image
                    src={Cart}
                    width={40}
                    height={40}
                    alt=""
                    className={
                      background === "white" ? "wiggle" : "invert wiggle"
                    }
                  />
                  <span className="absolute -top-1 text-white -right-1 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
                    {cartCount}
                  </span>
                </div>
              </a>
            </div>
            !
          </div>
        </div>
      </div>
      <div
        className={
          open
            ? `max-md:hidden fixed  left-0 top-0  lg:min-w-[480px] transition-all duration-500 4xl:min-w-[500px] h-full z-[54]  flex flex-col px-[3%] ${
                background === "white"
                  ? `py-4  transition-all duration-500`
                  : `pt-8 transition-all duration-500`
              } gap-[162px] bg-white transition-all duration-500`
            : `max-md:hidden -translate-x-[150%] transition-all duration-500 fixed ${
                background === "white"
                  ? `invisible transition-all duration-500`
                  : `transition-all duration-500`
              } duration-500 transition-all left-0 top-0  lg:min-w-[480px]  4xl:min-w-[500px] h-full z-[54]  flex flex-col px-[3%] ${
                background === "white"
                  ? `py-4 transition-all duration-500`
                  : `pt-8 transition-all duration-500`
              } gap-[162px] bg-transparent transition-all duration-500`
        }
        onMouseEnter={() => {
          if (background === "white" && category) {
            setOpen(true);
          } else {
            setOpen(true);
          }
        }}
        onMouseLeave={() => {
          for (let i = 0; i < 100; i++) {
            clearTimeout(i);
          }
          setOpen(false);
        }}
      >
        <div
          className={`bg-${background} flex items-center gap-20 sticky top-5 w-full `}
        >
          <Link href={`/`}>
            <Image
              onClick={() => {
                setOpen(false);
                setVisible(false);
              }}
              src={LogoDark}
              width={110}
              height={110}
              alt=""
            />
          </Link>
          <div className="flex flex-row gap-5">
            {categories?.map((item, index) => {
              return (
                <div
                  key={index}
                  onMouseEnter={() => {
                    setIsActive(item?.id);
                    setActiveCategory(item);
                    setActiveSubSubCategory();
                  }}
                >
                  <Link
                    href={`/${item?.link?.link_path}`}
                    className="uppercase px-5 py-1 text-[0.8rem] hover:bg-black hover:text-white px-5 rounded cursor-pointer hover:translate-x-5 hover:text-slate-500 transition-all duration-300 font-medium"
                  >
                    {item?.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={
            visible
              ? `sticky top-[100px] translate-x-0 transition-all duration-[700ms]`
              : `-translate-x-full duration-[900ms] transition-all`
          }
        >
          <div
            className={
              open
                ? `flex flex-row gap-10 text-black transition-all duration-500`
                : `text-white flex flex-row gap-10 transition-all duration-500`
            }
          >
            <div className="h-full flex flex-col gap-10 min-w-[230px]">
              <div className="flex flex-col gap-1 mix-blend-difference">
                <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                  href="/novo"
                  className="uppercase  hover:translate-x-5 hover:text-slate-500 transition-all duration-300 text-lg  font-medium"
                >
                  Novo
                </Link>
                {landingPagesList?.items?.map((item, index) => {
                  return (
                    <Link
                      onClick={() => {
                        setOpen(false);
                      }}
                      href={`/promo/${item?.slug}`}
                      className="uppercase text-red-500 hover:translate-x-5 hover:text-slate-500 transition-all duration-300 text-lg  font-medium"
                    >
                      {item?.name}
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-col gap-1 mix-blend-difference">
                {activeCategory?.children?.map((category) => {
                  const isActiveCategory =
                    isActiveSubcategory.id === category?.id;
                  return (
                    <div
                      key={category?.id}
                      className={
                        isActiveCategory
                          ? ` relative uppercase flex gap-4 items-center cursor-pointer text-lg hover:text-slate-500 hover:translate-x-5 transition-all duration-300 font-medium `
                          : `uppercase cursor-pointer text-lg hover:text-slate-500 hover:translate-x-5 transition-all duration-300 font-medium`
                      }
                    >
                      {category?.children?.length > 0 ? (
                        <h1
                          onClick={() => {
                            setIsActiveSubcategory({
                              id: category?.id,
                              slug: category?.slug,
                            });
                            setActiveSubSubCategory(category?.children);
                          }}
                        >
                          {category?.name}
                        </h1>
                      ) : (
                        <Link
                          href={`/${category?.link?.link_path}`}
                          onClick={() => {
                            setOpen(false);
                            setVisible(false);
                            setBackground("white");
                          }}
                        >
                          {category?.name}
                        </Link>
                      )}

                      <div
                        className={
                          isActiveCategory && open && activeSubSubCategory
                            ? `line relative`
                            : `hidden`
                        }
                      ></div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  href="/"
                  className="uppercase  hover:translate-x-5 hover:text-slate-500 transition-all duration-300 text-lg  font-medium"
                >
                  Outlet
                </Link>
              </div>
            </div>
            <div
              className={
                open
                  ? `opacity-100 h-[550px] overflow-y-auto overflow-x-hidden transition-all duration-500 flex flex-col gap-2 w-[150px]`
                  : `invisible opacity-0 duration-500 transition-all flex flex-col gap-2`
              }
            >
              {activeSubSubCategory?.map((category) => {
                return (
                  <div
                    className={`${
                      pathname?.includes(category?.slug)
                        ? `text-[#e10000]`
                        : `text-black`
                    } text-xs hover:text-slate-500 hover:translate-x-2 transition-all duration-300 font-medium`}
                  >
                    <Link
                      href={`/${category?.link?.link_path}`}
                      onClick={() => {
                        setOpen(false);
                        setVisible(false);
                        setBackground("white");
                      }}
                    >
                      {category?.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationDesktop;
