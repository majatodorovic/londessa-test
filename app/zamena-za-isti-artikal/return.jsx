// @ts-check
"use client";
import { useCallback, useState } from "react";
import { post as POST } from "@/app/api/api";
import {
    GoogleReCaptcha as Captcha,
    GoogleReCaptchaProvider as Provider,
} from "react-google-recaptcha-v3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";


const ZamenaZaIstiArtikal = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        message: "",
        address: "",
        phone: "",
        bank_account: "",
        email: "",
        order_number: "",
        loyalty_card_number: "",
        sku: "",
        returning_size: "",
        new_size: "",
        returning_amount: "",
        new_amount: "",
    });
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [errors, setErrors] = useState([]);
    const required = [
        "first_name",
        "last_name",
        "address",
        "email",
        "phone",
        "order_number",
        "bank_account",
        "sku",
        "returning_size",
        "new_size",
        "returning_amount",
        "new_amount",
    ];
    const verifyCaptcha = useCallback((token) => {
        setToken(token);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        let err = [];
        err = errors.filter((error) => error !== e.target.name);
        setErrors(err);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const errors = [];
        required.forEach((field) => {
            if (!formData[field]) {
                errors.push(field);
            }
        });
        if (errors.length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        } else {
            setErrors([]);
            await POST("contact/contact_page", {
                page_section: "contact_page",
                customer_name: formData?.first_name + " " + formData?.last_name,
                email: formData?.email,
                phone: formData?.phone,
                mail_to: "",
                subject: "Zamena za isti artikal",
                company_sector: "",
                message: `Razlog za menjanje: ${formData?.message} \n Ime: ${formData?.first_name} \n Prezime: ${formData?.last_name} \n Adresa: ${formData?.address} \n Email: ${formData?.email} \n Telefon: ${formData?.phone} \n Broj porudzbenice: ${formData?.order_number} \n Broj loyalty kartice: ${formData?.loyalty_card_number} \n Šifra artikla koji se vraća: ${formData?.sku} \n Veličina koja se vraća: ${formData?.returning_size} \n Nova veličina: {formData?.new_size} \n Količina koja se vraća: ${formData?.returning_amount} \n Nova količina: ${formData?.new_amount} \n Razlog za zamenu: ${formData?.reasons_of_return}`,
                accept_rules: true,
                gcaptcha: token,
            }).then((res) => {
                switch (res?.code) {
                    case 200:
                        toast.success("Uspešno ste poslali zahtev za zamenu.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                        });
                        setLoading(false);
                        setFormData({
                            first_name: "",
                            last_name: "",
                            message: "",
                            address: "",
                            phone: "",
                            bank_account: "",
                            email: "",
                            order_number: "",
                            loyalty_card_number: "",
                            sku: "",
                            returning_size: "",
                            new_size: "",
                            returning_amount: "",
                            new_amount: "",
                        });
                        break;
                    default:
                        toast.error("Došlo je do greške, molimo Vas pokušajte ponovo.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                        });
                        setLoading(false);
                        break;
                }
            });
        }
    };

    return (
        <Provider reCaptchaKey={process.env.CAPTCHAKEY}>
            <ToastContainer />
            <Captcha onVerify={verifyCaptcha} refreshReCaptcha={true} />
            <div className="mt-[1.2rem] md:mt-[9rem] w-[95%] mx-auto md:w-[60%]">
                <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
                    Zamena za isti artikal
                </h1>
                <p>Kupac može da zatraži zamenu artikala u roku od 14 dana od dana prijema robe. Zamena robe se odnosi na zamenu veličine ili zamenu modela. U slučaju zamene roba se, zajedno sa popunjenim Obrascem za zamenu, dostavlja Prodavcu, i u tom slučaju troškove zamene snosi Kupac.</p>
                <p>Obrazac za zamenu možete preuzeti na <Link href="/doc/obrazac-za-zamenu-robe-londessa.pdf" target="_blank" download className="underline text-croonus-2 font-bold">ovom linku</Link>.</p>
                <p>U slučaju zamene Kupac je u obavezi da robu vrati u originalnoj ambalaži, bez oštećenja i tragova korišćenja. U suprotnom, Prodavac nije u obavezi da obavi zamenu.</p>
                <p>Artikal za koji se vrši zamena, mora imati istu ili veću vrednost od artikla koji se menja, uz doplatu.</p>
                <div className={`mt-10`}>
                    <form
                        className={`mt-10 grid max-md:grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-3`}
                        onSubmit={handleSubmit}
                    >
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Ime <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.first_name}
                                name={`first_name`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("first_name")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Prezime <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.last_name}
                                name={`last_name`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("last_name")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Adresa i grad{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.address}
                                name={`address`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("address")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Email <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`email`}
                                disabled={false}
                                value={formData.email}
                                name={`email`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("email")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Telefon <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.phone}
                                name={`phone`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("phone")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Broj računa otpremnice/porudžbine{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.order_number}
                                name={`order_number`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("order_number")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Broj dinarskog tekućeg računa{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.bank_account}
                                name={`bank_account`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("bank_account")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Broj loyalty kartice
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.loyalty_card_number}
                                name={`loyalty_card_number`}
                                onChange={handleChange}
                                className={`mt-1 w-full border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Šifra artikla koji se vraća{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.sku}
                                name={`sku`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("sku")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Veličina koja se vraća{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.returning_size}
                                name={`returning_size`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("returning_size")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Nova veličina{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.new_size}
                                name={`new_size`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("new_size")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Količina koja se vraća{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.returning_amount}
                                name={`returning_amount`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("returning_amount")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div className={`col-span-1 flex flex-col items-start`}>
                            <label className={`text-base font-light`}>
                                Nova količina{" "}
                                <span className={`snap-mandatory text-red-500`}>*</span>
                            </label>
                            <input
                                type={`text`}
                                disabled={false}
                                value={formData.new_amount}
                                name={`new_amount`}
                                onChange={handleChange}
                                className={`mt-1 w-full ${
                                    errors.includes("new_amount")
                                        ? "border border-red-500  focus:border-red-500 focus:ring-0 focus:outline-0"
                                        : "border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0"
                                }`}
                            />
                        </div>
                        <div
                            className={`col-span-1 md:col-span-2 flex flex-col items-start`}
                        >
                            <label className={`text-base font-light`}>
                                Razlog zašto se menja artikal
                            </label>
                            <textarea
                                rows={5}
                                disabled={false}
                                value={formData.message}
                                name={`message`}
                                onChange={handleChange}
                                className={`mt-1 w-full
                          border border-[#e0e0e0] focus:border-[#e0e0e0] focus:ring-0 focus:outline-0
                  `}
                            />
                        </div>

                        <div className={`col-span-1 md:col-span-2`}>
                            <div className={`flex justify-end items-center`}>
                                <button
                                    type={`submit`}
                                    className={`px-10 py-2 max-sm:w-full hover:bg-opacity-80 bg-[#191919] text-white`}
                                    onClick={handleSubmit}
                                >
                                    {loading ? (
                                        <i
                                            className={`fa fa-solid fa-spinner fa-spin text-white text-center text-lg`}
                                        />
                                    ) : (
                                        `Pošalji`
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Provider>
    );
};

export default ZamenaZaIstiArtikal;
