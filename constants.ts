
export const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScaVCcBV32iBwj2qWnkh0Ds5IfLYyWroDnQfjjlzrsz3K6oiQ/viewform?usp=header';
export const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmbM3HyrZZMS1ukgzdPH2Kx60iMQb8Je3Cuxl6EAZgzTEL6K31yO9h5qobj_RexjI0Ww9iojcL5QvF/pub?gid=1898439372&single=true&output=csv';

export const WILAYAS_FR = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
  "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued",
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane"
];

export const WILAYAS_MAP_FR_TO_AR: { [key: string]: string } = {
  "Adrar": "أدرار", "Chlef": "الشلف", "Laghouat": "الأغواط", "Oum El Bouaghi": "أم البواقي",
  "Batna": "باتنة", "Béjaïa": "بجاية", "Biskra": "بسكرة", "Béchar": "بشار", "Blida": "البليدة",
  "Bouira": "البويرة", "Tamanrasset": "تمنراست", "Tébessa": "تبسة", "Tlemcen": "تلمسان",
  "Tiaret": "تيارت", "Tizi Ouzou": "تيزي وزو", "Alger": "الجزائر", "Djelfa": "الجلفة",
  "Jijel": "جيجل", "Sétif": "سطيف", "Saïda": "سعيدة", "Skikda": "سكيكدة",
  "Sidi Bel Abbès": "سيدي بلعباس", "Annaba": "عنابة", "Guelma": "قالمة", "Constantine": "قسنطينة",
  "Médéa": "المدية", "Mostaganem": "مستغانم", "M'Sila": "المسيلة", "Mascara": "معسكر",
  "Ouargla": "ورقلة", "Oran": "وهران", "El Bayadh": "البيض", "Illizi": "إليزي",
  "Bordj Bou Arreridj": "برج بوعريريج", "Boumerdès": "بومرداس", "El Tarf": "الطارف",
  "Tindouf": "تندوف", "Tissemsilt": "تيسمسيلت", "El Oued": "الوادي", "Khenchela": "خنشلة",
  "Souk Ahras": "سوق أهراس", "Tipaza": "تيبازة", "Mila": "ميلة", "Aïn Defla": "عين الدفلى",
  "Naâma": "النعامة", "Aïn Témouchent": "عين تموشنت", "Ghardaïa": "غرداية", "Relizane": "غليزان"
};

export const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
];

