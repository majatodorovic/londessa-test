import Link from "next/link";
import React from "react";
import SliderHeader from "./SliderHeader";

function HeaderTop() {
  return (
    <div className="bg-topHeader h-8 w-full flex items-center justify-between px-[3rem]">
      <div>
        <Link
          href="https://www.facebook.com/flert.parfemi.srbija?ref=hl"
          className="text-sm font-normal text-black activeCategoryHover w-fit relative"
          target="_blank"
        >
          Facebook
        </Link>
        <span className="mx-2">-</span>
        <Link
          href="https://www.instagram.com/londessa.rs/"
          className="text-sm font-normal text-black activeCategoryHover w-fit relative"
          target="_blank"
        >
          Instagram
        </Link>
      </div>
      <SliderHeader />
      <div>
        <span className="text-sm font-normal text-black">Call Centar: </span>
        <Link
          href={`tel:${process.env.TELEPHONE}`}
          className="text-sm font-normal text-black activeCategoryHover w-fit relative"
        >
          {process.env.TELEPHONE}
        </Link>
      </div>
    </div>
  );
}

export default HeaderTop;
