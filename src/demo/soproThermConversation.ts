import type { Message } from "../lib/utils";

export const soproThermConversation: Message[] = [
  {
    id: "1",
    text: "Chciałbym zorientować się w ofercie systemów ociepleń Sopro. Co polecacie?",
    isUser: true,
    timestamp: 1718000000000
  },
  {
    id: "2",
    text: `Dzień dobry! Mamy trzy kompletne systemy ociepleń ETICS:\n\n1. SoproTherm Easy – lekki system na styropian EPS do 30 cm (idealny dla domów jednorodzinnych).\n2. SoproTherm MiWo – system na wełnie mineralnej (wysoka odporność ogniowa).\n3. SoproTherm Ceramic – system pod cięższe okładziny ceramiczne lub kamienne.\n\nKtóry system Panią/Pana interesuje?`,
    isUser: false,
    timestamp: 1718000001000,
    suggestions: [
      "SoproTherm Easy",
      "SoproTherm MiWo",
      "SoproTherm Ceramic",
      "Proszę o więcej informacji o każdym systemie"
    ]
  },
  {
    id: "3",
    text: "Interesuje mnie SoproTherm Easy.",
    isUser: true,
    timestamp: 1718000002000
  },
  {
    id: "4",
    text: "Świetny wybór – to nasz bestseller. Żeby przygotować listę materiałów, proszę podać przybliżoną powierzchnię elewacji i planowaną grubość styropianu.",
    isUser: false,
    timestamp: 1718000003000,
    suggestions: [
      "Powierzchnia 100 m², styropian 10 cm",
      "Powierzchnia 120 m², styropian 15 cm",
      "Nie wiem, jak to policzyć"
    ]
  },
  {
    id: "5",
    text: "Powierzchnia to około 120 m², styropian 15 cm.",
    isUser: true,
    timestamp: 1718000004000
  },
  {
    id: "6",
    text: `Instrukcja montażu SoproTherm Easy\n\n1. Przyklejenie płyt EPS klejem SoproTherm KO 294.  \n2. Zabezpieczenie narożników i cokołu, następnie wykonanie warstwy zbrojonej siatką Sopro KDA 662.  \n3. Zagruntowanie podkładem SoproTherm GT.  \n4. Nałożenie tynku silikonowego SoproTherm TS 1,5 mm lub mineralnego SoproTherm TM 1,5 mm.\n\nZobacz film: https://www.youtube.com/watch?v=YGEXxLvG1sM  \nPDF: https://www.sopro.pl/fileadmin/user-files/lp-page/sopro-therm/karty-systemow/KT_SoproTherm_Easy_07.24.pdf\n\nCzy wyświetlić szacunkową ilość materiałów do zamówienia?`,
    isUser: false,
    timestamp: 1718000005000,
    suggestions: [
      "Tak, poproszę.",
      "Nie, dziękuję.",
      "Proszę o szczegóły dotyczące montażu"
    ]
  },
  {
    id: "7",
    text: "Tak, poproszę.",
    isUser: true,
    timestamp: 1718000006000
  },
  {
    id: "8",
    text: `Szacunek materiałów – 120 m² / EPS 15 cm\n\n| Produkt                    | Zużycie jednostkowe      | Łącznie | Opak. / szt.         |\n| -------------------------- | ------------------------ | ------- | -------------------- |\n| Płyty EPS 15 cm           | 1,1 m²/m² (10 % zapasu) | 132 m²  | ≈ 264 płyt 100×50 cm |\n| SoproTherm KO 294         | ok. 4,5 kg/m²           | 540 kg  | 22 worki 25 kg       |\n| Siatka Sopro KDA 662      | 1,1 m²/m²               | 132 m²  | 3 rolki 50 m²        |\n| Dyble Ø 8 mm              | 6 szt./m²               | 720 szt.| 720 dybli            |\n| Podkład SoproTherm GT     | 0,20 kg/m²              | 24 kg   | 2 wiadra 15 kg       |\n| Tynk SoproTherm TS 1,5 mm | 2,5 kg/m²               | 300 kg  | 12 wiader 25 kg      |`,
    isUser: false,
    timestamp: 1718000007000,
    suggestions: [
      "Gdzie mogę to kupić?",
      "Ile to kosztuje?",
      "Czy można zamówić z dostawą?"
    ]
  },
  {
    id: "9",
    text: "Gdzie mogę to kupić?",
    isUser: true,
    timestamp: 1718000008000
  },
  {
    id: "10",
    text: `Produkty SoproTherm są dostępne m.in. w sieci Leroy Merlin (np. klej KO 294, kod 89437097) oraz w sklepach PSB Mrówka.  \nW Warszawie – Leroy Merlin ul. Ostrobramska. Przed wizytą warto sprawdzić dostępność online lub telefonicznie.\n\nCzy mogę w czymś jeszcze pomóc?`,
    isUser: false,
    timestamp: 1718000009000,
    suggestions: [
      "Nie, dziękuję. To wszystko.",
      "Mam jeszcze pytanie.",
      "Proszę o kontakt do doradcy"
    ]
  },
  {
    id: "11",
    text: "Nie, dziękuję. To wszystko.",
    isUser: true,
    timestamp: 1718000010000
  },
  {
    id: "12",
    text: "Dziękuję za kontakt! Powodzenia z ociepleniem i udanego dnia.",
    isUser: false,
    timestamp: 1718000011000
  }
];
