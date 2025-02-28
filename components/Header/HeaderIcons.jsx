"use client";
import { useCartContext } from "@/app/api/cartContext";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { get } from "@/app/api/api";
import { useCartBadge, useWishlistBadge } from "@/hooks/ecommerce.hooks";
import { icons } from "@/_lib/icons";

const HeaderIcons = () => {
  const { data: cartCount } = useCartBadge();
  const { data: wishListCount } = useWishlistBadge();

  return (
    <div className="flex items-center gap-3.5">
      <Link href="/nalog">{icons.user}</Link>
      <Link href="/lista-zelja">
        <div className="relative">
          {icons.heart}

          <span className="absolute -top-3 text-white -right-3 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
            {wishListCount}
          </span>
        </div>
      </Link>
      <a href="/korpa" className={`pl-0.5`}>
        <div className="relative">
          {icons.cart}
          <span className="absolute -top-3 text-white -right-3 bg-[#e10000] rounded-full w-5 h-5 flex items-center justify-center  text-xs">
            {cartCount}
          </span>
        </div>
      </a>
    </div>
  );
};

export default HeaderIcons;
