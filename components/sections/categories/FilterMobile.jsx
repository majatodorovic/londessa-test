"use client";

import { sortKeys } from "@/helpers/const";
import { useEffect, useState } from "react";
import Filter from "./Filter";

const FiltersMobile = ({
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  tempSelectedFilters,
  setTempSelectedFilters,
  setSort,
  sort,
  changeFilters,
  setChangeFilters,
  setFilterOpen,
  setLastSelectedFilterKey,setPage
}) => {
  const [openIndex, setOpenIndex] = useState({
    key: null,
  });

  const [activeFilter, setActiveFilter] = useState(null);
  const handleClick = (filter) => {
    setActiveFilter(filter);
  };
  const [activeFilters, setActiveFilters] = useState([]);
  useEffect(() => {
    setActiveFilters(selectedFilters);
  }, [selectedFilters]);

  const [activeSort, setActiveSort] = useState({ label: "" });
  const [sortingActive, setSortingActive] = useState(false);
  return (
    <>
      <div className="h-full flex flex-col px-[0.7rem]">
        <div
          className={`sticky w-full top-0 border-b py-3 text-center flex items-center justify-center`}
        >
          <h1 className="text-[#171717] self-center mx-auto font-light text-center text-[1rem]">
            Filteri
          </h1>
          <i
            className={`fas fa-times  mr-3 text-[#171717] text-[1.44rem] cursor-pointer`}
            onClick={() => setFilterOpen(false)}
          ></i>
        </div>
        <div className="flex w-[95%] mx-auto flex-col border-b border-b-[#f5f5f5] py-[23px] overflow-hidden">
          <div
            className="flex flex-row justify-between cursor-pointer items-center"
            onClick={() => setSortingActive(!sortingActive)}
          >
            <h1 className="text-[1rem] font-light">Sortiranje</h1>
            <div className="flex items-center cursor-pointer">
              <p className="text-[1.2rem] font-light">
                {sortingActive ? "-" : "+"}
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={
                sortingActive
                  ? `mt-0 transition-all py-[20px] duration-[750ms] flex flex-row gap-[11px] flex-wrap`
                  : `flex transition-all py-[20px] duration-[750ms] flex-row gap-[11px] flex-wrap -mt-52`
              }
            >
              {sortKeys?.map((item, index) => {
                const isActive = activeSort?.label === item?.label;
                return (
                  <div
                    key={index}
                    className={
                      isActive && sort.field !== "" && sort.direction !== ""
                        ? `px-3 select-none border-2 border-[#191919] cursor-pointer py-[10px] font-medium rounded-lg bg-[#191919] text-white`
                        : `px-3 select-none cursor-pointer py-[10px] border-2 rounded-lg border-[#e8e8e8]`
                    }
                    onClick={() => {
                      setActiveSort({
                        label:
                          activeSort?.label === item?.label
                            ? null
                            : item?.label,
                      });
                      setSort({
                        field: item?.field,
                        direction: item?.direction,
                      });
                    }}
                  >
                    <p className="font-light text-[13px]">{item?.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {availableFilters?.map((filter, index) => {
          const isOpen = openIndex.key === filter.key;
          return (
            <div key={index}>
              <div
                className="flex w-[95%] mx-auto cursor-pointer py-[1.375rem] select-none border-b border-b-[#f5f5f5] items-center justify-between"
                onClick={() =>
                  setOpenIndex({
                    key: openIndex?.key === filter?.key ? null : filter?.key,
                  })
                }
                key={filter?.key}
              >
                <h1 className="text-[1rem] font-light">
                  {filter?.attribute?.name}
                </h1>
                <div>
                  <h1 className={`text-[#171717] text-[1.2rem] font-light `}>
                    {isOpen ? `-` : `+`}
                  </h1>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className={
                    isOpen
                      ? `mt-[15px] translate-y-0 block h-auto py-[1rem] transition-all duration-[750ms]`
                      : `-translate-y-full hidden py-[1rem] h-min transition-all duration-[750ms] `
                  }
                >
                  <Filter
                    filter={filter}
                    selectedFilters={selectedFilters}
                    setTempSelectedFilters={setTempSelectedFilters}
                    changeFilters={changeFilters}
                    setChangeFilters={setChangeFilters}
                    setSelectedFilters={setSelectedFilters}
                    setPage={setPage}
                    tempSelectedFilters={tempSelectedFilters}
                    setLastSelectedFilterKey={setLastSelectedFilterKey}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={`mt-auto sticky bottom-0 flex items-center justify-center divide-x`}
        >
          <button
            className={`flex-1`}
            onClick={() => {
              setTempSelectedFilters([]);
              setSelectedFilters([]);
              setFilterOpen(false);
            }}
          >
            <h1 className={`text-[1.2rem] font-light text-center py-3`}>
              Resetuj
            </h1>
          </button>
          <button
            className={`flex-1`}
            onClick={() => {
              setSelectedFilters(tempSelectedFilters);
              setFilterOpen(false);
            }}
          >
            <h1 className={`text-[1.2rem] font-light text-center py-3`}>
              Primeni
            </h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersMobile;
