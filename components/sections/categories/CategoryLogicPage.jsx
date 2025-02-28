"use client";
import { useState, useEffect, Suspense, useRef } from "react";
import Image from "next/image";

import { list, post } from "@/app/api/api";

import Thumb from "@/components/product/Thumb";
import Filters from "./Filters";

const CategoryLogicPage = ({ singleCategory }) => {
  const [productData, setProductData] = useState({
    products: [],
    pagination: {},
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [sort, setSort] = useState({ field: "", direction: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(
    productData?.pagination?.items_per_page ?? 8
  );
  const [availableFilters, setAvailableFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBeingFiltered, setIsBeingFiltered] = useState(false);
  useEffect(() => {
    const fetchData = async (limit, sort, page, filters) => {
      // if (page < 2) {
      //   setLoading(true);
      // }
      const res = await list(`/products/category/list/${singleCategory?.id}`, {
        limit: limit,
        sort: sort,
        page: page,
        filters: selectedFilters,
      });
      const newProducts = res?.payload?.items;
      const newPagination = res?.payload?.pagination;
      if (isBeingFiltered) {
        setProductData({
          products: newProducts,
          pagination: newPagination,
        });
        setIsBeingFiltered(false);
      } else {
        setProductData((prevData) => {
          const uniqueProductIds = new Set(
            prevData?.products?.map(
              (product) => product?.basic_data?.id_product
            )
          );
          const filteredNewProducts = newProducts?.filter(
            (product) => !uniqueProductIds?.has(product?.basic_data?.id_product)
          );
          return {
            products: [...prevData?.products, ...(filteredNewProducts ?? [])],
            pagination: newPagination,
          };
        });
        setIsBeingFiltered(false);
      }

      setLoading(false);
    };

    fetchData(
      limit,
      sort,
      selectedFilters?.length > 0 ? 1 : page,
      selectedFilters
    );
  }, [
    limit,
    sort,
    page,
    productData?.pagination?.selected_page,
    selectedFilters,
  ]);

  useEffect(() => {
    if (changeFilters) {
      post(`/products/category/filters/${singleCategory?.id}`, {
        filters: tempSelectedFilters,
      }).then((response) => {
        setAvailableFilters(response?.payload);
      });
    }
    setChangeFilters(false);
  }, [changeFilters]);

  // useEffect(() => {
  //   const updateProductsCountBasedOnTempSelectedFilters = async (
  //     tempSelectedFilters
  //   ) => {
  //     const res = await list(`/products/category/list/${singleCategory?.id}`, {
  //       filters: tempSelectedFilters,
  //       limit,
  //       page,
  //       sort,
  //     });
  //
  //     setProductData((prevData) => ({
  //       products:
  //         prevData.products.length === 0 || tempSelectedFilters.length === 0
  //           ? res?.payload?.items
  //           : prevData.products,
  //       pagination: res?.payload?.pagination,
  //     }));
  //
  //     setLoading(false);
  //   };
  //
  //   updateProductsCountBasedOnTempSelectedFilters(tempSelectedFilters);
  // }, [tempSelectedFilters]);

  //infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const bufferPercentage = 1;
      const buffer = Math.floor(window.innerHeight * bufferPercentage);

      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - buffer &&
        productData.pagination.total_pages >
          productData.pagination?.selected_page
      ) {
        setPage(page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, productData, page]);

  return (
    <>
      <div className="">
        <div className="px-[3%] max-md:z-[51] bg-white max-md:mt-[2rem] mt-[9rem] flex items-center justify-between max-md:sticky max-md:top-[56px] max-md:py-2">
          <h1 className="font-bold text-[1.313rem] max-md:text-[1rem] text-[#191919]">
            {singleCategory?.basic_data?.name}
          </h1>
          <div
            className="border-2  max-md:border-none max-[365px]:w-[150px] max-md:h-[40px] max-md:w-[132px] w-[243px] h-[50px] border-[#171717] flex items-center md:gap-[30px] pl-[14px] cursor-pointer"
            onClick={() => setOpenFilter(true)}
          >
            <Image
              src={"/heart.png"}
              alt="Filter"
              width={20}
              height={20}
              className={`max-md:ml-auto`}
            />
            <h1 className="uppercase max-md:hidden max-md:pl-4 font-bold text-[13.74px] text-[#191919]">
              Filteri
            </h1>
          </div>
        </div>
        <div
          className={`${
            tempSelectedFilters?.length > 0
              ? `mx-[3%] mt-[4.125rem] flex flex-wrap items-center gap-[0.25rem]`
              : `hidden`
          }`}
        >
          {tempSelectedFilters?.map((filter) => {
            const splitFilter = filter?.column?.split("|");
            const filterName = splitFilter[1];
            return (
              <div
                className={`font-normal bg-croonus-2  text-white text-[0.65rem] relative max-md:text-[0.7rem]  rounded-lg flex items-center gap-2`}
              >
                <div className={`flex items-center gap-2  px-1`}>
                  <h1>
                    {filterName?.charAt(0).toUpperCase() + filterName?.slice(1)}
                    :
                  </h1>
                  <span>
                    {filter?.value?.selected?.map((item, index, arr) => {
                      const isLastItem = index === arr.length - 1;
                      return `${filterName === "cena" ? item + "RSD" : item}${
                        isLastItem ? "" : ","
                      }`;
                    })}
                  </span>
                </div>
                <div
                  onClick={() => {
                    const newSelectedFilters = tempSelectedFilters.filter(
                      (item) => item.column !== filter.column
                    );
                    setTempSelectedFilters(newSelectedFilters);
                    setSelectedFilters(newSelectedFilters);
                    setChangeFilters(true);
                    if (tempSelectedFilters.length === 1) {
                      window.history.replaceState(
                        null,
                        "",
                        singleCategory
                          ? `/${singleCategory.link?.link_path}`
                          : `/sekcija/${slug}`
                      );
                    }
                  }}
                  className={`bg-croonus-2 cursor-pointer  self-stretch h-full flex-1 right-0  rounded-r-lg flex items-center flex-col justify-center`}
                >
                  <i
                    className={`fa fa-solid  fa-trash text-[0.65rem] text-white cursor-pointer py-[0.35rem] px-1 hover:text-red-500`}
                    onClick={() => {
                      const newSelectedFilters = tempSelectedFilters.filter(
                        (item) => item.column !== filter.column
                      );
                      setTempSelectedFilters(newSelectedFilters);
                      setSelectedFilters(newSelectedFilters);
                      setChangeFilters(true);
                      setIsBeingFiltered(true);
                      if (tempSelectedFilters.length === 1) {
                        window.history.replaceState(
                          null,
                          "",
                          singleCategory
                            ? `/${singleCategory.link?.link_path}`
                            : `/sekcija/${slug}`
                        );
                      }
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mx-[0.625rem] mt-[4.125rem]">
          <div className="grid max-md:grid-cols-2 gap-y-[40px] md:grid-cols-3 2xl:grid-cols-4 gap-[11px]">
            {loading ? (
              <>
                {Array.from({ length: 12 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="max-md:h-[250px] h-[500px] w-full col-span-1 bg-slate-300 object-cover animate-pulse"
                    />
                  );
                })}
              </>
            ) : productData?.products?.length > 0 ? (
              <Thumb
                data={productData?.products ?? productsFromSection}
                slider={false}
                loading={loading}
              />
            ) : (
              <div
                className={`col-span-2 md:col-span-2 lg:col-span-3 2xl:col-span-4 flex items-center justify-center text-center`}
              >
                <h1 className={`text-center text-[1rem] font-normal`}>
                  Nijedan proizvod ne odgovara zadatim kriterijumima, ili
                  izabrana kategorija trenutno ne sadrži nijedan proizvod.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          openFilter
            ? `fixed overflow-y-auto flex flex-col justify-between z-[6000] top-0 right-0 bg-white shadow-lg translate-x-0 transition-all duration-500 h-screen max-md:w-screen w-[26.125rem]`
            : `
      fixed flex flex-col justify-between z-[6000] top-0 right-0 bg-white shadow-lg translate-x-full transition-all duration-500 h-screen w-[26.125rem]`
        }
      >
        <div>
          <div className="border-l-0 border-t-0 border-r-0 border-b border-b-[#ededed] py-[1.563rem]">
            <div className="mx-[1.25rem] flex text-center items-center justify-end">
              <h1 className="text-[#191919] self-center mx-auto text-[0.938rem] font-bold">
                Filtriraj
              </h1>
              <div className="self-end">
                <i
                  className="fas fa-times ml-auto text-[#a3a3a3] cursor-pointer text-xl"
                  onClick={() => setOpenFilter(false)}
                ></i>
              </div>
            </div>
          </div>
          <div className="mx-[1.25rem] mt-[1.245rem] max-h-full h-full">
            <Filters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              availableFilters={availableFilters}
              changeFilters={changeFilters}
              setTempSelectedFilters={setTempSelectedFilters}
              tempSelectedFilters={tempSelectedFilters}
              setChangeFilters={setChangeFilters}
              setSort={setSort}
              sort={sort}
              setIsBeingFiltered={setIsBeingFiltered}
            />
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-t-[#ededed]">
          <div className="mx-[1.25rem] py-[2.813rem] flex gap-[20px] items-center">
            <button
              className="w-[7.625rem] h-[3.188rem] hover:text-white hover:bg-[#191919] transition-colors duration-500 text-sm font-bold border border-[#191919] text-[#191919] uppercase flex items-center justify-center text-center"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilters([]);
                setTempSelectedFilters([]);
                setChangeFilters(true);
                setSort({ field: "", direction: "" });
                setOpenFilter(false);
                setPage(1);
              }}
            >
              Obriši
            </button>
            <button
              className="w-[237px] h-[3.188rem] text-sm font-bold border bg-[#191919] hover:bg-opacity-80 text-white uppercase flex items-center justify-center text-center"
              onClick={(e) => {
                e.preventDefault();
                setSelectedFilters(tempSelectedFilters);
                setChangeFilters(true);
                setOpenFilter(false);
                setIsBeingFiltered(true);
              }}
            >
              Prikaži rezultate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryLogicPage;
