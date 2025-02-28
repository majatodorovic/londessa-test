"use client";

import {
  useProductDeclaration,
  useProductDescription,
  useProductSpecification,
} from "@/hooks/ecommerce.hooks";
import React, { Fragment, Suspense, useState } from "react";
import { Description } from "@/components/ProductDetails/InfoData/desc";

export const Specifications = ({ path, id }) => {
  const { data: specification } = useProductSpecification({ slug: id });
  const { data: desc } = useProductDescription({ slug: id });
  const { data: declaration } = useProductDeclaration({ slug: id });

  const [activeTab, setActiveTab] = useState(2);

  return (
    <div
      className={`flex mt-16 flex-col divide-y md:max-w-[80%] h-[310px] overflow-y-auto`}
    >
      {specification?.length > 0 &&
        specification?.map((item) => {
          return (
            <div key={item?.set?.id}>
              <div
                onClick={() =>
                  setActiveTab(
                    activeTab === item?.set?.id ? null : item?.set?.id
                  )
                }
                className={`pl-3 hover:bg-[#f8f8f8] ${
                  activeTab === item?.set?.id && "bg-[#f8f8f8]"
                } py-3 cursor-pointer flex items-center justify-between`}
              >
                <span className={`uppercase`}>{item?.set?.name}</span>
                <i
                  className={`fa fa-solid pr-2 transition-all duration-500 fa-chevron-${
                    activeTab === item?.set?.id ? "up" : "down"
                  }`}
                />
              </div>
              {activeTab === item?.set?.id && (
                <div
                  className={`py-4 pl-6 pr-3 max-h-[150px] overflow-y-auto customScroll`}
                >
                  <p className={`text-sm`}>
                    {item?.groups[0]?.attributes[0]?.values?.map((val) => (
                      <p className={`font-medium`} key={val?.id}>
                        - {val?.name}
                      </p>
                    ))}
                  </p>
                </div>
              )}
            </div>
          );
        })}

      <div>
        <div
          onClick={() =>
            setActiveTab(activeTab === "declaration" ? null : "declaration")
          }
          className={`pl-3 hover:bg-[#f8f8f8] ${
            activeTab === "declaration" && "bg-[#f8f8f8]"
          } py-3 cursor-pointer flex items-center justify-between`}
        >
          DEKLARACIJA{" "}
          <i
            className={`fa fa-solid pr-2 transition-all duration-500 fa-chevron-${
              activeTab === "declaration" ? "up" : "down"
            }`}
          />
        </div>
        {activeTab === "declaration" && (
          <div
            className={`py-4 pl-6 pr-3 max-h-[150px] overflow-y-auto customScroll`}
          >
            <p className={`text-sm`}>
              {declaration?.manufacture_name && (
                <>
                  {" "}
                  <span className={`font-bold`}>Proizvođač: </span>
                  {declaration?.manufacture_name}
                </>
              )}
            </p>
            <p className={`text-sm`}>
              {declaration?.country_name && (
                <>
                  {" "}
                  <span className={`font-bold`}>Zemlja porekla:</span>{" "}
                  {declaration?.country_name}
                </>
              )}
            </p>
            <p className={`text-sm`}>
              {declaration?.name && (
                <>
                  {" "}
                  <span className={`font-bold`}>Naziv:</span>{" "}
                  {declaration?.name}
                </>
              )}
            </p>
            <p className={`text-sm`}>
              {declaration?.year && (
                <>
                  <span className={`font-bold`}>Godina proizvodnje:</span>{" "}
                  {declaration?.year}
                </>
              )}
            </p>
            <p className={`text-sm`}>
              {declaration?.importer_name && (
                <>
                  <span className={`font-bold`}>Uvoznik:</span>{" "}
                  {declaration?.importer_name}
                </>
              )}
            </p>
          </div>
        )}
      </div>
      <div>
        <div
          onClick={() =>
            setActiveTab(activeTab === "description" ? null : "description")
          }
          className={`pl-3 hover:bg-[#f8f8f8] ${
            activeTab === "description" && "bg-[#f8f8f8]"
          } py-3 cursor-pointer flex items-center justify-between`}
        >
          OPIS{" "}
          <i
            className={`fa fa-solid pr-2 transition-all duration-500 fa-chevron-${
              activeTab === "description" ? "up" : "down"
            }`}
          />
        </div>
        {activeTab === "description" && (
          <div
            className={`py-4 pl-6 pr-3 max-h-[150px] overflow-y-auto customScroll`}
          >
            <p
              className={`text-sm`}
              dangerouslySetInnerHTML={{ __html: desc?.description }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
};
