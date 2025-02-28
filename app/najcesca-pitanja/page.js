export const metadata = {
  title: "Najčešća pitanja | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Najčešća pitanja | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

import Link from "next/link";

const FAQ = () => {
  return (
    <div className="mt-[1.2rem] md:mt-[9rem] w-[95%] mx-auto md:w-[60%]">
      <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
        Najčešća pitanja{" "}
      </h1>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#e10000] text-lg font-semibold">
          Da li mogu da poručim robu preko telefona?
        </h1>
        <p>
          Poručivanje robe se vrši putem sajta (nije moguće putem telefona), ali
          je moguće naručiti robu putem društvenih mreža. Robu naručenu putem
          društvenih mreža jedino je moguće platiti pouzećem. Više informacija o
          poručivanju putem sajta možete pronaći na stranici{" "}
          <Link href="/kako-kupiti">„Kako kupiti“.</Link>
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#e10000] text-lg font-semibold">
          Kako da znam da sam uspešno poručio/la artikal putem sajta?{" "}
        </h1>
        <p>
          Kada izvršite uspešnu kupovinu putem našeg sajta prikazaće Vam se
          stranica sa brojem porudžbine i porukom da ste uspešno poručili.
          Takođe dobićete mail sa svim podacima o vašoj porudžbini.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#e10000] text-lg font-semibold">
          Kako da platim poručeni proizvod?
        </h1>
        <div>
          <div>
            <p>
              Plaćanje poručene robe preko sajta se može izvr&scaron;iti na dva
              načina:
            </p>
            <ul>
              <li>
                pouzećem &ndash; prilikom preuzimanja robe, isključivo u
                gotovini;
              </li>
              <li>platnim karticama</li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#e10000] text-lg font-semibold">
          Da li je moguće plaćanje na rate?
        </h1>
        <p>
          Plaćanje na rate je moguće samo prilikom kupovine u prodavnicama,
          ukoliko posedujete platnu karticu koja ima tu mogućnost, ili ako
          plaćate čekovima građana.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#e10000] text-lg font-semibold">
          Da li plaćam troškove isporuke i koliko iznose?{" "}
        </h1>
        <div>
          <div>
            <p>
              Ukoliko vrednost va&scaron;e porudžbine iznosi preko 3,000
              RSD,&nbsp;<strong>isporuka je besplatna</strong>. Ukoliko su ispod
              navedene sume, tro&scaron;kove po&scaron;tarine snosi kupac i oni
              iznose 300 dinara sa PDV-om.
            </p>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#e10000] text-lg font-semibold">
          Da li postoji mogućnost zamene?
        </h1>
        <div>
          <div>
            <p>
              Prilikom online kupovine, u slučaju da vam je poručeni artikal
              neodgovarajući, moguća je zamena za drugu zapreminu, ukoliko je
              imamo na stanju ili za neki drugi artikal iz na&scaron;eg
              asortimana. Ukoliko vam je stigla veličina koju ste poručili. ali
              ipak menjate ili vraćate artikal, tro&scaron;kove povrata
              snosite Vi. Ukoliko Vam je stigla pogre&scaron;na veličina ili
              pogre&scaron;an artikal na&scaron;om gre&scaron;kom,
              tro&scaron;kove povrata snosi Londessa. Vi&scaron;e informacija o
              zameni kupljenog proizvoda možete pronaći na stranici &bdquo;
              <u>
                <Link href="/reklamacije">Reklamacije&ldquo;</Link>
              </u>
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default FAQ;