export const ABOUT_CONTENT = {
  fr: [
    {
      title: "Objectif & Mission",
      content: "Cette application a été conçue pour faciliter le don de sang à Sidi Bel Abbès, Algérie, en connectant les donneurs locaux aux personnes dans le besoin. Développée en partenariat avec le Croissant-Rouge Algérien – Comité de Sidi Bel Abbès, elle vise à sauver des vies en simplifiant le processus de don et la disponibilité du sang au sein de la communauté locale."
    },
    {
      title: "Développement de l’application",
      content: "Cette application, ainsi que tous ses modules originaux et annexes, a été entièrement développée par Skaf Hisham pour le compte du Croissant-Rouge Algérien – Comité de la Wilaya de Sidi Bel Abbès, afin de garantir une qualité optimale et une parfaite adaptation aux besoins de la communauté locale."
    },
    {
      title: "Principales fonctionnalités",
      list: [
        "Inscription des donneurs : Une inscription simple et sécurisée pour les habitants de Sidi Bel Abbès souhaitant donner leur sang, avec gestion du profil personnel.",
        "Recherche locale de sang : Les bénéficiaires ou le personnel médical peuvent rechercher des donneurs par groupe sanguin et quartier pour une assistance rapide et efficace.",
        "Historique des dons : Suivi des dons précédents et réception de notifications sur les prochaines campagnes de don à Sidi Bel Abbès.",
        "Sécurité & confidentialité : Toutes les données personnelles sont stockées de manière sécurisée selon les normes les plus strictes de protection des informations.",
        "Notifications & alertes : Alertes en temps réel pour les besoins urgents en sang et les campagnes de don programmées dans la ville.",
        "Ressources éducatives : Informations sur les procédures de don, ses bienfaits et les critères d’éligibilité, adaptées à la communauté locale."
      ]
    },
    {
      title: "Conditions & Confidentialité",
      list: [
        "Les utilisateurs doivent fournir des informations personnelles et médicales exactes pour assurer une gestion sûre et efficace des dons.",
        "L’application est destinée uniquement à des dons de sang volontaires et non commerciaux à Sidi Bel Abbès.",
        "Les données personnelles collectées via l’application sont utilisées exclusivement pour la coordination des dons et ne seront pas partagées avec des tiers sans consentement.",
        "En utilisant l’application, les utilisateurs s’engagent à respecter les directives locales relatives à l’éligibilité au don. ",
        "Les utilisateurs peuvent demander la suppression de leurs données personnelles à tout moment en contactant le support."
      ]
    },
    {
      title: "Pourquoi choisir Done de Sang CRA – Sidi Bel Abbès",
      list: [
        "Soutient la mission humanitaire du Croissant-Rouge Algérien au niveau local.",
        "Assure des temps de réponse rapides en cas d’urgence dans la ville.",
        "Favorise une communauté de donneurs réguliers, renforçant la santé publique locale.",
        "Conçu pour être simple, fiable et accessible."
      ]
    },
    {
      title: "Participez et sauvez des vies",
      content: "En utilisant cette application, vous contribuez à sauver des vies à Sidi Bel Abbès, à sensibiliser sur l’importance du don de sang et à construire une communauté plus forte et en meilleure santé. Chaque don compte."
    },
    {
      title: "Support & Contact",
      content: "Pour toute assistance ou question, veuillez contacter l’équipe locale via l’application ou directement le Croissant-Rouge Algérien – Comité de Sidi Bel Abbès."
    }
  ],
  ar: [
    {
      title: "الغرض والمهمة",
      content: "تم تصميم هذا التطبيق لتسهيل عملية التبرع بالدم في سيدي بلعباس، الجزائر، من خلال ربط المتبرعين المحليين بالمحتاجين. بالتعاون مع الهلال الأحمر الجزائري – لجنة سيدي بلعباس، يهدف التطبيق إلى إنقاذ الأرواح من خلال تسهيل عملية التبرع وتوفير الدم داخل المجتمع المحلي."
    },
    {
      title: "أهم الميزات",
      list: [
        "تسجيل المتبرعين: تسجيل سهل وآمن للأشخاص في سيدي بلعباس الراغبين بالتبرع، مع إمكانية إدارة الملف الشخصي.",
        "البحث المحلي عن الدم: يمكن للمحتاجين أو الطاقم الطبي البحث عن المتبرعين حسب فصيلة الدم والمنطقة لضمان استجابة سريعة وفعالة.",
        "سجل التبرعات: متابعة التبرعات السابقة واستلام إشعارات حول حملات التبرع القادمة في سيدي بلعباس.",
        "السلامة والخصوصية: يتم تخزين جميع البيانات الشخصية بشكل آمن وفق أعلى معايير حماية المعلومات.",
        "الإشعارات والتنبيهات: تنبيهات فورية لحالات الطوارئ وحملات التبرع المجدولة في المدينة.",
        "الموارد التثقيفية: معلومات حول إجراءات التبرع وفوائده ومتطلبات الأهلية، مخصصة للمجتمع المحلي."
      ]
    },
    {
      title: "الشروط والخصوصية",
      list: [
        "يجب على المستخدمين تقديم معلومات شخصية وطبية دقيقة لضمان سلامة إدارة التبرع.",
        "التطبيق مخصص لأغراض التبرع الطوعي وغير التجاري داخل سيدي بلعباس فقط.",
        "تُستخدم البيانات الشخصية التي يتم جمعها عبر التطبيق حصريًا لتنسيق التبرع بالدم ولن تُشارك مع أي طرف ثالث بدون موافقة المستخدم.",
        "باستخدام التطبيق، يوافق المستخدمون على الالتزام بإرشادات ومتطلبات التبرع المحلية.",
        "يمكن للمستخدمين طلب حذف بياناتهم الشخصية في أي وقت عن طريق التواصل مع الدعم."
      ]
    },
    {
      title: "لماذا تختار تطبيق تبرع بالدم CRA – سيدي بلعباس؟",
      list: [
        "يدعم المهمة الإنسانية للهلال الأحمر الجزائري على المستوى المحلي.",
        "يضمن استجابة سريعة لحالات الطوارئ في المدينة.",
        "يشجع على بناء مجتمع من المتبرعين المنتظمين، مما يعزز الصحة العامة المحلية.",
        "مصمم ليكون بسيطًا وموثوقًا وسهل الوصول إليه."
      ]
    },
    {
      title: "شارك وانقذ حياة",
      content: "باستخدامك لهذا التطبيق، تساهم في إنقاذ الأرواح في سيدي بلعباس، وزيادة الوعي بأهمية التبرع بالدم، وبناء مجتمع أقوى وأكثر صحة. كل تبرع مهم."
    },
    {
      title: "الدعم والتواصل",
      content: "للحصول على المساعدة أو الاستفسار، يرجى التواصل مع فريق الدعم المحلي عبر التطبيق أو الاتصال مباشرة بـ الهلال الأحمر الجزائري – لجنة سيدي بلعباس."
    }
  ]
};

