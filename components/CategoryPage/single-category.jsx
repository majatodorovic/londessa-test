"use client";
import { useCategory } from "@/hooks/ecommerce.hooks";
import Link from "next/link";
import { generateBreadcrumbSchema } from "@/_functions/functions";

export const SingleCategory = ({ slug, path, base_url }) => {
  const { data: singleCategory } = useCategory({ slug });

  const schema = generateBreadcrumbSchema(
    singleCategory?.parents,
    singleCategory?.basic_data?.name,
    path,
    base_url
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="px-5 lg:px-[3rem]">
        {singleCategory?.parents?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-5">
            <Link
              href={`/`}
              className="text-[#191919] text-[0.95rem] font-normal"
            >
              Početna
            </Link>
            <>/</>
            {singleCategory?.parents?.map((breadcrumb, index, arr) => {
              return (
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${breadcrumb?.link?.link_path}`}
                    className="text-[#191919] text-[0.95rem] font-normal"
                  >
                    {breadcrumb?.name}
                  </Link>
                  {index !== arr.length - 1 && <>/</>}
                </div>
              );
            })}
            <>/</>
            <h1 className="text-[#191919] text-[0.95rem] font-semibold">
              {singleCategory?.basic_data?.name}
            </h1>
          </div>
        )}
      </div>
      <div className="mt-[30px] md:mt-[80px] flex flex-col items-center justify-center">
        <div className="flex flex-row  items-center justify-center">
          <h1 className="text-[23px] md:text-[29px] font-normal uppercase">
            {singleCategory?.basic_data?.name ?? text ?? ""}
          </h1>
          <span className="text-[23px] md:text-[29px] font-normal uppercase">
            &nbsp;Kolekcija
          </span>
        </div>
        <p
          className="text-center max-md:text-[0.85rem] max-md:mt-[20px] md:text-[16.48px] max-w-[36.075rem] font-normal sm:mt-[35px]"
          dangerouslySetInnerHTML={{
            __html: singleCategory?.basic_data?.short_description,
          }}
        ></p>
      </div>
    </>
  );
};
