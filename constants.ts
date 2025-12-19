
export const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScaVCcBV32iBwj2qWnkh0Ds5IfLYyWroDnQfjjlzrsz3K6oiQ/viewform?usp=header';
export const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmbM3HyrZZMS1ukgzdPH2Kx60iMQb8Je3Cuxl6EAZgzTEL6K31yO9h5qobj_RexjI0Ww9iojcL5QvF/pub?gid=1898439372&single=true&output=csv';

export const WILAYAS_FR = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar",
  "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger",
  "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
  "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh",
  "Illizi", "Bordj Bou Arreridj", "Boumerدès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued",
  "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
  "Ghardaïa", "Relizane"
];

export const WILAYAS_MAP_FR_TO_AR: { [key: string]: string } = {
  "Adrar": "أدرار", "Chlef": "الشلف", "Laghouat": "الأغواط", "Oum El Bouaghi": "أم البواقي",
  "Batna": "باتنة", "Béjaïa": "بجاية", "Biskra": "بسكرة", "Béchar": "بشار", "Blida": "البليدة",
  "Bouira": "البويرة", "Tamanrasset": "تمنراست", "Tébessa": "تبسة", "Tlemcen": "تلمسان",
  "Tiaret": "تيارت", "Tizi Oوزو": "تيزي وزو", "Alger": "الجزائر", "Djelfa": "الجلفة",
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

export const COMPATIBILITY_RULES = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

export const RECIPIENT_RULES = {
  'O-': ['O-'],
  'O+': ['O-', 'O+'],
  'A-': ['O-', 'A-'],
  'A+': ['O-', 'O+', 'A-', 'A+'],
  'B-': ['O-', 'B-'],
  'B+': ['O-', 'O+', 'B-', 'B+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
};

// Content for About Modal
export const ABOUT_CONTENT = {
  ar: [
    {
      title: "مهمتنا",
      content: "تهدف منصة **Don de Sang CRA** إلى رقمنة وتسهيل عملية البحث عن المتبرعين بالدم في ولاية سيدي بلعباس، مما يساهم في إنقاذ الأرواح في الحالات الحرجة."
    },
    {
      title: "المطورون",
      content: "تم تطوير هذا الموقع والتطبيق وكافة ارتباطاتهما الخارجية والداخلية كبادرة تقنية من قبل:\n\n• **الدكتور سكاف هشام**\n• **الدكتور طوفان محمد**\n• **الدكتورة إيمان أحمد عمر**\n\nبالتنسيق مع الهلال الأحمر الجزائري - اللجنة الولائية لولاية سيدي بلعباس."
    },
    {
      title: "المميزات",
      list: [
        "قاعدة بيانات متجددة للمتبرعين المتطوعين.",
        "نظام ذكي للتحقق من أهلية التبرع (قاعدة الـ 4 أشهر).",
        "واجهة مستخدم تدعم الوضع الليلي واللغتين العربية والفرنسية.",
        "سهولة التواصل المباشر مع المتبرع."
      ]
    },
    {
      title: "الخصوصية",
      content: "بيانات المتبرعين محمية وتستخدم حصراً لغرض التبرع بالدم. نحث المستخدمين على احترام الخصوصية."
    }
  ],
  fr: [
    {
      title: "Notre Mission",
      content: "La plateforme **Don de Sang CRA** vise à faciliter la recherche de donneurs de sang dans la wilaya de Sidi Bel Abbès."
    },
    {
      title: "Développeurs",
      content: "Ce site web, l'application et toutes leurs liaisons ont été développés comme une initiative technologique par :\n\n• **Dr. SKAF Hisham**\n• **Dr. TOUFAN Mohammad**\n• **Dr. Imene AHMED OMAR**\n\nen coordination avec le Croissant-Rouge Algérien - Comité Wilaya de Sidi Bel Abbès."
    },
    {
      title: "Caractéristiques",
      list: [
        "Base de données dynamique des donneurs bénévoles.",
        "Vérification d'éligibilité (règle des 4 mois).",
        "Interface bilingue avec mode sombre.",
        "Contact direct facilité avec les donneurs."
      ]
    },
    {
      title: "Confidentialité",
      content: "Les données des donneurs sont protégées et réservées exclusivement au don de sang."
    }
  ]
};

// Content for Eligibility Modal
export const ELIGIBILITY_CONTENT = {
  ar: [
    {
      title: "الحالة الصحية العامة",
      content: "يجب أن يكون المتبرع في حالة صحية جيدة، وألا يعاني من أمراض مزمنة أو معدية قد تنتقل عبر الدم."
    },
    {
      title: "المعايير الأساسية",
      list: [
        "العمر: يجب أن يتراوح عمر المتبرع بين 18 و 65 عاماً.",
        "الوزن: يجب أن لا يقل وزن المتبرع عن 50 كغ.",
        "الفترة الزمنية: يجب انقضاء 4 أشهر على الأقل بين كل تبرع وآخر.",
        "ضغط الدم: يجب أن يكون ضمن الحدود الطبيعية."
      ]
    },
    {
      title: "المصادر",
      content: "تعتمد هذه المعايير على توصيات المنظمة العالمية للصحة وبروتوكولات وزارة الصحة الجزائرية."
    }
  ],
  fr: [
    {
      title: "Santé Générale",
      content: "Le donneur doit être en bonne santé et ne doit pas souffrir de maladies transmissibles par le sang."
    },
    {
      title: "Critères de base",
      list: [
        "Âge : Entre 18 et 65 ans.",
        "Poids : Au moins 50 kg.",
        "Intervalle : Minimum de 4 mois entre deux dons.",
        "Tension : Doit être dans les normes."
      ]
    },
    {
      title: "Sources",
      content: "Ces critères sont basés sur les recommandations de l'OMS et du Ministère de la Santé Algérien."
    }
  ]
};

// Content for ARC Modal
export const ARC_CONTENT = {
  ar: [
    {
      title: "لمحة تاريخية",
      content: "تأسس الهلال الأحمر الجزائري في 11 ديسمبر 1956، وهو منظمة إنسانية تطوعية مستقلة تعمل كجهاز مساعد للسلطات العمومية."
    },
    {
      title: "مبادئنا الأساسية",
      content: "الإنسانية، عدم التحيز، الحياد، الاستقلال، التطوع، الوحدة، والعالمية."
    }
  ],
  fr: [
    {
      title: "Historique",
      content: "Fondé en 1956, le Croissant-Rouge Algérien est une organisation humanitaire bénévole indépendante."
    },
    {
      title: "Principes",
      content: "Humanité, Impartialité, Neutralité, Indépendance, Volontariat, Unité et Universalité."
    }
  ]
};

// Content for Download Modal
export const DOWNLOAD_CONTENT = {
  ar: {
    title: "تطبيق Don de Sang CRA",
    description: "حمل تطبيقنا للوصول السريع إلى قاعدة بيانات المتبرعين في أي وقت.",
    vpnNote: "ملاحظة: في حال مواجهة أية مشكلات في الوصول لواجهة تحميل التطبيق، يرجى استخدام VPN مناسب لضمان الوصول.",
    url: "#",
    buttonText: "تحميل التطبيق (APK)"
  },
  fr: {
    title: "App Don de Sang CRA",
    description: "Téléchargez notre application pour un accès rapide aux donneurs à tout moment.",
    vpnNote: "Note : En cas de problèmes d'accès à l'interface de téléchargement, veuillez utiliser un VPN approprié.",
    url: "#",
    buttonText: "Télécharger (APK)"
  }
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
      ineligible: "غير متاح للتبرع",
      ineligibleReason: "يجب انقضاء 4 أشهر على الأقل منذ آخر تبرع.",
      eligible: "متاح للتبرع",
    },
    footerContact: "اتصل بنا",
    footerRights: "الهلال الأحمر الجزائري - سيدي بلعباس. جميع الحقوق محفوظة 2025 ©",
    fetchError: "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.",
    loading: "جار التحميل...",
    male: "ذكر",
    female: "أنثى",
    whatsappContact: "تواصل معنا",
    supportContact: "تواصل مع الدعم",
    ourLocation: "موقعنا على الخريطة",
    pageTitle: "Don de Sang CRA - بنك المتبرعين بالدم",
    metaDescription: "موقع احترافي وحديث للهلال الأحمر الجزائري - اللجنة الولائية لسيدي بلعباس.",
    callAction: "اتصل بالمتبرع",
    aboutApp: "حول هذا الموقع",
    eligibilityTitle: "شروط أهلية التبرع بالدم",
    arcAboutTitle: "لمحة عن الهلال الأحمر",
    downloadApp: "تحميل التطبيق",
    statsDashboard: "لوحة الإحصائيات",
    compatibilityTitle: "توافق فصائل الدم",
    compatibility: {
      title: "توافق فصائل الدم",
      donorMode: "يمكنك التبرع لـ",
      recipientMode: "يمكنك الاستلام من",
      instruction: "اختر فصيلة الدم لاستكشاف خريطة التوافق",
      givingTo: "تعطي لـ:",
      receivingFrom: "تأخذ من:",
      universalDonor: "متبرع عالمي",
      universalRecipient: "مستقبل عالمي",
      back: "رجوع",
    },
    stats: {
      title: "إحصائيات بنك المتبرعين",
      totalDonors: "إجمالي المتبرعين",
      mostAvailable: "الفصيلة الأكثر تواجداً",
      distribution: "توزيع فصائل الدم",
      specialNote: "نداء خاص",
      oNegAdvice: "أصحاب فصيلة O-: أنتم متبرعون عالميون ومنقذون حقيقيون في الحالات الطارئة. حاجتنا لمساهمتكم دائمة ومستمرة!",
      successRate: "معدل الاستجابة",
      donorActivity: "نشاط المتبرعين",
    }
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
    searchNote: "Note : Vous pouvez rechercher un donneur en remplissant un seul champ ou plusieurs.",
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
      noResultsHint: "Essayez de modifier vos critères.",
      initialSearchMessage: "Recherchez votre besoin en sang",
      ineligible: "Non éligible",
      ineligibleReason: "Minimum 4 mois depuis le dernier don.",
      eligible: "Éligible au don",
    },
    footerContact: "Nous contacter",
    footerRights: "Croissant-Rouge Algérien - Sidi Bel Abbès. 2025 ©",
    fetchError: "Une erreur est survenue.",
    loading: "Chargement...",
    male: "Homme",
    female: "Femme",
    whatsappContact: "Contactez-nous",
    supportContact: "Support",
    ourLocation: "Localisation",
    pageTitle: "Don de Sang CRA - Banque des donneurs",
    metaDescription: "Site du Croissant-Rouge Algérien – Sidi Bel Abbès.",
    callAction: "Appeler",
    aboutApp: "À propos",
    eligibilityTitle: "Éligibilité",
    arcAboutTitle: "Aperçu ARC",
    downloadApp: "Télécharger",
    statsDashboard: "Stats",
    compatibilityTitle: "Compatibilité sanguine",
    compatibility: {
      title: "Compatibilité sanguine",
      donorMode: "Peut donner à",
      recipientMode: "Peut recevoir de",
      instruction: "Sélectionnez un groupe pour voir les compatibilités",
      givingTo: "Donne à :",
      receivingFrom: "Reçoit de :",
      universalDonor: "Donneur Universel",
      universalRecipient: "Receveur Universel",
      back: "Retour",
    },
    stats: {
      title: "Statistiques",
      totalDonors: "Total",
      mostAvailable: "Plus fréquent",
      distribution: "Distribution",
      specialNote: "Note Spéciale",
      oNegAdvice: "Donneurs O- : Votre sang est universel et vital !",
      successRate: "Taux",
      donorActivity: "Activité",
    }
  }
};
