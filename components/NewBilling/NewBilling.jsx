
"use client"
import { useEffect, useState } from 'react';
import { get, post } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import Image from 'next/image';
import back from '../../assets/Icons/right-chevron.png'

const NewBilling = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };


    const [formData, setFormData] = useState({
        name: "",
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        customer_type: null,
        pib: null,
        maticni_broj: null,
        zip_code: null,
        address: "",
        object_number: "",
        company_name: "",
        id_town: null,
        town_name: null,
        id_country: null,
        note: "",
        set_default: 0
    });

    const required = [
        "name",
        "first_name",
        "customer_type",
        "last_name",
        "phone",
        "email",
        "id_country",
        "address",
        "object_number"
    ];

    const [errors, setErrors] = useState([]);

    const formChangeHandler = ({ target }) => {
        setErrors(errors?.filter((item) => item != target?.name));
        setFormData({ ...formData, [target.name]: target.value });
        
    };

    const [countries, setCountries] = useState([])
    const [towns, setTowns] = useState([])


    useEffect(() => {
        const getCountries = async () => {
            await get(`/customers/billing-address/ddl/id_country`).then((res) => {
                setCountries(res?.payload)
            })
        }
        getCountries()
    }, [])


useEffect(() => {
    if(towns?.length === 0) {
        setFormData((prevData) => ({
            ...prevData,
            id_town: null,
          }));
          
    }
},[towns])

    const formSubmitHandler = () => {
        const err = [];
        for (const key in formData) {
            const item = formData[key];
            if ((
                required.includes(key) &&
                (item === "" || item == null)) ||
              (required.includes(key) && (item === "" || item == null))
            ) {
             
                err.push(key);
              
            }
          }
        if (err.length > 0) {
            setErrors(err);
            toast.error("Morate popuniti sva obavezna polja", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        } else {
            const ret = {
                name: formData.name,
                first_name: formData.first_name,
                last_name: formData.last_name,
                customer_type: formData.customer_type,
                phone: formData.phone,
                email: formData.email,
                company_name: formData.company_name,
                pib: formData.pib,
                maticni_broj: formData.maticni_broj,
                zip_code: formData.zip_code,
                address: formData.address,
                object_number: formData.object_number,
                id_town: formData?.id_town,
                town_name: formData.town_name,
                id_country: formData.id_country,
                note: formData.note,
                set_default: formData.set_default
            }
            post("/customers/billing-address", ret)
                .then((response) => {
                    if (response?.code === 200) {
                        toast.success("Uspešno ste dodali novu adresu.", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });

                    }
                })
                .catch((error) => console.warn(error));

        }
    };

    return (
        <>
        <ToastContainer />
            <div className='relative'>
            <button className='bg-croonus-3 p-[0.4rem] sm:mr-[4rem] max-sm:mr-[0.6rem] ml-[1re] rounded-[50%] mt-[0.4rem] hover:translate-y-0.5 transition-all ease cursor-pointer text-white min-w-[2.2rem] absolute md:top-4 md:left-4' onClick={handleGoBack}>
                    <Image
                        src={back}
                        alt="back button"
                        className='invert transform rotate-180'
                        width={22}
                        height={22}/>
                </button>
            </div>
                <div>
                    <div className='bg-[#f8f8f8] rounded-lg p-[1.4rem] md:w-[70%] mb-[3rem]'>
                        <h1 className="text-3xl pb-0 mb-[1rem] ml-[3rem]">Plaćanje</h1>
                        <h3 className="text-base text-[#919191] font-normal max-sm:ml-[4rem]"> &#62; Dodajte novu adresu</h3>
                    </div>
                <div>                  
                    <div className="grid gap-3 grid-cols-3 sm:my-4 md:w-[70%]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">
                                Ime adrese:{" "}
                                <span className="snap-mandatory text-red-500">*</span>
                            </label>
                            <input
                                className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                    errors.includes("name") ? `border border-red-500` : `border-0`
                                 } bg-[#f5f5f6] text-black`}
                                type="text"
                                value={formData.name}
                                onChange={formChangeHandler}
                                id="name"
                                name="name"
                                placeholder="Ime adrese*"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">
                                Ime:{" "}
                                <span className="snap-mandatory text-red-500">*</span>
                            </label>
                            <input
                               className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                errors.includes("first_name") ? `border border-red-500` : `border-0`
                             } bg-[#f5f5f6] text-black`}
                                type="text"
                                onChange={formChangeHandler}
                                id="first_name"
                                value={formData.first_name}
                                name="first_name"
                                placeholder="Ime*"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="surname">
                                Prezime:{" "}
                                <span className="snap-mandatory text-red-500">*</span>
                            </label>
                            <input
                               className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                errors.includes("last_name") ? `border border-red-500` : `border-0`
                             } bg-[#f5f5f6] text-black`}
                                type="text"
                                onChange={formChangeHandler}
                                value={formData.last_name}
                                id="surname"
                                name="last_name"
                                placeholder="Prezime*"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 pb-4 max-xl:text-base sm:mt-[2rem] mb-[1rem] md:w-[70%]">
                        <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-start-1 xl:col-end-2">

                            <div className="flex flex-col gap-2 max-xl:mt-2">
                                <label htmlFor="address">
                                    Broj telefona:
                                    <span className="snap-mandatory text-red-500">*
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    id="phone"
                                    onChange={formChangeHandler}
                                    className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                        errors.includes("phone") ? `border border-red-500` : `border-0`
                                     } bg-[#f5f5f6] text-black`}
                                    placeholder="Broj telefona*"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3 max-sm:mt-[0.6rem]">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">
                                    Email:
                                    <span className="snap-mandatory text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={formChangeHandler}
                                    value={formData.email}
                                    id="email"
                                    className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                        errors.includes("email") ? `border border-red-500` : `border-0`
                                     } bg-[#f5f5f6] text-black`}
                                    placeholder="Email*"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-3 sm:my-4 grid-cols-3 md:w-[70%]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="customer_type">
                                Tip kupca:
                                <span className="snap-mandatory text-red-500">*</span>
                            </label>
                            <select
                                  className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                    errors.includes("customer_type") ? `border border-red-500` : `border-0`
                                 } bg-[#f5f5f6] text-black`}
                                    value={formData.customer_type}
                                    id="customer_type"
                                    onChange={formChangeHandler}
                                    name="customer_type"
                                >
                                    <option value="">Izaberite</option>
                                    <option value="personal">Personal</option>
                                    <option value="company">Company</option>
                                </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="address">
                                Adresa:
                                <span className="snap-mandatory text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={formChangeHandler}
                                id="address"
                                className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                    errors.includes("address") ? `border border-red-500` : `border-0`
                                 } bg-[#f5f5f6] text-black`}
                                placeholder="Adresa"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="object_number">
                                Broj objekta:{" "}
                                <span className="snap-mandatory text-red-500">*</span>
                            </label>
                            <input
                                className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                    errors.includes("object_number") ? `border border-red-500` : `border-0`
                                 } bg-[#f5f5f6] text-black`}
                                type="text"
                                id="object_number"
                                onChange={formChangeHandler}
                                name="object_number"
                                value={formData.object_number}
                                placeholder="Broj objekta"
                            />
                        </div>
                        </div>
                        <div className="grid gap-3 my-4 grid-cols-3 md:w-[70%]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="id_country">
                                Država:
                                <span className="snap-mandatory text-red-500">*</span>
                            </label>

                            <select
                               className={`max-sm:text-sm py-[0.8rem] rounded-lg ${
                                errors.includes("id_country") ? `border border-red-500` : `border-0`
                             } bg-[#f5f5f6] text-black`}
                                id="id_country"
                                onChange={(e) => {
                                    formChangeHandler(e);
                                    get(`/customers/billing-address/ddl/id_town?id_country=${e.target.value}`).then((res) => {
                                        setTowns(res?.payload);
                                        
                                    })
                                    
                                }}
                                name="id_country"
                            >  
                                {
                                    countries?.map((item) => {
                                        return <option value={item?.id} name="id_country">{item?.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        {formData?.id_country !== null && towns?.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                <label htmlFor="id_town">
                                    Grad:
                                </label>
                                
                                <select
                                    className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6]`}
                                    value={formData?.id_town}
                                    id="id_town"
                                    onChange={formChangeHandler}
                                    name="id_town"
                                >
                                    
                                    {
                                        towns?.map((item) => {
                                            return <option value={item?.id} name="id_town">{item?.name}</option>
                                        })
                                    }
                                </select>

                            </div>) : (<>
                                <div className="flex flex-col gap-2">
                                <label htmlFor="town_name">
                                    Grad:
                                </label>
                                <input
                                type={`text`}
                                    className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                    value={formData?.town_name}
                                    id="town_name"
                                    onChange={formChangeHandler}
                                    name="town_name"
                             />

                            </div><div className="flex flex-col gap-2">
                                <label htmlFor="zip_code">
                                    Poštanski broj:
                                </label>
                                <input
                                type={`text`}
                                    className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                    value={formData?.zip_code}
                                    id="zip_code"
                                    onChange={formChangeHandler}
                                    name="zip_code"
                            />

                            </div>
                            </>)}

                    </div>
                    <div className="flex flex-col gap-2 mb-[2rem] md:w-[70%]">
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
                            className={`max-sm:text-sm h-[58px]  text-black border-none max-sm:w-full
                            focus:ring-0 bg-[#f5f5f6] sm::mx-3 rounded-lg`}
                            placeholder="Napomena"
                        />
                    </div>
                    <div className="termsAgree flex items-center md:w-[70%]">
                        <input
                            type="checkbox"
                            id="set_default"
                            name="set_default"
                            onChange={() => {
                                setFormData({
                                  ...formData,
                                  set_default: formData.set_default === 1 ? 0 : 1
                                })
                              }}
                            value={formData.set_default}
                            className="focus:ring-0 focus:border-none focus:outline-none text-[#191919] bg-croonus-3 mr-[0.4rem] rounded-sm rounded-sm"
                        />
                        <label
                            htmlFor="set_default"
                            className="max-md:text-xs text-croonus-1 "
                        >
                            Podesite kao podrazumevanu adresu.
                        </label>
                    </div>
                </div>
                <div>
                    <p className="text-[#a7a7a7] mt-4 block">*Ukoliko ste pravno lice:</p>
                    <div className="grid gap-3 grid-cols-3 my-4 md:w-[70%] max-sm:items-end">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="company_name">
                                Naziv kompanije:
                            </label>
                            <input
                                type="text"
                                name="company_name"
                                id="company_name"
                                value={formData.company_name}
                                onChange={formChangeHandler}
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                placeholder="Naziv kompanije"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="pib">
                                PIB:{" "}
                            </label>
                            <input
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                type="text"
                                id="pib"
                                name="pib"
                                value={formData.pib}
                                onChange={formChangeHandler}
                                placeholder="PIB"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="mb">
                                MB:{" "}

                            </label>
                            <input
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                type="text"
                                id="maticni_broj"
                                name="maticni_broj"
                                value={formData.maticni_broj}
                                onChange={formChangeHandler}
                                placeholder="Matični broj"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button onClick={formSubmitHandler} className="bg-croonus-3 text-white py-[0.8rem] px-[2rem] hover:bg-opacity-80 max-sm:ml-auto max-sm:mt-[2rem] max-sm:block">Sačuvaj izmene</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default NewBilling;