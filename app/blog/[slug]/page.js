import { get as GET } from "@/app/api/api";
import Link from "next/link";
import SinglePost from "@/components/Blog/SinglePost";

const getBlogPost = async (slug) => {
  return await GET(`/news/details/${slug}`).then((res) => res?.payload);
};
const BlogPostDetails = async ({ params: { slug } }) => {
  const post = await getBlogPost(slug);
  return (
    <>
      <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
        <div className={`flex items-center gap-2`}>
          <Link className={`text-[0.95rem]`} href={`/`}>
            Početna
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <Link className={`text-[0.95rem]`} href={`/blog`}>
            Blog
          </Link>
          <span className={`text-[0.95rem]`}>/</span>
          <span className={`text-[0.95rem]`}>{post?.basic_data?.title}</span>
        </div>
        <h1
          className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
        >
          {post?.basic_data?.title}
        </h1>

      </div>
      <SinglePost post={post} />
    </>
  );
};

export default BlogPostDetails;
