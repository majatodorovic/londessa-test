"use client";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Tabs from "@/components/ProductDetails/Tabs";
import CrosssellProducts from "../CrosssellProducts/CrosssellProducts";
import UpsellProducts from "../UpsellProducts/UpsellProducts";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { Breadcrumbs } from "@/components/product/breadcrumbs";

const ProductDetails = ({ path }) => {
  const [color, setColor] = useState(null);
  return (
    <div className="max-md:mt-[1rem]  max-md:w-[95%]  max-md:mx-auto md:mx-[3rem] mt-6">
      <Breadcrumbs path={path} />
      <div className=" grid grid-cols-4  gap-x-[4.063rem] mt-10">
        <ProductGallery path={path} color={color} />
        <ProductInfo color={color} setColor={setColor} />
        {/*<div className={`mt-10 col-span-4`}>*/}
        {/*  <Tabs specification={specification} productsDesc={desc} />*/}
        {/*</div>*/}
      </div>
      {/*{relatedProducts?.length > 0 && (*/}
      {/*  <UpsellProducts*/}
      {/*    upsellProducts={relatedProducts}*/}
      {/*    text={`Možda će vas zanimati`}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{upsellProducts?.length > 0 && (*/}
      {/*  <UpsellProducts upsellProducts={upsellProducts} />*/}
      {/*)}*/}
      {/*{crosssellProducts?.length > 0 && (*/}
      {/*  <UpsellProducts*/}
      {/*    upsellProducts={crosssellProducts}*/}
      {/*    text={`Možda će Vam biti potrebno`}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default ProductDetails;
