import StaticPage from "@/components/StaticPage/StaticPage";
import { get } from "@/app/api/api";

const getData = async (slug) => {
  return get(`/static-pages/content/${slug}`).then((res) => {
    return res?.payload;
  });
};

const DynamicStaticPage = async ({ params: { slug } }) => {
  const data = await getData(slug);
  return <StaticPage slug={slug} data={data} />;
};

export default DynamicStaticPage;
