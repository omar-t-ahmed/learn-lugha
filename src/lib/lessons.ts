export type VocabularyItem = {
    arabic: string;
    english: string;
    type:
        | "pronoun"
        | "phrase"
        | "question"
        | "greeting"
        | "farewell"
        | "command"
        | "verb"
        | "noun"
        | "adjective";
};

export type LessonType = {
    title: string;
    objectives: string[];
    vocabulary: VocabularyItem[];
};

export const lessons: Record<string, LessonType> = {
    lesson_1: {
        title: "Introductions and Greetings",
        objectives: [
            "Learn how to greet others in Arabic",
            "Introduce yourself and ask for someone's name",
            "Learn basic pronouns and polite phrases",
        ],
        vocabulary: [
            { arabic: "أَﻧَﺎ", english: "I am", type: "pronoun" },
            { arabic: "اِسْمِي", english: "My name is", type: "phrase" },
            {
                arabic: "مَا اِسْمُكَ؟",
                english: "What is your name? (m)",
                type: "question",
            },
            {
                arabic: "مَا اِسْمُكِ؟",
                english: "What is your name? (f)",
                type: "question",
            },
            {
                arabic: "مِنْ أَيْنَ أَنْتَ؟",
                english: "Where are you from? (m)",
                type: "question",
            },
            {
                arabic: "مِنْ أَيْنَ أَنْتِ؟",
                english: "Where are you from? (f)",
                type: "question",
            },
            {
                arabic: "كَيفَ حَالُكَ؟",
                english: "How are you? (m)",
                type: "question",
            },
            { arabic: "بِخَيْرٍ", english: "I am fine", type: "phrase" },
            {
                arabic: "السَّلامُ عَلَيْكُم",
                english: "Peace be upon you",
                type: "greeting",
            },
            { arabic: "مَعَ السَّلامَة", english: "Goodbye", type: "farewell" },
        ],
    },
    lesson_2: {
        title: "Basic Actions and Commands",
        objectives: [
            "Learn basic action verbs in Arabic",
            "Understand and respond to simple commands",
            "Practice giving instructions to others",
        ],
        vocabulary: [
            {
                arabic: "انظر",
                english: "Look",
                type: "command",
            },
            {
                arabic: "استمع",
                english: "Listen",
                type: "command",
            },
            {
                arabic: "اعد",
                english: "Repeat",
                type: "command",
            },
            {
                arabic: "اشير",
                english: "Point, indicate",
                type: "verb",
            },
            {
                arabic: "ضع",
                english: "Put",
                type: "verb",
            },
            {
                arabic: "سمع",
                english: "Hear",
                type: "verb",
            },
            {
                arabic: "قل",
                english: "Say",
                type: "verb",
            },
        ],
    },
    lesson_3: {
        title: "Asking and Answering Questions",
        objectives: [
            "Learn how to ask basic questions in Arabic",
            "Practice responding to common questions",
            "Understand the structure of question-answer dialogues",
        ],
        vocabulary: [
            {
                arabic: "اسأل",
                english: "Ask",
                type: "command",
            },
            {
                arabic: "أجب",
                english: "Answer",
                type: "command",
            },
            {
                arabic: "قرأ",
                english: "Read",
                type: "verb",
            },
            {
                arabic: "مر",
                english: "Pass by",
                type: "verb",
            },
            {
                arabic: "انسخ",
                english: "Copy",
                type: "command",
            },
            {
                arabic: "كتاب",
                english: "Book",
                type: "noun",
            },
            {
                arabic: "درس",
                english: "Lesson",
                type: "noun",
            },
        ],
    },

    lesson_4: {
        title: "Daily Routines: Praying and Performing Wudoo",
        objectives: [
            "Learn how to talk about daily religious routines",
            "Practice the vocabulary for performing wudoo and praying",
            "Understand and use action verbs related to religious practices",
        ],
        vocabulary: [
            {
                arabic: "توضأ",
                english: "Perform wudoo (ablution)",
                type: "verb",
            },
            {
                arabic: "يصلي",
                english: "Pray",
                type: "verb",
            },
            {
                arabic: "افعل",
                english: "Do",
                type: "command",
            },
            {
                arabic: "فعل",
                english: "Did",
                type: "verb",
            },
            {
                arabic: "وَضوء",
                english: "Wudoo (ablution)",
                type: "noun",
            },
            {
                arabic: "صلاة",
                english: "Prayer",
                type: "noun",
            },
        ],
    },
    lesson_5: {
        title: "Family Members and Daily Life",
        objectives: [
            "Learn vocabulary for family members",
            "Practice talking about family and relationships",
            "Use the vocabulary in daily life contexts",
        ],
        vocabulary: [
            {
                arabic: "عم",
                english: "Paternal uncle",
                type: "noun",
            },
            {
                arabic: "عمة",
                english: "Paternal aunt",
                type: "noun",
            },
            {
                arabic: "أم",
                english: "Mother",
                type: "noun",
            },
            {
                arabic: "أب",
                english: "Father",
                type: "noun",
            },
            {
                arabic: "ابن",
                english: "Son",
                type: "noun",
            },
            {
                arabic: "ابنة",
                english: "Daughter",
                type: "noun",
            },
            {
                arabic: "جد",
                english: "Grandfather",
                type: "noun",
            },
            {
                arabic: "جدة",
                english: "Grandmother",
                type: "noun",
            },
        ],
    },

    lesson_6: {
        title: "Talking About Living Spaces and Daily Needs",
        objectives: [
            "Learn how to talk about where you live",
            "Practice asking and answering questions about daily needs",
            "Use action verbs related to living and wanting",
        ],
        vocabulary: [
            {
                arabic: "أسكن",
                english: "I live",
                type: "verb",
            },
            {
                arabic: "أريد",
                english: "I want",
                type: "verb",
            },
            {
                arabic: "سكن",
                english: "Residence",
                type: "noun",
            },
            {
                arabic: "منطقة",
                english: "Area, district",
                type: "noun",
            },
            {
                arabic: "شقة",
                english: "Apartment",
                type: "noun",
            },
            {
                arabic: "بيت",
                english: "House",
                type: "noun",
            },
            {
                arabic: "دور",
                english: "Floor",
                type: "noun",
            },
        ],
    },
    lesson_7: {
        title: "Inside the House: Objects and Appliances",
        objectives: [
            "Learn how to talk about objects and appliances in the house",
            "Practice using vocabulary to describe household items",
            "Use the correct nouns for common household objects",
        ],
        vocabulary: [
            {
                arabic: "ثلاجة",
                english: "Fridge",
                type: "noun",
            },
            {
                arabic: "سخان",
                english: "Boiler",
                type: "noun",
            },
            {
                arabic: "مرآة",
                english: "Mirror",
                type: "noun",
            },
            {
                arabic: "جامعة",
                english: "University",
                type: "noun",
            },
            {
                arabic: "سجاد",
                english: "Rug",
                type: "noun",
            },
            {
                arabic: "ستائر",
                english: "Curtains",
                type: "noun",
            },
            {
                arabic: "فرن",
                english: "Oven",
                type: "noun",
            },
            {
                arabic: "مطبخ",
                english: "Kitchen",
                type: "noun",
            },
        ],
    },
    lesson_8: {
        title: "Daily Routines: Waking Up and Going to Sleep",
        objectives: [
            "Learn how to talk about your daily routine",
            "Practice verbs related to waking up, going to sleep, and other daily tasks",
            "Use verbs to describe basic actions throughout the day",
        ],
        vocabulary: [
            {
                arabic: "نام",
                english: "Sleep",
                type: "verb",
            },
            {
                arabic: "استيقظ",
                english: "Wake up",
                type: "verb",
            },
            {
                arabic: "ذهب",
                english: "Go",
                type: "verb",
            },
            {
                arabic: "غسل",
                english: "Wash",
                type: "verb",
            },
            {
                arabic: "سكنس",
                english: "Vacuum",
                type: "verb",
            },
            {
                arabic: "كوى",
                english: "Iron",
                type: "verb",
            },
        ],
    },
    lesson_9: {
        title: "Everyday Objects and Watching TV",
        objectives: [
            "Learn vocabulary for common household objects and modes of transportation",
            "Practice describing objects and talking about watching TV or traveling",
            "Use nouns for common activities like riding a bus or watching television",
        ],
        vocabulary: [
            {
                arabic: "سيارة",
                english: "Car",
                type: "noun",
            },
            {
                arabic: "حافلة",
                english: "Bus",
                type: "noun",
            },
            {
                arabic: "مدرسة",
                english: "School",
                type: "noun",
            },
            {
                arabic: "ساعة",
                english: "Hour, Clock",
                type: "noun",
            },
            {
                arabic: "عطلة",
                english: "Holiday",
                type: "noun",
            },
            {
                arabic: "صحيفة",
                english: "Newspaper",
                type: "noun",
            },
            {
                arabic: "تلفاز",
                english: "Television",
                type: "noun",
            },
            {
                arabic: "طبق",
                english: "Dish, Plate",
                type: "noun",
            },
        ],
    },
    lesson_10: {
        title: "Dining and Ordering Food",
        objectives: [
            "Learn how to order food in a restaurant",
            "Practice expressing preferences and requests",
            "Use verbs related to eating, drinking, and ordering food",
        ],
        vocabulary: [
            {
                arabic: "أكل",
                english: "Eat",
                type: "verb",
            },
            {
                arabic: "طلب",
                english: "Request, Order",
                type: "verb",
            },
            {
                arabic: "شرب",
                english: "Drink",
                type: "verb",
            },
            {
                arabic: "فضل",
                english: "Prefer",
                type: "verb",
            },
            {
                arabic: "ماء",
                english: "Water",
                type: "noun",
            },
            {
                arabic: "شراب",
                english: "Drink",
                type: "noun",
            },
            {
                arabic: "طعام",
                english: "Food",
                type: "noun",
            },
        ],
    },
    lesson_11: {
        title: "Meals and Conversations About Food",
        objectives: [
            "Discuss meals and types of food in Arabic",
            "Talk about fruits, meats, and meals in a conversation",
            "Use food-related nouns in daily conversation",
        ],
        vocabulary: [
            {
                arabic: "لحم",
                english: "Meat",
                type: "noun",
            },
            {
                arabic: "وجبة",
                english: "Meal",
                type: "noun",
            },
            {
                arabic: "عنب",
                english: "Grapes",
                type: "noun",
            },
            {
                arabic: "دجاج",
                english: "Chicken",
                type: "noun",
            },
            {
                arabic: "سلطة",
                english: "Salad",
                type: "noun",
            },
            {
                arabic: "سمك",
                english: "Fish",
                type: "noun",
            },
            {
                arabic: "فاكهة",
                english: "Fruit",
                type: "noun",
            },
            {
                arabic: "مائدة",
                english: "Table",
                type: "noun",
            },
        ],
    },
    lesson_12: {
        title: "Daily Routines and Travel",
        objectives: [
            "Learn how to talk about daily activities like working and traveling",
            "Practice discussing abilities and expressing waiting times",
            "Use verbs related to work, travel, and waiting in everyday conversations",
        ],
        vocabulary: [
            {
                arabic: "استطاع",
                english: "Can; to be able to",
                type: "verb",
            },
            {
                arabic: "عمل",
                english: "Work",
                type: "verb",
            },
            {
                arabic: "سافر",
                english: "Travel",
                type: "verb",
            },
            {
                arabic: "انتظر",
                english: "Wait",
                type: "verb",
            },
            {
                arabic: "مريض",
                english: "Sick; patient",
                type: "noun",
            },
            {
                arabic: "فكرة",
                english: "Idea",
                type: "noun",
            },
            {
                arabic: "منبه",
                english: "Alarm",
                type: "noun",
            },
            {
                arabic: "كسول",
                english: "Lazy",
                type: "noun",
            },
            {
                arabic: "ليل",
                english: "Night",
                type: "noun",
            },
        ],
    },
    lesson_13: {
        title: "Starting and Finishing Actions",
        objectives: [
            "Learn how to express starting and finishing activities",
            "Practice talking about studying, teaching, and being in class",
            "Use common verbs to describe daily activities related to education",
        ],
        vocabulary: [
            {
                arabic: "بدأ",
                english: "Start",
                type: "verb",
            },
            {
                arabic: "انتهى",
                english: "Finish",
                type: "verb",
            },
            {
                arabic: "درس",
                english: "Study",
                type: "verb",
            },
            {
                arabic: "درّس",
                english: "Teach",
                type: "verb",
            },
            {
                arabic: "كان",
                english: "Be",
                type: "verb",
            },
        ],
    },
    lesson_14: {
        title: "Completing and Correcting",
        objectives: [
            "Learn how to express completing tasks",
            "Practice using verbs related to correcting and completing",
            "Discuss different educational activities and their completion",
        ],
        vocabulary: [
            {
                arabic: "أكمل",
                english: "Complete",
                type: "verb",
            },
            {
                arabic: "صحح",
                english: "Correct",
                type: "verb",
            },
            {
                arabic: "عام",
                english: "Year",
                type: "noun",
            },
            {
                arabic: "أسبوع",
                english: "Week",
                type: "noun",
            },
            {
                arabic: "وقت",
                english: "Time",
                type: "noun",
            },
            {
                arabic: "مادة",
                english: "Course; subject",
                type: "noun",
            },
        ],
    },
    lesson_15: {
        title: "Expressing Preferences and Actions",
        objectives: [
            "Learn how to express liking, drawing, and choosing",
            "Practice using verbs related to daily activities",
            "Talk about personal preferences and actions",
        ],
        vocabulary: [
            {
                arabic: "أحب",
                english: "Love; Like",
                type: "verb",
            },
            {
                arabic: "رسم",
                english: "Draw",
                type: "verb",
            },
            {
                arabic: "اختار",
                english: "Choose",
                type: "verb",
            },
        ],
    },
    lesson_16: {
        title: "Becoming, Filling, and Taking Breaks",
        objectives: [
            "Learn how to express becoming something, filling, and resting",
            "Practice talking about rest and taking breaks",
            "Use verbs related to completing tasks and taking time to relax",
        ],
        vocabulary: [
            {
                arabic: "أصبح",
                english: "Become",
                type: "verb",
            },
            {
                arabic: "ملأ",
                english: "Fill",
                type: "verb",
            },
            {
                arabic: "استراح",
                english: "Rest; Relax",
                type: "verb",
            },
            {
                arabic: "فراغ",
                english: "Blank; Space; Gap",
                type: "noun",
            },
            {
                arabic: "شركة",
                english: "Company",
                type: "noun",
            },
        ],
    },
    lesson_17: {
        title: "Shopping and Vocabulary Related to Clothing",
        objectives: [
            "Learn how to talk about shopping in Arabic",
            "Identify common clothing items and basic shopping vocabulary",
            "Use polite phrases and terms while shopping",
        ],
        vocabulary: [
            {
                arabic: "تسوق",
                english: "To shop",
                type: "verb",
            },
            {
                arabic: "يتسوق",
                english: "He is shopping",
                type: "verb",
            },
            {
                arabic: "ريال",
                english: "Riyal (Saudi currency)",
                type: "noun",
            },
            {
                arabic: "معجم",
                english: "Dictionary",
                type: "noun",
            },
            {
                arabic: "قميص",
                english: "Shirt",
                type: "noun",
            },
            {
                arabic: "دفتر",
                english: "Notepad",
                type: "noun",
            },
            {
                arabic: "ثوب",
                english: "Thobe",
                type: "noun",
            },
            {
                arabic: "قلم",
                english: "Pen",
                type: "noun",
            },
        ],
    },
    lesson_18: {
        title: "Moving, Traveling, and Visits",
        objectives: [
            "Learn how to talk about moving and traveling in Arabic",
            "Practice phrases related to visiting and marriage",
            "Use verbs related to movement and visits",
        ],
        vocabulary: [
            {
                arabic: "انتقل",
                english: "To move",
                type: "verb",
            },
            {
                arabic: "استغرق",
                english: "To take (time)",
                type: "verb",
            },
            {
                arabic: "تزوج",
                english: "To marry",
                type: "verb",
            },
            {
                arabic: "زار",
                english: "To visit",
                type: "verb",
            },
            {
                arabic: "رحلة",
                english: "Trip",
                type: "noun",
            },
            {
                arabic: "بلد",
                english: "Country",
                type: "noun",
            },
        ],
    },
    lesson_19: {
        title: "Pollution, Overcrowding, and Time Management",
        objectives: [
            "Learn how to talk about environmental and social challenges",
            "Discuss problems related to pollution and overcrowding",
            "Use vocabulary related to time management and issues in society",
        ],
        vocabulary: [
            {
                arabic: "تلوث",
                english: "To be polluted",
                type: "verb",
            },
            {
                arabic: "ازدحم",
                english: "To be overcrowded",
                type: "verb",
            },
            {
                arabic: "وقت",
                english: "Time",
                type: "noun",
            },
            {
                arabic: "مدير",
                english: "Director/Manager/Headmaster",
                type: "noun",
            },
            {
                arabic: "مشكلة",
                english: "Problem",
                type: "noun",
            },
            {
                arabic: "مدينة",
                english: "City",
                type: "noun",
            },
            {
                arabic: "قرية",
                english: "Village",
                type: "noun",
            },
        ],
    },
    lesson_20: {
        title: "Media, Hobbies, and Exhibitions",
        objectives: [
            "Learn vocabulary related to media and publications",
            "Discuss hobbies and exhibitions in Arabic",
            "Use nouns to describe different types of media, clubs, and exhibitions",
        ],
        vocabulary: [
            {
                arabic: "صحيفة",
                english: "Newspaper",
                type: "noun",
            },
            {
                arabic: "هواية",
                english: "Hobby",
                type: "noun",
            },
            {
                arabic: "جمعية",
                english: "Club",
                type: "noun",
            },
            {
                arabic: "مجلة",
                english: "Magazine",
                type: "noun",
            },
            {
                arabic: "حديث",
                english: "Hadeeth",
                type: "noun",
            },
            {
                arabic: "معرض",
                english: "Exhibition",
                type: "noun",
            },
            {
                arabic: "طابع",
                english: "Stamp",
                type: "noun",
            },
            {
                arabic: "آية",
                english: "Verse",
                type: "noun",
            },
            {
                arabic: "جناح",
                english: "Wing; Section",
                type: "noun",
            },
        ],
    },
    lesson_21: {
        title: "Booking and Travel Preparations",
        objectives: [
            "Learn vocabulary related to booking and travel arrangements",
            "Practice booking a hotel, flight, or tickets in Arabic",
            "Use verbs to describe actions related to preparing for a trip",
        ],
        vocabulary: [
            {
                arabic: "اقام",
                english: "To stay",
                type: "verb",
            },
            {
                arabic: "حجز",
                english: "To book",
                type: "verb",
            },
            {
                arabic: "مغادرة",
                english: "To depart",
                type: "verb",
            },
            {
                arabic: "تذكرة",
                english: "Ticket",
                type: "noun",
            },
            {
                arabic: "طائرة",
                english: "Plane",
                type: "noun",
            },
            {
                arabic: "حجز",
                english: "Booking",
                type: "noun",
            },
            {
                arabic: "مسافر",
                english: "Traveler",
                type: "noun",
            },
            {
                arabic: "فندق",
                english: "Hotel",
                type: "noun",
            },
        ],
    },
    lesson_22: {
        title: "Confirmations, Visas, and Essentials for Travel",
        objectives: [
            "Learn vocabulary related to confirming bookings and travel essentials",
            "Discuss travel documents, passports, and visas in Arabic",
            "Use verbs to describe opening, losing, and confirming important travel details",
        ],
        vocabulary: [
            {
                arabic: "فتح",
                english: "To open",
                type: "verb",
            },
            {
                arabic: "فقد",
                english: "To lose",
                type: "verb",
            },
            {
                arabic: "اكد",
                english: "To confirm",
                type: "verb",
            },
            {
                arabic: "جواز",
                english: "Passport",
                type: "noun",
            },
            {
                arabic: "تاشيرة",
                english: "Visa",
                type: "noun",
            },
            {
                arabic: "حقيبة",
                english: "Bag",
                type: "noun",
            },
            {
                arabic: "موظف",
                english: "Worker",
                type: "noun",
            },
            {
                arabic: "لون",
                english: "Colour",
                type: "noun",
            },
        ],
    },
    lesson_23: {
        title: "Actions and Rituals of Umrah",
        objectives: [
            "Learn vocabulary related to the actions performed during Umrah",
            "Practice talking about performing rituals like shaving, making tawaaf, and slaughtering an animal for sacrifice",
            "Use verbs to describe various Umrah-related actions and understand the corresponding nouns",
        ],
        vocabulary: [
            {
                arabic: "حلق",
                english: "To shave",
                type: "verb",
            },
            {
                arabic: "اعتمر",
                english: "To make Umrah",
                type: "verb",
            },
            {
                arabic: "ذبح",
                english: "To slaughter/sacrifice",
                type: "verb",
            },
            {
                arabic: "رمى",
                english: "To throw",
                type: "verb",
            },
            {
                arabic: "سعى",
                english: "To make sa'ee",
                type: "verb",
            },
            {
                arabic: "شعر",
                english: "To feel",
                type: "verb",
            },
            {
                arabic: "خلع",
                english: "To take off/undress",
                type: "verb",
            },
            {
                arabic: "صام",
                english: "To fast",
                type: "verb",
            },
            {
                arabic: "طاف",
                english: "To make tawaaf",
                type: "verb",
            },
            {
                arabic: "لبس",
                english: "To wear",
                type: "verb",
            },
            {
                arabic: "لبى",
                english: "To make the Talbiyaa",
                type: "verb",
            },
            {
                arabic: "وصل",
                english: "To arrive",
                type: "verb",
            },
            {
                arabic: "راس",
                english: "Head",
                type: "noun",
            },
            {
                arabic: "شوط",
                english: "Lap/Circuit",
                type: "noun",
            },
            {
                arabic: "هدي",
                english: "Sacrifice",
                type: "noun",
            },
            {
                arabic: "ركعة",
                english: "Unit of prayer",
                type: "noun",
            },
        ],
    },
    lesson_24: {
        title: "Health and Medical Visits",
        objectives: [
            "Learn vocabulary related to health and medical appointments",
            "Practice talking about ailments, visits to doctors, and medical advice",
            "Use verbs to describe medical check-ups, advice, and visits",
        ],
        vocabulary: [
            {
                arabic: "اصاب",
                english: "To be afflicted",
                type: "verb",
            },
            {
                arabic: "ارتفع",
                english: "To rise",
                type: "verb",
            },
            {
                arabic: "تغيب",
                english: "To be absent",
                type: "verb",
            },
            {
                arabic: "شفي",
                english: "To cure",
                type: "verb",
            },
            {
                arabic: "فحص",
                english: "To check",
                type: "verb",
            },
            {
                arabic: "قابل",
                english: "To meet",
                type: "verb",
            },
            {
                arabic: "نصح",
                english: "To advise",
                type: "verb",
            },
            {
                arabic: "اذن",
                english: "Ear",
                type: "noun",
            },
            {
                arabic: "اسنان",
                english: "Teeth",
                type: "noun",
            },
            {
                arabic: "حنجرة",
                english: "Throat",
                type: "noun",
            },
            {
                arabic: "انف",
                english: "Nose",
                type: "noun",
            },
        ],
    },
    lesson_25: {
        title: "Medical Appointments and Treatment",
        objectives: [
            "Learn vocabulary related to medical appointments and treatments",
            "Practice talking about visits to doctors and medical treatments",
            "Use nouns related to body parts and medical visits",
        ],
        vocabulary: [
            {
                arabic: "موعد",
                english: "Appointment",
                type: "noun",
            },
            {
                arabic: "زيارة",
                english: "Visit",
                type: "noun",
            },
            {
                arabic: "دواء",
                english: "Medicine",
                type: "noun",
            },
            {
                arabic: "اسعاف",
                english: "Ambulance",
                type: "noun",
            },
            {
                arabic: "صدر",
                english: "Chest",
                type: "noun",
            },
            {
                arabic: "كلية",
                english: "Kidney",
                type: "noun",
            },
        ],
    },
    lesson_26: {
        title: "Helping, Seeing, and Giving",
        objectives: [
            "Learn how to express actions related to helping, seeing, and giving",
            "Practice using verbs to describe approaching and moving away from things",
            "Use vocabulary to discuss helping others and performing actions",
        ],
        vocabulary: [
            {
                arabic: "اعطى",
                english: "To give",
                type: "verb",
            },
            {
                arabic: "اقترب",
                english: "To approach",
                type: "verb",
            },
            {
                arabic: "ابتعد",
                english: "To move away from",
                type: "verb",
            },
            {
                arabic: "ساعد",
                english: "To help",
                type: "verb",
            },
            {
                arabic: "راى",
                english: "To see",
                type: "verb",
            },
        ],
    },

    lesson_27: {
        title: "Festivals, Sacrifices, and Locations",
        objectives: [
            "Learn vocabulary related to festivals, sacrifices, and locations",
            "Practice talking about celebrations, cities, and geographical features",
            "Use nouns to describe important places and occasions",
        ],
        vocabulary: [
            {
                arabic: "اضحية",
                english: "Sacrifice",
                type: "noun",
            },
            {
                arabic: "عيد",
                english: "Celebration/Festival",
                type: "noun",
            },
            {
                arabic: "عاصمة",
                english: "Capital City",
                type: "noun",
            },
            {
                arabic: "نهر",
                english: "River",
                type: "noun",
            },
            {
                arabic: "جبل",
                english: "Mountain",
                type: "noun",
            },
            {
                arabic: "متاحف",
                english: "Museum",
                type: "noun",
            },
            {
                arabic: "فقير",
                english: "Poor",
                type: "noun",
            },
            {
                arabic: "مزرعة",
                english: "Farm",
                type: "noun",
            },
            {
                arabic: "فريق",
                english: "Team/Group",
                type: "noun",
            },
        ],
    },
    lesson_28: {
        title: "Visiting the Doctor and Discussing Health",
        objectives: [
            "Learn how to talk about health issues and symptoms",
            "Use vocabulary related to doctors, illnesses, and treatment",
        ],
        vocabulary: [
            {
                arabic: "يعالج",
                english: "To treat, cure",
                type: "verb",
            },
            {
                arabic: "يشتكي",
                english: "To complain, suffer from",
                type: "verb",
            },
            {
                arabic: "يزيد",
                english: "To increase",
                type: "verb",
            },
            {
                arabic: "معدة",
                english: "Stomach",
                type: "noun",
            },
            {
                arabic: "ألم",
                english: "Pain",
                type: "noun",
            },
            {
                arabic: "طبيب",
                english: "Doctor",
                type: "noun",
            },
            {
                arabic: "خطير",
                english: "Serious, grave",
                type: "noun",
            },
        ],
    },
    lesson_29: {
        title: "Discussing Daily Challenges and Problem Solving",
        objectives: [
            "Learn how to discuss challenges and problem-solving strategies",
            "Use vocabulary related to stress, solutions, and improving situations",
        ],
        vocabulary: [
            {
                arabic: "يحاول",
                english: "To try",
                type: "verb",
            },
            {
                arabic: "يزيد",
                english: "To increase",
                type: "verb",
            },
            {
                arabic: "يتقدم",
                english: "To progress, improve",
                type: "verb",
            },
            {
                arabic: "يحل",
                english: "To solve",
                type: "verb",
            },
            {
                arabic: "مشكلة",
                english: "Problem",
                type: "noun",
            },
            {
                arabic: "توتر",
                english: "Stress",
                type: "noun",
            },
            {
                arabic: "وقت",
                english: "Time",
                type: "noun",
            },
        ],
    },
    lesson_30: {
        title: "Relaxation, Recreation, and Health",
        objectives: [
            "Learn how to discuss relaxation, recreation, and health",
            "Use vocabulary related to rest, health, and physical activities",
        ],
        vocabulary: [
            {
                arabic: "يروح",
                english: "To recreate, relax",
                type: "verb",
            },
            {
                arabic: "يحتاج",
                english: "To need",
                type: "verb",
            },
            {
                arabic: "يغمى",
                english: "To faint",
                type: "verb",
            },
            {
                arabic: "يفيق",
                english: "To recover consciousness",
                type: "verb",
            },
            {
                arabic: "يغير",
                english: "To change",
                type: "verb",
            },
            {
                arabic: "يسبح",
                english: "To swim",
                type: "verb",
            },
            {
                arabic: "حياة",
                english: "Life",
                type: "noun",
            },
            {
                arabic: "نفس",
                english: "Self",
                type: "noun",
            },
            {
                arabic: "نشاط",
                english: "Activity",
                type: "noun",
            },
        ],
    },
    lesson_31: {
        title: "Setting Goals, Walking, and Discussing Play",
        objectives: [
            "Learn how to talk about setting goals and activities",
            "Use vocabulary related to goals, walking, and playing",
        ],
        vocabulary: [
            {
                arabic: "يقصد",
                english: "To intend",
                type: "verb",
            },
            {
                arabic: "يمشي",
                english: "To walk",
                type: "verb",
            },
            {
                arabic: "يلعب",
                english: "To play",
                type: "verb",
            },
            {
                arabic: "يحمل",
                english: "To carry",
                type: "verb",
            },
            {
                arabic: "هدف",
                english: "Goal",
                type: "noun",
            },
            {
                arabic: "حديقة",
                english: "Park",
                type: "noun",
            },
            {
                arabic: "لعبة",
                english: "Toy, game",
                type: "noun",
            },
            {
                arabic: "طير",
                english: "Bird",
                type: "noun",
            },
            {
                arabic: "وسيلة",
                english: "Means, way",
                type: "noun",
            },
        ],
    },
    lesson_32: {
        title: "Emotions, Worry, and Complaints",
        objectives: [
            "Learn how to discuss emotions, worry, and making complaints",
            "Use vocabulary related to feelings, stress, and addressing problems",
        ],
        vocabulary: [
            {
                arabic: "يقلق",
                english: "To worry",
                type: "verb",
            },
            {
                arabic: "يشكو",
                english: "To complain",
                type: "verb",
            },
            {
                arabic: "يعود",
                english: "To return",
                type: "verb",
            },
            {
                arabic: "يضغط",
                english: "To pressurize",
                type: "verb",
            },
            {
                arabic: "شكوى",
                english: "Complaint",
                type: "noun",
            },
            {
                arabic: "فرد",
                english: "Individual",
                type: "noun",
            },
            {
                arabic: "مجتمع",
                english: "Community",
                type: "noun",
            },
            {
                arabic: "نائم",
                english: "Sleeping",
                type: "noun",
            },
            {
                arabic: "عنيد",
                english: "Stubborn",
                type: "noun",
            },
        ],
    },
    lesson_33: {
        title: "Knowledge, Accomplishment, and Solutions",
        objectives: [
            "Learn how to talk about gaining knowledge and solving problems",
            "Use vocabulary related to understanding, accomplishments, and offering solutions",
        ],
        vocabulary: [
            {
                arabic: "يعرف",
                english: "To know",
                type: "verb",
            },
            {
                arabic: "يحل",
                english: "To solve",
                type: "verb",
            },
            {
                arabic: "يحقق",
                english: "To accomplish",
                type: "verb",
            },
            {
                arabic: "يتغير",
                english: "To change",
                type: "verb",
            },
            {
                arabic: "حل",
                english: "Solution",
                type: "noun",
            },
            {
                arabic: "معرفة",
                english: "Knowledge",
                type: "noun",
            },
            {
                arabic: "نظام",
                english: "System",
                type: "noun",
            },
            {
                arabic: "سبيل",
                english: "Path, way",
                type: "noun",
            },
            {
                arabic: "شخصية",
                english: "Personality",
                type: "noun",
            },
        ],
    },
    lesson_34: {
        title: "Moving, Departing, and Fear",
        objectives: [
            "Learn how to discuss movement, leaving, and expressing fear",
            "Use vocabulary related to departure, fear, and encounters",
        ],
        vocabulary: [
            {
                arabic: "يرحل",
                english: "To leave, depart",
                type: "verb",
            },
            {
                arabic: "يخاف",
                english: "To fear",
                type: "verb",
            },
            {
                arabic: "يواجه",
                english: "To face, encounter",
                type: "verb",
            },
            {
                arabic: "يزداد",
                english: "To increase, grow",
                type: "verb",
            },
            {
                arabic: "يهاجر",
                english: "To migrate",
                type: "verb",
            },
            {
                arabic: "يدرك",
                english: "To understand",
                type: "verb",
            },
            {
                arabic: "دولة",
                english: "Country",
                type: "noun",
            },
            {
                arabic: "حادثة",
                english: "Accident",
                type: "noun",
            },
            {
                arabic: "مدينة",
                english: "City",
                type: "noun",
            },
            {
                arabic: "سائق",
                english: "Driver",
                type: "noun",
            },
        ],
    },
    lesson_35: {
        title: "Building, Understanding, and Establishing",
        objectives: [
            "Learn how to talk about building, establishing, and reaching goals",
            "Use vocabulary related to construction, progress, and achievements",
        ],
        vocabulary: [
            {
                arabic: "يبني",
                english: "To build",
                type: "verb",
            },
            {
                arabic: "يرجع",
                english: "To return",
                type: "verb",
            },
            {
                arabic: "يبلغ",
                english: "To reach",
                type: "verb",
            },
            {
                arabic: "يقع",
                english: "To be located",
                type: "verb",
            },
            {
                arabic: "يتجه",
                english: "To head towards",
                type: "verb",
            },
            {
                arabic: "استمر",
                english: "To continue",
                type: "verb",
            },
            {
                arabic: "نسبة",
                english: "Percentage",
                type: "noun",
            },
            {
                arabic: "مصنع",
                english: "Factory",
                type: "noun",
            },
            {
                arabic: "مئذنة",
                english: "Minaret",
                type: "noun",
            },
            {
                arabic: "شارع",
                english: "Street",
                type: "noun",
            },
        ],
    },
    lesson_36: {
        title: "Submission, Acceptance, and Joining",
        objectives: [
            "Learn how to discuss submission, acceptance, and joining",
            "Use vocabulary related to submitting applications, accepting offers, and joining groups or activities",
        ],
        vocabulary: [
            {
                arabic: "يقدم",
                english: "To submit",
                type: "verb",
            },
            {
                arabic: "يقبل",
                english: "To accept",
                type: "verb",
            },
            {
                arabic: "يرغب",
                english: "To wish for, to want",
                type: "verb",
            },
            {
                arabic: "يلتحق",
                english: "To join",
                type: "verb",
            },
            {
                arabic: "يوافق",
                english: "To agree",
                type: "verb",
            },
            {
                arabic: "يوفق",
                english: "To grant success",
                type: "verb",
            },
            {
                arabic: "علماء",
                english: "Scholars",
                type: "noun",
            },
            {
                arabic: "شهادة",
                english: "Certificate, degree",
                type: "noun",
            },
            {
                arabic: "تلميذ",
                english: "Student, pupil",
                type: "noun",
            },
            {
                arabic: "فرصة",
                english: "Opportunity",
                type: "noun",
            },
        ],
    },
    lesson_37: {
        title: "Exhaustion, Success, and Attainment",
        objectives: [
            "Learn how to discuss exhaustion, success, and attaining goals",
            "Use vocabulary related to hard work, supervision, and accomplishments",
        ],
        vocabulary: [
            {
                arabic: "يتعب",
                english: "To be exhausted",
                type: "verb",
            },
            {
                arabic: "يركب",
                english: "To ride, mount",
                type: "verb",
            },
            {
                arabic: "يتأخر",
                english: "To fall behind",
                type: "verb",
            },
            {
                arabic: "يشرف",
                english: "To supervise",
                type: "verb",
            },
            {
                arabic: "يوفر",
                english: "To provide",
                type: "verb",
            },
            {
                arabic: "يحصل",
                english: "To attain, achieve",
                type: "verb",
            },
            {
                arabic: "مرحلة",
                english: "Stage",
                type: "noun",
            },
            {
                arabic: "معهد",
                english: "Institute",
                type: "noun",
            },
            {
                arabic: "مدة",
                english: "Duration, time",
                type: "noun",
            },
            {
                arabic: "عمر",
                english: "Age",
                type: "noun",
            },
        ],
    },
    lesson_38: {
        title: "Optimism, Graduation, and Managing",
        objectives: [
            "Learn how to talk about optimism, graduating, and managing tasks",
            "Use vocabulary related to positive outlooks, completing education, and managing responsibilities",
        ],
        vocabulary: [
            {
                arabic: "يتفاءل",
                english: "To be optimistic",
                type: "verb",
            },
            {
                arabic: "يتخرج",
                english: "To graduate",
                type: "verb",
            },
            {
                arabic: "يعُم",
                english: "To be prevalent, widespread",
                type: "verb",
            },
            {
                arabic: "يدير",
                english: "To manage",
                type: "verb",
            },
            {
                arabic: "يربي",
                english: "To nurture, raise",
                type: "verb",
            },
            {
                arabic: "وظيفة",
                english: "Job, profession",
                type: "noun",
            },
            {
                arabic: "متفائل",
                english: "Optimistic",
                type: "noun",
            },
            {
                arabic: "تربية",
                english: "Nurture, upbringing",
                type: "noun",
            },
        ],
    },
    lesson_39: {
        title: "Preserving, Preventing, and Responsibility",
        objectives: [
            "Learn how to talk about preserving, preventing actions, and managing responsibilities",
            "Use vocabulary related to safeguarding, stopping unwanted actions, and taking responsibility",
        ],
        vocabulary: [
            {
                arabic: "يحفظ",
                english: "To preserve, save",
                type: "verb",
            },
            {
                arabic: "يمنع",
                english: "To prevent, to refuse",
                type: "verb",
            },
            {
                arabic: "يعتمد",
                english: "To rely, depend on",
                type: "verb",
            },
            {
                arabic: "يحمل",
                english: "To hold",
                type: "verb",
            },
            {
                arabic: "حفاظة",
                english: "Preservation, protection",
                type: "noun",
            },
            {
                arabic: "شرط",
                english: "Condition",
                type: "noun",
            },
            {
                arabic: "مقابلة",
                english: "Interview",
                type: "noun",
            },
        ],
    },
    lesson_40: {
        title: "Giving Charity, Purity, and Helping",
        objectives: [
            "Learn how to talk about giving charity, maintaining purity, and helping others",
            "Use vocabulary related to charity, cleanliness, and assistance",
        ],
        vocabulary: [
            {
                arabic: "يتصدق",
                english: "To give charity",
                type: "verb",
            },
            {
                arabic: "يتطهر",
                english: "To purify (oneself)",
                type: "verb",
            },
            {
                arabic: "يحافظ",
                english: "To preserve, safeguard",
                type: "verb",
            },
            {
                arabic: "يسلم",
                english: "To give, submit",
                type: "verb",
            },
            {
                arabic: "نعمة",
                english: "Blessing",
                type: "noun",
            },
            {
                arabic: "مساعدة",
                english: "Help, assistance",
                type: "noun",
            },
        ],
    },
    lesson_41: {
        title: "Communication, Encouragement, and Flourishing",
        objectives: [
            "Learn how to talk about communication, encouragement, and thriving",
            "Use vocabulary related to connecting, promoting growth, and flourishing",
        ],
        vocabulary: [
            {
                arabic: "يتصل",
                english: "To connect, call",
                type: "verb",
            },
            {
                arabic: "يشجع",
                english: "To encourage, promote",
                type: "verb",
            },
            {
                arabic: "يزدهر",
                english: "To thrive, flourish",
                type: "verb",
            },
            {
                arabic: "يأثر",
                english: "To affect",
                type: "verb",
            },
            {
                arabic: "معنى",
                english: "Meaning",
                type: "noun",
            },
            {
                arabic: "اساس",
                english: "Foundation",
                type: "noun",
            },
            {
                arabic: "صوتيات",
                english: "Recording",
                type: "noun",
            },
        ],
    },
    lesson_42: {
        title: "Learning, Speaking, and Expression",
        objectives: [
            "Learn how to discuss learning, speaking, and expression in different forms",
            "Use vocabulary related to speech, education, and articulation",
        ],
        vocabulary: [
            {
                arabic: "يتعلم",
                english: "To learn",
                type: "verb",
            },
            {
                arabic: "يتحدث",
                english: "To speak",
                type: "verb",
            },
            {
                arabic: "ينطق",
                english: "To pronounce",
                type: "verb",
            },
            {
                arabic: "يؤلف",
                english: "To author",
                type: "verb",
            },
            {
                arabic: "يهاجر",
                english: "To abandon, migrate",
                type: "verb",
            },
            {
                arabic: "تفسير",
                english: "Tafseer (exegesis)",
                type: "noun",
            },
            {
                arabic: "لفظ",
                english: "Word",
                type: "noun",
            },
            {
                arabic: "قبيلة",
                english: "Tribe",
                type: "noun",
            },
        ],
    },
    lesson_43: {
        title: "Meeting, Gathering, and Announcements",
        objectives: [
            "Learn how to talk about meetings, gatherings, and making announcements",
            "Use vocabulary related to serving, collecting, and dividing",
        ],
        vocabulary: [
            {
                arabic: "يجتمع",
                english: "To meet",
                type: "verb",
            },
            {
                arabic: "يعلن",
                english: "To announce",
                type: "verb",
            },
            {
                arabic: "انقسم",
                english: "To be split, divided",
                type: "verb",
            },
            {
                arabic: "يجمع",
                english: "To gather, collect",
                type: "verb",
            },
            {
                arabic: "يخدم",
                english: "To serve",
                type: "verb",
            },
            {
                arabic: "خدمة",
                english: "Service",
                type: "noun",
            },
            {
                arabic: "اختيار",
                english: "Choice",
                type: "noun",
            },
            {
                arabic: "مولود",
                english: "Newborn baby",
                type: "noun",
            },
        ],
    },
    lesson_44: {
        title: "Competing, Rewarding, and Characteristics",
        objectives: [
            "Learn how to talk about competing, rewarding, and accomplishments",
            "Use vocabulary related to competition, rewards, and personal traits",
        ],
        vocabulary: [
            {
                arabic: "يشارك",
                english: "To participate",
                type: "verb",
            },
            {
                arabic: "يسابق",
                english: "To compete",
                type: "verb",
            },
            {
                arabic: "ينافس",
                english: "To compete (in a contest)",
                type: "verb",
            },
            {
                arabic: "يكسب",
                english: "To win, accomplish",
                type: "verb",
            },
            {
                arabic: "يكافئ",
                english: "To reward",
                type: "verb",
            },
            {
                arabic: "صفة",
                english: "Characteristic",
                type: "noun",
            },
            {
                arabic: "جائزة",
                english: "Prize, reward",
                type: "noun",
            },
            {
                arabic: "دعاء",
                english: "Supplication",
                type: "noun",
            },
        ],
    },
    lesson_45: {
        title: "Sending Messages and Exploring",
        objectives: [
            "Learn how to talk about sending messages, departing, and exploring new places",
            "Use vocabulary related to communicating and traveling",
        ],
        vocabulary: [
            {
                arabic: "يتفق",
                english: "To agree",
                type: "verb",
            },
            {
                arabic: "يرسل",
                english: "To send",
                type: "verb",
            },
            {
                arabic: "ينطلق",
                english: "To depart",
                type: "verb",
            },
            {
                arabic: "يبعث",
                english: "To send",
                type: "verb",
            },
            {
                arabic: "يتجول",
                english: "To wander, explore",
                type: "verb",
            },
            {
                arabic: "رسالة",
                english: "Message",
                type: "noun",
            },
            {
                arabic: "قارة",
                english: "Continent",
                type: "noun",
            },
            {
                arabic: "سفينة",
                english: "Ship",
                type: "noun",
            },
        ],
    },
    lesson_46: {
        title: "Making, Producing, and Forces",
        objectives: [
            "Learn how to talk about making and producing things, as well as using force",
            "Use vocabulary related to creating, rejecting, and owning",
        ],
        vocabulary: [
            {
                arabic: "يجعل",
                english: "To make",
                type: "verb",
            },
            {
                arabic: "يرفض",
                english: "To reject",
                type: "verb",
            },
            {
                arabic: "يصنع",
                english: "To produce, make",
                type: "verb",
            },
            {
                arabic: "يطير",
                english: "To fly",
                type: "verb",
            },
            {
                arabic: "يفرض",
                english: "To compel, force",
                type: "verb",
            },
            {
                arabic: "يملك",
                english: "To own",
                type: "verb",
            },
            {
                arabic: "يربط",
                english: "To tie",
                type: "verb",
            },
            {
                arabic: "جمل",
                english: "Camel",
                type: "noun",
            },
            {
                arabic: "فائدة",
                english: "Benefit",
                type: "noun",
            },
            {
                arabic: "حجة",
                english: "Evidence, proof",
                type: "noun",
            },
        ],
    },
    lesson_47: {
        title: "Daily Actions and Observations",
        objectives: [
            "Learn how to describe daily actions such as cleaning, noticing, and using items",
            "Use vocabulary related to routine activities and hygiene",
        ],
        vocabulary: [
            {
                arabic: "أزال",
                english: "To remove",
                type: "verb",
            },
            {
                arabic: "يستعمل",
                english: "To use",
                type: "verb",
            },
            {
                arabic: "اغتسل",
                english: "To shower",
                type: "verb",
            },
            {
                arabic: "يمسح",
                english: "To wipe",
                type: "verb",
            },
            {
                arabic: "يكتفي",
                english: "To settle, be content with",
                type: "verb",
            },
            {
                arabic: "يضيف",
                english: "To add",
                type: "verb",
            },
            {
                arabic: "كأس",
                english: "Cup, glass",
                type: "noun",
            },
            {
                arabic: "جسد",
                english: "Body",
                type: "noun",
            },
            {
                arabic: "وجه",
                english: "Face",
                type: "noun",
            },
            {
                arabic: "عامل",
                english: "Worker",
                type: "noun",
            },
            {
                arabic: "بيئة",
                english: "Environment",
                type: "noun",
            },
        ],
    },
    lesson_48: {
        title: "Actions Related to Health and Measurement",
        objectives: [
            "Learn how to talk about measuring, repeating actions, and maintaining health",
            "Use vocabulary related to health, measurement, and body parts",
        ],
        vocabulary: [
            {
                arabic: "يتكرر",
                english: "To repeat",
                type: "verb",
            },
            {
                arabic: "يقيس",
                english: "To measure",
                type: "verb",
            },
            {
                arabic: "يتحرك",
                english: "To move, explore",
                type: "verb",
            },
            {
                arabic: "يكتشف",
                english: "To explore, discover",
                type: "verb",
            },
            {
                arabic: "حيض",
                english: "Menstruation, period",
                type: "noun",
            },
            {
                arabic: "مرفق",
                english: "Elbow",
                type: "noun",
            },
            {
                arabic: "رجل",
                english: "Leg",
                type: "noun",
            },
            {
                arabic: "كعب",
                english: "Ankle",
                type: "noun",
            },
            {
                arabic: "متخلفون",
                english: "Backward, underdeveloped",
                type: "noun",
            },
            {
                arabic: "متحضر",
                english: "Civilized",
                type: "noun",
            },
        ],
    },
    lesson_49: {
        title: "Responsibility and Righteousness",
        objectives: [
            "Learn how to talk about personal responsibilities and accountability",
            "Use vocabulary related to embracing values, submitting to principles, and acting righteously",
        ],
        vocabulary: [
            {
                arabic: "أثبت",
                english: "To prove, verify",
                type: "verb",
            },
            {
                arabic: "أسلم",
                english: "To embrace Islam",
                type: "verb",
            },
            {
                arabic: "انقاد",
                english: "To submit, surrender",
                type: "verb",
            },
            {
                arabic: "تكفل",
                english: "To take upon oneself",
                type: "verb",
            },
            {
                arabic: "يحاسب",
                english: "To hold accountable",
                type: "verb",
            },
            {
                arabic: "يرحب",
                english: "To welcome",
                type: "verb",
            },
            {
                arabic: "ركن",
                english: "Pillar",
                type: "noun",
            },
            {
                arabic: "حقيقة",
                english: "Fact",
                type: "noun",
            },
        ],
    },
    lesson_50: {
        title: "Communication and Understanding",
        objectives: [
            "Learn how to communicate effectively and understand others",
            "Use vocabulary related to sending messages, welcoming others, and understanding the world",
        ],
        vocabulary: [
            {
                arabic: "أرسل",
                english: "To send",
                type: "verb",
            },
            {
                arabic: "فهم",
                english: "To understand",
                type: "verb",
            },
            {
                arabic: "يسعد",
                english: "To bring happiness",
                type: "verb",
            },
            {
                arabic: "نسخ",
                english: "To abrogate",
                type: "verb",
            },
            {
                arabic: "فاسد",
                english: "Corrupt",
                type: "adjective",
            },
            {
                arabic: "يخرج",
                english: "To take out",
                type: "verb",
            },
            {
                arabic: "نبي",
                english: "Prophet",
                type: "noun",
            },
            {
                arabic: "زمان",
                english: "Time, era",
                type: "noun",
            },
            {
                arabic: "رسول",
                english: "Messenger",
                type: "noun",
            },
            {
                arabic: "مفتاح",
                english: "Key",
                type: "noun",
            },
            {
                arabic: "مرسل",
                english: "Sent, Messenger",
                type: "noun",
            },
        ],
    },
    lesson_51: {
        title: "Respect and Treatment",
        objectives: [
            "Learn how to talk about respect, treatment, and dealing with different situations",
            "Use vocabulary related to respecting, treating, and handling people or situations",
        ],
        vocabulary: [
            {
                arabic: "احترم",
                english: "To respect",
                type: "verb",
            },
            {
                arabic: "اخبر",
                english: "To inform",
                type: "verb",
            },
            {
                arabic: "خالف",
                english: "To be different, contrary to",
                type: "verb",
            },
            {
                arabic: "اخطا",
                english: "To be mistaken, wrong",
                type: "verb",
            },
            {
                arabic: "عامل",
                english: "To deal with, treat",
                type: "verb",
            },
            {
                arabic: "مزق",
                english: "To tear up, rip apart",
                type: "verb",
            },
            {
                arabic: "تكلف",
                english: "To require, ask someone to do (something)",
                type: "verb",
            },
            {
                arabic: "تجربة",
                english: "Experience",
                type: "noun",
            },
            {
                arabic: "مسؤولية",
                english: "Responsibility",
                type: "noun",
            },
            {
                arabic: "حكمة",
                english: "Wisdom",
                type: "noun",
            },
        ],
    },
    lesson_52: {
        title: "Power and Authorization",
        objectives: [
            "Learn how to discuss power, authorization, and taking control",
            "Use vocabulary related to empowerment, ruling, and forgetting",
        ],
        vocabulary: [
            {
                arabic: "ولى",
                english: "To empower, authorize, appoint as ruler",
                type: "verb",
            },
            {
                arabic: "انتفع",
                english: "To benefit",
                type: "verb",
            },
            {
                arabic: "نسي",
                english: "To forget",
                type: "verb",
            },
            {
                arabic: "مهاجر",
                english: "Migrant",
                type: "noun",
            },
            {
                arabic: "مراهق",
                english: "Teenager, adolescent",
                type: "noun",
            },
            {
                arabic: "ثروة",
                english: "Wealth, fortune",
                type: "noun",
            },
            {
                arabic: "جيش",
                english: "Army",
                type: "noun",
            },
            {
                arabic: "موضوع",
                english: "Subject",
                type: "noun",
            },
            {
                arabic: "شيخ",
                english: "Elder, Shaykh",
                type: "noun",
            },
        ],
    },
    lesson_53: {
        title: "Unity and Occupation",
        objectives: [
            "Learn how to discuss unity, occupation, and seeking help",
            "Use vocabulary related to uniting, occupying, and seeking assistance",
        ],
        vocabulary: [
            {
                arabic: "اتحد",
                english: "To unite",
                type: "verb",
            },
            {
                arabic: "احتل",
                english: "To occupy, seize",
                type: "verb",
            },
            {
                arabic: "استعان",
                english: "To seek help",
                type: "verb",
            },
            {
                arabic: "نازع",
                english: "To dispute, argue",
                type: "verb",
            },
            {
                arabic: "مناطق",
                english: "Province",
                type: "noun",
            },
            {
                arabic: "مرازق",
                english: "Passageway",
                type: "noun",
            },
            {
                arabic: "محيط",
                english: "Ocean",
                type: "noun",
            },
            {
                arabic: "عملة",
                english: "Currency",
                type: "noun",
            },
        ],
    },
    lesson_54: {
        title: "Incitement and Action",
        objectives: [
            "Learn how to talk about provoking, committing actions, and experiencing things",
            "Use vocabulary related to incitement, commitment, and supporting actions",
        ],
        vocabulary: [
            {
                arabic: "اثار",
                english: "To provoke, incite, instigate",
                type: "verb",
            },
            {
                arabic: "اخاف",
                english: "To frighten",
                type: "verb",
            },
            {
                arabic: "ارتكب",
                english: "To commit",
                type: "verb",
            },
            {
                arabic: "استقر",
                english: "To be settled",
                type: "verb",
            },
            {
                arabic: "اوقف",
                english: "To stop",
                type: "verb",
            },
            {
                arabic: "ايد",
                english: "To advocate, support",
                type: "verb",
            },
            {
                arabic: "بحث",
                english: "To search",
                type: "verb",
            },
            {
                arabic: "تعاون",
                english: "To assist, support one another",
                type: "verb",
            },
            {
                arabic: "تمتع",
                english: "To take pleasure in",
                type: "verb",
            },
        ],
    },
    lesson_55: {
        title: "Control and Punishment",
        objectives: [
            "Learn how to talk about controlling, punishing, and ensuring safety",
            "Use vocabulary related to controlling, punishing, and protecting",
        ],
        vocabulary: [
            {
                arabic: "حمى",
                english: "To protect",
                type: "verb",
            },
            {
                arabic: "عاقب",
                english: "To punish",
                type: "verb",
            },
            {
                arabic: "قبض",
                english: "To arrest, seize",
                type: "verb",
            },
            {
                arabic: "نشط",
                english: "To be active, proceed",
                type: "verb",
            },
            {
                arabic: "نفذ",
                english: "To adhere to, carry out",
                type: "verb",
            },
            {
                arabic: "هيمن",
                english: "To control, dominate",
                type: "verb",
            },
            {
                arabic: "قارن",
                english: "To compare",
                type: "verb",
            },
            {
                arabic: "اغتصب",
                english: "To rape, take by force",
                type: "verb",
            },
        ],
    },
    lesson_56: {
        title: "Destruction and Consumption",
        objectives: [
            "Learn how to talk about destruction, consumption, and causing damage",
            "Use vocabulary related to burning, consuming, and causing problems",
        ],
        vocabulary: [
            {
                arabic: "احرق",
                english: "To set on fire",
                type: "verb",
            },
            {
                arabic: "استهلك",
                english: "To consume",
                type: "verb",
            },
            {
                arabic: "التهاب",
                english: "To inflame",
                type: "verb",
            },
            {
                arabic: "القى",
                english: "To throw",
                type: "verb",
            },
            {
                arabic: "انقرض",
                english: "To become extinct",
                type: "verb",
            },
            {
                arabic: "سبب",
                english: "To cause",
                type: "verb",
            },
            {
                arabic: "اتلف",
                english: "To damage",
                type: "verb",
            },
        ],
    },
    lesson_57: {
        title: "Protection and Monitoring",
        objectives: [
            "Learn how to talk about protection, monitoring, and safety",
            "Use vocabulary related to protecting, monitoring, and controlling",
        ],
        vocabulary: [
            {
                arabic: "دفن",
                english: "To bury",
                type: "verb",
            },
            {
                arabic: "ذكر",
                english: "To cite, mention, state",
                type: "verb",
            },
            {
                arabic: "غرس",
                english: "To plant",
                type: "verb",
            },
            {
                arabic: "راقب",
                english: "To monitor",
                type: "verb",
            },
            {
                arabic: "اشترك",
                english: "To join, partake in",
                type: "verb",
            },
            {
                arabic: "مشروع",
                english: "Project",
                type: "noun",
            },
            {
                arabic: "مسور",
                english: "Happy",
                type: "noun",
            },
            {
                arabic: "مسؤولية",
                english: "Responsibility",
                type: "noun",
            },
        ],
    },
    lesson_58: {
        title: "Caution and Action",
        objectives: [
            "Learn how to talk about being cautious and taking action",
            "Use vocabulary related to caution, claims, and exploitation",
        ],
        vocabulary: [
            {
                arabic: "احتاط",
                english: "To be cautious, careful",
                type: "verb",
            },
            {
                arabic: "ادعى",
                english: "To claim",
                type: "verb",
            },
            {
                arabic: "استغل",
                english: "To exploit, benefit from",
                type: "verb",
            },
            {
                arabic: "استفاد",
                english: "To benefit by/from",
                type: "verb",
            },
            {
                arabic: "انخفض",
                english: "To decrease, become less",
                type: "verb",
            },
            {
                arabic: "بذر",
                english: "To waste",
                type: "verb",
            },
            {
                arabic: "جمل",
                english: "To beautify",
                type: "verb",
            },
            {
                arabic: "برد",
                english: "To cool, freeze, refrigerate",
                type: "verb",
            },
            {
                arabic: "سخن",
                english: "To warm up",
                type: "verb",
            },
        ],
    },
    lesson_59: {
        title: "Provision and Preservation",
        objectives: [
            "Learn how to talk about providing, preserving, and taking care of resources",
            "Use vocabulary related to obtaining, responding, and running out of resources",
        ],
        vocabulary: [
            {
                arabic: "اضاء",
                english: "To light up, illuminate",
                type: "verb",
            },
            {
                arabic: "جدد",
                english: "To renew",
                type: "verb",
            },
            {
                arabic: "صدر",
                english: "To export",
                type: "verb",
            },
            {
                arabic: "ضاعف",
                english: "To double, multiply",
                type: "verb",
            },
            {
                arabic: "طبخ",
                english: "To cook",
                type: "verb",
            },
            {
                arabic: "قفز",
                english: "To jump, leap",
                type: "verb",
            },
            {
                arabic: "استجاب",
                english: "To respond, carry out",
                type: "verb",
            },
            {
                arabic: "وفر",
                english: "To provide",
                type: "verb",
            },
            {
                arabic: "استمد",
                english: "To obtain from, take from",
                type: "verb",
            },
        ],
    },
    lesson_60: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_61: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_62: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_63: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_64: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_65: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
};

