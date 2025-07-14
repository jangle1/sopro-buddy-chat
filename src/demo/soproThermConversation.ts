import type { Message } from "../lib/utils";

export const soproThermConversation = [
  {
    role: "user",
    content:
      "Chciałbym zorientować się w ofercie systemów ociepleń Sopro. Co polecacie?",
  },
  {
    role: "assistant",
    content: `Dzień dobry! Mamy trzy kompletne systemy ociepleń ETICS:

1. SoproTherm Easy – lekki system na styropian EPS do 30 cm (idealny dla domów jednorodzinnych).
2. SoproTherm MiWo – system na wełnie mineralnej (wysoka odporność ogniowa).
3. SoproTherm Ceramic – system pod cięższe okładziny ceramiczne lub kamienne.

Który system Panią/Pana interesuje?`,
  },
  {
    role: "user",
    content: "Interesuje mnie SoproTherm Easy.",
  },
  {
    role: "assistant",
    content:
      "Świetny wybór – to nasz bestseller. Żeby przygotować listę materiałów, proszę podać przybliżoną powierzchnię elewacji i planowaną grubość styropianu.",
  },
  {
    role: "user",
    content: "Powierzchnia to około 120 m², styropian 15 cm.",
  },
  {
    role: "assistant",
    content: `Instrukcja montażu SoproTherm Easy

1. Przyklejenie płyt EPS klejem SoproTherm KO 294.  
2. Zabezpieczenie narożników i cokołu, następnie wykonanie warstwy zbrojonej siatką Sopro KDA 662.  
3. Zagruntowanie podkładem SoproTherm GT.  
4. Nałożenie tynku silikonowego SoproTherm TS 1,5 mm lub mineralnego SoproTherm TM 1,5 mm.

Zobacz film: https://www.youtube.com/watch?v=YGEXxLvG1sM  
PDF: https://www.sopro.pl/fileadmin/user-files/lp-page/sopro-therm/karty-systemow/KT_SoproTherm_Easy_07.24.pdf

Czy wyświetlić szacunkową ilość materiałów do zamówienia?`,
  },
  {
    role: "user",
    content: "Tak, poproszę.",
  },
  {
    role: "assistant",
    content: `Szacunek materiałów – 120 m² / EPS 15 cm

| Produkt                    | Zużycie jednostkowe      | Łącznie | Opak. / szt.         |
| -------------------------- | ------------------------ | ------- | -------------------- |
| Płyty EPS 15 cm           | 1,1 m²/m² (10 % zapasu) | 132 m²  | ≈ 264 płyt 100×50 cm |
| SoproTherm KO 294         | ok. 4,5 kg/m²           | 540 kg  | 22 worki 25 kg       |
| Siatka Sopro KDA 662      | 1,1 m²/m²               | 132 m²  | 3 rolki 50 m²        |
| Dyble Ø 8 mm              | 6 szt./m²               | 720 szt.| 720 dybli            |
| Podkład SoproTherm GT     | 0,20 kg/m²              | 24 kg   | 2 wiadra 15 kg       |
| Tynk SoproTherm TS 1,5 mm | 2,5 kg/m²               | 300 kg  | 12 wiader 25 kg      |`,
  },
  {
    role: "user",
    content: "Gdzie mogę to kupić?",
  },
  {
    role: "assistant",
    content: `Produkty SoproTherm są dostępne m.in. w sieci Leroy Merlin (np. klej KO 294, kod 89437097) oraz w sklepach PSB Mrówka.  
W Warszawie – Leroy Merlin ul. Ostrobramska. Przed wizytą warto sprawdzić dostępność online lub telefonicznie.

Czy mogę w czymś jeszcze pomóc?`,
  },
  {
    role: "user",
    content: "Nie, dziękuję. To wszystko.",
  },
  {
    role: "assistant",
    content: "Dziękuję za kontakt! Powodzenia z ociepleniem i udanego dnia.",
  },
] satisfies Message[];
