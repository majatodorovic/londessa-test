"use client";

import { list } from "@/app/api/api";
import { Suspense, useEffect, useState } from "react";
import { useCartContext } from "@/app/api/cartContext";
import WishlistItems from "../WishlistItems/WishlistItems";
import Link from "next/link";
import { useWishlist } from "@/hooks/ecommerce.hooks";
import { Thumb } from "@/components/Thumb/Thumb";
import { ToastContainer } from "react-toastify";

const WishlistPage = () => {
  const { data: wishlistData, isFetching, refetch } = useWishlist();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isFetching) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isFetching]);

  return (
    <>
      {loading ? (
        <div
          className={`mt-5 max-md:w-[95%] mx-auto md:px-[3rem] grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4`}
        >
          {Array.from({ length: 4 }, (_, i) => {
            return (
              <div
                key={i}
                className={`aspect-2/3 animate-pulse bg-slate-300 w-full h-full`}
              />
            );
          })}
        </div>
      ) : wishlistData?.length > 0 ? (
        <div
          className={`mt-5 max-md:w-[95%] mx-auto md:px-[3rem] grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4`}
        >
          {wishlistData?.map(({ id_product: id }) => {
            return (
              <Suspense
                fallback={
                  <div
                    key={id}
                    className={`aspect-2/3 animate-pulse bg-slate-300 w-full h-full`}
                  />
                }
              >
                <Thumb slug={id} key={id} refreshWishlist={refetch} />
              </Suspense>
            );
          })}
        </div>
      ) : (
        <div className="mt-[1.2rem] max-sm:w-[95%] mx-auto lg:mt-[15rem] flex flex-col items-center justify-center py-5 text-center">
          <div className="rounded-lg border p-10">
            <h1 className="text-lg font-medium">Vaša lista želja je prazna!</h1>{" "}
            <p>Kada dodate artikle u listu želja, oni će se pojaviti ovde.</p>
            <Link href="/">
              <button className="bg-[#CA965C] mt-10 px-10 font-medium text-white hover:bg-opacity-80 py-4">
                Vrati se na početnu stranu
              </button>
            </Link>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default WishlistPage;
