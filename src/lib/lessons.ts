export type VocabularyItem = {
    arabic: string;
    english: string;
    type: "pronoun" | "phrase" | "question" | "greeting" | "farewell" | "command" | "verb" | "noun";
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
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_18: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_19: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_20: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_21: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_22: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_23: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_24: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_25: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_26: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_27: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_28: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_29: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_30: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_31: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_32: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_33: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_34: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_35: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_36: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_37: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_38: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_39: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_40: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_41: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_42: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_43: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_44: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_45: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_46: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_47: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_48: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_49: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_50: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_51: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_52: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_53: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_54: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_55: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_56: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_57: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_58: {
        title: "",
        objectives: [],
        vocabulary: [],
    },
    lesson_59: {
        title: "",
        objectives: [],
        vocabulary: [],
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
      lessons: ["lesson_11", "lesson_12", "lesson_13", "lesson_14", "lesson_15"],
    },
    {
      chapter: 4,
      lessons: ["lesson_16", "lesson_17", "lesson_18", "lesson_19", "lesson_20"],
    },
    {
      chapter: 5,
      lessons: ["lesson_21", "lesson_22", "lesson_23", "lesson_24", "lesson_25"],
    },
    {
      chapter: 6,
      lessons: ["lesson_26", "lesson_27", "lesson_28", "lesson_29", "lesson_30"],
    },
    {
      chapter: 7,
      lessons: ["lesson_31", "lesson_32", "lesson_33", "lesson_34", "lesson_35"],
    },
    {
      chapter: 8,
      lessons: ["lesson_36", "lesson_37", "lesson_38", "lesson_39", "lesson_40"],
    },
    {
      chapter: 9,
      lessons: ["lesson_41", "lesson_42", "lesson_43", "lesson_44", "lesson_45"],
    },
    {
      chapter: 10,
      lessons: ["lesson_46", "lesson_47", "lesson_48", "lesson_49", "lesson_50"],
    },
    {
      chapter: 11,
      lessons: ["lesson_51", "lesson_52", "lesson_53", "lesson_54", "lesson_55"],
    },
    {
      chapter: 12,
      lessons: ["lesson_56", "lesson_57", "lesson_58", "lesson_59", "lesson_60"],
    },
    {
      chapter: 13,
      lessons: ["lesson_61", "lesson_62", "lesson_63", "lesson_64", "lesson_65"],
    },
  ];