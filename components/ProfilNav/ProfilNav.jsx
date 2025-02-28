"use client";
import Cookies from "js-cookie";
import { post } from "@/app/api/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { userContext } from "@/context/userContext";
import Image from "next/image";

import profilemenu from "@/assets/Icons/profilemenu.png";
import profilecancel from "@/assets/Icons/profilecancel.png";

const ProfilNav = ({ selectedButton, handleButtonClick }) => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const disableBodyScroll = () => {
      isMenuOpen && (document.body.style.overflow = "hidden");
    };
    disableBodyScroll();

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMenuOpen]);

  const logoutHandler = () => {
    post("/customers/profile/logout")
      .then((response) => {
        if (response?.code === 200) {
          setIsLoggedIn(false);
          localStorage.removeItem("loggedIn");
          const deviceToken = Cookies.get("device_token");
          Cookies.set("customer_token", deviceToken, { expires: 365 });
          router.push("/nalog");
        } else {
          setErrors("Greška.");
        }
        if (response?.code === 500 || response?.code === 400) {
          setErrors(
            "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva."
          );
        }
      })
      .catch((error) => console.warn(error));
  };

  return (
    <>
      <div className="profilNav max-lg:hidden">
        <div className="flex flex-col text-lg">
          <button
            className={`text-start py-[1.2rem] pl-[1rem] rounded-lg transition-all ease ${
              selectedButton === 0
                ? "bg-croonus-2 text-white"
                : " hover:bg-croonus-2 hover:text-white bg-croonus-gray"
            }`}
            onClick={() => handleButtonClick(0)}
          >
            Moj profil
          </button>
          <button
            className={`text-start py-[1.2rem] pl-[1rem] rounded-lg transition-all ease ${
              selectedButton === 1
                ? "bg-croonus-2 text-white"
                : "bg-croonus-gray hover:bg-croonus-2 hover:text-white"
            }`}
            onClick={() => handleButtonClick(1)}
          >
            Plaćanje
          </button>
          <button
            className={`text-start py-[1.2rem] pl-[1rem] rounded-lg transition-all ease ${
              selectedButton === 2
                ? "bg-croonus-2 text-white"
                : "bg-croonus-gray hover:bg-croonus-2 hover:text-white"
            }`}
            onClick={() => handleButtonClick(2)}
          >
            Dostava
          </button>
          <button
            className={`text-start py-[1.2rem] pl-[1rem] rounded-lg transition-all ease ${
              selectedButton === 3
                ? "bg-croonus-2 text-white"
                : "bg-croonus-gray hover:bg-croonus-2 hover:text-white"
            }`}
            onClick={() => handleButtonClick(3)}
          >
            Prethodne kupovine
          </button>
          <button
            className={`text-start py-[1.2rem] pl-[1rem] rounded-lg transition-all ease ${
              selectedButton === 4
                ? "bg-croonus-2 text-white"
                : "bg-croonus-gray hover:bg-croonus-2 hover:text-white"
            }`}
            onClick={() => handleButtonClick(4)}
          >
            Izmena lozinke
          </button>
          <button
            className={`text-start py-[1.2rem] pl-[1rem] rounded-lg transition-all ease ${
              selectedButton === 5
                ? "bg-croonus-2 text-white"
                : "bg-croonus-gray hover:bg-croonus-2 hover:text-white"
            }`}
            onClick={logoutHandler}
          >
            Odjava
          </button>
        </div>
      </div>
      <div className="lg:hidden p-2 bg-croonus-gray absolute rounded-3xl">
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Image src={profilemenu} width={30} height={30} alt="profile menu" />
        </div>
        <div
          className={
            isMenuOpen
              ? ` translate-x-0 transition-all duration-500 fixed flex flex-col z-[82] left-0 top-[3rem] h-screen w-[84%] bg-white bg-opacity-100 shadow-2xl text-black`
              : `-translate-x-[100%] transition-all duration-500 fixed flex flex-col z-[82] left-0 top-[3rem] h-screen w-[84%] bg-white bg-opacity-100 text-black`
          }
        >
          <div className="flex flex-col mt-[0.7rem]">
            <button
              className={`text-start py-[0.8rem] pl-[1rem] text-white ${
                selectedButton === 0
                  ? "bg-[#333]"
                  : "bg-croonus-3 hover:bg-[#333]"
              }`}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                handleButtonClick(0);
              }}
            >
              Moj profil
            </button>
            <button
              className={`text-start py-[0.8rem] pl-[1rem] text-white ${
                selectedButton === 1
                  ? "bg-[#333]"
                  : "bg-croonus-3 hover:bg-[#333]"
              }`}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                handleButtonClick(1);
              }}
            >
              Plaćanje
            </button>
            <button
              className={`text-start py-[0.8rem] pl-[1rem] text-white ${
                selectedButton === 2
                  ? "bg-[#333]"
                  : "bg-croonus-3 hover:bg-[#333]"
              }`}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                handleButtonClick(2);
              }}
            >
              Dostava
            </button>
            <button
              className={`text-start py-[0.8rem] pl-[1rem] text-white ${
                selectedButton === 3
                  ? "bg-[#333]"
                  : "bg-croonus-3 hover:bg-[#333]"
              }`}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                handleButtonClick(3);
              }}
            >
              Prethodne kupovine
            </button>
            <button
              className={`text-start py-[0.8rem] pl-[1rem] text-white ${
                selectedButton === 4
                  ? "bg-[#333]"
                  : "bg-croonus-3 hover:bg-[#333]"
              }`}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                handleButtonClick(4);
              }}
            >
              Izmena lozinke
            </button>
            <button
              className={`text-start py-[0.8rem] pl-[1rem] text-white ${
                selectedButton === 5
                  ? "bg-[#333]"
                  : "bg-croonus-3 hover:bg-[#333]"
              }`}
              onClick={() => {
                logoutHandler();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              Odjava
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto mt-[1rem] mr-[1rem]  p-2 bg-croonus-gray rounded-3xl"
          >
            <Image
              src={profilecancel}
              width={30}
              height={30}
              alt="profile cancel menu"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilNav;
