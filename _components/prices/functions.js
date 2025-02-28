import { currencyFormat } from "@/helpers/functions";

/**
 * Returns status of the price
 * @param {object} price - The object that holds the price data.
 * @returns {string} - The status of the price.
 */
export const getPriceStatus = (price) => {
  let status = "default";

  if (price?.discount?.active) {
    status = "discount";
  }

  return status;
};

/**
 * Returns are prices equal
 * @param {object} price - The object that holds the price data.
 * @returns {boolean} - Are prices equal.
 */
export const getArePricesEqual = (price) => {
  return price?.min?.price?.original === price?.max?.price?.original;
};

/**
 * Returns status of the inventory
 * @param {object} inventory - The object that holds the inventory data.
 * @returns {boolean} - The status of the inventory - is in stock or not.
 */
export const checkIsInStock = (inventory) => {
  return inventory?.inventory_defined && inventory?.amount > 0;
};

/**
 * Returns status of the inventory
 * @param {object} price - The object that holds the price data.
 * @returns {object} - The status of the price - is it defined and is it the range of prices.
 */
export const checkPrices = (price) => {
  let data = {};

  data.price_range =
    price?.min?.price?.original > 0 &&
    price?.max?.price?.original > 0 &&
    price?.min?.price_defined &&
    price?.max?.price_defined;

  if (data.price_range) {
    data.price_defined = true;
  } else {
    if (!data.price_range) {
      data.price_defined = !!(
        price?.price_defined && price?.price?.original > 0
      );
    }
  }

  return data;
};

/**
 * Returns status of the inventory
 * @param {Number} amount - The discounted amount
 * @param {Number} original - The original amount
 * @returns {Number} - The percentage of the discount.
 */
export const getDiscountPercentage = (amount, original) => {
  let amount_num = Number(amount);
  return Math.round(((original - amount_num) / original) * 100);
};

/**
 * Returns status of the inventory
 * @param {object} data - The object that holds the price data.
 * @returns {JSX.Element} - Default prices, without rebates or discounts.
 */
export const renderDefaultPrices = (data = {}) => {
  const { is_price_range, price, type } = data;

  if (is_price_range) {
    let are_range_prices_equal = getArePricesEqual(price);
    if (are_range_prices_equal) {
      return (
        <p
          className={`font-bold ${
            type === "details" ? "text-[1.313rem]" : "text-sm"
          }`}
        >
          {currencyFormat(price?.min?.price?.original)}
        </p>
      );
    } else {
      return (
        <p
          className={`font-bold ${
            type === "details" ? "text-[1.313rem]" : "text-sm"
          }`}
        >
          {currencyFormat(price?.min?.price?.original)} -{" "}
          {currencyFormat(price?.max?.price?.original)}
        </p>
      );
    }
  } else {
    return (
      <p
        className={`${
          type === "details" ? "text-[1.313rem]" : "text-sm"
        } font-bold`}
      >
        {currencyFormat(price?.price?.original)}
      </p>
    );
  }
};

/**
 * Returns status of the inventory
 * @param {object} data - The object that holds the price data.
 * @returns {JSX.Element} - Prices after discount.
 */
export const renderDiscountPrices = (data = {}) => {
  const { is_price_range, price, type } = data;

  if (is_price_range) {
    let are_range_prices_equal = getArePricesEqual(price);
    let discount_percentage = getDiscountPercentage(
      price?.min?.price?.discount,
      price?.min?.price?.original
    );

    if (are_range_prices_equal) {
      return (
        <>
          <div className={`flex flex-row flex-wrap items-center gap-3`}>
            <p
              className={`font-normal ${
                type === "details" && "text-[1.313rem] text-boa-red !font-bold"
              }`}
            >
              {currencyFormat(price?.min?.price?.discount)}
              {type === "details" && ` (${discount_percentage}%)`}
            </p>
            <p
              className={`line-through text-[#838383] font-medium ${
                type === "details" && "text-[1.313rem]"
              }`}
            >
              {currencyFormat(price?.min?.price?.original)}
            </p>
          </div>
          {type === "details" && (
            <p className={`text-[#31a100] text-base font-semibold`}>
              Ušteda:{" "}
              {currencyFormat(
                price?.min?.price?.original - price?.min?.price?.discount
              )}
            </p>
          )}
        </>
      );
    } else {
      return (
        <>
          <div
            className={` flex flex-col-reverse flex-wrap items-center gap-3`}
          >
            <p
              className={`font-medium ${
                type === "details" && "text-[1.313rem] !font-bold"
              }`}
            >
              {currencyFormat(price?.min?.price?.discount)} -{" "}
              {currencyFormat(price?.max?.price?.discount)}
              {type === "details" && ` (${discount_percentage}%)`}
            </p>
            <p
              className={`line-through text-[#838383] font-bold ${
                type === "details" && "text-[1.313rem]"
              }`}
            >
              {currencyFormat(price?.min?.price?.original)} -{" "}
              {currencyFormat(price?.max?.price?.original)}
            </p>
          </div>
          {type === "details" && (
            <p className={`text-[#31a100] text-base font-semibold`}>
              Ušteda:{" "}
              {currencyFormat(
                price?.min?.price?.original - price?.min?.price?.discount
              )}{" "}
              -{" "}
              {currencyFormat(
                price?.max?.price?.original - price?.max?.price?.discount
              )}
            </p>
          )}
        </>
      );
    }
  } else {
    let discount_percentage = getDiscountPercentage(
      price?.price?.discount,
      price?.price?.original
    );
    return (
      <>
        <div className={` flex flex-col-reverse flex-wrap items-center gap-3`}>
          <p
            className={`font-medium ${
              type === "details" && "text-[1.313rem] !font-bold"
            }`}
          >
            {currencyFormat(price?.price?.discount)}
            {type === "details" && ` (${discount_percentage}%)`}
          </p>
          <p
            className={`line-through text-[#838383] font-medium ${
              type === "details" && "text-[1.313rem]"
            }`}
          >
            {currencyFormat(price?.price?.original)}
          </p>
        </div>
        {type === "details" && (
          <p className={`text-[#31a100] text-base font-semibold`}>
            Ušteda:{" "}
            {currencyFormat(price?.price?.original - price?.price?.discount)}
          </p>
        )}
      </>
    );
  }
};
