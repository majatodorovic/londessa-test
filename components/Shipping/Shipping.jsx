
"use client"
import { useEffect, useState } from 'react';
import { get, post } from '@/app/api/api';
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";

import back from '../../assets/Icons/right-chevron.png'

const Shipping = () => {
    const [customerData,setCustomerData] = useState();
    const [disabled, setDisabled] = useState(true)
    const path = useParams();
    const id = path?.id;
  
    const router = useRouter();

    const handleGoBack = () => {
      router.back();
    };

    const [data,setData] = useState({
        "id": customerData?.id,
        "id_customer": customerData?.id_customer,
        "name": customerData?.name,
        "first_name": customerData?.first_name,
        "last_name": customerData?.last_name,
        "phone": customerData?.phone,
        "email": customerData?.email,
        "zip_code": customerData?.zip_code,
        "address": customerData?.address,
        "object_number": customerData?.object_number,
        "floor": customerData?.floor,
        "apartment_number": customerData?.apartment_number,
        "id_town": customerData?.id_town,
        "town_name": customerData?.town_name,
        "id_country": customerData?.id_country,
        "company_name": customerData?.company_name,
        "pib": customerData?.pib,
        "maticni_broj": customerData?.maticni_broj,
        "note":null,
        "set_default": 0
    })
    
    useEffect(() => {
    const fetchCustomerData = async() => {
        const fetchCustomerData = await get(`/customers/shipping-address/${id}`).then(
            (response) => {
                setCustomerData(response?.payload)
            }
          )
          return fetchCustomerData;
        };
        fetchCustomerData();
    },[])
    
    
      useEffect(() => {
        setData({
        id: customerData?.id,
        id_customer: customerData?.id_customer,
        name: customerData?.name,
        first_name: customerData?.first_name,
        last_name: customerData?.last_name,
        phone: customerData?.phone,
        email: customerData?.email,
        zip_code: customerData?.zip_code,
        address: customerData?.address,
        object_number: customerData?.object_number,
        floor: customerData?.floor,
        apartment_number: customerData?.apartment_number,
        id_town: customerData?.id_town,
        town_name: customerData?.town_name,
        id_country: customerData?.id_country,
        company_name: customerData?.company_name,
        pib: customerData?.pib,
        maticni_broj: customerData?.maticni_broj,
        note: customerData?.note,
        set_default: customerData?.set_default
        })
      },[customerData])
      
     const formChangeHandler = ({ target }) => {
      setData({ ...data, [target.name]: target.value });}
      const changeInputHandler = () => {
        const err = [];
        if (err.length > 0) {
          setErrors(err);
          console.log(err);
        } else {
          const ret = {
        id: data?.id,
        id_customer: data?.id_customer,
        name: data?.name,
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone: data?.phone,
        email: data?.email,
        zip_code: data?.zip_code,
        address: data?.address,
        object_number: data?.object_number,
        floor: data?.floor,
        apartment_number: data?.apartment_number,
        id_town: data?.id_town,
        town_name: data?.town_name,
        id_country: data?.id_country,
        company_name: data?.company_name,
        pib: data?.pib,
        maticni_broj: data?.maticni_broj,
        note: data?.note,
        set_default: data?.set_default
          }
          post("/customers/shipping-address", ret)
            .then((response) => {
              setDisabled(true)
              toast.success("Uspešno ste izmenili podatke.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            })
            .catch((error) => console.warn(error));
        }
      };
      const [countries, setCountries] = useState([])
      const [towns, setTowns] = useState([])
  
  
      useEffect(() => {
          const getCountries = async () => {
              await get(`/customers/shipping-address/ddl/id_country`).then((res) => {
                  setCountries(res?.payload)
              })
          }
          getCountries()
      }, [])
  
  
  useEffect(() => {
      if(towns?.length === 0) {
          setData((prevData) => ({
              ...prevData,
              id_town: null,
            }));
            
      }
  },[towns])
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
                  <h1 className="text-3xl pb-0 mb-[1rem] ml-[3rem]">Dostava</h1>
                  <h3 className="text-base text-[#919191] font-normal max-sm:ml-[4rem]">&#62; Detalji adrese</h3>
                  </div>
                <div>
                    <div className="grid gap-3 grid-cols-3 my-4 md:w-[70%]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">
                                Ime adrese:{" "}
                                <span className="snap-mandatory text-red-500">*</span>
                            </label>
                            <input
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] text-black rounded-lg`}
                                type="text"
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      name: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.name}
                                disabled={disabled}
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
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] text-black rounded-lg`}
                                type="text"
                                onChange={formChangeHandler}
                                disabled={disabled}
                                id="first_name"
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      first_name: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.first_name}
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
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                type="text"
                                onChange={formChangeHandler}
                                disabled={disabled}
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      last_name: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.last_name}
                                id="surname"
                                name="last_name"
                                placeholder="Prezime*"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 pb-4 max-xl:text-base mt-[2rem] mb-[1rem] md:w-[70%]">
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
                                    onInput={(e) => {
                                        setData((prev) => ({
                                          ...prev,
                                          phone: e.target.value
                                        }));
                                      }}
                                    defaultValue={customerData?.phone}
                                    id="phone"
                                    onChange={formChangeHandler}
                                    disabled={disabled}
                                    className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                    placeholder="Broj telefona*"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 max-xl:col-span-3 xl:col-span-1 xl:col-start-2 xl:col-end-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">
                                    Email:
                                    <span className="snap-mandatory text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={formChangeHandler}
                                    onInput={(e) => {
                                        setData((prev) => ({
                                          ...prev,
                                          email: e.target.value
                                        }));
                                      }}
                                    defaultValue={customerData?.email}
                                    disabled={disabled}
                                    id="email"
                                    className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                    placeholder="Email*"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-3 my-4 grid-cols-4 md:w-[70%]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="address">
                                Adresa:
                            </label>
                            <input
                                type="text"
                                name="address"
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      address: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.address}
                                onChange={formChangeHandler}
                                disabled={disabled}
                                id="address"
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                placeholder="Adresa"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="object_number">
                                Broj objekta:{" "}

                            </label>
                            <input
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                type="text"
                                id="object_number"
                                onChange={formChangeHandler}
                                disabled={disabled}
                                name="object_number"
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      object_number: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.object_number}
                                placeholder="Broj objekta"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="floor">
                                Sprat:{" "}

                            </label>
                            <input
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                type="text"
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      floor: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.floor}
                                id="floor"
                                onChange={formChangeHandler}
                                disabled={disabled}
                                name="floor"
                                placeholder="Sprat"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="apartment_number">
                                Broj stana:{" "}

                            </label>
                            <input
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                type="text"
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      aparment_number: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.aparment_number}
                                id="apartment_number"
                                onChange={formChangeHandler}
                                disabled={disabled}
                                name="apartment_number"
                                placeholder="Broj stana"
                            />
                        </div>
                        </div>
                        <div className="grid gap-3 my-4 grid-cols-3 md:w-[70%]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="id_country">
                                Drzava:

                            </label>

                            <select
                                className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                id="id_country"
                                disabled={disabled}
                                value={customerData?.id_country}
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      id_country: e.target.value
                                    }));
                                  }}
                                onChange={(e) => {
                                    formChangeHandler(e);
                                    get(`/customers/shipping-address/ddl/id_town?id_country=${e.target.value}`).then((res) => {
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
                        {data?.id_country !== null && towns?.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                <label htmlFor="id_town">
                                    Grad:
                                </label>
                                
                                <select
                                    className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                    id="id_town"
                                    onChange={formChangeHandler}
                                    name="id_town"
                                    disabled={disabled}
                                    value={customerData?.id_town}
                                    onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      id_town: e.target.value
                                    }));
                                  }}
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
                                    onInput={(e) => {
                                        setData((prev) => ({
                                          ...prev,
                                          town_name: e.target.value
                                        }));
                                      }}
                                    defaultValue={customerData?.town_name}
                                    id="town_name"
                                    disabled={disabled}
                                    onChange={formChangeHandler}
                                    name="town_name"
                             />

                            </div><div className="flex flex-col gap-2">
                                <label htmlFor="zip_code">
                                    Postanski broj:
                                </label>
                                <input
                                type={`text`}
                                    className={`max-sm:text-sm py-[0.8rem] border-0 bg-[#f5f5f6] rounded-lg`}
                                    onInput={(e) => {
                                        setData((prev) => ({
                                          ...prev,
                                          zip_code: e.target.value
                                        }));
                                      }}
                                    defaultValue={customerData?.zip_code}
                                    disabled={disabled}
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
                            onInput={(e) => {
                                setData((prev) => ({
                                  ...prev,
                                  note: e.target.value
                                }));
                              }}
                            defaultValue={customerData?.note}
                            onChange={formChangeHandler}
                            disabled={disabled}
                            className={`max-sm:text-sm h-[58px]  text-black border-none 
                                  focus:ring-0 bg-[#f5f5f6] max-xl:mx-3 rounded-lg`}
                            placeholder="Napomena"
                        />
                    </div>
                    <div className="termsAgree flex items-center md:w-[70%]">
                        <input
                            type="checkbox"
                            id="set_default"
                            name="set_default"
                            disabled={disabled}
                            onChange={() => {
                                setData({
                                  ...data,
                                  set_default: data.set_default === 1 ? 0 : 1
                                })
                              }}
                              onInput={(e) => {
                                setData((prev) => ({
                                  ...prev,
                                  set_default: e.target.value
                                }));
                              }}
                            defaultValue={customerData?.set_default}
                            className="focus:ring-0 focus:border-none focus:outline-none text-[#191919] bg-croonus-3 mr-[0.4rem] rounded-sm"
                        />
                        <label
                            htmlFor="set_default"
                            className="max-md:text-xs text-croonus-1"
                        >
                            Podesite kao podrazumevanu adresu.
                        </label>
                    </div>
                </div>
                <div>
                    <p className="text-[#a7a7a7] mt-4 block">*Ukoliko ste pravno lice:</p>
                    <div className="grid gap-3 grid-cols-3 my-4 md:w-[70%]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="company_name">
                                Naziv kompanije:
                            </label>
                            <input
                                type="text"
                                name="company_name"
                                id="company_name"
                                disabled={disabled}
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      company_name: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.company_name}
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
                                disabled={disabled}
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      pib: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.pib}
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
                                disabled={disabled}
                                onInput={(e) => {
                                    setData((prev) => ({
                                      ...prev,
                                      maticni_broj: e.target.value
                                    }));
                                  }}
                                defaultValue={customerData?.maticni_broj}
                                onChange={formChangeHandler}
                                placeholder="Matični broj"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <button onClick={() => setDisabled(false)} className="bg-croonus-3 text-white py-[0.8rem] px-[2rem] hover:bg-opacity-80 mr-4">Izmena informacija</button>
                        <button onClick={changeInputHandler}  className="bg-black text-white py-[0.8rem] px-[2rem] hover:bg-opacity-80">Sačuvaj izmene</button>
                     </div>
                </div>
            </div>
        </>
        )
};

export default Shipping;



