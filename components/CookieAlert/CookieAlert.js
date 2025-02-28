"use client";
import Cookie from "../../assets/Icons/cookie.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const CookieAlert = () => {
  const [cookiesAllowed, setCookiesAllowed] = useState(true);
  let cookiesExist = false;
  useEffect(() => {
    const isAllowedCookie = Cookies.get("cookiesAllowed");
    if (isAllowedCookie) cookiesExist = true;
    setCookiesAllowed(cookiesExist);
  }, [cookiesAllowed, cookiesExist]);
  return (
    <>
      {!cookiesAllowed && (
        <div className="fixed right-0 bottom-0 bg-white z-[1000] p-5 max-lg:w-full w-[40%] shadow-2xl rounded-tl-2xl max-lg:rounded-t-2xl">
          <div className="flex flex-row gap-2">
            <Image
              src={Cookie}
              alt="Cookie"
              width={40}
              height={40}
              className="object-contain self-start"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-[12px] font-medium">
                Ova web stranica koristi kolačiće
              </h2>
              <p className="text-[9px]">
                Koristimo kolačiće(cookies) da bismo učinili da ova web stranica
                pravilno funkcioniše i da bismo mogli dalje da unapređujemo web
                lokaciju kako bismo poboljšali Vaše korisničko iskustvo,
                personalizovani sadržaj i oglase, omogućili funkcije društvenih
                medija i analizirali saobraćaj. Nastavljajući da koristite našu
                web stranicu, prihvatate upotrebu kolačića.
              </p>
            </div>
          </div>
          <div className="border border-[#f0f0f0] p-2 flex flex-col justify-between items-center w-full">
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="cookie"
                    id="obavezni"
                    defaultChecked={true}
                    className="w-3 rounded h-3 text-green-500"
                  />
                  <label htmlFor="cookie" className="text-[11px]">
                    Obavezni
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="cookie"
                    id="Trajni"
                    defaultChecked={true}
                    className="w-3 rounded h-3 text-green-500"
                  />
                  <label htmlFor="cookie" className="text-[11px]">
                    Trajni
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="cookie"
                    id="Statistika"
                    defaultChecked={true}
                    className="w-3 rounded h-3 text-green-500"
                  />
                  <label htmlFor="cookie" className="text-[11px]">
                    Statistika
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="cookie"
                    id="Marketing"
                    defaultChecked={true}
                    className="w-3 rounded h-3 text-green-500"
                  />
                  <label htmlFor="cookie" className="text-[11px]">
                    Marketing
                  </label>
                </div>
              </div>
              <button
                className="text-[11px] bg-croonus-2 text-white px-2 py-0.5 hover:bg-opacity-80"
                onClick={() => {
                  Cookies.set("cookiesAllowed", true, { expires: 365 });
                  setCookiesAllowed(true);
                }}
              >
                Slažem se
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieAlert;
