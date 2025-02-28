
"use client"
import { useEffect, useState } from 'react';
import { get } from '@/app/api/api';
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import back from '../../assets/Icons/right-chevron.png'
import noimage from '../../assets/Images/missing.png'



const Order = () => {
    const [previousOrders, setPreviousOrders] = useState();
    const path = useParams();
    const id = path?.id;

    const router = useRouter();

    const handleGoBack = () => {
      router.back();
    };
 
  
  useEffect(() => {
    const fetchPreviousOrders = async() => {
        const fetchPreviousOrders = await get(`/customers/previous-orders/${id}`).then(
        (response) => {
            setPreviousOrders(response?.payload)
            }
        )
        return fetchPreviousOrders;
        };
        fetchPreviousOrders();
        },[])
    

  
    return (
        <>
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
            <div className='mb-[4rem]'>
                <div className='bg-[#f8f8f8] rounded-lg p-[1.4rem] md:w-[90%] mb-[3rem]'>
                <h1 className="text-3xl pb-0 mb-[1rem] ml-[3rem]">Detalji porudžbenice</h1>
                <h3 className="text-base text-[#919191] font-normal max-sm:ml-[4rem]">Porudžbenica <span className='font-medium'>{previousOrders?.order?.slug}</span></h3>
                </div>
                <div className='flex'>
                <p className='font-light bg-croonus-gray px-[1.4rem] py-[0.8rem] rounded-lg'>Kreirana: <span className='font-medium'>{previousOrders?.order?.created_at}</span></p>
                <p className='font-light bg-croonus-gray px-[1.4rem] py-[0.8rem] rounded-lg mx-[0.6rem]'>Način dostave: <span className='font-medium'>{previousOrders?.order?.delivery_method}</span></p>
                <p className='font-light bg-croonus-gray px-[1.4rem] py-[0.8rem] rounded-lg'>Način plaćanja: <span className='font-medium'>{previousOrders?.order?.payment_method}</span></p>
                </div>
                <div className='mt-[2rem]'>
                <table className="table-fixed max-md:w-full w-[90%] mr-auto my-1rem table max-sm:hidden">
                    <tbody>
                        <tr className="bg-croonus-2 divide-x divide-white text-white">
                            <td className=" rounded-tl-lg pl-[1.4rem] py-[0.7rem]" colSpan="2">
                            Proizvod
                            </td>
                            <td className=" pl-[1.4rem] py-[0.7rem]">
                            SKU
                            </td>
                            <td className=" pl-[1.4rem] py-[0.7rem]">
                            Cena
                            </td>
                            <td className=" pl-[1.4rem] py-[0.7rem]">
                            Količina
                            </td>
                            <td className=" rounded-tr-lg pl-[1.4rem] py-[0.7rem]">
                            Ukupno
                            </td>
                        </tr>
                        {previousOrders?.items?.map((order, index) =>
                            {
                                return(
                            <>
                            
                            <tr className={`divide-x divide-white ${index % 2 !== 0 ? "bg-[#ededed]" : "bg-croonus-gray"}`}>
                                <td colSpan="2" className=" pl-[1.4rem] py-[0.1rem]" >
                                    <div className='flex my-[0.2rem] items-center'>
                                    <div className='mr-[1rem]'>
                                        {order?.basic_data?.image ? (
                                            <>
                                             <Image
                                                src={order?.basic_data?.image} 
                                                width={80} 
                                                height={80}
                                                alt="Product image"/>
                                            </>
                                        ): (
                                            <>
                                             <Image
                                            src={noimage} 
                                            width={80} 
                                            height={80}
                                            alt="Product image"/>
                                            </>
                                        )}
                                       
                                    </div>
                                    <div>
                                        <h5 className='text-base font-medium'>{order?.basic_data?.name}</h5>
                                        <p className='text-sm text-[#939393]'>{order?.basic_data?.brand_name}</p>
                                    </div>
                                    </div>
                                </td>
                                <td className=" pl-[1.4rem] py-[0.7rem]">
                                    <p>{order?.basic_data?.sku}</p>
                                </td>
                   
                                <td className=" pl-[1.4rem] py-[0.7rem]">
                                    {order?.price?.price_with_vat}
                                </td>
                                <td className=" pl-[1.4rem] py-[0.7rem]">
                                    {order?.price?.quantity}
                                </td>
                                <td className=" pl-[1.4rem] py-[0.7rem]">
                                    {order?.price?.total}
                                </td>
                            </tr>
                        </>)})}
                    </tbody>
                </table>
                <div className='sm:hidden'>
                {previousOrders?.items?.map((order, index) =>
                {
                return(
                <>
                <div className='border rounded-lg border-[#f0f0f0] px-[1rem] pb-[1rem] mb-[2rem]'>
                    <div className='mr-[1rem]'>
                        {order?.image ? (
                        <>
                            <Image
                            src={order?.image} 
                            width={160} 
                            height={160}
                            alt="Product image"/>
                            </>
                            ): (
                            <>
                            <Image
                            src={noimage} 
                            width={160} 
                            height={160}
                            alt="Product image"/>
                            </>
                            )}
                    </div>
                    <h5 className='text-lg font-medium'>{order?.name}</h5>
                    <p className='text-sm text-[#939393] border-b border-croonus-3'>{order?.brand_name}</p>
                    <p className='font-light mt-[1rem]'>SKU: <span className='font-medium'>{order?.sku}</span></p>
                    <p className='font-light mt-[0.2rem]'> Cena: <span className='font-medium'>{order?.cost?.per_item?.with_vat}</span></p>
                    <p className='font-light mt-[0.2rem]'> Količina:
                    <span className='font-medium'>{order?.cost?.quantity}/</span>
                    </p>
                    <p className='font-light mt-[0.2rem]'> Ukupna cena: <span className='font-medium'>{order?.cost?.total?.with_vat}</span>
                    </p>
                </div>
                        </>)})}
                </div>
            </div>
            </div>
            
        </>
        )
};

export default Order;