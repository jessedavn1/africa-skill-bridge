import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export const LANGUAGES = [
  { code: "English", label: "English", flag: "🇬🇧" },
  { code: "Français", label: "Français", flag: "🇫🇷" },
  { code: "Kiswahili", label: "Kiswahili", flag: "🇰🇪" },
  { code: "Kinyarwanda", label: "Kinyarwanda", flag: "🇷🇼" },
  { code: "Kirundi", label: "Kirundi", flag: "🇧🇮" },
  { code: "العربية", label: "العربية", flag: "🇸🇦" },
  { code: "Deutsch", label: "Deutsch", flag: "🇩🇪" },
  { code: "Español", label: "Español", flag: "🇪🇸" },
  { code: "isiZulu", label: "isiZulu", flag: "🇿🇦" },
  { code: "Yorùbá", label: "Yorùbá", flag: "🇳🇬" },
  { code: "Igbo", label: "Igbo", flag: "🇳🇬" },
  { code: "Lingala", label: "Lingala", flag: "🇨🇩" },
] as const;

export type LangCode = typeof LANGUAGES[number]["code"];

type Dict = Record<string, string>;

// Concise UI dictionaries. English is the source of truth and fallback.
const en: Dict = {
  "nav.talents": "Talents",
  "nav.innovation": "Innovation",
  "nav.future": "Future Skills",
  "nav.languages": "Languages",
  "nav.tutor": "AI Tutor",
  "nav.signin": "Sign in",
  "nav.start": "Start learning",
  "nav.language": "Language",

  "dash.title": "Dashboard",
  "dash.welcome": "Welcome",
  "dash.innovationHub": "Innovation Hub",
  "dash.teacher": "Teacher tools",
  "dash.parent": "Parent view",
  "dash.signout": "Sign out",
  "dash.totalXp": "Total XP",
  "dash.lessons": "Lessons",
  "dash.streak": "Best streak",
  "dash.tab.tutor": "AI Tutor",
  "dash.tab.talents": "My Talents",
  "dash.tab.progress": "Progress",
  "dash.tab.goals": "Daily goals",
  "dash.tutor.greeting": "Hi! I'm Akili. Ask me anything — I'll explain step by step in your language.",
  "dash.tutor.thinking": "Akili is thinking…",
  "dash.tutor.placeholder": "Ask in",
  "dash.talents.title": "Your AI talent profile",
  "dash.talents.sub": "Built from how you learn, ask, and create. Re-analyze any time.",
  "dash.talents.account": "Account ID (share with parent)",
  "dash.talents.analyze": "Analyze my talents",
  "dash.talents.analyzing": "Analyzing…",
  "dash.talents.empty": "Engage with the tutor and Innovation Hub, then run analysis.",
  "dash.talents.top": "Top talents",
  "dash.talents.growth": "Growth areas",
  "dash.talents.careers": "Future careers",
  "dash.talents.updated": "Talent profile updated",
  "dash.progress.empty": "No progress yet — chat with the tutor to start earning XP.",
  "dash.goals.1": "Complete 1 tutor session",
  "dash.goals.2": "Practice for 15 minutes",
  "dash.goals.3": "Review yesterday's lesson",

  "inno.title": "Innovation Hub",
  "inno.headline1": "Turn talent into",
  "inno.headline2": "traction.",
  "inno.back": "Back to dashboard",
  "inno.idea": "AI Idea Generator",
  "inno.ideaPlaceholder": "What are you passionate about? (e.g. football, fashion, water, music)",
  "inno.spark": "Spark idea",
  "inno.problem": "Problem",
  "inno.solution": "Solution",
  "inno.tech": "Tech",
  "inno.yours": "Your projects",
  "inno.projTitle": "Project title",
  "inno.projDesc": "Short description",
  "inno.add": "Add",
  "inno.public": "Public",
  "inno.private": "Private",
  "inno.review": "Get AI mentor feedback",
  "inno.empty": "No projects yet — add your first idea above.",
  "inno.community": "Community projects",
  "inno.communityEmpty": "Be the first to publish a project.",
  "inno.created": "Project created",

  "parent.title": "Parent insights",
  "parent.headline1": "What is your child",
  "parent.headline2": "naturally gifted at?",
  "parent.link": "Link a student",
  "parent.linkHint": "Ask your child to share their AkiliAI account ID (visible in their dashboard).",
  "parent.idPlaceholder": "Student account ID (UUID)",
  "parent.linkBtn": "Link",
  "parent.linked": "Student linked",
  "parent.none": "No students linked yet.",
  "parent.xp": "XP",
  "parent.lessons": "lessons",
  "parent.top": "Top talents",
  "parent.growth": "Growth areas",
  "parent.careers": "Career paths",
  "parent.building": "Talent profile builds as your child engages with the platform.",
};

