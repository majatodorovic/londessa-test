"use client";
import { useEffect, useState } from "react";
import { list } from "@/app/api/api";
import Image from "next/image";
import Link from "next/link";

import pen from "../../assets/Icons/pen.png";

const PreviousOrders = () => {
  const [previousOrders, setPreviousOrders] = useState();

  useEffect(() => {
    const fetchPreviousOrders = async () => {
      const fetchPreviousOrders = await list(
        "/customers/previous-orders/"
      ).then((response) => {
        setPreviousOrders(response?.payload);
      });
      return fetchPreviousOrders;
    };
    fetchPreviousOrders();
  }, []);

  return (
    <>
      <div className="max-md:hidden">
        <div className="mt-5 justify-between items-center sm:w-[90%] bg-[#f8f8f8] rounded-lg p-[1.4rem] mb-[2rem] min-h-[7rem]">
          <h1 className="text-3xl max-sm:mt-3 pb-0">Prethodne kupovine</h1>
        </div>
        <table className="table-fixed max-md:w-full w-[90%] mr-auto my-1rem table">
          <tbody>
            <tr className="bg-croonus-2 divide-x divide-white text-white">
              <td className="  rounded-tl-lg pl-[1.4rem] py-[0.7rem]">#</td>
              <td className=" pl-[1.4rem] py-[0.7rem]">Datum i vreme</td>
              <td className=" pl-[1.4rem] py-[0.7rem]">Ukupan iznos</td>
              <td className=" rounded-tr-lg pl-[1.4rem] py-[0.7rem]">
                Detalji
              </td>
            </tr>
            {previousOrders?.items?.map((order, index) => {
              return (
                <>
                  <tr
                    className={`divide-x divide-white ${
                      index % 2 !== 0 ? "bg-[#ededed]" : "bg-croonus-gray"
                    }`}
                  >
                    <td className=" pl-[1.4rem] py-[0.7rem]">{order?.slug}</td>
                    <td className=" pl-[1.4rem] py-[0.7rem]">
                      {order?.created_at}
                    </td>
                    <td className=" pl-[1.4rem] py-[0.7rem]">
                      {order?.total_with_vat}
                    </td>
                    <td className=" pl-[1.4rem] py-[0.7rem]">
                      <Link href={`/customer-orders/${order?.order_token}`}>
                        Pogledaj više
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        <div className="flex justify-between items-center sm:w-[90%] bg-[#f8f8f8] rounded-lg p-[1.4rem] mb-[2rem] min-h-[7rem]">
          <h1 className="text-3xl pb-0">Prethodne kupovine</h1>
        </div>
        {previousOrders?.items?.map((order, index) => {
          return (
            <>
              <div className="border border-[#f0f0f0] rounded-lg mb-[2rem]">
                <h5 className="p-2 text-lg bg-[#d3c2a8] rounded-tl-lg rounded-tr-lg">
                  Porudžbenica{" "}
                  <span className="font-medium">{order?.slug}</span>
                </h5>
                <p className="font-light mt-[1rem] ml-[0.4rem]">
                  Kreirana:{" "}
                  <span className="font-medium">{order?.created_at}</span>
                </p>
                <p className="font-light ml-[0.4rem]">
                  Ukupan iznos porudžbine:{" "}
                  <span className="font-medium">{order?.total_with_vat}</span>
                </p>
                <div className="ml-[0.4rem] py-[0.7rem] mt-[2rem] font-medium">
                  <Link href={`/customer-orders/${order?.id}`}>
                    Pogledaj više
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default PreviousOrders;
