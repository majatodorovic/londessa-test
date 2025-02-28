import {
  checkIsInStock,
  checkPrices,
  getPriceStatus,
  renderDefaultPrices,
  renderDiscountPrices,
} from "./functions";

export const Prices = ({ price, inventory, type = "default" }) => {
  let status = getPriceStatus(price);
  let is_in_stock = checkIsInStock(inventory);
  let prices = checkPrices(price);

  let data = {
    status: status,
    is_in_stock: is_in_stock,
    price_defined: prices?.price_defined,
    is_price_range: prices?.price_range,
    price: price,
    type: type,
  };

  if (!data?.is_in_stock || !data.price_defined) {
    return <p className={`text-sm font-bold`}>Pošaljite upit</p>;
  }

  switch (data?.status) {
    case "default":
      return renderDefaultPrices({ ...data });
    case "discount":
      return renderDiscountPrices({ ...data });
  }
};

export const DiscountStickers = ({ price }) => {
  let status = getPriceStatus(price);

  if (status === "discount") {
    return (
      price?.discount?.active && (
        <div
          className={`absolute top-1.5 left-1.5 z-[5] flex flex-col text-white`}
        >
          {(price?.discount?.campaigns ?? [])?.map(
            ({ id, calc: { amount, original } }) => {
              let amount_num = Number(amount);
              let percentage = Math.round((amount_num / original) * 100);

              return (
                <div
                  key={id}
                  className={`bg-boa-red rounded-lg px-2 md:px-[1.85rem] py-1 text-xs font-semibold`}
                >
                  <span>- {percentage}%</span>
                </div>
              );
            }
          )}
        </div>
      )
    );
  }
  return null;
};
