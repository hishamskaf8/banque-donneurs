

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
      content: "Cette application, ainsi que tous ses modules originaux et annexes, a été entièrement développée par <span class=\"font-black text-lg mx-1\">Skaf Hisham</span>, <span class=\"font-black text-lg mx-1\">TOUFAN Mohammed</span> et <span class=\"font-black text-lg mx-1\">Imene AHMED OMAR</span> pour le compte du Croissant-Rouge Algérien – Comité de la Wilaya de Sidi Bel Abbès, afin de garantir une qualité optimale et une parfaite adaptation aux besoins de la communauté locale."
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
        "En utilisant l’application, les utilisateurs s’engagent à respecter les directives locales relatives à l’éligibilité au don.",
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
      title: "تطوير التطبيق",
      content: "هذا التطبيق وكل ملحقاته الأصلية والفرعية تم تطويرها بالكامل من قبل <span class=\"font-black text-lg mx-1\">سكاف هشام</span> و <span class=\"font-black text-lg mx-1\">طوفان محمد</span> و <span class=\"font-black text-lg mx-1\">إيمان أحمد عمر</span> لصالح الهلال الأحمر الجزائري – لجنة ولاية سيدي بلعباس، لضمان جودة عالية وملاءمة كاملة لاحتياجات المجتمع المحلي."
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

export const ELIGIBILITY_CONTENT = {
  fr: [
    {
      content: "Le donneur doit être en bonne santé, sans fièvre, maladies infectieuses ou conditions médicales graves."
    },
    {
      list: [
        "Âge autorisé pour le don : entre 18 et 65 ans.",
        "Le poids du donneur doit être au moins de 50 kg.",
        "Le taux d’hémoglobine doit être suffisant selon le contrôle médical.",
        "La tension artérielle, le pouls et la température corporelle doivent être dans les limites normales.",
        "Les personnes présentant des maladies infectieuses, ayant reçu une transfusion récemment ou non éligibles selon les examens médicaux ne peuvent pas donner.",
        "Le don doit être volontaire et gratuit, conformément à la législation nationale algérienne — la vente ou l’achat de sang est interdit.",
        "Une évaluation médicale supplémentaire peut être demandée dans certains cas particuliers (certains médicaments, voyage dans des zones épidémiques, ou interventions récentes telles que tatouages ou piercings)."
      ]
    },
    {
      title: "Sources médicales",
      list: [
        "Organisation mondiale de la Santé – OMS (who.int)",
        "PubMed – NCBI (ncbi.nlm.nih.gov)"
      ]
    }
  ],
  ar: [
    {
      content: "يجب أن يكون المتبرع بصحة جيدة، خالٍ من الحمى أو الأمراض المعدية أو الحالات الصحية الخطيرة."
    },
    {
      list: [
        "العمر المسموح به للتبرع: بين 18 و 65 سنة.",
        "يجب أن يكون وزن المتبرع 50 كغ أو أكثر.",
        "مستوى الهيموغلوبين (خضاب الدم) يجب أن يكون كافياً حسب الفحص الطبي.",
        "ضغط الدم، نبض القلب، ودرجة حرارة الجسم يجب أن تكون ضمن المعدلات الطبيعية.",
        "لا يُسمح بالتبرع للأشخاص المصابين بأمراض معدية، أو ممن تلقوا نقل دم مؤخراً، أو غير المؤهلين وفق الفحوصات الطبية.",
        "التبرع يكون طوعياً ومجانياً، وفق القوانين الوطنية الجزائرية — يمنع بيع أو شراء الدم.",
        "يمكن طلب تقييم طبي إضافي في بعض الحالات الخاصة (مثل بعض الأدوية، السفر لمناطق وبائية، أو إجراءات حديثة كالتاتو أو الوشم)."
      ]
    },
    {
      title: "المصادر الطبية",
      list: [
        "منظمة الصحة العالمية – WHO (who.int)",
        "قاعدة بيانات PubMed – NCBI (ncbi.nlm.nih.gov)"
      ]
    }
  ]
};