const fr: Dict = {
  "nav.talents": "Talents", "nav.innovation": "Innovation", "nav.future": "Compétences futures", "nav.languages": "Langues", "nav.tutor": "Tuteur IA", "nav.signin": "Connexion", "nav.start": "Commencer", "nav.language": "Langue",
  "dash.title": "Tableau de bord", "dash.welcome": "Bienvenue", "dash.innovationHub": "Pôle Innovation", "dash.teacher": "Outils enseignant", "dash.parent": "Vue parent", "dash.signout": "Déconnexion", "dash.totalXp": "XP total", "dash.lessons": "Leçons", "dash.streak": "Meilleure série",
  "dash.tab.tutor": "Tuteur IA", "dash.tab.talents": "Mes talents", "dash.tab.progress": "Progrès", "dash.tab.goals": "Objectifs",
  "dash.tutor.greeting": "Salut ! Je suis Akili. Pose-moi tout — j'explique étape par étape dans ta langue.", "dash.tutor.thinking": "Akili réfléchit…", "dash.tutor.placeholder": "Demander en",
  "dash.talents.title": "Votre profil de talents IA", "dash.talents.sub": "Construit à partir de votre façon d'apprendre. Réanalysez à tout moment.", "dash.talents.account": "ID de compte (à partager avec le parent)", "dash.talents.analyze": "Analyser mes talents", "dash.talents.analyzing": "Analyse…", "dash.talents.empty": "Discute avec le tuteur puis lance l'analyse.", "dash.talents.top": "Talents principaux", "dash.talents.growth": "Axes de progrès", "dash.talents.careers": "Carrières futures", "dash.talents.updated": "Profil mis à jour",
  "dash.progress.empty": "Aucun progrès — discute avec le tuteur pour gagner des XP.", "dash.goals.1": "Faire 1 séance avec le tuteur", "dash.goals.2": "Pratiquer 15 minutes", "dash.goals.3": "Revoir la leçon d'hier",
  "inno.title": "Pôle Innovation", "inno.headline1": "Transformez le talent en", "inno.headline2": "impact.", "inno.back": "Retour au tableau", "inno.idea": "Générateur d'idées IA", "inno.ideaPlaceholder": "Quelle est votre passion ? (foot, mode, eau, musique)", "inno.spark": "Générer", "inno.problem": "Problème", "inno.solution": "Solution", "inno.tech": "Technologies", "inno.yours": "Vos projets", "inno.projTitle": "Titre du projet", "inno.projDesc": "Brève description", "inno.add": "Ajouter", "inno.public": "Public", "inno.private": "Privé", "inno.review": "Avis du mentor IA", "inno.empty": "Aucun projet — ajoutez votre première idée.", "inno.community": "Projets de la communauté", "inno.communityEmpty": "Soyez le premier à publier.", "inno.created": "Projet créé",
  "parent.title": "Espace parent", "parent.headline1": "Quels sont les dons", "parent.headline2": "naturels de votre enfant ?", "parent.link": "Lier un élève", "parent.linkHint": "Demandez à votre enfant son ID de compte AkiliAI.", "parent.idPlaceholder": "ID élève (UUID)", "parent.linkBtn": "Lier", "parent.linked": "Élève lié", "parent.none": "Aucun élève lié.", "parent.xp": "XP", "parent.lessons": "leçons", "parent.top": "Talents principaux", "parent.growth": "Axes de progrès", "parent.careers": "Pistes de carrière", "parent.building": "Le profil se construit pendant que votre enfant utilise la plateforme.",
};

const sw: Dict = {
  "nav.talents": "Vipaji", "nav.innovation": "Ubunifu", "nav.future": "Ujuzi wa Baadaye", "nav.languages": "Lugha", "nav.tutor": "Mwalimu AI", "nav.signin": "Ingia", "nav.start": "Anza kujifunza", "nav.language": "Lugha",
  "dash.title": "Dashibodi", "dash.welcome": "Karibu", "dash.innovationHub": "Kituo cha Ubunifu", "dash.teacher": "Zana za mwalimu", "dash.parent": "Mtazamo wa mzazi", "dash.signout": "Toka", "dash.totalXp": "XP jumla", "dash.lessons": "Masomo", "dash.streak": "Mfululizo bora",
  "dash.tab.tutor": "Mwalimu AI", "dash.tab.talents": "Vipaji vyangu", "dash.tab.progress": "Maendeleo", "dash.tab.goals": "Malengo ya leo",
  "dash.tutor.greeting": "Hujambo! Mimi ni Akili. Niulize chochote — nitaeleza hatua kwa hatua kwa lugha yako.", "dash.tutor.thinking": "Akili anafikiria…", "dash.tutor.placeholder": "Uliza kwa",
  "dash.talents.title": "Wasifu wako wa vipaji wa AI", "dash.talents.sub": "Umejengwa kutokana na jinsi unavyojifunza. Changanua tena wakati wowote.", "dash.talents.account": "Kitambulisho cha akaunti (shiriki na mzazi)", "dash.talents.analyze": "Changanua vipaji vyangu", "dash.talents.analyzing": "Inachanganua…", "dash.talents.empty": "Ongea na mwalimu, kisha changanua.", "dash.talents.top": "Vipaji vya juu", "dash.talents.growth": "Maeneo ya ukuaji", "dash.talents.careers": "Kazi za baadaye", "dash.talents.updated": "Wasifu umesasishwa",
  "dash.progress.empty": "Hakuna maendeleo bado — ongea na mwalimu kupata XP.", "dash.goals.1": "Maliza kipindi 1 cha mwalimu", "dash.goals.2": "Fanya mazoezi dakika 15", "dash.goals.3": "Pitia somo la jana",
  "inno.title": "Kituo cha Ubunifu", "inno.headline1": "Geuza kipaji kuwa", "inno.headline2": "athari.", "inno.back": "Rudi kwenye dashibodi", "inno.idea": "Jenereta ya Mawazo AI", "inno.ideaPlaceholder": "Una shauku ya nini? (mpira, mitindo, maji, muziki)", "inno.spark": "Toa wazo", "inno.problem": "Tatizo", "inno.solution": "Suluhisho", "inno.tech": "Teknolojia", "inno.yours": "Miradi yako", "inno.projTitle": "Jina la mradi", "inno.projDesc": "Maelezo mafupi", "inno.add": "Ongeza", "inno.public": "Hadharani", "inno.private": "Binafsi", "inno.review": "Pata maoni ya mshauri AI", "inno.empty": "Hakuna miradi bado — ongeza wazo lako.", "inno.community": "Miradi ya jamii", "inno.communityEmpty": "Kuwa wa kwanza kuchapisha.", "inno.created": "Mradi umeundwa",
  "parent.title": "Maoni ya wazazi", "parent.headline1": "Mtoto wako amezawadiwa", "parent.headline2": "kwa nini kiasili?", "parent.link": "Unganisha mwanafunzi", "parent.linkHint": "Muulize mtoto wako kitambulisho chake cha akaunti ya AkiliAI.", "parent.idPlaceholder": "Kitambulisho cha mwanafunzi (UUID)", "parent.linkBtn": "Unganisha", "parent.linked": "Mwanafunzi ameunganishwa", "parent.none": "Hakuna mwanafunzi aliyeunganishwa.", "parent.xp": "XP", "parent.lessons": "masomo", "parent.top": "Vipaji vya juu", "parent.growth": "Maeneo ya ukuaji", "parent.careers": "Njia za kazi", "parent.building": "Wasifu unajengwa mtoto wako anapotumia jukwaa.",
};

