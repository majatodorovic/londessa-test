"use client"
import { useState } from "react";
import { useGlobalAddToWishList } from "@/app/api/globals";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import classes from "../RelatedProducts/RelatedProducts.module.css";
import Thumb from "../Thumb/Thumb";

const CrossselProducts = ({ crosssellProducts = [], loading }) => {
  const globalAddToWishlist = useGlobalAddToWishList();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
    return (
      <>
      <div
      className="max-sm:w-[95%] max-sm:mx-auto md:mx-[3rem] max-sm:mt-[3rem]  overflow-visible"
    >
      <div className="flex justify-between w-full items-center">
        <h5 className="text-[1.5rem] font-bold max-md:text-[1.1rem] ">
         Možda će Vam biti potrebno
        </h5>
      </div>
      <div className="max-sm:mt-[1rem] mt-[2.5rem]">
        <Thumb slider={true} data={crosssellProducts} />
      </div>
    </div>
       </>
      )}

export default CrossselProducts;
