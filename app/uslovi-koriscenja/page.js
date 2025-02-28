import Link from "next/link";

export const metadata = {
    title: "Uslovi korišćenja | Londessa",
    description: "Dobrodošli na Londessa Online Shop",

    robots: "index, follow",
    openGraph: {
        title: "Uslovi korišćenja | Londessa",
        description: "Dobrodošli na Londessa Online Shop",
        type: "website",
        locale: "sr_RS",
    },
};

const UsloviKoriscenja = () => {
  return (
    <div className="mt-[1.2rem] md:mt-[9rem] w-[95%] mx-auto md:w-[60%]">
      <h1 className="text-center pb-7 text-[#262626] text-[1.313rem] font-bold">
        Uslovi korišćenja{" "}
      </h1>
      <p>Pre pristupanja online trgovini, a shodno članu 12. Zakona o zaštiti potrošača, Trgovac (LONDESSA SRB) obaveštava kupce o zakonom propisanim bitnim elementima ugovora na daljinu:</p>
      <h5 className="mt-4">
        <strong>OSNOVNA OBELEŽJA ROBE I USLUGE:</strong>
      </h5>
      <p>
      Robna marka Londessa je zastupljena na našem tržištu još 1994. godine, kada su se pojavili prvi profesionalni Londessa preparati za kosu, a potom i proizvodi za negu i ulepšavanje noktiju. Danas je Londessa prepoznatljiva po novom, veoma popularnom asortimanu – parfemima Flert, koji su dostupni u originalnoj ambalaži zaštićenoj kod Zavoda za intelektualnu svojinu RS. Osim 280 mirisnih nota ovog parfema, Londessa proširuje parfimerijski brend Flert i na druge preparate, nudeći svojim vernim potrošačima i toaletne vode i losion posle brijanja, lakove za nokte, preparate za negu noktiju, boje za kosu, kao i preparate za negu kose.
      </p>

      <h5 className="mt-4">
        <strong>POSLOVNI PODACI O PRODAVCU:</strong>
      </h5>
      <p>
      LONDESSA SRB (www.londessa.rs) je internet strana čiji je vlasnik sledeći privredni subjekt:
      </p>
      <ul className="ml-3 mt-1">
        <li><span className="font-bold">Poslovno ime:</span> JELENA PETROVIĆ PR ZANATSKO TRGOVINSKA RADNJA NA VELIKO LONDESSA SRB KONJEVIĆI</li>
        <li><span className="font-bold">Sedište:</span> {process.env.ADDRESS}</li>
        <li><span className="font-bold">Matični broj:</span> {process.env.MB}</li>
        <li><span className="font-bold">PIB:</span> {process.env.PIB}</li>
        <li><span className="font-bold">Pretežna delatnost subjekta:</span> {process.env.CODE}</li>
        <li><span className="font-bold">Kontakt:</span> {process.env.EMAIL}</li>
      </ul>
      
      <p className="mt-4">
      Član 5. stav 1. tačka 8. Zakona o zaštiti potrošača propisuje da je ugovor na daljinu ugovor zaključen između trgovca i potrošača u okviru organizovane prodaje ili pružanja usluga na daljinu bez istovremenog fizičkog prisustva trgovca i potrošača, isključivom upotrebom jednog ili više sredstava komunikacije na daljinu do trenutka zaključenja ugovora, uključujući i sam trenutak zaključenja.
      </p>
      <p>
      Posetom ili kupovinom na Internet sajtu i/ili prodavnici https://www.londessa.rs/prihvatate objavljene uslove korišćenja.
      </p>
      <p>
      LONDESSA SRB zadržava pravo da može u svako vreme, bez prethodne najave, promeniti podatke prikazane na bilo kojoj stranici sajta.
      </p>
      <p>Sajt https://www.londessa.rs/ je internet prodavnica koja posluje u skladu sa Zakonom o elektronskoj trgovini i svim ostalim važećim zakonima i propisima u Republici Srbiji.</p>
      
      <h5 className="mt-4">
        <strong>PRODAJNA CENA I NAČIN OBRAČUNAVANJA PRODAJNE CENE</strong>
      </h5>
      <p>
      Proizvodi u online prodavnici su organizovani po kategorijama:
      </p>
      <ul className="mt-1 ml-3">
          <li>• Flert parfemi</li>
          <li>• Toaletne vode</li>
          <li>• Lakovi za nokte</li>
          <li>• Nega noktiju</li>
          <li>• Boje za kosu</li>
          <li>• Razno</li>
          <li>• Nega kose</li>
      </ul>
      <p>
      Ispod svakog proizvoda iz asortimana Prodavca odnosno Trgovca naznačena je cena proizvoda, koja je izražena bez obračunatih troškova dostave, a koja cena troškova dostave će biti obračunata prilikom plaćanja.
      </p>
      <p>
      Kada pronađete proizvod iz određene kategorije koji želite da kupite, izaberite dugme “Dodajte u korpu”.
      </p>
  
      <p>
      Kada ste završili sa dodavanjem proizvoda u korpu i izabrane proizvode želite da poručite putem online kupovine izaberite opciju “Korpa”. U slučaju da se predomislite u vezi nekog od proizvoda, proizvod možete izbaciti iz korpe klikom na dugme “izbriši”.
      </p>
      <p>
      <span className="font-bold">Unos podataka o naručiocu i mestu isporuke</span> - U ovom obaveznom koraku online kupovine neophodno je navesti podatke o naručiocu, adresu na kojoj će paket biti isporučen, mejl adresi na koju će biti dostavljena potvrda o kupovini.
      </p>
      <p>
      U slučaju neispravno unetih podataka, može doći do vraćanja Vaše pošiljke i/ili sporije isporuke, za koju nije odgovoran Prodavac, imajući u vidu da raspolaže podacima za isporuku koje dostave sami Kupci.
      </p>
     
      <h5 className="mt-4">
        <strong> NAČIN PLAĆANJA, NAČIN I ROK ISPORUKE</strong>
      </h5>
      <p>Proizvode koje ste naručili i želite da kupite putem online prodavnice možete da platite pouzećem ili platnim karticama.</p>
      <p>
      Plaćanje pouzećem podrazumeva plaćanje narudžbenice kuriru prilikom preuzimanja pošiljke. U tom slučaju, plaćanje se vrši isključivo gotovinom. Suma koju plaćate jednaka je zbiru vrednosti narudžbenice i troškova isporuke kurirske službe.
      </p>
      <p>
      Narudžbinu možete platiti koristeći Visa, Dina, MasterCard, American Express ili Maestro platnu karticu. Kartica mora biti odobrena od strane banke izdavaoca za online (internet) plaćanje. Prilikom online naručivanja, odabirom odgovarajućeg načina plaćanja bićete preusmereni na stranicu banke Intesa a.d. Beograd koja je zaštićena i sigurna za ovakav način plaćanja. Napominjemo da podaci o Vašoj platnoj kartici nisu dostupni našem sistemu.
      </p>
      <p>
      U slučaju otkaza narudžbine, povrat naplaćenih sredstava Korisniku se vrši isključivo preko VISA, EC/MC i Maestro metoda plaćanja, odnosno isključivo na račun platne kartice storniranjem originalne transakcije.
      </p>
      <p>
      U slučaju vraćanja robe i povrata sredstava kupcu koji je prethodno platio nekom od platnih kartica, delimično ili u celosti, a bez obzira na razlog vraćanja, LONDESSA SRB je u obavezi da povrat vrši isključivo preko VISA, EC/MC i Maestro metoda plaćanja, što znači da će banka na zahtev prodavca obaviti povrat sredstava na račun korisnika kartice.
      </p>
     
      <p>
      Obaveštavamo korisnike online kupovine da prilikom unošenja podataka o platnoj kartici, poverljive informacije se prenose putem javne mreže u zaštićenoj (kriptovanoj) formi upotrebom SSL protokola i PKI Sistema i da sigurnost podataka prilikom kupovine, garantuje procesor platnih kartica Banke Intesa a.d. Beograd pa se tako kompletni proces naplate obavlja na stranicama banke.
      </p>
      <p>
      <span className="font-bold">Izjava o konverziji</span> - Sva plaćanja biće izvršena u državnoj valuti Republike Srbije – dinar (RSD). Za informativni prikaz cena u drugim valutama koristi se srednji kurs Narodne Banke Srbije. Iznos za koji će biti zadužena Vaša platna kartica biće izražen u Vašoj lokalnoj valuti kroz konverziju u istu po kursu koji koriste kartičarske organizacije, a koji nama u trenutku transakcije ne može biti poznat. Kao rezultat ove konverzije postoji mogućnost neznatne razlike od originalne cene navedene na našem sajtu.
      </p>
      <p>
      Pre nego što potvrdite narudžbenicu, možete još jednom pogledati sve njene detalje. Ukoliko se slažete sa njom izaberite opciju “Prihvatam i pročitao sam Uslove kupovine i razumeo politiku privatnosti i korišćenja kolačića” a zatim izabrati opciju “Potvrdi i završi kupovinu” čime je ona kreirana. Po prijemu maila od prodavca, da je roba dostupna, smatra se da je porudžbina potvrđena.
      </p>
      <p>
      Izdati račun prodavca predstavlja dokaz zaključenog Ugovora između prodavca i kupca i smatra se da je zaključen potvrdom porudžbine od strane prodavca.
      </p>
      
      <p>
      Dostavu pošiljki vrši kurirska služba AKS i moguća je samo na teritoriji Srbije. Troškovi dostave se posebno naplaćuju i iznose 300 RSD. Troškove dostave plaća kupac/korisnik zajedno sa proizvodima kuriru prilikom preuzimanja pošiljke. Cena isporuke za sve porudžbine preko 3000 RSD je besplatna.
      </p>
      <p>
      Uobičajeni rok za isporuku porudžbina je od 5 do 7 radnih dana (u zavisnosti od praznika i perioda povećanog obima posla kurirske službe). Isporuka porudžbina se ne vrši subotom.
      </p>
      <p>
      Kupac je odgovoran za štetu koja nastane propuštanjem da preuzme robu koju mu je poslao Prodavac u skladu sa Ugovorom i ovim Uslovima korišćenja. Pod štetom se podrazumeva oštećenje na robi, kao i troškovi koje Prodavac ima zbog propuštanja Kupca da preuzme robu, kao što su: troškovi čuvanja, prepakivanja, vraćanja robe i slično.
      </p>
      <h5 className="mt-4"><strong>SAOBRAZNOST ROBE I NEDOSTACI</strong></h5>
      <p>
      Kada preuzmete robu, pregledajte robu i proverite njenu saobraznost sa naručenom, i istaknite postojanje vidljivih nedostataka koji se mogu uočiti pregledom.
      </p>
      <p>
      Za skrivene nedostatke koji su postojali u momentu prelaska rizika na kupca, prodavac odgovara u opštem roku od 2 (dve) godine od predaje stvari, s tim što se pretpostavlja da su nedostaci postojali u momentu prelaska rizika na kupca, ako se pokažu u roku kraćem od šest meseci od dana prijema robe, čime se ne isključuje pravo prodavca da dokazuje suprotno.
      </p>
      <p>
      Momenat prelaska rizika sa prodavca na kupca je momenat predaje robe kupcu, ovlašćenom licu kurirske službe ili licu koje je kupac ovlastio za prijem robe u njegovo ime.
      </p>
      <p>
      U slučaju postojanja nedostataka za koje prodavac odgovara, na prava kupca i postupak ostvarivanja prava primenjuju se odredbe Zakona o zaštiti potrošača, osim ako je u skladu sa istim zakonom ugovoreno drugačije.
      </p>
     
      <h5 className="mt-4">
        <strong>REKLAMACIJE</strong>
      </h5>
      <p>
      Pored reklamacije radi ostvarenja prava po osnovu saobraznosti, možete izjaviti reklamaciju i zbog pogrešno obračunate cene i drugih nedostataka.
      </p>
      <p>
      Reklamaciju možete izjaviti:
      </p>
      <ul className="ml-3 mt-1">
        <li>• pisanim putem na adresu sedišta Prodavca: {process.env.ADDRESS}</li>
        <li>• elektronskim putem na mail adresu: {process.env.EMAIL} uz obaveznu dostavu dokaza o kupovini i proizvoda (račun, fakturu, slip) robe koja se reklamira.</li>
      </ul>
      <p>
      Elektronskim putem ćemo potvrditi prijem reklamacije, odnosno saopštiti broj pod kojim je zavedena Vaša reklamacija u Evidenciji primljenih reklamacija.
      </p>
      <p>
      Odgovor na reklamaciju ćete dobiti pisanim ili elektronskim putem bez odlaganja, a najkasnije u roku od 8 dana od dana prijema reklamacije. Odgovor prodavca na reklamaciju potrošača mora da sadrži odluku da li prihvata reklamaciju, obrazloženje ako ne prihvata reklamaciju, izjašnjenje o zahtevu potrošača o načinu rešavanja i konkretan predlog u kom roku će i kako rešiti reklamaciju ukoliko je prihvata. Rok za rešavanje po reklamaciji ne može da bude duži od 15 dana od dana podnošenja reklamacije.
      </p>
      <p>
      Produžavanje roka za rešavanje reklamacija moguće je samo jednom. Ukoliko niste u mogućnosti da nam dostavite ambalažu robe, to ne može biti uslov za rešavanje reklamacije niti razlog za odbijanje otklanjanja nesaobraznosti.
      </p>
      <p>
      Potrošač je u skladu sa članom 55. stavom 10. Zakona o zaštiti potrošača, dužan da se izjasni na ovaj Odgovor i to u roku od 3 (tri) dana počev od dana prijema odgovora prodavca, dostavljanjem odgovora na e-mail adresu {process.env.EMAIL} ili preporučenom pošiljkom na adresu prodavca {process.env.ADDRESS}. Ukoliko se potrošač ne izjasni u napred navedenom roku, smatraće se da nije saglasan sa predlogom prodavca za rešavanje potrošačkog spora.
      </p>
     
      <h5 className="mt-4">
        <strong>POVRAT KUPLJENE ROBE</strong>
      </h5>
      <p>
      Troškove vraćanja robe i novca kupac snosi samostalno, osim u slučajevima kada dobije proizvod sa nedostatkom ili pogrešan proizvod. Kupac je obavezan da proveri sastav paketa pre preuzimanja robe od kurirske službe.

      </p>
      <p>
      Prilikom povrata robe obavezno je vratiti u ispravnom i nekorišćenom stanju i originalno neoštećenom pakovanju. U suprotnom, Prodavac neće primiti povrat robe.
      </p>
     
      
      <h5 className="mt-4">
        <strong>ODUSTANAK OD UGOVORA</strong>
      </h5>
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
      <h5 className="mt-4"><strong>ZAMENA ARTIKALA</strong></h5>
      <p>Kupac može da zatraži zamenu artikala u roku od 14 dana od dana prijema robe. Zamena robe se odnosi na zamenu veličine ili zamenu modela. U slučaju zamene roba se, zajedno sa popunjenim Obrascem za zamenu, dostavlja Prodavcu, i u tom slučaju troškove zamene snosi Kupac.</p>
      <p>Obrazac za zamenu možete preuzeti na <Link href="/doc/obrazac-za-zamenu-robe-londessa.pdf" target="_blank" download className="underline text-croonus-2 font-bold">ovom linku</Link>.</p>
      <p>U slučaju zamene Kupac je u obavezi da robu vrati u originalnoj ambalaži, bez oštećenja i tragova korišćenja. U suprotnom, Prodavac nije u obavezi da obavi zamenu.</p>
      <p>Artikal za koji se vrši zamena, mora imati istu ili veću vrednost od artikla koji se menja, uz doplatu.</p>
      <h5 className="mt-4"><strong>VANSUDSKO REŠAVANJE POTROŠAČKIH SPOROVA</strong></h5>
      <p>U skladu sa članovima 55. I 151. Zakona o zaštiti potrošača ("Sl. glasnik RS", br. 88/2021) obaveštavamo kupce da imaju mogućnost rešavanja potrošačkog spora vansudskim putem. Vansudsko rešavanje potrošačkih sporova obavlja se na transparentan, efikasan, brz i pravičan način pred telom za vansudsko rešavanje potrošačkih sporova.</p>
      <p>Postupak pred telom može da pokrene POTROŠAČ predlogom samo ukoliko je prethodno izjavio reklamaciju ili prigovor i ne nakon isteka roka od 1 (jedne) godine od dana podnošenja reklamacije.</p>
      <p>Kao PRODAVAC smo po Zakonu dužni da učestvujemo u postupku za vansudsko rešavanje potrošačkih sporova.</p>
      <p>Svaka stranka u postupku vansudskog rešavanja potrošačkog spora plaća svoje troškove (troškovi zastupanja, putni troškovi i sl.).</p>
      <h5 className="mt-4"><strong>POLITIKA PRIVATNOSTI</strong></h5>
      <p>LONDESSA SRB se obavezuje da će čuvati privatnost svih kupaca koji pristupaju online prodavnici. Prikupljamo samo osnovne i nužne podatke o kupcima/korisnicima neophodne za poslovanje i informisanje korisnika u skladu sa dobrim poslovnim običajima i u cilju pružanja kvalitetne usluge. Svi podaci o kupcima/korisnicima se strogo čuvaju i dostupni su samo zaposlenima kojima su ti podaci potrebni za obavljanje poslova. Svi zaposleni Internet prodavnice https://www.londessa.rs/ odgovorni su za poštovanje načela zaštite privatnosti i načela zašite podataka o ličnosti.</p>
      <p>Sadržaj prikazan na ovom sajtu je isključivo vlasništvo LONDESSA SRB i ne može se koristiti bez prethodne saglasnosti LONDESSA SRB.</p>
      <p>Nadležni organ za zaštitu podataka o ličnosti je Poverenik za informacije od javnog značaja i zaštitu podataka o ličnosti Republike Srbije. Organu se možete obratiti na adresi Bulevar Kralja Aleksandra 15, 11000 Beograd, Republika Srbija, mejlom na office@poverenik.rs ili telefonom na br: +381 11 3408 900.</p>
      <p>Za sve nedoumice vezane za ostvarivanje prava o zaštiti podataka o ličnosti možete nam se obratiti slanjem maila na {process.env.EMAIL} ili pisanim putem na adresu sedišta: {process.env.ADDRESS}.</p>
      <h5 className="mt-4"><strong>Izjava o PDV-u</strong></h5>
      <p>PDV uračunat u cenu i nema skrivenih troškova.</p>
      <p className="mt-6">
        <strong>Poslednji put izmenjeno: 04.06.2024.</strong>
      </p>
    </div>
  );
};

export default UsloviKoriscenja;