const rw: Dict = {
  "nav.talents": "Impano", "nav.innovation": "Udushya", "nav.future": "Ubumenyi bw'ejo", "nav.languages": "Indimi", "nav.tutor": "Mwarimu AI", "nav.signin": "Injira", "nav.start": "Tangira kwiga", "nav.language": "Ururimi",
  "dash.title": "Imbonerahamwe", "dash.welcome": "Murakaza neza", "dash.innovationHub": "Ihuriro ry'Udushya", "dash.teacher": "Ibikoresho by'umwarimu", "dash.parent": "Ababyeyi", "dash.signout": "Sohoka", "dash.totalXp": "XP zose", "dash.lessons": "Amasomo", "dash.streak": "Igihe cyiza",
  "dash.tab.tutor": "Mwarimu AI", "dash.tab.talents": "Impano zanjye", "dash.tab.progress": "Iterambere", "dash.tab.goals": "Intego za uyu munsi",
  "dash.tutor.greeting": "Muraho! Ndi Akili. Mbaza icyo wifuza — ndasobanura intambwe ku ntambwe mu rurimi rwawe.", "dash.tutor.thinking": "Akili aratekereza…", "dash.tutor.placeholder": "Baza mu",
  "dash.talents.title": "Umwirondoro w'impano wa AI", "dash.talents.sub": "Wubatswe ku byo wiga. Subiramo igihe ushakiye.", "dash.talents.account": "ID ya konti (sangiza umubyeyi)", "dash.talents.analyze": "Suzuma impano zanjye", "dash.talents.analyzing": "Birasuzumwa…", "dash.talents.empty": "Vugana na mwarimu, hanyuma usuzume.", "dash.talents.top": "Impano nkuru", "dash.talents.growth": "Aho ukura", "dash.talents.careers": "Imirimo y'ejo", "dash.talents.updated": "Umwirondoro wahinduwe",
  "dash.progress.empty": "Nta terambere — vugana na mwarimu kugira ngo ubone XP.", "dash.goals.1": "Sohoza isomo rimwe na mwarimu", "dash.goals.2": "Imenyereze iminota 15", "dash.goals.3": "Subiramo isomo ry'ejo",
  "inno.title": "Ihuriro ry'Udushya", "inno.headline1": "Hindura impano mu", "inno.headline2": "ngaruka.", "inno.back": "Subira ku mbonerahamwe", "inno.idea": "Itanga-bitekerezo rya AI", "inno.ideaPlaceholder": "Ukunda iki? (umupira, imyambarire, amazi, umuziki)", "inno.spark": "Tanga igitekerezo", "inno.problem": "Ikibazo", "inno.solution": "Igisubizo", "inno.tech": "Ikoranabuhanga", "inno.yours": "Imishinga yawe", "inno.projTitle": "Izina ry'umushinga", "inno.projDesc": "Ubusobanuro bugufi", "inno.add": "Ongeraho", "inno.public": "Rusange", "inno.private": "Bwite", "inno.review": "Saba inama y'umutoza AI", "inno.empty": "Nta mishinga — ongeraho igitekerezo cyawe.", "inno.community": "Imishinga rusange", "inno.communityEmpty": "Ba uwa mbere ushyira ahagaragara.", "inno.created": "Umushinga waremwe",
  "parent.title": "Inkuru ku babyeyi", "parent.headline1": "Ni iki umwana wawe", "parent.headline2": "yavukanye?", "parent.link": "Huza umunyeshuri", "parent.linkHint": "Saba umwana wawe ID ya konti ya AkiliAI.", "parent.idPlaceholder": "ID y'umunyeshuri (UUID)", "parent.linkBtn": "Huza", "parent.linked": "Umunyeshuri yahujwe", "parent.none": "Nta munyeshuri uhujwe.", "parent.xp": "XP", "parent.lessons": "amasomo", "parent.top": "Impano nkuru", "parent.growth": "Aho akura", "parent.careers": "Imirimo", "parent.building": "Umwirondoro wubakwa uko umwana akoresha urubuga.",
};

const ki: Dict = {
  "nav.talents": "Impano", "nav.innovation": "Ivyahishuwe", "nav.future": "Ubuhinga bw'ejo", "nav.languages": "Indimi", "nav.tutor": "Umwigisha AI", "nav.signin": "Injira", "nav.start": "Tangura kwiga", "nav.language": "Ururimi",
  "dash.title": "Imbonerahamwe", "dash.welcome": "Murakaza neza", "dash.innovationHub": "Ikigo c'Ivyahishuwe", "dash.teacher": "Ibikoresho vy'umwigisha", "dash.parent": "Abavyeyi", "dash.signout": "Sohoka", "dash.totalXp": "XP zose", "dash.lessons": "Amasomo", "dash.streak": "Umurongo mwiza",
  "dash.tab.tutor": "Umwigisha AI", "dash.tab.talents": "Impano zanje", "dash.tab.progress": "Iterambere", "dash.tab.goals": "Imigambi y'uyu munsi",
  "dash.tutor.greeting": "Bite! Ndi Akili. Mbaza ico wipfuza — ndasigura intambwe ku rundi mu rurimi rwawe.", "dash.tutor.thinking": "Akili ariko aratekereza…", "dash.tutor.placeholder": "Baza mu",
  "dash.talents.title": "Umwirondoro w'impano wa AI", "dash.talents.sub": "Wubatswe ku vyo wiga. Subiramwo igihe ushaka.", "dash.talents.account": "ID ya konte (raba umuvyeyi)", "dash.talents.analyze": "Suzuma impano zanje", "dash.talents.analyzing": "Birimwo gusuzumwa…", "dash.talents.empty": "Vugana n'umwigisha, uhereze usuzume.", "dash.talents.top": "Impano nkuru", "dash.talents.growth": "Aho ukura", "dash.talents.careers": "Imirimo y'ejo", "dash.talents.updated": "Umwirondoro wahinduwe",
  "dash.progress.empty": "Nta terambere — vugana n'umwigisha kugira uronke XP.", "dash.goals.1": "Sozera isomo 1 n'umwigisha", "dash.goals.2": "Imenyereze iminuta 15", "dash.goals.3": "Subiramwo isomo ry'ejo",
  "inno.title": "Ikigo c'Ivyahishuwe", "inno.headline1": "Hindura impano mu", "inno.headline2": "nyungu.", "inno.back": "Subira ku mbonerahamwe", "inno.idea": "Iremesha-vyiyumviro AI", "inno.ideaPlaceholder": "Ukunda iki? (umupira, imyambaro, amazi, indirimbo)", "inno.spark": "Tanga iciyumviro", "inno.problem": "Ikibazo", "inno.solution": "Inyishu", "inno.tech": "Ikoranabuhinga", "inno.yours": "Imigambi yawe", "inno.projTitle": "Izina ry'umugambi", "inno.projDesc": "Insiguro ngufi", "inno.add": "Ongeraho", "inno.public": "Rusangi", "inno.private": "Wenyene", "inno.review": "Saba impanuro za AI", "inno.empty": "Nta migambi — ongeraho iciyumviro.", "inno.community": "Imigambi y'abandi", "inno.communityEmpty": "Ba uwa mbere ushira ahabona.", "inno.created": "Umugambi waremwe",
  "parent.title": "Inkuru y'abavyeyi", "parent.headline1": "Umwana wawe yavukanye", "parent.headline2": "iki?", "parent.link": "Huza umwigishwa", "parent.linkHint": "Saba umwana wawe ID ya konte ya AkiliAI.", "parent.idPlaceholder": "ID y'umwigishwa (UUID)", "parent.linkBtn": "Huza", "parent.linked": "Umwigishwa yahujwe", "parent.none": "Nta mwigishwa uhujwe.", "parent.xp": "XP", "parent.lessons": "amasomo", "parent.top": "Impano nkuru", "parent.growth": "Aho akura", "parent.careers": "Imirimo", "parent.building": "Umwirondoro wubakwa uko umwana akoresha.",
};

