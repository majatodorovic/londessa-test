import { ProductPage } from "@/components/ProductDetails/ProductPage";

const ProductDetailPage = ({ params: { path }, canonical, id }) => {
  return (
    <ProductPage
      path={path[path?.length - 1]}
      categoryId={path[path?.length - 2]}
      canonical={canonical}
    />
  );
};

export default ProductDetailPage;
