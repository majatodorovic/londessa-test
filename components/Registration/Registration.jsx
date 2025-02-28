import { useEffect, useState } from "react";
import classes from "./Registration.module.css";
import { useRouter } from "next/navigation";
import { post } from "@/app/api/api";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

import hide from "@/assets/Icons/hide-password.png";
import show from "@/assets/Icons/show-password.png";
import calendar from "@/assets/Icons/calendar.png";

const Registration = ({ setIsReg }) => {
  const [secondAddress, setSecondAddress] = useState(false);
  const [reg, setReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const handleRegOpen = () => {
    setReg(true);
    setIsReg(true);
  };
  const handleRegClose = () => {
    setReg(false);
    setIsReg(false);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword2) => !prevShowPassword2);
  };

  const [formData, setFormData] = useState({
    customer_type: "personal",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    gender: "",
    birth_date: null,
    password: "",
    note: "",
    company_name: "",
    pib: "",
    maticni_broj: "",
    accept_terms: 1,
    accept_newsletter: 0,
  });

  const required = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "password",
    "gender",
    "birth_date",
  ];

  const companyrequired = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "password",
    "company_name",
    "pib",
    "maticni_broj",
  ];

  const [errors, setErrors] = useState([]);

  const formChangeHandler = ({ target }) => {
    setErrors(errors.filter((item) => item != target.name));

    if (target.type === "radio" && target.checked) {
      setFormData({ ...formData, [target.name]: target.value });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  const formSubmitHandler = () => {
    const err = [];
    for (const key in formData) {
      const item = formData[key];
      if (
        (formData.customer_type === "company" &&
          companyrequired.includes(key) &&
          (item === "" || item == null)) ||
        (required.includes(key) && (item === "" || item == null))
      ) {
        err.push(key);
      }
    }

    if (err.length > 0) {
      setErrors(err);
      console.log(err);
    } else {
      const ret = {
        customer_type: formData.customer_type,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        birth_date: formData.birth_date,
        password: formData.password,
        note: formData.note,
        company_name: formData.company_name,
        pib: formData.pib,
        maticni_broj: formData.maticni_broj,
        accept_terms: formData.accept_terms,
        accept_newsletter: formData.accept_newsletter,
      };
      if (errors.length === 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
      post("/customers/sign-in/registration", ret)
        .then((response) => {
          if (response?.code === 200) {
            toast.success("Uspešno ste se registrovali.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.push("/nalog");
            handleRegClose();
          } else {
            setErrors("Greška pri logovanju.");
            toast.error("Došlo je do nepoznate greške. Pokušajte ponovo.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
          if (response?.code === 500 || response?.code === 400) {
            setErrors(
              "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva."
            );
            toast.error("Greška. Proverite da li ste uneli ispravne podatke.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
            });
          }
        })
        .catch((error) => console.warn(error));
    }
  };
  const errorMsg = "Polje je obavezno";
  const errorSelect = "Morate izabrati jednu opciju";
  const errorCheck = "Morate prihvatiti uslove";
  return (
    <>
      <div className="h-[100%] flex flex-col items-center">
        <ToastContainer className="z-[6000]" />
        <div className="loginHolder lg:w-[74%] max-lg:w-[90%] max-sm:w-[94%]">
          <h3 className="font-semibold text-xl underline text-black">
            REGISTRACIJA NALOGA
          </h3>
          <p className="mb-[2rem] mt-[0.4rem] font-light text-[#4b4b4b]">
            Klikom na dugme "napravi nalog" ulazite u proceduru registracije.
          </p>
          <p className="font-light text-[#4b4b4b]">
            Kreiranje naloga omogućava brže zaključivanje narudžbina, kreiranje
            više adresa za isporuku kao i mogućnost praćenja narudžbina.
          </p>
          <button
            onClick={handleRegOpen}
            className="bg-croonus-2  text-white py-[0.7rem] px-[1.3rem] text-sm mt-[2rem] hover:bg-opacity-70"
          >
            NAPRAVI NALOG
          </button>

          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleRegClose();
              }
            }}
            className={
              reg
                ? `z-[20000] scale-100 transition-all duration-500 fixed max-md:mx-auto max-md:overflow-y-scroll z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center popup text-black max-sm:pt-[20rem]`
                : `z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center popup text-black max-sm:pt-[20rem]`
            }
          >
            <div
              className={`
                    bg-white max-md:overflow-y-scroll sm:p-[40px] max-sm:p-[20px] flex flex-col relative borderThin`}
            >
              <h3 className="font-semibold text-xl underline text-black">
                NAPRAVITE NOVI NALOG
              </h3>
              <p className="mb-[1.4rem] mt-[0.4rem] font-thin text-[#4b4b4b]">
                Vaši podaci
              </p>

              {formData.customer_type === "personal" && (
                <form className="mt-4 grid sm:grid-cols-2 gap-x-10 pb-4 max-xl:text-base ">
                  <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">
                    <div className="flex flex-col gap-2  ">
                      <label htmlFor="name" className="hidden">
                        Ime:{" "}
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        className={`sm:ml-2 max-sm:text-sm h-[58px]  text-black ${
                          errors.includes("first_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0"
                        }  focus:ring-0 bg-white sm:mx-3 `}
                        type="text"
                        id="name"
                        name="first_name"
                        placeholder="Ime*"
                        value={formData.first_name}
                        onChange={formChangeHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="address" className="hidden">
                        Broj telefona:
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={formChangeHandler}
                        className={`sm:ml-2 max-sm:text-sm h-[58px]  text-black ${
                          errors.includes("phone")
                            ? "border-red-500 focus:border-red-500"
                            : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0"
                        }  focus:ring-0 bg-white sm:mx-3 `}
                        placeholder="Broj telefona*"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="hidden">
                        Email:
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        type={`email`}
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={formChangeHandler}
                        className={`sm:ml-2 max-sm:text-sm h-[58px]  text-black ${
                          errors.includes("email")
                            ? "border-red-500 focus:border-red-500"
                            : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0"
                        }  focus:ring-0 bg-white sm:mx-3 `}
                        placeholder="Email*"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="note" className="hidden">
                        Napomena:
                      </label>
                      <textarea
                        type="text"
                        name="note"
                        rows="2"
                        id="note"
                        value={formData.note}
                        onChange={formChangeHandler}
                        className={`sm:ml-2 max-sm:text-sm h-[58px]  text-black border border-[#e0e0e0] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0 bg-white sm:mx-3 `}
                        placeholder="Napomena"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3 max-sm:mt-[0.6rem]">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="surname" className="hidden">
                        Prezime:{" "}
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        className={`sm:ml-2 max-sm:text-sm h-[58px]  text-black sm:mr-[1px] ${
                          errors.includes("last_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0"
                        }  focus:ring-0 bg-white sm:mx-3 `}
                        type="text"
                        id="surname"
                        name="last_name"
                        placeholder="Prezime*"
                        value={formData.last_name}
                        onChange={formChangeHandler}
                      />
                    </div>
                    <div className="xl:grid xl:grid-cols-2 sm:gap-x-3">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="gender" className="hidden">
                          Pol{" "}
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          form="genderform"
                          value={formData.gender}
                          onChange={formChangeHandler}
                          className={`sm:ml-2 max-sm:text-sm h-[58px] ${
                            errors.includes("gender")
                              ? `border border-red-500 focus:border-red-500 focus:outline-0 focus:ring-0`
                              : `border border-[#e0e0e0] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0`
                          } `}
                        >
                          <option value="">Izaberite pol</option>
                          <option value="male">Muški pol</option>
                          <option value="female">Ženski pol</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2  relative">
                        <label htmlFor="birth_date" className="hidden">
                          Datum rodjenja:
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="birth_date"
                          id="birth_date"
                          value={formData.birth_date}
                          onChange={formChangeHandler}
                          className={`sm:ml-2 max-sm:text-sm h-[58px] ${
                            errors.includes("birth_date")
                              ? `border border-red-500 focus:border-red-500 focus:outline-0 focus:ring-0`
                              : `border border-[#e0e0e0] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0`
                          }`}
                          placeholder="Datum rodjenja*"
                        />
                        <Image
                          className="sm:hidden absolute right-[0.6rem] top-[1rem]"
                          alt="Calendar"
                          src={calendar}
                          width={24}
                          height={20}
                        />
                      </div>
                    </div>
                    <div className="xl:grid xl:grid-col xl:gap-x-3">
                      <div className="flex">
                        <label htmlFor="password" className="hidden">
                          Lozinka:{" "}
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          className={`sm:ml-2 max-sm:text-sm h-[58px]  text-black ${
                            errors.includes("password")
                              ? "border-red-500 focus:border-red-500"
                              : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:outline-0 focus:ring-0"
                          }  focus:ring-0 bg-white  sm:mx-3 w-full mr-[0.6rem]`}
                          type={showPassword ? "text" : "password"}
                          id="password"
                          autoComplete="off"
                          name="password"
                          value={formData.password}
                          placeholder="Lozinka*"
                          onChange={formChangeHandler}
                        />

                        <button
                          type={`button`}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <Image
                              src={hide}
                              alt="hide password"
                              width={22}
                              height={22}
                            />
                          ) : (
                            <Image
                              src={show}
                              alt="show password"
                              width={22}
                              height={22}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className=" flex sm:gap-3 sm:py-3 relative flex-col max-sm:mt-[2rem]">
                    <div className="termsAgree flex items-center">
                      <input
                        type="checkbox"
                        id="accept_terms"
                        name="accept_terms"
                        onChange={() => {
                          setFormData({
                            ...formData,
                            accept_terms: formData.accept_terms === 1 ? 0 : 1,
                          });
                        }}
                        value={formData.accept_terms}
                        defaultChecked={
                          formData.accept_terms === 1 ? true : false
                        }
                        className="focus:ring-0 focus:border-none focus:outline-none bg-white  text-green-500 mr-[0.4rem] rounded"
                      />
                      <label
                        htmlFor="accept_terms"
                        className="max-md:text-xs text-[#4b4b4b] w-full "
                      >
                        Slažem se sa Croonus politikom privatnosti i
                        čuvanjem podataka.
                      </label>
                    </div>
                    <div className="nlAgree flex items-center max-sm:mt-[1rem]">
                      <input
                        type="checkbox"
                        id="accept_newsletter"
                        name="accept_newsletter"
                        onChange={() => {
                          setFormData({
                            ...formData,
                            accept_newsletter:
                              formData.accept_newsletter === 1 ? 0 : 1,
                          });
                        }}
                        value={formData.accept_newsletter}
                        defaultChecked={
                          formData.accept_newsletter === 1 ? true : false
                        }
                        className="focus:ring-0 focus:border-none focus:outline-none bg-white  text-green-500 mr-[0.4rem] rounded"
                      />
                      <label
                        htmlFor="accept_newsletter"
                        className="max-md:text-xs text-[#4b4b4b] max-w-[80%]"
                      >
                        Pristajem na newsletter obaveštenja putem maila.
                      </label>
                    </div>
                    {errors.includes("accept_terms") && (
                      <span
                        className={`${classes.errorMsg} text-red-500 -top-2 absolute `}
                      >
                        {errorCheck}
                      </span>
                    )}
                    <br />
                  </div>
                </form>
              )}

              {formData.customer_type === "company" && (
                <form className="mt-4 grid sm:grid-cols-2 gap-x-10 pb-4 max-xl:text-base ">
                  <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">
                    <div className="flex flex-col gap-2  ">
                      <label htmlFor="company_name" className="hidden">
                        Naziv firme:{" "}
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        className={`ml-2 max-sm:text-sm h-[58px]  text-black ${
                          errors.includes("first_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        }  focus:ring-0 bg-croonus-gray  max-xl:mx-3`}
                        type="text"
                        id="company_name"
                        name="company_name"
                        placeholder="Naziv firme*"
                      />
                    </div>
                    <div className="xl:grid xl:grid-cols-2 xl:gap-x-3">
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="town" className="hidden">
                          PIB{" "}
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="pib"
                          id="pib"
                          className={`ml-2 max-sm:text-sm h-[58px]  text-black ${
                            errors.includes("first_name")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          }  focus:ring-0 bg-croonus-gray  max-xl:mx-3`}
                          placeholder="PIB*"
                        />
                      </div>
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="maticni_broj" className="hidden">
                          Matični broj:
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="maticni_broj"
                          id="maticni_broj"
                          className={`ml-2 max-sm:text-sm h-[58px]  text-black ${
                            errors.includes("first_name")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          }  focus:ring-0 bg-croonus-gray  max-xl:mx-3`}
                          placeholder="Matični broj*"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 max-xl:mt-2">
                      <label htmlFor="phone" className="hidden">
                        Broj:
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={formChangeHandler}
                        className={`ml-2 max-sm:text-sm h-[58px]  text-black ${
                          errors.includes("first_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        }  focus:ring-0 bg-croonus-gray  max-xl:mx-3`}
                        placeholder="Broj telefona*"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="hidden">
                        Email:
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        autoComplete="off"
                        id="email"
                        className={`ml-2 max-sm:text-sm h-[58px]  text-black ${
                          errors.includes("first_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        }  focus:ring-0 bg-croonus-gray  max-xl:mx-3`}
                        placeholder="Email*"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="note" className="hidden">
                        Napomena:
                      </label>
                      <textarea
                        type="text"
                        name="note"
                        rows="2"
                        id="note"
                        value={formData.note}
                        onChange={formChangeHandler}
                        className="ml-2 max-sm:text-sm border-none focus:border-none focus:ring-0 border-0 bg-croonus-gray  max-xl:mx-3"
                        placeholder="Napomena"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3">
                    <div className="xl:grid xl:grid-col xl:gap-x-3">
                      <label htmlFor="name" className="hidden">
                        Ime:{" "}
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        className={`ml-2 max-sm:text-sm h-[58px]  text-black ${
                          errors.includes("first_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        }  focus:ring-0 bg-croonus-gray  max-xl:mx-3`}
                        type="text"
                        id="name"
                        name="first_name"
                        placeholder="Ime*"
                      />
                    </div>
                    <div className="xl:grid xl:grid-col xl:gap-x-3">
                      <label htmlFor="last_name" className="hidden">
                        Prezime:{" "}
                        <span className="snap-mandatory text-red-500">*</span>
                      </label>
                      <input
                        className={`ml-2 max-sm:text-sm h-[58px]  text-black ${
                          errors.includes("first_name")
                            ? "border-red-500 focus:border-red-500"
                            : "border-none focus:border-none"
                        }  focus:ring-0 bg-croonus-gray  max-xl:mx-3`}
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Prezime*"
                      />
                    </div>
                    <div className="xl:grid xl:grid-cols-2 xl:gap-x-3">
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="gender" className="hidden">
                          Pol{" "}
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          form="genderform"
                          value={formData.gender}
                          onChange={formChangeHandler}
                          className={`ml-2 max-sm:text-sm h-[58px] border-0 bg-croonus-gray `}
                        >
                          <option value="male">Izaberite pol</option>
                          <option value="male">Muški pol</option>
                          <option value="female">Ženski pol</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2 max-xl:mt-2">
                        <label htmlFor="birth_date" className="hidden">
                          Datum rodjenja:
                          <span className="snap-mandatory text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="birth_date"
                          id="birth_date"
                          className={`ml-2 max-sm:text-sm h-[58px] border-0 bg-croonus-gray `}
                          placeholder="Datum rodjenja*"
                        />
                      </div>
                    </div>
                    <div className="xl:grid xl:grid-col xl:gap-x-3">
                      <div className="flex">
                        <input
                          className={`ml-2 max-sm:text-sm h-[58px]  text-black ${
                            errors.includes("first_name")
                              ? "border-red-500 focus:border-red-500"
                              : "border-none focus:border-none"
                          }  focus:ring-0 bg-croonus-gray  max-xl:mx-3 w-full mr-[0.6rem]`}
                          type={showPassword2 ? "text" : "password"}
                          id="password"
                          name="password"
                          autoComplete="off"
                          placeholder="Lozinka*"
                          value={formData.password}
                          onChange={formChangeHandler}
                        />
                        <button onClick={togglePasswordVisibility2}>
                          {showPassword2 ? (
                            <Image
                              src={hide}
                              alt="hide password"
                              width={22}
                              height={22}
                            />
                          ) : (
                            <Image
                              src={show}
                              alt="show password"
                              width={22}
                              height={22}
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-3 py-3 relative flex flex-col">
                    <div className="termsAgree flex items-center">
                      <input
                        type="checkbox"
                        id="accept_terms"
                        name="accept_terms"
                        onChange={() => {
                          setFormData({
                            ...formData,
                            accept_terms: formData.accept_terms === 1 ? 0 : 1,
                          });
                        }}
                        value={formData.accept_terms}
                        defaultChecked={
                          formData.accept_terms === 1 ? true : false
                        }
                        className="focus:ring-0 focus:border-none focus:outline-none text-[#191919] bg-croonus-3 mr-[0.4rem]"
                      />
                      <label
                        htmlFor="accept_terms"
                        className="max-md:text-xs text-croonus-1"
                      >
                        Slažem se sa Reflekta politikom privatnosti i čuvanjem
                        podataka.
                      </label>
                    </div>
                    <div className="nlAgree flex items-center ">
                      <input
                        type="checkbox"
                        id="accept_newsletter"
                        name="accept_newsletter"
                        onChange={() => {
                          setFormData({
                            ...formData,
                            accept_newsletter:
                              formData.accept_newsletter === 1 ? 0 : 1,
                          });
                        }}
                        value={formData.accept_newsletter}
                        defaultChecked={
                          formData.accept_newsletter === 1 ? true : false
                        }
                        className="focus:ring-0 focus:border-none focus:outline-none text-[#191919] bg-croonus-3 mr-[0.4rem] rounded-sm rounded-sm"
                      />
                      <label
                        htmlFor="accept_newsletter"
                        className="max-md:text-xs text-croonus-1 max-w-[80%]"
                      >
                        Pristajem na newsletter obaveštenja putem maila.
                      </label>
                    </div>
                    {errors.includes("accept_terms") && (
                      <span
                        className={`${classes.errorMsg} text-red-500 -top-3 absolute `}
                      >
                        {errorCheck}
                      </span>
                    )}
                    <br />
                  </div>
                </form>
              )}

              <button
                onClick={formSubmitHandler}
                className="bg-croonus-2  text-white py-[0.7rem] px-[1.3rem] text-sm hover:bg-opacity-70 w-fit ml-auto"
              >
                {loading ? (
                  <i className={`fa fa-spinner fa-spin`}></i>
                ) : (
                  <> NAPRAVITE NALOG</>
                )}
              </button>
              <button
                onClick={handleRegClose}
                className="absolute top-2 right-3 text-black"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