const ar: Dict = {
  "nav.talents": "المواهب", "nav.innovation": "الابتكار", "nav.future": "مهارات المستقبل", "nav.languages": "اللغات", "nav.tutor": "مدرّس الذكاء", "nav.signin": "دخول", "nav.start": "ابدأ التعلم", "nav.language": "اللغة",
  "dash.title": "لوحة التحكم", "dash.welcome": "مرحباً", "dash.innovationHub": "مركز الابتكار", "dash.teacher": "أدوات المعلم", "dash.parent": "ولي الأمر", "dash.signout": "خروج", "dash.totalXp": "إجمالي XP", "dash.lessons": "الدروس", "dash.streak": "أفضل سلسلة",
  "dash.tab.tutor": "مدرّس الذكاء", "dash.tab.talents": "مواهبي", "dash.tab.progress": "التقدم", "dash.tab.goals": "أهداف اليوم",
  "dash.tutor.greeting": "مرحباً! أنا أكيلي. اسألني أي شيء — سأشرح خطوة بخطوة بلغتك.", "dash.tutor.thinking": "أكيلي يفكر…", "dash.tutor.placeholder": "اسأل بـ",
  "dash.talents.title": "ملف مواهبك من الذكاء الاصطناعي", "dash.talents.sub": "مبني على طريقة تعلمك. أعد التحليل في أي وقت.", "dash.talents.account": "معرّف الحساب (شاركه مع ولي الأمر)", "dash.talents.analyze": "حلّل مواهبي", "dash.talents.analyzing": "جارٍ التحليل…", "dash.talents.empty": "تفاعل مع المدرّس ثم شغّل التحليل.", "dash.talents.top": "أبرز المواهب", "dash.talents.growth": "مجالات النمو", "dash.talents.careers": "المسارات المهنية", "dash.talents.updated": "تم تحديث الملف",
  "dash.progress.empty": "لا تقدم بعد — تحدث مع المدرّس لكسب XP.", "dash.goals.1": "أكمل جلسة واحدة مع المدرّس", "dash.goals.2": "تدرّب 15 دقيقة", "dash.goals.3": "راجع درس الأمس",
  "inno.title": "مركز الابتكار", "inno.headline1": "حوّل الموهبة إلى", "inno.headline2": "أثر.", "inno.back": "العودة إلى اللوحة", "inno.idea": "مولّد الأفكار AI", "inno.ideaPlaceholder": "ما الذي تشغف به؟ (كرة، أزياء، ماء، موسيقى)", "inno.spark": "أنشئ فكرة", "inno.problem": "المشكلة", "inno.solution": "الحل", "inno.tech": "التقنية", "inno.yours": "مشاريعك", "inno.projTitle": "عنوان المشروع", "inno.projDesc": "وصف قصير", "inno.add": "أضف", "inno.public": "عام", "inno.private": "خاص", "inno.review": "مراجعة من مرشد AI", "inno.empty": "لا مشاريع — أضف فكرتك الأولى.", "inno.community": "مشاريع المجتمع", "inno.communityEmpty": "كن أول من ينشر.", "inno.created": "تم إنشاء المشروع",
  "parent.title": "رؤى ولي الأمر", "parent.headline1": "ما الذي يتمتع به طفلك", "parent.headline2": "بشكل طبيعي؟", "parent.link": "ربط طالب", "parent.linkHint": "اطلب من طفلك معرّف حسابه في AkiliAI.", "parent.idPlaceholder": "معرّف الطالب (UUID)", "parent.linkBtn": "ربط", "parent.linked": "تم ربط الطالب", "parent.none": "لا طلاب مرتبطون.", "parent.xp": "XP", "parent.lessons": "دروس", "parent.top": "أبرز المواهب", "parent.growth": "مجالات النمو", "parent.careers": "المسارات المهنية", "parent.building": "يُبنى الملف عند استخدام طفلك للمنصة.",
};