export const TRANSLATIONS = {
  ar: {
    mainTitle: "الهلال الأحمر الجزائري",
    subTitle: "اللجنة الولائية لولاية سيدي بلعباس",
    registerButton: "تسجيل متبرع جديد",
    languageSwitch: "Français",
    searchTitle: "ابحث عن متبرع",
    bloodGroup: "فصيلة الدم",
    allBloodGroups: "كل الفصائل",
    wilaya: "ولاية الإقامة",
    allWilayas: "كل الولايات",
    searchTerm: "الاسم / الهاتف",
    searchPlaceholder: "ابحث بالاسم أو رقم الهاتف...",
    searchNote: "ملاحظة: يمكنكم البحث عن متبرّع من خلال تعبئة خانة واحدة فقط أو أكثر مثل: الاسم، رقم الهاتف، الولاية، أو فصيلة الدم. ليس من الضروري تعبئة جميع الخانات.",
    searchButton: "ابحث الآن",
    refreshButton: "تحديث البيانات",
    totalDonors: "إجمالي المتبرعين",
    table: {
      fullName: "الاسم الكامل",
      dob: "تاريخ الميلاد",
      gender: "الجنس",
      bloodGroup: "فصيلة الدم",
      wilaya: "ولاية الإقامة",
      phone: "رقم الهاتف",
      lastDonation: "آخر تبرع",
      notes: "ملاحظات",
      noResults: "لم يتم العثور على نتائج.",
      noResultsHint: "حاول تعديل معايير البحث أو تحديث البيانات.",
      initialSearchMessage: "ابحث عن احتياجك الدموي",
    },
    footerContact: "اتصل بنا",
    footerRights: "© 2025 الهلال الأحمر الجزائري - سيدي بلعباس. كل الحقوق محفوظة.",
    fetchError: "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",
    loading: "جار التحميل...",
    male: "ذكر",
    female: "أنثى",
    whatsappContact: "تواصل معنا",
    pageTitle: "قطرات أمل - بنك المتبرعين بالدم",
    metaDescription: "موقع احترافي وحديث للهلال الأحمر الجزائري - اللجنة الولائية لسيدي بلعباس، يهدف إلى تسجيل متبرعين جدد بالدم والبحث عن متبرعين متوافقين بكفاءة.",
    callAction: "اتصل بالمتبرع",
    aboutApp: "حول هذا الموقع",
  },
  fr: {
    mainTitle: "Croissant-Rouge Algérien",
    subTitle: "Comité Wilaya de Sidi Bel Abbès",
    registerButton: "Ajouter un donneur",
    languageSwitch: "العربية",
    searchTitle: "Rechercher un donneur",
    bloodGroup: "Groupe sanguin",
    allBloodGroups: "Tous les groupes",
    wilaya: "Wilaya de résidence",
    allWilayas: "Toutes les wilayas",
    searchTerm: "Nom / Téléphone",
    searchPlaceholder: "Rechercher par nom ou téléphone...",
    searchNote: "Note : Vous pouvez rechercher un donneur en remplissant un seul champ ou plusieurs, tels que : nom, numéro de téléphone, wilaya ou groupe sanguin. Il n’est pas nécessaire de tout remplir.",
    searchButton: "Rechercher",
    refreshButton: "Actualiser les données",
    totalDonors: "Total des donneurs",
    table: {
      fullName: "Nom complet",
      dob: "Date de naissance",
      gender: "Sexe",
      bloodGroup: "Groupe sanguin",
      wilaya: "Wilaya de résidence",
      phone: "Numéro de téléphone",
      lastDonation: "Dernier don",
      notes: "Remarques",
      noResults: "Aucun résultat trouvé.",
      noResultsHint: "Essayez de modifier vos critères de recherche ou d'actualiser les données.",
      initialSearchMessage: "Recherchez votre besoin en sang",
    },
    footerContact: "Nous contacter",
    footerRights: "© 2025 Croissant-Rouge Algérien - Sidi Bel Abbès. Tous droits réservés.",
    fetchError: "Une erreur est survenue lors du chargement des données. Veuillez réessayer.",
    loading: "Chargement...",
    male: "Homme",
    female: "Femme",
    whatsappContact: "Contactez-nous",
    pageTitle: "Gouttes d’Espoir - Banque des donneurs",
    metaDescription: "Un site web professionnel et moderne pour le Croissant-Rouge Algérien – Comité de Wilaya de Sidi Bel Abbès, visant à enregistrer de nouveaux donneurs de sang et à rechercher efficacement des donneurs compatibles.",
    callAction: "Appeler le donneur",
    aboutApp: "À propos de cette application",
  }
};
