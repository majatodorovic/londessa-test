export const metadata = {
    title: "Isporuka | Londessa",
    description: "Dobrodošli na Londessa Online Shop",

    robots: "index, follow",
    openGraph: {
        title: "Isporuka | Londessa",
        description: "Dobrodošli na Londessa Online Shop",
        type: "website",
        locale: "sr_RS",
    },
};

const Isporuka = () => {
  return (
    <div className="max-md:w-[95%] md:w-[60%] mx-auto mt-[1.2rem] md:mt-[9rem]">
      <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
        Isporuka{" "}
      </h1>
      <p>Dostavu pošiljki vrši kurirska služba AKS ili druga firma registrovana za slanje pošiljki i moguća je samo na teritoriji Srbije. </p>
      <p> dostave plaća kupac/korisnik zajedno sa proizvodima kuriru prilikom preuzimanja pošiljke. Cena isporuke za sve porudžbin preko 5000 RSD je besplatna.</p>
      <p>Uobičajeni rok za isporuku porudžbina je od 5 do 7 radnih dana (u zavisnosti od praznika i perioda povećanog obima posla kurirske službe). Isporuka porudžbina se ne vrši subotom.</p>
      <p>Kupac je odgovoran za štetu koja nastane propuštanjem da preuzme robu koju mu je poslao Prodavac u skladu sa Ugovorom i ovim Uslovima korišćenja. Pod štetom se podrazumeva oštećenje na robi, kao i troškovi koje Prodavac ima zbog propuštanja Kupca da preuzme robu, kao što su: troškovi čuvanja, prepakivanja, vraćanja robe i slično.
</p>
    </div>
  );
};

export default Isporuka;