const de: Dict = {
  "nav.talents": "Talente", "nav.innovation": "Innovation", "nav.future": "Zukunftsfähigkeiten", "nav.languages": "Sprachen", "nav.tutor": "KI-Tutor", "nav.signin": "Anmelden", "nav.start": "Loslernen", "nav.language": "Sprache",
  "dash.title": "Dashboard", "dash.welcome": "Willkommen", "dash.innovationHub": "Innovations-Hub", "dash.teacher": "Lehrer-Tools", "dash.parent": "Eltern-Ansicht", "dash.signout": "Abmelden", "dash.totalXp": "Gesamt-XP", "dash.lessons": "Lektionen", "dash.streak": "Beste Serie",
  "dash.tab.tutor": "KI-Tutor", "dash.tab.talents": "Meine Talente", "dash.tab.progress": "Fortschritt", "dash.tab.goals": "Tagesziele",
  "dash.tutor.greeting": "Hi! Ich bin Akili. Frag mich alles — ich erkläre Schritt für Schritt in deiner Sprache.", "dash.tutor.thinking": "Akili denkt nach…", "dash.tutor.placeholder": "Frag auf",
  "dash.talents.title": "Dein KI-Talentprofil", "dash.talents.sub": "Aus deinem Lernverhalten erstellt. Jederzeit neu analysieren.", "dash.talents.account": "Konto-ID (mit Eltern teilen)", "dash.talents.analyze": "Talente analysieren", "dash.talents.analyzing": "Analysiere…", "dash.talents.empty": "Sprich mit dem Tutor und starte dann die Analyse.", "dash.talents.top": "Top-Talente", "dash.talents.growth": "Wachstumsfelder", "dash.talents.careers": "Karrierewege", "dash.talents.updated": "Profil aktualisiert",
  "dash.progress.empty": "Noch kein Fortschritt — chatte mit dem Tutor für XP.", "dash.goals.1": "1 Tutor-Sitzung abschließen", "dash.goals.2": "15 Minuten üben", "dash.goals.3": "Gestrige Lektion wiederholen",
  "inno.title": "Innovations-Hub", "inno.headline1": "Talent in", "inno.headline2": "Wirkung verwandeln.", "inno.back": "Zurück zum Dashboard", "inno.idea": "KI-Ideengenerator", "inno.ideaPlaceholder": "Wofür brennst du? (Fußball, Mode, Wasser, Musik)", "inno.spark": "Idee zünden", "inno.problem": "Problem", "inno.solution": "Lösung", "inno.tech": "Technologie", "inno.yours": "Deine Projekte", "inno.projTitle": "Projekttitel", "inno.projDesc": "Kurzbeschreibung", "inno.add": "Hinzufügen", "inno.public": "Öffentlich", "inno.private": "Privat", "inno.review": "KI-Mentor-Feedback", "inno.empty": "Noch keine Projekte — füge deine erste Idee hinzu.", "inno.community": "Community-Projekte", "inno.communityEmpty": "Sei die/der Erste.", "inno.created": "Projekt erstellt",
  "parent.title": "Eltern-Einblicke", "parent.headline1": "Worin ist dein Kind", "parent.headline2": "natürlich begabt?", "parent.link": "Schüler verknüpfen", "parent.linkHint": "Frag dein Kind nach seiner AkiliAI-Konto-ID.", "parent.idPlaceholder": "Schüler-ID (UUID)", "parent.linkBtn": "Verknüpfen", "parent.linked": "Schüler verknüpft", "parent.none": "Keine Schüler verknüpft.", "parent.xp": "XP", "parent.lessons": "Lektionen", "parent.top": "Top-Talente", "parent.growth": "Wachstum", "parent.careers": "Karrierewege", "parent.building": "Profil entsteht durch Nutzung der Plattform.",
};

const es: Dict = {
  "nav.talents": "Talentos", "nav.innovation": "Innovación", "nav.future": "Habilidades del futuro", "nav.languages": "Idiomas", "nav.tutor": "Tutor IA", "nav.signin": "Entrar", "nav.start": "Empezar", "nav.language": "Idioma",
  "dash.title": "Panel", "dash.welcome": "Bienvenido", "dash.innovationHub": "Hub de Innovación", "dash.teacher": "Herramientas docentes", "dash.parent": "Vista familiar", "dash.signout": "Salir", "dash.totalXp": "XP total", "dash.lessons": "Lecciones", "dash.streak": "Mejor racha",
  "dash.tab.tutor": "Tutor IA", "dash.tab.talents": "Mis talentos", "dash.tab.progress": "Progreso", "dash.tab.goals": "Metas diarias",
  "dash.tutor.greeting": "¡Hola! Soy Akili. Pregúntame lo que sea — explico paso a paso en tu idioma.", "dash.tutor.thinking": "Akili está pensando…", "dash.tutor.placeholder": "Pregunta en",
  "dash.talents.title": "Tu perfil de talentos IA", "dash.talents.sub": "Construido por tu forma de aprender. Reanaliza cuando quieras.", "dash.talents.account": "ID de cuenta (compartir con familia)", "dash.talents.analyze": "Analizar mis talentos", "dash.talents.analyzing": "Analizando…", "dash.talents.empty": "Interactúa con el tutor y luego analiza.", "dash.talents.top": "Talentos clave", "dash.talents.growth": "Áreas de mejora", "dash.talents.careers": "Carreras futuras", "dash.talents.updated": "Perfil actualizado",
  "dash.progress.empty": "Sin progreso — chatea con el tutor para ganar XP.", "dash.goals.1": "Completa 1 sesión con el tutor", "dash.goals.2": "Practica 15 minutos", "dash.goals.3": "Repasa la lección de ayer",
  "inno.title": "Hub de Innovación", "inno.headline1": "Convierte el talento en", "inno.headline2": "impacto.", "inno.back": "Volver al panel", "inno.idea": "Generador de ideas IA", "inno.ideaPlaceholder": "¿Qué te apasiona? (fútbol, moda, agua, música)", "inno.spark": "Generar idea", "inno.problem": "Problema", "inno.solution": "Solución", "inno.tech": "Tecnología", "inno.yours": "Tus proyectos", "inno.projTitle": "Título del proyecto", "inno.projDesc": "Descripción corta", "inno.add": "Añadir", "inno.public": "Público", "inno.private": "Privado", "inno.review": "Feedback del mentor IA", "inno.empty": "Sin proyectos — añade tu primera idea.", "inno.community": "Proyectos de la comunidad", "inno.communityEmpty": "Sé el primero en publicar.", "inno.created": "Proyecto creado",
  "parent.title": "Vista familiar", "parent.headline1": "¿En qué tiene tu hijo", "parent.headline2": "talento natural?", "parent.link": "Vincular estudiante", "parent.linkHint": "Pide a tu hijo el ID de su cuenta AkiliAI.", "parent.idPlaceholder": "ID de estudiante (UUID)", "parent.linkBtn": "Vincular", "parent.linked": "Estudiante vinculado", "parent.none": "Ningún estudiante vinculado.", "parent.xp": "XP", "parent.lessons": "lecciones", "parent.top": "Talentos clave", "parent.growth": "Áreas de mejora", "parent.careers": "Carreras", "parent.building": "El perfil se construye con el uso de la plataforma.",
};

