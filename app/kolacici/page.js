export const metadata = {
  title: "Kolačići | Londessa",
  description: "Dobrodošli na Londessa Online Shop",

  robots: "index, follow",
  openGraph: {
    title: "Kolačići | Londessa",
    description: "Dobrodošli na Londessa Online Shop",
    type: "website",
    locale: "sr_RS",
  },
};

const Cookies = () => {
  return (
    <div className="mt-[1.2rem] md:mt-[9rem] md:w-[60%] max-md:w-[95%] mx-auto">
      <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
        Kolačići{" "}
      </h1>
      <div>
        <div>
          <h5>&Scaron;ta je kolačić?</h5>
          <p>
            &nbsp;Kolačić (Cookie) je informacija poslata va&scaron;em
            računaru/drugom uređaju od strane veb stranice koju posetite.
            Kolačići obično čuvaju va&scaron;e postavke za veb stranicu, kao
            &scaron;to su željeni jezik ili adresa. Kasnije, kada opet otvorite
            istu veb stranicu internet pretraživač &scaron;alje nazad kolačiće
            koji pripadaju toj stranici. Ovo omogućava stranici da prikaže
            informacije prilagođene va&scaron;im već iskazanim potrebama.
            Kolačići mogu da čuvaju &scaron;irok spektar informacija uključujuć
            podatke o ličnosti (kao &scaron;to je va&scaron;e ime ili ei i mail
            adresa). Ipak, ove informacije mogu biti sačuvane jedino ako vi to
            omogućite veb stranice ne mogu da dobiju pristup informacijama koji
            im vi niste dali i ne mogu da pristupe drugim datotekama na
            va&scaron;em računaru/drugom uređaju. Zadate aktivnosti čuvanja i
            slanja kolačića vama nisu vidljive. Ipak, možete da promenite
            va&scaron;e postavke internet pregledača kako biste mogli sami da
            birate da li hoćete da zahteve za čuvanje kolačića odobrite ili
            odbijete, izbri&scaron;ete sačuvane kolačiće automatski pri
            zatvaranju Internet pregledača i slično.
          </p>
          <p>
            <strong>&nbsp;</strong>
          </p>
          <h5>
            <strong>Pregled privatnosti</strong>
          </h5>
          <p>
            &nbsp;Ova veb lokacija koristi kolačiće da pobolj&scaron;a
            va&scaron;e iskustvo dok se krećete kroz veb lokaciju. Od toga,
            kolačići koji su kategorisani kao neophodni se čuvaju u va&scaron;em
            pretraživaču jer su neophodni za rad osnovnih funkcionalnosti veb
            stranice. Takođe koristimo kolačiće treće strane koji nam pomažu da
            analiziramo i razumemo kako koristite ovu veb lokaciju. Ovi kolačići
            će biti sačuvani u va&scaron;em pretraživaču samo uz va&scaron;u
            saglasnost. Takođe imate opciju da isključite ove kolačiće. Ali
            odustajanje od nekih od ovih kolačića može uticati na va&scaron;e
            iskustvo pregledanja.
          </p>
          <p>&nbsp;</p>
          <h5>
            <strong>Neophodni</strong>
            <strong>&nbsp;(Uvek uključeno)</strong>
          </h5>
          <p>
            Neophodni kolačići su apsolutno neophodni za pravilno funkcionisanje
            veb stranice. Ovi kolačići anonimno obezbeđuju osnovne
            funkcionalnosti i bezbednosne karakteristike veb stranice.
          </p>
          <p>&nbsp;</p>
          {/* <table width="545">
            <thead>
              <tr>
                <td width="158">Kolačići</td>
                <td width="89">Trajanje</td>
                <td width="297">Opis</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="158">cookielawinfo-checkbox-analytics</td>
                <td width="89">11 meseci</td>
                <td width="297">
                  Kolačić se koristi za čuvanje saglasnosti korisnika za
                  kolačiće u kategoriji &bdquo;Analitika&ldquo;.
                </td>
              </tr>
              <tr>
                <td width="158">cookielawinfo-checkbox-functional</td>
                <td width="89">11 meseci</td>
                <td width="297">
                  Kolačić je postavljen na osnovu saglasnosti za kolačiće GDPR-a
                  da evidentira saglasnost korisnika za kolačiće u kategoriji
                  &bdquo;Funkcionalni&ldquo;.
                </td>
              </tr>
              <tr>
                <td width="158">cookielawinfo-checkbox-necessary</td>
                <td width="89">11 meseci</td>
                <td width="297">
                  Kolačići se koriste za čuvanje saglasnosti korisnika za
                  kolačiće u kategoriji &bdquo;Neophodno&ldquo;.
                </td>
              </tr>
              <tr>
                <td width="158">cookielawinfo-checkbox-others</td>
                <td width="89">11 meseci</td>
                <td width="297">
                  Kolačić se koristi za čuvanje saglasnosti korisnika za
                  kolačiće u kategoriji &bdquo;Ostalo&ldquo;.
                </td>
              </tr>
              <tr>
                <td width="158">cookielawinfo-checkbox-performance</td>
                <td width="89">11 meseci</td>
                <td width="297">
                  Kolačić se koristi za čuvanje saglasnosti korisnika za
                  kolačiće u kategoriji &bdquo;Performanse&ldquo;.
                </td>
              </tr>
              <tr>
                <td width="158">viewed_cookie_policy</td>
                <td width="89">11 meseci</td>
                <td width="297">
                  Kolačić postavlja GDPR Cookie Consent i koristi se za čuvanje
                  da li je korisnik pristao na upotrebu kolačića. Ne čuva
                  nikakve lične podatke.
                </td>
              </tr>
            </tbody>
          </table> */}
          <p>&nbsp;</p>
          <h5>
            <strong>Funkcionalni (Neobavezni)</strong>
          </h5>
          <p>
            Funkcionalni kolačići pomažu u obavljanju određenih funkcija kao
            &scaron;to je deljenje sadržaja veb lokacije na platformama
            dru&scaron;tvenih medija, prikupljanje povratnih informacija i druge
            funkcije trećih strana.
          </p>
          <p>&nbsp;</p>
          <h5>
            <strong>Performanse (Neobavezni)</strong>
          </h5>
          <p>
            Kolačići učinka se koriste za razumevanje i analizu ključnih indeksa
            učinka veb stranice koji pomažu u pružanju boljeg korisničkog
            iskustva za posetioce.
          </p>
          <p>&nbsp;</p>
          <h5>
            <strong>Analitika (Neobavezni)</strong>
          </h5>
          <p>
            Analitički kolačići se koriste za razumevanje načina na koji
            posetioci komuniciraju sa veb lokacijom. Ovi kolačići pomažu u
            pružanju informacija o metrikama broju posetilaca, stopi posete samo
            jedne stranice, izvoru saobraćaja itd.
          </p>
          <p>&nbsp;</p>
          <h5>
            <strong>Marketing (Neobavezni)</strong>
          </h5>
          <p>
            Kolačići za ogla&scaron;avanje se koriste da bi posetiocima pružili
            relevantne oglase i marketin&scaron;ke kampanje. Ovi kolačići prate
            posetioce na veb lokacijama i prikupljaju informacije za pružanje
            prilagođenih oglasa.
          </p>
          <p>&nbsp;</p>
          <h5>
            <strong>Ostali (Neobavezni)</strong>
          </h5>
          <p>
            Ostali nekategorisani kolačići su oni koji se analiziraju i
            jo&scaron; uvek nisu klasifikovani u kategoriju.
          </p>
        </div>
      </div>
      <div>
        <br />
      </div>
    </div>
  );
};

export default Cookies;
