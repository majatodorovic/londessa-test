import { get } from "@/app/api/api";
import OrderSuccess from "@/components/OrderToken/OrderToken";
const userOrderToken = async (orderToken) => {
  const userOrderToken = await get(`/checkout/info/${orderToken}`).then(
    (response) => response?.payload
  );
  return userOrderToken;
};
const orderToken = async ({ params: { orderToken } }) => {
  const order = await userOrderToken(orderToken);

  return <OrderSuccess order={order} />;
};

export default orderToken;

export const metadata = {
  title: "Kupovina | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Kupovina | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