const zu: Dict = {
  "nav.talents": "Amathalente", "nav.innovation": "Ukwakha", "nav.future": "Amakhono Esikhathi Esizayo", "nav.languages": "Izilimi", "nav.tutor": "Uthisha we-AI", "nav.signin": "Ngena", "nav.start": "Qala ukufunda", "nav.language": "Ulimi",
  "dash.title": "Ideshibhodi", "dash.welcome": "Sawubona", "dash.innovationHub": "Isikhungo Sokwakha", "dash.teacher": "Amathuluzi othisha", "dash.parent": "Umzali", "dash.signout": "Phuma", "dash.totalXp": "I-XP iyonke", "dash.lessons": "Izifundo", "dash.streak": "Uchungechunge oluhle",
  "dash.tab.tutor": "Uthisha we-AI", "dash.tab.talents": "Amathalente ami", "dash.tab.progress": "Inqubekela", "dash.tab.goals": "Imigomo yanamuhla",
  "dash.tutor.greeting": "Sawubona! Ngingu-Akili. Ngibuze noma yini — ngizochaza ngolimi lwakho.", "dash.tutor.thinking": "U-Akili uyacabanga…", "dash.tutor.placeholder": "Buza nge-",
  "dash.talents.title": "Iphrofayela yamathalente ye-AI", "dash.talents.sub": "Yakhiwe endleleni ofunda ngayo. Hlaziya futhi noma nini.", "dash.talents.account": "I-ID ye-akhawunti (yabelana nomzali)", "dash.talents.analyze": "Hlaziya amathalente ami", "dash.talents.analyzing": "Iyahlaziya…", "dash.talents.empty": "Xoxa nothisha bese uhlaziya.", "dash.talents.top": "Amathalente aphezulu", "dash.talents.growth": "Izindawo zokukhula", "dash.talents.careers": "Imikhakha yesikhathi esizayo", "dash.talents.updated": "Iphrofayela ibuyekeziwe",
  "dash.progress.empty": "Akukho nqubekela — xoxa nothisha ukuze uthole i-XP.", "dash.goals.1": "Qedela isikhathi esisodwa nothisha", "dash.goals.2": "Zilolonge imizuzu engu-15", "dash.goals.3": "Buyekeza isifundo sayizolo",
  "inno.title": "Isikhungo Sokwakha", "inno.headline1": "Phendula ithalente libe", "inno.headline2": "umthelela.", "inno.back": "Buyela kudeshibhodi", "inno.idea": "Umkhiqizi wemibono we-AI", "inno.ideaPlaceholder": "Yini oyithandayo? (ibhola, imfashini, amanzi, umculo)", "inno.spark": "Khiqiza umbono", "inno.problem": "Inkinga", "inno.solution": "Isisombululo", "inno.tech": "Ubuchwepheshe", "inno.yours": "Amaphrojekthi akho", "inno.projTitle": "Isihloko sephrojekthi", "inno.projDesc": "Incazelo emfushane", "inno.add": "Engeza", "inno.public": "Sidlangalala", "inno.private": "Yimfihlo", "inno.review": "Thola umbono womeluleki we-AI", "inno.empty": "Awekho amaphrojekthi — engeza umbono wakho.", "inno.community": "Amaphrojekthi omphakathi", "inno.communityEmpty": "Yiba owokuqala ukushicilela.", "inno.created": "Iphrojekthi yakhiwe",
  "parent.title": "Imibono yomzali", "parent.headline1": "Ingane yakho inephuzu", "parent.headline2": "lemvelo lini?", "parent.link": "Xhuma umfundi", "parent.linkHint": "Cela ingane yakho i-ID ye-akhawunti ye-AkiliAI.", "parent.idPlaceholder": "I-ID yomfundi (UUID)", "parent.linkBtn": "Xhuma", "parent.linked": "Umfundi uxhunyiwe", "parent.none": "Akekho umfundi oxhunyiwe.", "parent.xp": "XP", "parent.lessons": "izifundo", "parent.top": "Amathalente aphezulu", "parent.growth": "Ukukhula", "parent.careers": "Imikhakha", "parent.building": "Iphrofayela yakhiwa njengoba ingane isebenzisa.",
};

