"use client";
import { useProductBreadcrumbs } from "@/hooks/ecommerce.hooks";
import Link from "next/link";

export const Breadcrumbs = ({ path }) => {
  const { data: breadcrumbs } = useProductBreadcrumbs({ slug: path });
  return (
    <div className="flex items-center gap-2 flex-wrap max-lg:hidden">
      <Link href={`/`} className="text-[#191919] text-[0.95rem] font-normal">
        Početna
      </Link>{" "}
      <>/</>
      {breadcrumbs?.steps?.map((breadcrumb, index, arr) => {
        return (
          <div className="flex items-center gap-2">
            <Link
              href={
                index === arr.length - 1
                  ? `/${breadcrumb?.link?.link_path}`
                  : `/${breadcrumb?.link?.link_path}`
              }
              className="text-[#000] text-[0.95rem] font-normal "
            >
              {breadcrumb?.name}
            </Link>
            {index !== arr.length - 1 && <>/</>}
          </div>
        );
      })}
      <>/</>
      <h1 className="text-[#000] text-[0.95rem] font-normal">
        {breadcrumbs?.end?.name}
      </h1>
    </div>
  );
};