export const chapters = [
    {
        chapter: 1,
        lessons: ["lesson_1", "lesson_2", "lesson_3", "lesson_4", "lesson_5"], // Array of lesson keys
    },
    {
        chapter: 2,
        lessons: ["lesson_6", "lesson_7", "lesson_8", "lesson_9", "lesson_10"],
    },
    {
        chapter: 3,
        lessons: [
            "lesson_11",
            "lesson_12",
            "lesson_13",
            "lesson_14",
            "lesson_15",
        ],
    },
    {
        chapter: 4,
        lessons: [
            "lesson_16",
            "lesson_17",
            "lesson_18",
            "lesson_19",
            "lesson_20",
        ],
    },
    {
        chapter: 5,
        lessons: [
            "lesson_21",
            "lesson_22",
            "lesson_23",
            "lesson_24",
            "lesson_25",
        ],
    },
    {
        chapter: 6,
        lessons: [
            "lesson_26",
            "lesson_27",
            "lesson_28",
            "lesson_29",
            "lesson_30",
        ],
    },
    {
        chapter: 7,
        lessons: [
            "lesson_31",
            "lesson_32",
            "lesson_33",
            "lesson_34",
            "lesson_35",
        ],
    },
    {
        chapter: 8,
        lessons: [
            "lesson_36",
            "lesson_37",
            "lesson_38",
            "lesson_39",
            "lesson_40",
        ],
    },
    {
        chapter: 9,
        lessons: [
            "lesson_41",
            "lesson_42",
            "lesson_43",
            "lesson_44",
            "lesson_45",
        ],
    },
    {
        chapter: 10,
        lessons: [
            "lesson_46",
            "lesson_47",
            "lesson_48",
            "lesson_49",
            "lesson_50",
        ],
    },
    {
        chapter: 11,
        lessons: [
            "lesson_51",
            "lesson_52",
            "lesson_53",
            "lesson_54",
            "lesson_55",
        ],
    },
    {
        chapter: 12,
        lessons: [
            "lesson_56",
            "lesson_57",
            "lesson_58",
            "lesson_59",
            "lesson_60",
        ],
    },
    {
        chapter: 13,
        lessons: [
            "lesson_61",
            "lesson_62",
            "lesson_63",
            "lesson_64",
            "lesson_65",
        ],
    },
];
