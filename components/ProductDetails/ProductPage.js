import React, { Suspense } from "react";
import { ProductGallery } from "@/components/ProductDetails/ProductGallery";
import { ProductInfo } from "@/components/ProductDetails/ProductInfo";
import { Breadcrumbs } from "@/components/ProductDetails/InfoData/breadcrumbs";
import UpsellProducts from "@/components/UpsellProducts/UpsellProducts";

export const ProductPage = ({ path, categoryId, canonical, id }) => {
  return (
    <>
      <div className="max-md:mt-[1rem]  max-md:w-[95%]  max-md:mx-auto md:mx-[3rem] mt-6 max-lg:hidden">
        <Suspense
          fallback={<div className={`h-2 bg-slate-300 animate-pulse w-full`} />}
        >
          <Breadcrumbs path={path} categoryId={categoryId} id={id} />
        </Suspense>
      </div>
      <div className="max-md:mt-[1.01rem] mt-[2rem] max-md:w-[95%]  max-md:mx-auto mx-[3rem] gap-x-[3.063rem] grid grid-cols-4">
        <Suspense
          fallback={
            <div
              className={`h-[50rem] bg-slate-200 animate-pulse col-span-2 max-lg:col-span-4`}
            />
          }
        >
          <ProductGallery slug={path} id={id} />
        </Suspense>
        <ProductInfo path={path} canonical={canonical} id={id} />
      </div>
      <Suspense
        fallback={
          <div className={`grid grid-cols-4 gap-5 mt-10`}>
            {Array.from({ length: 4 }).map((item, i) => {
              return (
                <div
                  key={i}
                  className={`w-full min-w-0 h-full aspect-2/3 bg-slate-300 animate-pulse`}
                ></div>
              );
            })}
          </div>
        }
      >
        <Suspense
          fallback={<div className={`h-2 bg-slate-300 animate-pulse w-full`} />}
        >
          <UpsellProducts
            api={`/product-details/up-sell`}
            path={path}
            id={id}
          />
          <UpsellProducts
            text={`Možda će vas zanimati`}
            api={`/product-details/recommended`}
            path={path}
            id={id}
          />
          <UpsellProducts
            text={`Možda će Vam biti potrebno`}
            api={`/product-details/cross-sell`}
            path={path}
            id={id}
          />
        </Suspense>
      </Suspense>
    </>
  );
};
