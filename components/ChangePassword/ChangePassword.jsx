"use client";
import { useState } from "react";
import { post } from "@/app/api/api";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import show from "@/assets/Icons/show-password.png";
import hide from "@/assets/Icons/hide-password.png";

const ChangePassword = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [showChangedPassword, setShowChangedPassword] = useState(false);

  const [formData, setData] = useState({
    password: "",
    sent_mail: true,
  });

  const formChangeHandler = ({ target }) => {
    setData({ ...formData, [target.name]: target.value });
  };

  const sentMailHandler = ({ target }) => {
    setIsChecked(!isChecked);
    setData({ ...formData, [target.name]: !isChecked });
  };
  const submitHandler = () => {
    const err = [];
    if (err.length > 0) {
      setErrors(err);
      console.log(err);
    } else {
      const ret = {
        password: formData?.password,
        sent_mail: formData?.sent_mail,
      };
      post("/customers/profile/reset-password", ret)
        .then((response) => {
          if (response?.code === 200) {
            toast.success("Uspešno ste resetovali šifru.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            setErrors("Greška.");
            toast.error("Greška.", {
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
          }
        })
        .catch((error) => console.warn(error));
    }
  };
  const togglePasswordVisibility = () => {
    setShowChangedPassword(
      (prevShowChangedPassword) => !prevShowChangedPassword
    );
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between items-center sm:w-[90%] bg-[#f8f8f8] rounded-lg p-[1.4rem] mb-[2rem] min-h-[7rem] md:min-w-[30rem]">
        <h1 className="text-3xl max-sm:ml-[4rem]">Izmena lozinke</h1>
      </div>
      <div className="flex mt-[3rem] w-full md:w-[64%] max-sm:justify-between">
        <input
          name="password"
          value={formData.password}
          onChange={formChangeHandler}
          type={showChangedPassword ? "text" : "password"}
          placeholder="Nova lozinka:"
          className="block lg:w-full max-sm:flex-1 border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0 py-[0.6rem] "
        />
        <button onClick={togglePasswordVisibility} className="ml-3">
          {showChangedPassword ? (
            <Image src={hide} alt="hide password" width={22} height={22} />
          ) : (
            <Image src={show} alt="show password" width={22} height={22} />
          )}
        </button>
      </div>
      <div className="mt-4">
        <input
          type="checkbox"
          name="sent_mail"
          id="sent_mail"
          checked={isChecked}
          onChange={sentMailHandler}
          className="focus:ring-0 focus:border-none focus:outline-none text-green-500 rounded border mr-[0.4rem]"
        />
        <label htmlFor="sent_mail" className="text-[14px] ml-2">
          Pošalji mi izmenjenu lozinku na mail.{" "}
        </label>
      </div>

      <button
        onClick={submitHandler}
        className="bg-croonus-2  text-white py-[0.8rem] px-[4rem] max-sm:px-[1rem] hover:bg-opacity-80 mt-[3rem]"
      >
        Potvrdite
      </button>
    </div>
  );
};

export default ChangePassword;
