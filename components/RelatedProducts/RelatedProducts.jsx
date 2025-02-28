"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalAddToWishList, useGlobalAddToCart } from "@/app/api/globals";
import Image from "next/image";
import Link from "next/link";
import classes from "./RelatedProducts.module.css";

import ProductPrice from "@/components/ProductPrice/ProductPrice";

const RelatedProducts = ({ relatedProducts = [], loading }) => {
  const globalAddToWishlist = useGlobalAddToWishList();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const globalAddToCart = useGlobalAddToCart();
  const [productAmount, setProductAmount] = useState(1);
  const globalAddToWishList = useGlobalAddToWishList();
  const router = useRouter();

  const handleCart = (id) => {
    setLoadingCart(id);
  };

  return (
    <>
      <div className="relative col-span-2 md:col-span-1 flex flex-col justify-center gap-5 mt-[6rem] lg:col-span-1">
        <h1 className={`${classes.border} text-2xl font-bold text-black`}>
          Možda će vas zanimati{" "}
        </h1>
      </div>
      <div className="grid grid-cols-5 mt-[1.625rem] mb-[2rem] gap-5">
        {relatedProducts?.slice(0, 5).map((item, index) => {
          return (
            <div key={item?.id} className="col-span-1  flex-col ">
              <div className="border border-[#e6e6e6] rounded-lg overflow-hidden hoverborder">
                <div
                  className={`${classes.item} relative flex items-center justify-center`}
                >
                  <div className="h-[350px] relative">
                    <>
                      {item?.stickers[0]?.name ? (
                        <div className="py-[0.2rem] px-[0.4rem] bg-croonus-3 w-fit text-white text-[0.8rem] rounded-lg absolute top-[2rem] left-[1.8rem]">
                          <span>{item?.stickers[0]?.name}</span>
                        </div>
                      ) : null}

                      <Link href={`/${item?.link?.link_path}`} key={item?.id}>
                        <div className="h-[300px] w-[300px] relative overflow-hidden">
                          {item?.image[0]?.toString() && (
                            <Image
                              src={item?.image[0]?.toString()}
                              fill={true}
                              style={{ objectFit: "contain" }}
                              className={`object-cover`}
                              loading="lazy"
                              alt={item?.basic_data?.name}
                            />
                          )}
                        </div>
                      </Link>
                    </>
                  </div>
                </div>
                <div className="mt-1 flex flex-col gap-1 max-lg:justify-center max-lg:items-start">
                  <Link
                    href={`/${item?.link?.link_path}`}
                    key={item?.id}
                    className="ml-[0.6rem]"
                  >
                    <span className="font-semibold text-base hover:text-[#a3a3a3] rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem]">
                      {item?.basic_data?.name}
                    </span>
                    <div className="min-h-[2.8rem] flex items-center">
                      <span className="text-[0.9rem] flex text-[#939393] row2">
                        {item?.basic_data?.short_description}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default RelatedProducts;
