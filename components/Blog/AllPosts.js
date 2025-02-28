"use client";

import Image from "next/image";
import Link from "next/link";

const AllPosts = ({ posts }) => {
  return (
    <div className={`w-[95%] mt-[3rem] mx-auto lg:w-full lg:px-[3rem]`}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-x-5 gap-y-5`}
      >
        {posts?.map((post, index) => {
          const wordCount = post?.basic_data?.description?.split(" ").length;
          return (
            <div
              key={post?.id}
              className={`col-span-1
               bg-white rounded-md drop-shadow-md`}
            >
              <div className={`flex flex-col gap-3`}>
                <div
                  className={`relative h-[250px] md:h-[350px] w-full overflow-hidden rounded-t-md`}
                >
                  <Link href={`/blog/${post?.slug}`}>
                    <Image
                      src={post?.images?.thumb_image}
                      alt={post?.basic_data?.title}
                      width={0}
                      height={0}
                      sizes={`100vw`}
                      priority
                      className={`object-cover rounded-t-md w-full h-full hover:scale-105 transition-all duration-500`}
                    />
                  </Link>
                  {index === 0 && (
                    <div
                      className={`absolute top-2 right-2 rounded-lg shadow-md`}
                    >
                      <div className={`bg-[#CA965C] px-2.5 py-1 rounded-lg`}>
                        <p className={`text-white text-sm font-medium`}>Novo</p>
                      </div>
                    </div>
                  )}
                  <div className={`absolute top-2 left-2 rounded-lg`}>
                    <div
                      className={`bg-black px-2.5 py-1 rounded-lg bg-opacity-[0.55]`}
                    >
                      <p className={`text-white text-sm font-medium`}>
                        {/*calculate read time*/}
                        {Math.ceil(wordCount / 238)} min čitanja
                      </p>
                    </div>
                  </div>
                  <div
                    className={`absolute py-2 text-center bottom-0 left-0 right-0 bg-black bg-opacity-[0.55]`}
                  >
                    <Link
                      href={`/blog/${post?.slug}`}
                      className={`text-[1.35rem] md:text-[1.5rem] font-medium uppercase text-white line-clamp-1 max-w-[95%] mx-auto`}
                    >
                      {post?.basic_data?.title}
                    </Link>
                  </div>
                </div>
                <p className={`text-sm mx-2 line-clamp-3 pb-1 border-b`}>
                  {post?.basic_data?.short_description}
                </p>
                <div
                  className={`flex max-md:flex-col max-md:gap-3 md:flex-row justify-between px-2 pb-2`}
                >
                  <div className={`flex flex-row gap-2 items-center`}>
                    <i className={`fa fa-solid fa-calendar-day`}></i>
                    <p className={`text-xs`}>
                      {new Date(post?.basic_data?.created_at?.date_time)
                        .toLocaleDateString("sr-RS", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                        .replace(/јануар/g, "januar")
                        .replace(/фебруар/g, "februar")
                        .replace(/март/g, "mart")
                        .replace(/април/g, "april")
                        .replace(/мај/g, "maj")
                        .replace(/јун/g, "jun")
                        .replace(/јул/g, "jul")
                        .replace(/август/g, "avgust")
                        .replace(/септембар/g, "septembar")
                        .replace(/октобар/g, "oktobar")
                        .replace(/новембар/g, "novembar")
                        .replace(/децембар/g, "decembar")}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post?.slug}`}
                    className={`max-md:w-full`}
                  >
                    {" "}
                    <button
                      className={`px-4 py-2 w-full max-md:mt-2 max-md:text-center max-md:justify-center bg-black text-white flex items-center gap-3 rounded-md hover:bg-[#CA965C] transition-all duration-500`}
                    >
                      <span className={`text-sm`}>Saznajte više</span>
                      <i className={`fa fa-solid text-sm fa-arrow-right`}></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllPosts;