const yo: Dict = {
  "nav.talents": "Ẹ̀bùn", "nav.innovation": "Ìmúlò", "nav.future": "Ọgbọ́n Ọ̀la", "nav.languages": "Èdè", "nav.tutor": "Olùkọ́ AI", "nav.signin": "Wọlé", "nav.start": "Bẹ̀rẹ̀", "nav.language": "Èdè",
  "dash.title": "Pátákó", "dash.welcome": "Ẹ káàbọ̀", "dash.innovationHub": "Ibùdó Ìmúlò", "dash.teacher": "Irinṣẹ́ olùkọ́", "dash.parent": "Òbí", "dash.signout": "Jáde", "dash.totalXp": "Àpapọ̀ XP", "dash.lessons": "Ẹ̀kọ́", "dash.streak": "Ipo ọlọ́jọ́",
  "dash.tab.tutor": "Olùkọ́ AI", "dash.tab.talents": "Ẹ̀bùn mi", "dash.tab.progress": "Ìtẹ̀síwájú", "dash.tab.goals": "Èrò ọjọ́",
  "dash.tutor.greeting": "Báwo! Èmi ni Akili. Bí mi nǹkan kankan — màá ṣàlàyé ní èdè rẹ.", "dash.tutor.thinking": "Akili ń ronú…", "dash.tutor.placeholder": "Bí ní",
  "dash.talents.title": "Profáìlì ẹ̀bùn AI rẹ", "dash.talents.sub": "A kọ́ ọ́ láti ọ̀nà tí o fi ń kọ́. Ṣe àyẹ̀wò nígbàkígbà.", "dash.talents.account": "ID àkántì (pín pẹ̀lú òbí)", "dash.talents.analyze": "Ṣe àyẹ̀wò ẹ̀bùn mi", "dash.talents.analyzing": "Ń ṣàyẹ̀wò…", "dash.talents.empty": "Bá olùkọ́ sọ̀rọ̀ kí o tó ṣàyẹ̀wò.", "dash.talents.top": "Ẹ̀bùn àkọ́kọ́", "dash.talents.growth": "Àyè ìdàgbà", "dash.talents.careers": "Iṣẹ́ ọ̀la", "dash.talents.updated": "A ti tún profáìlì ṣe",
  "dash.progress.empty": "Kò sí ìtẹ̀síwájú — bá olùkọ́ sọ̀rọ̀ láti gba XP.", "dash.goals.1": "Pari àpèjọ kan pẹ̀lú olùkọ́", "dash.goals.2": "Ṣe àdánwò ìṣẹ́jú 15", "dash.goals.3": "Tún ẹ̀kọ́ ana wo",
  "inno.title": "Ibùdó Ìmúlò", "inno.headline1": "Yí ẹ̀bùn padà di", "inno.headline2": "agbára.", "inno.back": "Padà sí pátákó", "inno.idea": "Ẹ̀rọ Èrò AI", "inno.ideaPlaceholder": "Kí ni ìfẹ́ rẹ? (bọ́ọ̀lù, aṣọ, omi, orin)", "inno.spark": "Pèsè èrò", "inno.problem": "Ìṣòro", "inno.solution": "Ojútùú", "inno.tech": "Ìmọ̀-ẹ̀rọ", "inno.yours": "Iṣẹ́ akanṣe rẹ", "inno.projTitle": "Orúkọ iṣẹ́", "inno.projDesc": "Àpèjúwe kúkúrú", "inno.add": "Fikún", "inno.public": "Gbangba", "inno.private": "Ìkọ̀kọ̀", "inno.review": "Gba ìmọ̀ràn AI", "inno.empty": "Kò sí iṣẹ́ — fi èrò rẹ àkọ́kọ́ kún.", "inno.community": "Iṣẹ́ àwùjọ", "inno.communityEmpty": "Jẹ́ àkọ́kọ́ láti tẹ̀ jáde.", "inno.created": "A ti dá iṣẹ́ akanṣe",
  "parent.title": "Ìmọ̀ òbí", "parent.headline1": "Kí ni ọmọ rẹ", "parent.headline2": "ní ẹ̀bùn nípa ti ara?", "parent.link": "So akẹ́kọ̀ọ́ pọ̀", "parent.linkHint": "Béèrè lọ́wọ́ ọmọ rẹ ID àkántì AkiliAI.", "parent.idPlaceholder": "ID akẹ́kọ̀ọ́ (UUID)", "parent.linkBtn": "So pọ̀", "parent.linked": "A ti so akẹ́kọ̀ọ́", "parent.none": "Kò sí akẹ́kọ̀ọ́ tí a so.", "parent.xp": "XP", "parent.lessons": "ẹ̀kọ́", "parent.top": "Ẹ̀bùn àkọ́kọ́", "parent.growth": "Àyè ìdàgbà", "parent.careers": "Iṣẹ́", "parent.building": "Profáìlì ń kọ́ bí ọmọ rẹ ṣe ń lò.",
};

const ig: Dict = {
  "nav.talents": "Onyinye", "nav.innovation": "Mmepụta", "nav.future": "Nkà Ọdịnihu", "nav.languages": "Asụsụ", "nav.tutor": "Onye Nkụzi AI", "nav.signin": "Banye", "nav.start": "Malite", "nav.language": "Asụsụ",
  "dash.title": "Dashboard", "dash.welcome": "Nnọọ", "dash.innovationHub": "Ebe Mmepụta", "dash.teacher": "Ngwá onye nkụzi", "dash.parent": "Nne na nna", "dash.signout": "Pụọ", "dash.totalXp": "Ngụkọ XP", "dash.lessons": "Ihe ọmụmụ", "dash.streak": "Usoro kachasị",
  "dash.tab.tutor": "Onye Nkụzi AI", "dash.tab.talents": "Onyinye m", "dash.tab.progress": "Ọganihu", "dash.tab.goals": "Ihe mgbaru ọsọ",
  "dash.tutor.greeting": "Ndewo! Abụ m Akili. Jụọ m ihe ọ bụla — m ga-akọwa n'asụsụ gị.", "dash.tutor.thinking": "Akili na-eche…", "dash.tutor.placeholder": "Jụọ na",
  "dash.talents.title": "Profaịlụ onyinye AI gị", "dash.talents.sub": "Ewuru site n'otu i si amụta. Nyochaa ọzọ mgbe ọ bụla.", "dash.talents.account": "ID akaụntụ (kekọrịta na nne na nna)", "dash.talents.analyze": "Nyochaa onyinye m", "dash.talents.analyzing": "Na-enyocha…", "dash.talents.empty": "Soro onye nkụzi kparịta wee nyochaa.", "dash.talents.top": "Onyinye kachasị", "dash.talents.growth": "Ebe uto", "dash.talents.careers": "Ọrụ ọdịnihu", "dash.talents.updated": "Emelitela profaịlụ",
  "dash.progress.empty": "Enwebeghị ọganihu — soro onye nkụzi kparịta iji nweta XP.", "dash.goals.1": "Mechaa otu nnọkọ na onye nkụzi", "dash.goals.2": "Mee mmega ahụ nkeji 15", "dash.goals.3": "Tulee ihe ọmụmụ ụnyaahụ",
  "inno.title": "Ebe Mmepụta", "inno.headline1": "Tụgharịa onyinye ka ọ bụrụ", "inno.headline2": "mmetụta.", "inno.back": "Laghachi na dashboard", "inno.idea": "Ihe na-emepụta echiche AI", "inno.ideaPlaceholder": "Gịnị na-amasị gị? (bọọlụ, ejiji, mmiri, egwu)", "inno.spark": "Mepụta echiche", "inno.problem": "Nsogbu", "inno.solution": "Ngwọta", "inno.tech": "Nkà na ụzụ", "inno.yours": "Ọrụ gị", "inno.projTitle": "Aha ọrụ", "inno.projDesc": "Nkọwa dị mkpirikpi", "inno.add": "Tinye", "inno.public": "Ọha", "inno.private": "Nzuzo", "inno.review": "Nweta nzaghachi AI", "inno.empty": "Enweghị ọrụ — tinye echiche mbụ gị.", "inno.community": "Ọrụ obodo", "inno.communityEmpty": "Bụrụ onye mbụ ibipụta.", "inno.created": "Emepụtala ọrụ",
  "parent.title": "Echiche nne na nna", "parent.headline1": "Gịnị ka nwa gị nwere", "parent.headline2": "onyinye site n'okike?", "parent.link": "Jikọọ nwa akwụkwọ", "parent.linkHint": "Rịọ nwa gị ID akaụntụ AkiliAI ya.", "parent.idPlaceholder": "ID nwa akwụkwọ (UUID)", "parent.linkBtn": "Jikọọ", "parent.linked": "Ejikọtala nwa akwụkwọ", "parent.none": "Enweghị nwa akwụkwọ ejikọtara.", "parent.xp": "XP", "parent.lessons": "ihe ọmụmụ", "parent.top": "Onyinye kachasị", "parent.growth": "Ebe uto", "parent.careers": "Ọrụ", "parent.building": "Profaịlụ na-ewu ka nwa gị na-eji ya.",
};