export const ARC_CONTENT = {
  fr: [
    {
      content: "Le Croissant-Rouge Algérien est une organisation humanitaire nationale fondée en 1956, opérant selon les principes du Mouvement international de la Croix-Rouge et du Croissant-Rouge. Sa mission consiste à apporter une aide aux personnes vulnérables sans discrimination, à renforcer la solidarité, à intervenir lors des urgences et des catastrophes, ainsi qu’à soutenir la santé publique. L’organisation s’appuie sur un vaste réseau de bénévoles présents dans toutes les wilayas du pays, faisant d’elle un acteur essentiel de l’action humanitaire en Algérie."
    }
  ],
  ar: [
    {
      content: "الهلال الأحمر الجزائري جمعية إنسانية وطنية تأسست عام 1956، وتعتمد على مبادئ الحركة الدولية للصليب الأحمر والهلال الأحمر. يعمل بهدف تقديم المساعدة للمحتاجين دون تمييز، وتعزيز التضامن، والاستجابة للطوارئ والكوارث، إضافة إلى دعم الصحة العمومية والتكفل بالفئات الهشة. يعتمد في نشاطاته على شبكة واسعة من المتطوعين عبر جميع ولايات الجزائر، ويُعد قوة أساسية في العمل الإغاثي والإنساني داخل البلاد."
    }
  ]
};

export const DOWNLOAD_CONTENT = {
  fr: {
    title: "Télécharger l'application mobile",
    description: "Profitez d'une expérience plus fluide, stable et restez connecté en permanence. Téléchargez notre application officielle pour accéder rapidement aux services de don.\n\nNote : Si vous rencontrez des difficultés pour accéder à la page de téléchargement, essayez d'utiliser un VPN approprié.",
    buttonText: "Télécharger maintenant",
    url: "https://apkpure.com/p/com.cra.dondesang"
  },
  ar: {
    title: "تحميل التطبيق الرسمي",
    description: "للحصول على تجربة مستخدم أفضل وأكثر استقراراً، يمكنكم تحميل التطبيق الرسمي الخاص بنا. يتيح التطبيق وصولاً سريعاً للخدمات.\n\nملاحظة: عند مواجهة أية مشكلات في الوصول لصفحة التحميل جرب استخدام VPN مناسب.",
    buttonText: "حمل التطبيق الآن",
    url: "https://apkpure.com/p/com.cra.dondesang"
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
    pageTitle: "قطرات أمل - بنك المتبرعين بالدم",
    metaDescription: "موقع احترافي وحديث للهلال الأحمر الجزائري - اللجنة الولائية لسيدي بلعباس، يهدف إلى تسجيل متبرعين جدد بالدم والبحث عن متبرعين متوافقين بكفاءة.",
    callAction: "اتصل بالمتبرع",
    aboutApp: "حول هذا الموقع",
    eligibilityTitle: "شروط أهلية التبرع بالدم",
    arcAboutTitle: "لمحة عن الهلال الأحمر",
    downloadApp: "تحميل التطبيق",
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
    footerRights: "Croissant-Rouge Algérien - Sidi Bel Abbès. Tous droits réservés 2025 ©",
    fetchError: "Une erreur est survenue lors du chargement des données. Veuillez réessayer.",
    loading: "Chargement...",
    male: "Homme",
    female: "Femme",
    whatsappContact: "Contactez-nous",
    supportContact: "Contacter le support",
    ourLocation: "Notre localisation",
    pageTitle: "Gouttes d’Espoir - Banque des donneurs",
    metaDescription: "Un site web professionnel et moderne pour le Croissant-Rouge Algérien – Comité de Wilaya de Sidi Bel Abbès, visant à enregistrer de nouveaux donneurs de sang et à rechercher efficacement des donneurs compatibles.",
    callAction: "Appeler le donneur",
    aboutApp: "À propos de cette application",
    eligibilityTitle: "Conditions d’éligibilité",
    arcAboutTitle: "Aperçu du Croissant-Rouge",
    downloadApp: "Télécharger l'application",
  }
};