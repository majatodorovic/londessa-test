import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecommendedCategories = async ({ categories }) => {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-2 max-md:w-[95%] mx-auto md:px-[3rem] mt-10 md:mt-28 gap-5">
      {categories?.slice(0, 2)?.map((category) => (
        <Link
          className="w-full h-[250px] lg:h-[500px] relative"
          key={category.id}
          href={
            category?.url ? `/promo/${category?.url}` : "/stranica-u-izradi"
          }
        >
          <Image
            src={category?.image}
            fill
            alt="banner"
            className="object-cover"
          />
        </Link>
      ))}
    </div>
  );
};

export default RecommendedCategories;