const ln: Dict = {
  "nav.talents": "Makoki", "nav.innovation": "Bokeli", "nav.future": "Mayele ya lobi", "nav.languages": "Minoko", "nav.tutor": "Molakisi AI", "nav.signin": "Kota", "nav.start": "Banda koyekola", "nav.language": "Lokota",
  "dash.title": "Etanda", "dash.welcome": "Mbote", "dash.innovationHub": "Esika ya Bokeli", "dash.teacher": "Bisaleli ya molakisi", "dash.parent": "Moboti", "dash.signout": "Bima", "dash.totalXp": "XP nyonso", "dash.lessons": "Mateya", "dash.streak": "Molongo malamu",
  "dash.tab.tutor": "Molakisi AI", "dash.tab.talents": "Makoki na ngai", "dash.tab.progress": "Bokoli", "dash.tab.goals": "Mikano ya lelo",
  "dash.tutor.greeting": "Mbote! Nazali Akili. Tuna ngai eloko nyonso — nakolimbola na lokota na yo.", "dash.tutor.thinking": "Akili azali kokanisa…", "dash.tutor.placeholder": "Tuna na",
  "dash.talents.title": "Profile ya makoki ya AI", "dash.talents.sub": "Etongami na ndenge oyekolaka. Tala lisusu tango nyonso.", "dash.talents.account": "ID ya konti (kabola na moboti)", "dash.talents.analyze": "Tala makoki na ngai", "dash.talents.analyzing": "Ezali kotalaka…", "dash.talents.empty": "Solola na molakisi mpe tala.", "dash.talents.top": "Makoki ya liboso", "dash.talents.growth": "Bisika ya bokoli", "dash.talents.careers": "Misala ya lobi", "dash.talents.updated": "Profile ebongisami",
  "dash.progress.empty": "Naino bokoli te — solola na molakisi po na XP.", "dash.goals.1": "Sukisa session moko na molakisi", "dash.goals.2": "Salaka miniti 15", "dash.goals.3": "Tala lisusu liteya ya lobi eleki",
  "inno.title": "Esika ya Bokeli", "inno.headline1": "Bongola makoki ekoma", "inno.headline2": "mbuma.", "inno.back": "Zonga na etanda", "inno.idea": "Mosali ya makanisi AI", "inno.ideaPlaceholder": "Olingaka nini? (motope, bilamba, mai, miziki)", "inno.spark": "Bimisa likanisi", "inno.problem": "Mokakatano", "inno.solution": "Eyano", "inno.tech": "Tekiniki", "inno.yours": "Misala na yo", "inno.projTitle": "Nkombo ya mosala", "inno.projDesc": "Lisolo mokuse", "inno.add": "Bakisa", "inno.public": "Polele", "inno.private": "Ya yo moko", "inno.review": "Zwa toli ya AI", "inno.empty": "Misala te — bakisa likanisi na yo.", "inno.community": "Misala ya lisanga", "inno.communityEmpty": "Zala moto ya liboso kobimisa.", "inno.created": "Mosala esalemi",
  "parent.title": "Makanisi ya moboti", "parent.headline1": "Mwana na yo abotama", "parent.headline2": "na makoki nini?", "parent.link": "Kangisa moyekoli", "parent.linkHint": "Senga mwana na yo ID ya konti ya AkiliAI.", "parent.idPlaceholder": "ID ya moyekoli (UUID)", "parent.linkBtn": "Kangisa", "parent.linked": "Moyekoli akangisami", "parent.none": "Moyekoli moko te akangisami.", "parent.xp": "XP", "parent.lessons": "mateya", "parent.top": "Makoki ya liboso", "parent.growth": "Bokoli", "parent.careers": "Misala", "parent.building": "Profile etongami ntango mwana azali kosalela.",
};

const DICTS: Record<string, Dict> = {
  English: en, Français: fr, Kiswahili: sw, Kinyarwanda: rw, Kirundi: ki,
  العربية: ar, Deutsch: de, Español: es, isiZulu: zu, Yorùbá: yo, Igbo: ig, Lingala: ln,
};

const RTL = new Set(["العربية"]);

type Ctx = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("English");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("akili.lang") : null;
    if (stored && DICTS[stored]) setLangState(stored as LangCode);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = RTL.has(lang) ? "rtl" : "ltr";
    }
  }, [lang]);

  function setLang(l: LangCode) {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("akili.lang", l);
  }

  function t(key: string): string {
    return DICTS[lang]?.[key] ?? en[key] ?? key;
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir: RTL.has(lang) ? "rtl" : "ltr" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
