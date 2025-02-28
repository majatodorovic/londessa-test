import { currencyFormat } from "@/helpers/functions";
import React, { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "@/app/api/api";
import Variants from "@/components/Variants/Variants";
import { notFound } from "next/navigation";
import { Prices } from "@/_components/prices";

export const BasicData = ({
  path,
  productVariant,
  setProductVariant,
  setProduct,
  id,
}) => {
  const { data: product } = useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return await get(`/product-details/basic-data/${id}`).then((res) => {
        setProduct(res?.payload);
        return res?.payload;
      });
    },
    refetchOnWindowFocus: false,
  });

  const [setVariant, setVariantOnOff] = useState(true);

  const renderIsInStock = () => {
    switch (product?.product_type) {
      case "single":
        switch (product?.data?.item?.inventory?.inventory_defined) {
          case false:
            return (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-[10px] h-[10px] bg-[#e10000] rounded-full"></div>
                <span className="text-[#e10000] text-[0.75rem] font-bold">
                  Nema na lageru
                </span>
              </div>
            );
          default:
            break;
        }
        break;
      case "variant":
        switch (true) {
          case productVariant?.id:
            switch (productVariant?.inventory?.inventory_defined) {
              case false:
                return (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-[10px] h-[10px] bg-[#e10000] rounded-full"></div>
                    <span className="text-[#e10000] text-[0.75rem] font-bold">
                      Nema na lageru
                    </span>
                  </div>
                );
              default:
                break;
            }
            break;
        }
        break;
    }
  };

  const [newURL, setNewURL] = useState(null);

  useEffect(() => {
    if (newURL) {
      window.history.replaceState(null, null, newURL);
    }
  }, [newURL]);

  const updateProductVariant = (newProduct) => {
    setProductVariant(newProduct);
  };
  const handleURLChange = (newURL) => {
    setNewURL(newURL);
  };

  useEffect(() => {
    setProduct(product);
  }, [product]);

  const renderDiscount = (product) => {
    switch (true) {
      case product?.product_type === "single":
        if (product?.data?.item?.price?.discount?.active) {
          return (
            <span className="text-[#636363] text-[1rem]">
              -
              {(
                ((product?.data?.item?.price?.price?.original -
                  product?.data?.item?.price?.price?.discount) /
                  product?.data?.item?.price?.price?.original) *
                100
              ).toFixed(0)}
              %
            </span>
          );
        }
        break;
      case product?.product_type === "variant":
        if (Boolean(productVariant?.id)) {
          if (productVariant?.price?.discount?.active) {
            return (
              <span className="text-[#636363] text-[1rem]">
                -
                {(
                  ((productVariant?.price?.price?.original -
                    productVariant?.price?.price?.discount) /
                    productVariant?.price?.price?.original) *
                  100
                ).toFixed(0)}
                %
              </span>
            );
          }
        } else {
          if (product?.data?.item?.price?.discount?.active) {
            return (
              <span className="text-[#636363] text-[1rem]">
                -{" "}
                {(
                  ((product?.data?.item?.price?.price?.original -
                    product?.data?.item?.price?.price?.discount) /
                    product?.data?.item?.price?.price?.original) *
                  100
                ).toFixed(0)}
                %
              </span>
            );
          }
        }
      default:
        break;
    }
  };

  return product ? (
    <>
      <h1 className="text-[1.563rem] max-md:text-[1.1rem] font-bold">
        {product?.data?.item?.basic_data?.name}
      </h1>
      {renderIsInStock()}
      <h2 className="mt-[1.063rem] text-[#636363] text-[0.688rem]">
        Šifra:&nbsp;
        {productVariant?.id
          ? productVariant?.basic_data?.sku
          : product?.data?.item?.basic_data?.sku}
      </h2>
      <div
        className={`mt-[2.125rem] text-[1.313rem] flex items-center gap-3 font-bold`}
      >
        <Prices
          price={
            productVariant?.id
              ? productVariant?.price
              : product?.data?.item?.price
          }
          inventory={
            productVariant?.id
              ? productVariant?.inventory
              : product?.data?.item?.inventory
          }
          type={"details"}
        />
        {renderDiscount(product)}
        {product?.data?.item?.price?.discount?.active && (
          <span className="text-[#636363] text-[1rem] line-through">
            {currencyFormat(product?.data?.item?.price?.price?.original)}
          </span>
        )}
      </div>
      <p className={`text-sm max-w-full lg:max-w-[90%] mt-5`}>
        {product?.data?.item?.basic_data?.short_description}
      </p>
      {product?.product_type === "variant" && (
        <div className="py-[2rem] max-md:py-[1.5rem]">
          <Variants
            firstVariantOption={!productVariant}
            handleURLChange={handleURLChange}
            updateProductVariant={updateProductVariant}
            setVariantOnOff={setVariantOnOff}
            setVariant={setVariant}
            product={product}
            productVariant={productVariant}
            slug={path}
            productSlug={path}
          />
        </div>
      )}
    </>
  ) : (
    notFound()
  );
};
