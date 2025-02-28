"use client";
import Link from "next/link";

const PravoNaOdustajanje = () => {
  return (
    <div className="mt-[1.2rem] md:mt-[9rem] w-[95%] mx-auto md:w-[60%]">
      <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
        Pravo na odustajanje{" "}
      </h1>
      <p>
      Kupac ima pravo na jednostrani raskid ovog ugovora - odustajanje od ugovora, bez obzira na razloge, u roku od 14 (četrnaest) dana od dana kada je roba dospela u njegovu državinu ili državinu lica koje je kupac ovlastio za prijem robe.
      </p>
      <p>
      Ovde možete preuzeti <Link href="/doc/izjava-o-odustajanju-londessa.pdf" target="_blank" download className="underline text-croonus-2 font-bold">Obrazac za odustajanje od kupovine</Link>, a jedan primerak će vam biti prosleđen sa robom. U slučaju odustanka, dužni ste da vratite primljenu robu bez oštećenja i tragova korišćenja, te bez drugih obaveza povodom raskida ugovora, osim samih troškova vraćanja. Mi ćemo Vam vratiti primljeni novac bez odlaganja, a najkasnije u roku od 15 dana od dana raskida ugovora.
      </p>
      <p>
      Izjava kojom potrošač odustaje od ugovora proizvodi pravno dejstvo ako je data u pisanoj formi.
      </p>
      <p>
      Odustankom od ugovora prestaju obaveze ugovornih strana da izvrše odnosno zaključe ugovor.
      </p>
    </div>
  );
};

export default PravoNaOdustajanje;
