"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const StaticPage = ({ data }) => {
  const staticData = data?.content?.map((item) => {
    return item;
  });

  const keyGenerator = (prefix) => {
    return `${prefix}-${Math.random().toString(36)}`;
  };

  if (data?.basic_data?.id) {
    return (
      <>
        <div
          className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}
        >
          <div className={`flex items-center gap-2`}>
            <Link className={`text-[0.95rem]`} href={`/`}>
              Početna
            </Link>
            <span className={`text-[0.95rem]`}>/</span>
            <span className={`text-[0.95rem]`}>{data?.basic_data?.name}</span>
          </div>
          <h1
            className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
          >
            {data?.basic_data?.name}
          </h1>
        </div>
        <div className={`max-w-full mt-10`}>
          {staticData?.map((item) => {
            switch (item?.type) {
              case "multiple_images":
                return (
                  <div
                    key={keyGenerator("multiple_images")}
                    className={`w-[95%] mx-auto lg:w-full lg:px-[3rem] !max-w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4`}
                  >
                    {item?.content?.map((image) => {
                      return (
                        <div
                          key={keyGenerator("image")}
                          className={`flex justify-center col-span-1 relative `}
                        >
                          <div
                            className={`max-sm:h-[280px] sm:h-[300px] lg:h-[450px] 2xl:h-[500px]`}
                          >
                            <Image src={image?.file} alt={``} fill priority />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );

                break;

              case "html_editor":
                return (
                  <div
                    key={keyGenerator("html")}
                    className={`w-[95%] mx-auto lg:w-full lg:px-[3rem] prose !max-w-full`}
                    dangerouslySetInnerHTML={{ __html: item?.content }}
                  ></div>
                );

                break;

              case "textarea":
                return (
                  <div
                    key={keyGenerator("textarea")}
                    className={`w-[95%] mx-auto lg:w-full lg:px-[3rem] prose !max-w-full`}
                    dangerouslySetInnerHTML={{ __html: item?.content }}
                  ></div>
                );

                break;
            }
          })}
        </div>
      </>
    );
  }

  if (!data?.basic_data?.id) {
    return notFound();
  }
};

export default StaticPage;
