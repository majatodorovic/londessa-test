"use client";
import { useState } from "react";
import Image from "next/image";
import Londessa from "@/public/logo-londessa.png";
import Map from "@/components/MaloprodajePage/Map";

const MaloprodajePage = () => {
  const [objects, setObjects] = useState([
    {
      id: 1,
      name: "Čačak",
      address: "Kralja Petra 30",
      phone: "032/323-323",
      lat: 43.8942039,
      lng: 20.3452007,
    },
    {
      id: 2,
      name: "Beograd",
      address: "Borska 32",
      phone: "032/323-323",
      active: false,
      lat: 44.7472271,
      lng: 20.4438983,
    },
    {
      id: 3,
      name: "New York",
      address: "Old Vine Blvd",
      phone: "032/323-323",
      active: false,
      lat: 38.7421918,
      lng: -75.192019,
    },
  ]);

  const [active, setActive] = useState({
    id: 1,
    lng: objects[0]?.lng,
    lat: objects[0]?.lat,
  });
  const [loading, setLoading] = useState(false);
  return (
    <div className={`w-[95%] mx-auto lg:w-full lg:px-[3rem] mt-5`}>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
        <div className={`col-span-1 md:col-span-2 2xl:col-span-1`}>
          <p className={`mt-5`}>
            U našim maloprodajnim objektima možete pronaći sve što vam je
            potrebno za vaš dom. Ukoliko ne možete da pronađete neki proizvod,
            slobodno nas kontaktirajte.
          </p>
          {objects?.length <= 4 ? (
            <div className={`mt-5 grid grid-cols-1 lg:grid-cols-2 gap-2`}>
              {objects.map((object, index) => {
                return (
                  <div
                    key={index}
                    className={` w-full gap-2 rounded-lg col-span-1 lg:col-span-1 p-5 hover:border-[#CA965C] cursor-pointer border ${
                      active?.id === object?.id && `border-[#CA965C] border-2`
                    }`}
                    onClick={() => {
                      setActive({
                        id: object?.id,
                        lng: object?.lng,
                        lat: object?.lat,
                      });
                      setLoading(true);
                    }}
                  >
                    <div className={`flex flex-col items-start gap-2 p-2`}>
                      <Image src={Londessa} alt="" className={`w-[70%]`}/>
                      <div className={`flex flex-col`}>
                        <h1 className={`text-[1.2rem] font-semibold`}>
                          {object?.name}
                        </h1>
                        <p className={`text-base`}>{object?.address}</p>
                        <p className={`text-base`}>{object?.phone}</p>
                      </div>
                      <button
                        className={`bg-black hover:bg-[#CA965C] transition-all duration-500 w-full text-white px-5 py-2 rounded-lg`}
                        onClick={() => {
                          setActive((prev) => ({
                            id: object?.id,
                            lng: object?.lng,
                            lat: object?.lat,
                          }));
                        }}
                      >
                        Prikaži na mapi
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`mt-5 lg:pb-[10rem]`}>
              <h1 className={`text-[1.2rem] font-semibold`}>
                Izaberite željeni grad
              </h1>
              <select
                className={`w-full mt-2 p-2 rounded-lg`}
                onChange={(e) => {
                  const value = e.target.value;
                  const obj = objects.find((o) => o.name === value);
                  setActive({
                    id: obj?.id,
                    lng: obj?.lng,
                    lat: obj?.lat,
                  });
                  setLoading(true);
                }}
              >
                {objects.map((object, index) => {
                  return (
                    <option key={index} value={object?.name}>
                      {object?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
        <div className={`col-span-1 md:col-span-1 2xl:col-span-2`}>
          <Map
            lat={active?.lat}
            lng={active?.lng}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default MaloprodajePage;
