import React from 'react'
import Image from 'next/image'
import Cancel from "../../assets/Icons/cancel.png";

const DeliveryModal = ({ deliveryModal, setDeliveryModal}) => {
  return (
    <div
    className={
      deliveryModal
        ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
        : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
    }
  >
    <div
      className={`
  
      bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] md:h-[490px]`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold">Dostava</h1>
        <Image
          src={Cancel}
          alt="cancel"
          width={20}
          height={20}
          onClick={() => setDeliveryModal(false)}
          className="cursor-pointer"
        />
      </div>
      <div className="mt-[4.375rem]">
        <p className="font-light text-[15px]">
          Mesto isporuke poruče ne robe mora se nalaziti na teritoriji
          Republike Srbije. Isporuku proizvoda poručenih na sajtu
          croonus.com vrši kurirska služba „YU – PD Express“ d.o.o .
          Beograd – D Express, na teritoriji Republike Srbije, radnim
          danima u periodu od 8 do 16h, na adresu primaoca pošiljke.
        </p>
        <p className="font-light mt-[30px] text-[15px]">
          U slučaju da je na porudžbenici više artikala, velika je
          verovatnoće da nemamo sve artikle na jednom mestu, zbog čega
          ćete porudžbinu dobiti u više pošiljki. Nakon obrade
          porudžbine, na vašu e-mail adresu stići će obaveštenje o
          statusu porudžbine.
        </p>
        <p className="font-light mt-[30px] text-[15px]">
          Po Zakonu o zaštiti potrošača, član 32 – Trgovac je dužan da u
          roku od 30 dana od dana zaključenja ugovora na daljinu i
          ugovora koji se zaključuje izvan poslovnih prostorija izvrši
          isporuku robe. Okvirni rok isporuke je do 3 radna dana. Rok
          isporuke može biti i duži od navedenog (3 radna dana), u
          vanrednim slučajevima poput velikih gužvi, pandemija,
          neprohodnosti puteva u slučaju vremenskih nepogoda i sl.
          Kurirska služba je u obavezi da isporuku vrši što efikasnije u
          skladu sa svojim mogućnostima i poslovnim kapacitetima.
        </p>
      </div>
    </div>
  </div>
  )
}

export default DeliveryModal