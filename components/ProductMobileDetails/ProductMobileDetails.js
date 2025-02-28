"use client";
import ProductMobileGallery from "./ProductMobileGallery";
import React, { useEffect, useState } from "react";
import ProductMobileInfo from "./ProductMobileInfo";
import Tabs from "@/components/ProductDetails/Tabs";

const ProductMobileDetails = ({
  product,
  productGallery,
  desc,
  path,
  breadcrumbs,
  specification,
  declaration,
}) => {
  const [rawGallery, setRawGallery] = useState(productGallery?.gallery);
  const [loading, setLoading] = useState(false);
  const filteredImages = productGallery?.gallery?.filter((image) => {
    return !image?.variant_key;
  });
  const [gallery, setGallery] = useState(filteredImages);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (color !== null) {
      setLoading(true);
      setGallery(filteredImages);
      const newImage = rawGallery?.find((item) => {
        return item?.variant_key?.includes(color);
      });
      setGallery((prev) => [newImage, ...prev]);
    }
  }, [color]);

  return (
    <div className="max-md:mt-[1rem] mt-[9rem] max-md:w-[95%]  max-md:mx-auto mx-[5rem] gap-x-[4.063rem] grid grid-cols-4">
      <ProductMobileGallery
        productGallery={gallery}
        color={color}
        loading={loading}
        setLoading={setLoading}
        product={product}
      />
      <ProductMobileInfo
        product={product}
        desc={desc}
        stickers={productGallery?.stickers}
        path={path}
        setColor={setColor}
        breadcrumbs={breadcrumbs}
        specification={specification}
        declaration={declaration}
      />
      {/*<div className={`col-span-4`}>*/}
      {/*  <Tabs productsDesc={desc} specification={specification} />*/}
      {/*</div>{" "}*/}
    </div>
  );
};

export default ProductMobileDetails;
