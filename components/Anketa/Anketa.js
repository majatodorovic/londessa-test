"use client";

import { useState } from "react";
import Link from "next/link";

const Anketa = () => {
  const [data, setData] = useState({
    snalazenje: "",
    fotografije: "",
    opis: "",
    predlog: "",
  })

  return (
      <>
        <div className={`text-left w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
          <div className={`flex items-center gap-2`}>
            <Link className={`text-[0.95rem]`} href={`/`}>
              Početna
            </Link>
            <span className={`text-[0.95rem]`}>/</span>
            <span className={`text-[0.95rem]`}>Anketa</span>
          </div>
          <h1
              className={`text-[23px] md:text-[29px] font-normal mt-5 w-full border-b pb-2`}
          >
            Anketa
          </h1>
        </div>
        <div
            className={`flex max-md:mt-12 flex-col mt-10 text-center items-center justify-center`}
        >
          {/*<h1 className={`text-[29.17px] font-bold`}>*/}
          {/*  POMOZITE NAM{" "}*/}
          {/*  <span className={`text-[29.17px] font-light`}>DA BUDEMO BOLJI</span>{" "}*/}
          {/*</h1>*/}
          <p className={`text-[16.48px] text-center max-w-[440px] mt-3 font-light`}>
            Podelite svoje jedinstveno onlajn iskustvo sa našim timom i pomozite nam
            da ostanemo povezani.
          </p>
          <form className={`mt-10 flex gap-6 flex-col`}>
            <div className={`flex flex-col items-center gap-`}>
              <h1 className={`text-[17.83px] font-normal`}>
                Kako se snalazite pri kupovini?
              </h1>
              <div className={`flex items-center gap-5`}>
                <div className={`flex items-center gap-2`}>
                  <input
                      type="radio"
                      value={data?.snalazenje}
                      name="snalazenje"
                      id="snalazenje1"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    1
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      value={data?.snalazenje}
                      name="snalazenje"
                      id="snalazenje2"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    2
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      value={data?.snalazenje}
                      name="snalazenje"
                      id="snalazenje3"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    3
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      value={data?.snalazenje}
                      name="snalazenje"
                      id="snalazenje4"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    4
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      value={data?.snalazenje}
                      name="snalazenje"
                      id="snalazenje5"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    5
                  </label>
                </div>
              </div>
            </div>
            <div className={`flex flex-col items-center gap-3`}>
              <h1 className={`text-[17.83px] font-normal`}>
                Da li su fotografije realan reprezent artikala?
              </h1>
              <div className={`flex items-center gap-5`}>
                <div className={`flex items-center gap-2`}>
                  <input
                      type="radio"
                      name="fotografije"
                      id="fotografije1"
                      value={data?.fotografije}
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    1
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      name="fotografije"
                      value={data?.fotografije}
                      id="fotografije2"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    2
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      name="fotografije"
                      value={data?.fotografije}
                      id="fotografije3"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    3
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      value={data?.fotografije}
                      name="fotografije"
                      id="fotografije4"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    4
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      name="fotografije"
                      value={data?.fotografije}
                      id="fotografije5"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    5
                  </label>
                </div>
              </div>
            </div>
            <div className={`flex flex-col items-center gap-3`}>
              <h1 className={`text-[17.83px] font-normal`}>
                Da li je opis artikala adekvatan?
              </h1>
              <div className={`flex items-center gap-5`}>
                <div className={`flex items-center gap-2`}>
                  <input
                      type="radio"
                      name="opis"
                      id="opis1"
                      value={data?.opis}
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    1
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      value={data?.opis}
                      name="opis"
                      id="opis2"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    2
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      value={data?.opis}
                      name="opis"
                      id="opis3"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    3
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      value={data?.opis}
                      name="opis"
                      id="opis4"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    4
                  </label>
                </div>
                <div className={`flex items-center gap-1`}>
                  <input
                      type="radio"
                      name="opis"
                      value={data?.opis}
                      id="opis5"
                      className={`text-black focus:ring-0 h-5 w-5`}
                  />
                  <label htmlFor="snalazenje1" className={`text-[17.83px]`}>
                    5
                  </label>
                </div>
              </div>
            </div>
            <div className={`flex flex-col items-center gap-3`}>
              <h1 className={`text-[17.83px] font-normal`}>
                Ostavite nam Vaš predlog/sugestiju.
              </h1>
              <div className={`flex items-center gap-3 !w-[320px] textArea`}>
                <textarea className={`!w-full h-32 p-2 border border-black `} value={data?.opis}/>
              </div>
            </div>
            <button
                className={`bg-black hover:bg-opacity-90 text-white w-[320px] max-w-[320px] px-10 h-[50px] mx-auto mt-7 hover:bg-black/80`}
            >
              POŠALJI ANKETU
            </button>
          </form>
        </div>
      </>
  );


};

export default Anketa;
