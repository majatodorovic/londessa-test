export const metadata = {
  title: "Zaštita privatnosti | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Zaštita privatnosti | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};
const ZastitaPrivatnosti = () => {
  return (
    <div className="mt-[1.2rem] md:mt-[9rem] md:w-[60%] max-md:w-[95%] mx-auto">
      <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
        Zaštita privatnosti{" "}
      </h1>
      <h5>
        <strong>Podaci o rukovaocu</strong>
      </h5>
      <p>
        Odgovornost za obradu podataka o ličnosti u svojstvu rukovaoca snosi:
      </p>
      <p>
        Naziv:&nbsp;
        <strong>
          JELENA PETROVIĆ PR ZANATSKO TRGOVINSKA RADNJA NA VELIKO LONDESSA SRB
          KONJEVIĆI
        </strong>
      </p>
      <p>
        Adresa:&nbsp;<strong>{process.env.ADDRESS}</strong>
      </p>

      <p>
        U slučaju bilo kakvih pitanja ili zahteva u vezi postupanja ili
        za&scaron;tite Va&scaron;ih ličnih podataka, možete nam se obratiti na
        e-mail adresu:&nbsp; {process.env.EMAIL}
      </p>
      <p>
        U ime Londessa Internet prodaje &ndash; obavezujemo se da ćemo čuvati
        privatnost podataka svih na&scaron;ih kupaca. Da bismo izvr&scaron;ili
        prodaju, odnosno uspe&scaron;no obradili va&scaron;u porudžbinu potrebni
        su nam va&scaron;i lični &ndash; osnovni podaci.
      </p>
      <p>
        Podaci koje korisnik ostavlja prilikom kupovine na&nbsp;
        <strong>londessa.com</strong> su sledeći:
      </p>
      <ol className="list-decimal ml-10 py-2">
        <li>Ime i prezime</li>
        <li>E-mail adresa</li>
        <li>Adresa prebivali&scaron;ta/boravka</li>
        <li>Broj telefona</li>
        <li>
          &Scaron;ifra koju korisnik unosi prilikom kreiranja korisničkog
          naloga.
        </li>
      </ol>
      <p>
        Takođe, u cilju pružanja &scaron;to kvalitetnije usluge i informisanja
        korisnika, email korisnika može biti iskori&scaron;ćen u svrhu
        marketin&scaron;kih kampanja (newsletter), ali kupcima dajemo mogućnost,
        ako žele, da se odjave sa mailing liste.
      </p>
      <p>
        Va&scaron;i podaci se strogo čuvaju i dostupni su samo zaposlenima
        kojima su nužni za obavljanje posla, pa se ovim obavezujemo da
        prikupljene podatke nećemo koristiti u bilo koje druge svrhe, niti ćemo
        iste učiniti dostupnim bilo kojem trećem licu.
      </p>
      <p>
        <strong>Važno obave&scaron;tenje</strong>
        <strong>
          <u>
            <br />
          </u>
        </strong>
        U skladu sa uvođenjem eFiskalizacije, a na osnovu tehničkog upustva
        PORESKE UPRAVE, u obavezi smo da od potro&scaron;ača tražimo{" "}
        <strong>broj lične karte/paso&scaron;a</strong>, i to samo u situaciji
        kada potro&scaron;aču treba izvr&scaron;iti povrat novca.
      </p>
      <p>
        Sledi tekst ovog tehničkog uputsva koji nas obavezuje na prikupljenje
        navedenih ličnih podataka:
      </p>
      <p>
        <strong>
          Tehničko uputstvo za administrativni i tehnički pregled
          funkcionalnosti ESIR-a ili L-PFR-a, Verzija 1.13
        </strong>
        <strong>
          <br />
          Promet Refundacija (PR) u slučaju povraćata novca kupcu
          <br />
        </strong>
        Povrat novca kupcu za već kupljenu robu ili uslugu ili odustajanje od
        kupovine u slučaju prethodno plaćenog avansa, obveznik fiskalizacije
        evidentira izdavanje fiskalnog računa Promet Refundacija (PR) ili Avans
        Refundacija (AP), pri čemu unosi:
      </p>
      <ul>
        <li>
          Identifikaciju kupca (<strong>broj lične karte</strong> ili drugi
          dokument u skladu sa &scaron;ifarnikom za identifikaciom kupca).
        </li>
      </ul>
      <p>
        <br />
      </p>
      <p>
        S obzirom da je lične podatke moguće obradjivati isključivo uz prethodnu
        saglasnost potro&scaron;ača &ndash;{" "}
        <strong>
          Zakon o za&scaron;titi podataka o ličnosti (&bdquo;Sl. glasnik
          RS&ldquo;, br. 87/2018)
        </strong>
        , ovom prilikom Vas obave&scaron;tavamo da je za povrat novčanih
        sredstava neophodno da nam date broj lične karte/paso&scaron;a, i da
        date saglasnost za obradu istih, a mi se obavezujemo da ove lične
        podatke nećemo koristiti u bilo koje druge svrhe.
      </p>
      <p>
        Podsećamo Vas da svaka Va&scaron;a kupovina preko na&scaron;eg sajta
        znači da ste prethodno pročitali uslove kori&scaron;ćenja na&scaron;ih
        usluga i da ste saglasni sa njima u potpunosti, &scaron;to uključuje i
        Va&scaron;u saglasnost da nam dostavite broj lične karte/paso&scaron;a i
        to samo u situaciji kada potro&scaron;aču treba izvr&scaron;iti povrat
        novca.
      </p>
      <p>
        Ukoliko želite da povučete saglasnost za obradu podataka, molimo da nam
        uputite zahtev na sledeću email adresu:{" "}
        <a href={`mailto:${process.env.EMAIL}`}>{process.env.EMAIL}</a>. Mi ćemo
        na osnovu Va&scaron;eg zahteva dalje postupiti u skladu sa zakonom.
      </p>
      <h2>&nbsp;</h2>
      <h5>
        <strong>
          Opcije prigovora o upotrebi kolačića (cookies) i njihovo uklanjanje
        </strong>
      </h5>
      <p>
        Vi, kao korisnik, u svakom momentu imate potpunu kontrolu nad kolačićima
        i njihovom upotrebom u okviru Va&scaron;eg Internet pregledača (Chrome,
        Safari, Firefox, Edge, Explorer, Opera).
      </p>
      <p>
        Imate mogućnost povlačenja saglasnosti o upotrebi kolačića u svakom
        momentu, a možete i da odbijete upotrebu kolačića koji ne zahtevaju
        Va&scaron; explicitni pristanak, pod uslovom da ovi kolačići nisu
        neophodni i da je njihovo uklanjanje tehnički izvodljivo.
      </p>
      <p>
        Moramo naglasiti da ukoliko odbijete upotrebu kolačića u Va&scaron;em
        pregledaču, postoji velika verovatnoća da nećete biti u mogućnosti da u
        potpunosti iskoristite potpunu funkcionalnost na&scaron;eg sajta.
        Na&scaron;a je preporuka da zbog Va&scaron;eg korisničkog iskustva
        omogućite upotrebu kolačića (cookies) u okviru Va&scaron;eg Internet
        pregledača.
      </p>
      <h2>&nbsp;</h2>
      <h5>
        <strong>
          Opcije za prigovor o upotrebi kolačića i njihovo uklanjanje
        </strong>
      </h5>
      <p>
        Vi, kao korisnik, imate nekoliko mogućnosti kada je u pitanju prigovor o
        upotrebi kolačića ili povlačenje Va&scaron;e saglasnosti o njihovoj
        upotrebi (brisanje kolačića).
      </p>
      <p>
        Svi najpopularniji veb pregledači nude mogućnost blokade upotrebe
        kolačića. Kliknite na linkove dole, u zavisnosti od toga koji pregledač
        koristite:
      </p>
      <ol className="list-inside list-none">
        <li className="text-[#e10000] ml-5 py-1">
          <a
            href="https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies"
            rel="nofollow noopener"
            target="_blank"
          >
            Microsofts Windows Internet Explorer
          </a>
        </li>
        <li className="text-[#e10000] ml-5 py-1">
          <a
            href="https://support.microsoft.com/en-gb/help/10635/windows-phone-change-privacy-and-other-browser-settings"
            rel="nofollow noopener"
            target="_blank"
          >
            Microsoft&rsquo;s Windows Internet Explorer Mobile
          </a>
        </li>
        <li className="text-[#e10000] ml-5 py-1">
          <a
            href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
            rel="nofollow noopener"
            target="_blank"
          >
            Mozilla Firefox
          </a>
        </li>
        <li className="text-[#e10000] ml-5 py-1">
          <a
            href="https://support.google.com/chrome/answer/95647?hl=en-GB"
            rel="nofollow noopener"
            target="_blank"
          >
            Google Chrome dektop verzija
          </a>
        </li>
        <li className="text-[#e10000] ml-5 py-1">
          <a
            href="https://support.google.com/chrome/answer/2392709?hl=en-GB&co=GENIE.Platform%3DAndroid&oco=1"
            rel="nofollow noopener"
            target="_blank"
          >
            Google Chrome mobilna verzija
          </a>
        </li>
        <li className="text-[#e10000] ml-5 py-1">
          <a
            href="https://support.apple.com/kb/PH17191?locale=en_US&viewlocale=de_DE"
            rel="nofollow noopener"
            target="_blank"
          >
            Apple Safari desktop verzija
          </a>
        </li>
        <li className="text-[#e10000] ml-5 py-1">
          <a
            href="https://support.apple.com/en-gb/HT201265"
            rel="nofollow noopener"
            target="_blank"
          >
            Apple Safari mobilna verzija
          </a>
        </li>
      </ol>
      <p>
        Takođe, imate mogućnost da upotrebom ekstenzija za Va&scaron; veb
        pregledač deaktivirate pojedine kolačiće i odredite koji kolačići su u
        upotrebi. Instalacija ovih ekstenzija je prilično jednostavna i brza i
        moguća je za većinu popularnih Internet pregledača.
      </p>
      <p>
        Na&scaron;a preporuka je ekstenzija pod nazivom Ghostery{" "}
        <a
          href="https://www.ghostery.com/"
          rel="nofollow noopener"
          target="_blank"
        >
          https://www.ghostery.com/
        </a>
      </p>
    </div>
  );
};

export default ZastitaPrivatnosti;
