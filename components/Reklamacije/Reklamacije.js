"use client";

import Link from "next/link";

const Reklamacije = () => {
  return (
    <div className="mt-[1.2rem] md:mt-[9rem] max-md:w-[95%] mx-auto md:w-[60%]">
      <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
        Reklamacije
      </h1>

     
      <p>
      Pored reklamacije radi ostvarenja prava po osnovu saobraznosti, možete izjaviti reklamaciju i zbog pogrešno obračunate cene i drugih nedostataka. Reklamaciju možete izjaviti:</p>
      <p>• pisanim putem na adresu sedišta Prodavca: {process.env.ADDRESS}</p>
      <p>• elektronskim putem na mail adresu: londessaonline@yahoo.com uz obaveznu dostavu dokaza o kupovini i proizvoda (račun, fakturu, slip) robe koja se reklamira.</p>
      <p> Elektronskim putem ćemo potvrditi prijem reklamacije, odnosno saopštiti broj pod kojim je zavedena Vaša reklamacija u Evidenciji primljenih reklamacija.</p>
      <p>

Odgovor na reklamaciju ćete dobiti pisanim ili elektronskim putem bez odlaganja, a najkasnije u roku od 8 dana od dana prijema reklamacije. Odgovor prodavca na reklamaciju potrošača mora da sadrži odluku da li prihvata reklamaciju, obrazloženje ako ne prihvata reklamaciju, izjašnjenje o zahtevu potrošača o načinu rešavanja i konkretan predlog u kom roku će i kako rešiti reklamaciju ukoliko je prihvata. </p>
<p> Rok za rešavanje po reklamaciji ne može da bude duži od 15 dana od dana podnošenja reklamacije. Produžavanje roka za rešavanje reklamacija moguće je samo jednom. Ukoliko niste u mogućnosti da nam dostavite ambalažu robe, to ne može biti uslov za rešavanje reklamacije niti razlog za odbijanje otklanjanja nesaobraznosti.</p>
<p>Potrošač je u skladu sa članom 55. stavom 10. Zakona o zaštiti potrošača, dužan da se izjasni na ovaj Odgovor i to u roku od 3 (tri) dana počev od dana prijema odgovora prodavca, dostavljanjem odgovora na e-mail adresu {process.env.EMAIL} ili preporučenom pošiljkom na adresu prodavca {process.env.ADDRESS}. Ukoliko se potrošač ne izjasni u napred navedenom roku, smatraće se da nije saglasan sa predlogom prodavca za rešavanje potrošačkog spora.
      </p>
    </div>
  );
};

export default Reklamacije;
