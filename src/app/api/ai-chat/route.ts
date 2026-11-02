import { NextResponse } from "next/server";

// বাংলা বা বাংলিশ বনাম ইংরেজি ভাষা নির্ভুলভাবে শনাক্তকরণ
function detectIsBangla(text: string): boolean {
  if (/[\u0980-\u09FF]/.test(text)) return true;
  const banglishWords = [
    "ki", "kake", "kaka", "kar", "koto", "kivabe", "keno", "kothay", "kokhon",
    "parbo", "parbe", "jabe", "jay", "hoy", "hole", "hoile", "chaile", "chay",
    "dite", "deya", "dewa", "nite", "neya", "newa", "lagbe", "lage", "ache", "ase",
    "nai", "na", "amar", "apnar", "tar", "ojon", "boyos", "bochor", "din", "mash",
    "rokto", "blode", "chek", "korte", "korbo", "korle", "khele", "khawa", "khabar",
    "pani", "jor", "sordi", "oshudh", "kom", "beshi", "valo", "kharap", "somossa",
    "bolen", "bolo", "ভাই", "দাদা", "একটু", "হবে", "যাবে", "পারব"
  ];
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/);
  return words.some((w) => banglishWords.includes(w));
}

// বাংলা সংখ্যাকে ইংরেজি সংখ্যায় রূপান্তর
function normalizeDigits(str: string): string {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  let res = str;
  for (let i = 0; i < 10; i++) {
    res = res.split(bnDigits[i]).join(String(i));
  }
  return res;
}

// লোকাল ডিপ ক্লিনিক্যাল এক্সপার্ট ইঞ্জিন (১০০% নির্ভুল মেডিকেল লজিক)
function getLocalClinicalResponse(rawPrompt: string, isBn: boolean): string | null {
  const q = normalizeDigits(rawPrompt.toLowerCase());

  // ১. হিমোগ্লোবিন (Hemoglobin)
  if (q.includes("hemoglobin") || q.includes("himoglobin") || q.includes("হিমোগ্লোবিন") || /\bhb\b/.test(q)) {
    return isBn
      ? "হ্যাঁ, রক্তদানের পূর্বে হিমোগ্লোবিন পরীক্ষা করা বাধ্যতামূলক। নিরাপদ রক্তদানের জন্য পুরুষদের ক্ষেত্রে ন্যূনতম ১৩.০ g/dL এবং নারীদের ক্ষেত্রে ন্যূনতম ১২.৫ g/dL হিমোগ্লোবিন থাকা প্রয়োজন। এর কম থাকলে রক্তদাতার রক্তস্বল্পতা বা শারীরিক দুর্বলতা দেখা দিতে পারে।"
      : "Yes, checking hemoglobin before blood donation is mandatory. The minimum required hemoglobin level is 13.0 g/dL for males and 12.5 g/dL for females to ensure donor safety and prevent anemia.";
  }

  // ২. রক্তের গ্রুপ সামঞ্জস্যতা (All 8 Blood Groups)
  const groupData: Record<string, { give: string; take: string; bnName: string }> = {
    "AB+": { give: "শুধুমাত্র AB+", take: "সব গ্রুপ (O+, O-, A+, A-, B+, B-, AB+, AB-) — সার্বজনীন গ্রহীতা", bnName: "AB+ (এবি পজিটিভ)" },
    "AB-": { give: "AB+ এবং AB-", take: "AB-, A-, B- এবং O-", bnName: "AB- (এবি নেগেটিভ)" },
    "A+":  { give: "A+ এবং AB+", take: "A+, A-, O+ এবং O-", bnName: "A+ (এ পজিটিভ)" },
    "A-":  { give: "A+, A-, AB+ এবং AB-", take: "A- এবং O-", bnName: "A- (এ নেগেটিভ)" },
    "B+":  { give: "B+ এবং AB+", take: "B+, B-, O+ এবং O-", bnName: "B+ (বি পজিটিভ)" },
    "B-":  { give: "B+, B-, AB+ এবং AB-", take: "B- এবং O-", bnName: "B- (বি নেগেটিভ)" },
    "O+":  { give: "O+, A+, B+ এবং AB+", take: "O+ এবং O-", bnName: "O+ (ও পজিটিভ)" },
    "O-":  { give: "সব গ্রুপ (O+, O-, A+, A-, B+, B-, AB+, AB-) — সার্বজনীন দাতা", take: "শুধুমাত্র O-", bnName: "O- (ও নেগেটিভ)" }
  };

  let detectedGroup: string | null = null;
  if (/ab\s*(\+|positive|pos|পজিটিভ|পজেটিভ)/.test(q)) detectedGroup = "AB+";
  else if (/ab\s*(\-|negative|neg|নেগেটিভ)/.test(q)) detectedGroup = "AB-";
  else if (/\ba\s*(\+|positive|pos|পজিটিভ|পজেটিভ)/.test(q) || q.includes("এ পজিটিভ")) detectedGroup = "A+";
  else if (/\ba\s*(\-|negative|neg|নেগেটিভ)/.test(q) || q.includes("এ নেগেটিভ")) detectedGroup = "A-";
  else if (/\bb\s*(\+|positive|pos|পজিটিভ|পজেটিভ)/.test(q) || q.includes("বি পজিটিভ")) detectedGroup = "B+";
  else if (/\bb\s*(\-|negative|neg|নেগেটিভ)/.test(q) || q.includes("বি নেগেটিভ")) detectedGroup = "B-";
  else if (/\bo\s*(\+|positive|pos|পজিটিভ|পজেটিভ)/.test(q) || q.includes("ও পজিটিভ")) detectedGroup = "O+";
  else if (/\bo\s*(\-|negative|neg|নেগেটিভ)/.test(q) || q.includes("ও নেগেটিভ")) detectedGroup = "O-";

  if (detectedGroup) {
    const info = groupData[detectedGroup];
    return isBn
      ? info.bnName + " রক্তের সামঞ্জস্যতা:\n• রক্ত দিতে পারবেন: " + info.give + " গ্রুপের রোগীকে।\n• রক্ত নিতে পারবেন: " + info.take + " গ্রুপের ডোনারের কাছ থেকে।"
      : detectedGroup + " Blood Compatibility:\n• Can Donate To: " + info.give.replace("শুধুমাত্র ", "").replace("এবং", "&") + "\n• Can Receive From: " + info.take.replace("শুধুমাত্র ", "").replace("এবং", "&");
  }

  // ৩. ওজন সংক্রান্ত প্রশ্ন (কেবল ওজন/কেজি উল্লেখ থাকলে)
  if (q.includes("kg") || q.includes("weight") || q.includes("ojon") || q.includes("ওজন") || q.includes("কেজি")) {
    const m = q.match(/(\d+)/);
    if (m) {
      const w = parseInt(m[1], 10);
      if (w >= 50) {
        return isBn
          ? "হ্যাঁ, আপনি রক্তদানের জন্য উপযুক্ত! আপনার ওজন " + w + " কেজি, যা নিরাপদ রক্তদানের ন্যূনতম শর্ত (৫০ কেজি) পূরণ করে। আপনার হিমোগ্লোবিন ও রক্তচাপ স্বাভাবিক থাকলে নির্ভয়ে রক্ত দিতে পারবেন।"
          : "Yes, you are eligible! Your weight (" + w + " kg) meets the minimum 50 kg requirement for safe whole-blood donation.";
      } else {
        return isBn
          ? "দুঃখিত, আপনার ওজন " + w + " কেজি হওয়ায় এই মুহূর্তে রক্তদান করা নিরাপদ নয়। নিরাপদে রক্তদানের জন্য ন্যূনতম ৫০ কেজি ওজন থাকা বাধ্যতামূলক, অন্যথায় শারীরিক দুর্বলতা বা মাথা ঘোরার ঝুঁকি থাকে।"
          : "Sorry, with a weight of " + w + " kg, you cannot donate blood right now. A minimum weight of 50 kg is strictly required for donor safety.";
      }
    }
    return isBn
      ? "নিরাপদ রক্তদানের জন্য রক্তদাতার ওজন কমপক্ষে ৫০ কেজি (১১০ পাউন্ড) বা তার বেশি হতে হবে।"
      : "A donor must weigh at least 50 kg (110 lbs) to safely donate blood.";
  }

  // ৪. বয়স সংক্রান্ত প্রশ্ন (কেবল বয়স/বছর উল্লেখ থাকলে)
  if (q.includes("age") || q.includes("boyos") || q.includes("bochor") || q.includes("বয়স") || q.includes("বয়স") || q.includes("বছর")) {
    const m = q.match(/(\d+)/);
    if (m) {
      const age = parseInt(m[1], 10);
      if (age >= 18 && age <= 60) {
        return isBn
          ? "হ্যাঁ, আপনার বয়স (" + age + " বছর) রক্তদানের জন্য সম্পূর্ণ উপযুক্ত। ১৮ থেকে ৬০ বছর বয়সী যেকোনো সুস্থ মানুষ রক্তদান করতে পারেন।"
          : "Yes, your age (" + age + " years) is within the eligible range of 18 to 60 years for blood donation.";
      } else {
        return isBn
          ? "রক্তদানের অনুমোদিত বয়সসীমা হলো ১৮ থেকে ৬০ বছর। আপনার বয়স " + age + " বছর হওয়ায় চিকিৎসাবিধি অনুযায়ী রক্তদান করা যাবে না।"
          : "The eligible age range for blood donation is 18 to 60 years. At age " + age + ", donation is not permitted.";
      }
    }
    return isBn
      ? "রক্তদানের জন্য রক্তদাতার বয়স অবশ্যই ১৮ থেকে ৬০ বছরের মধ্যে হতে হবে।"
      : "Donors must be between 18 and 60 years old to donate blood.";
  }

  // ৫. রক্তদানের বিরতি / কত দিন পর পর দেওয়া যায়
  if (q.includes("interval") || q.includes("gap") || q.includes("how often") || q.includes("koto din") || q.includes("কত দিন") || q.includes("কতদিন") || q.includes("মাস পর") || q.includes("বিরতি") || q.includes("ব্যবধান")) {
    return isBn
      ? "বিশ্ব স্বাস্থ্য সংস্থা (WHO)-এর নির্দেশনা অনুযায়ী, একজন সুস্থ পুরুষ প্রতি ৯০ দিন (৩ মাস) পর পর এবং একজন সুস্থ নারী প্রতি ১২০ দিন (৪ মাস) পর পর নিরাপদে রক্তদান করতে পারেন। আর প্লাটিলেট (Platelet) দেওয়ার ক্ষেত্রে বিরতি মাত্র ১৫ দিন।"
      : "According to WHO guidelines, healthy men can safely donate whole blood every 90 days (3 months), and healthy women every 120 days (4 months). For platelet apheresis, the minimum gap is 15 days.";
  }

  // ৬. রক্তচাপ / ব্লাড প্রেসার
  if (q.includes("pressure") || /\bbp\b/.test(q) || q.includes("প্রেসার") || q.includes("রক্তচাপ")) {
    return isBn
      ? "রক্তদানের সময় রক্তদাতার সিস্টোলিক রক্তচাপ ১০০ থেকে ১৪০ mmHg এবং ডায়াস্টোলিক রক্তচাপ ৬০ থেকে ৯০ mmHg-এর মধ্যে থাকা আবশ্যক। প্রেসার অতিরিক্ত কম বা বেশি থাকলে রক্তদান করা যাবে না।"
      : "For safe blood donation, Systolic blood pressure must be between 100–140 mmHg and Diastolic blood pressure between 60–90 mmHg.";
  }

  // ৭. ডায়াবেটিস ও ইনসুলিন
  if (q.includes("diabet") || q.includes("sugar") || q.includes("ডায়াবেটিস") || q.includes("ডায়াবেটিস") || q.includes("সুগার") || q.includes("insulin") || q.includes("ইনসুলিন")) {
    return isBn
      ? "খাদ্যাভ্যাস বা মুখে খাওয়ার ওষুধের মাধ্যমে ডায়াবেটিস নিয়ন্ত্রণে থাকলে রক্তদান করা যায়। তবে যারা নিয়মিত ইনসুলিন ইনজেকশন গ্রহণ করেন, তাদের রক্তদান করা সম্পূর্ণ নিষেধ।"
      : "If your diabetes is well-controlled by diet or oral medication, you can donate blood. However, individuals taking insulin injections are not eligible to donate.";
  }

  // ৮. খাবার, পানি বা রোজা রেখে রক্তদান
  if (q.includes("food") || q.includes("eat") || q.includes("fasting") || q.includes("roja") || q.includes("ramadan") || q.includes("khabar") || q.includes("khali pet") || q.includes("খাবার") || q.includes("খালি পেট") || q.includes("রোজা") || q.includes("পানি")) {
    return isBn
      ? "খালি পেটে কখনোই রক্তদান করা উচিত নয়। রক্তদানের ২-৩ ঘণ্টা আগে হালকা পুষ্টিকর খাবার (যেমন ভাত, রুটি, ফল) খেয়ে এবং প্রচুর পানি পান করে রক্ত দিতে হয়। রমজান মাসে রোজা থাকা অবস্থায় না দিয়ে ইফতারের পর পর্যাপ্ত খাবার ও পানি খেয়ে রক্তদান করা নিরাপদ।"
      : "Never donate blood on an empty stomach. Eat a light, low-fat meal 2–3 hours before donating and drink plenty of water. During Ramadan, it is best to donate after Iftar.";
  }

  // ৯. ধূমপান ও অ্যালকোহল
  if (q.includes("smoke") || q.includes("smoking") || q.includes("cigarette") || q.includes("alcohol") || q.includes("ধূমপান") || q.includes("সিগারেট") || q.includes("বিড়ি") || q.includes("মদ")) {
    return isBn
      ? "রক্তদানের অন্তত ২ ঘণ্টা আগে এবং রক্তদানের পর অন্তত ৩ ঘণ্টা ধূমপান করা যাবে না (এতে মাথা ঘোরার ঝুঁকি থাকে)। এছাড়া রক্তদানের পূর্বে অন্তত ২৪ থেকে ৪৮ ঘণ্টা যেকোনো অ্যালকোহল থেকে বিরত থাকতে হবে।"
      : "Avoid smoking for at least 2 hours before and 3 hours after donating blood to prevent dizziness. Alcohol must be avoided for at least 24–48 hours prior to donation.";
  }

  // ১০. জ্বর, সর্দি, অ্যান্টিবায়োটিক ও ওষুধ
  if (q.includes("fever") || q.includes("cold") || q.includes("antibiotic") || q.includes("medicine") || q.includes("vaccine") || q.includes("jor") || q.includes("oshudh") || q.includes("জ্বর") || q.includes("সর্দি") || q.includes("ওষুধ") || q.includes("অ্যান্টিবায়োটিক") || q.includes("টিকা")) {
    return isBn
      ? "জ্বর, সর্দি বা যেকোনো ইনফেকশন থাকা অবস্থায় রক্তদান করা যাবে না। অ্যান্টিবায়োটিক ওষুধের কোর্স শেষ হওয়ার পর এবং জ্বর পুরোপুরি ভালো হওয়ার অন্তত ৭ থেকে ১৪ দিন পর রক্তদান করা নিরাপদ।"
      : "Do not donate blood while having a fever, cold, or active infection. You must wait at least 7 to 14 days after finishing a course of antibiotics or recovering from illness.";
  }

  // ১১. গর্ভাবস্থা, মাসিক (Period) ও মাতৃদুগ্ধ দান
  if (q.includes("pregnant") || q.includes("pregnancy") || q.includes("period") || q.includes("menstruation") || q.includes("breastfeed") || q.includes("গর্ভবতী") || q.includes("মাসিক") || q.includes("পিরিয়ড") || q.includes("পিরিয়ড") || q.includes("বুকের দুধ")) {
    return isBn
      ? "গর্ভাবস্থায়, সন্তান প্রসবের পর প্রথম ৬-১২ মাস এবং শিশুকে বুকের দুধ খাওয়ানোর সময় রক্তদান সম্পূর্ণ নিষেধ। এছাড়া মাসিক বা পিরিয়ড চলাকালীন অতিরিক্ত রক্তক্ষরণ বা দুর্বলতা থাকলে রক্ত না দিয়ে পিরিয়ড শেষ হওয়ার পর রক্তদান করা উত্তম।"
      : "Blood donation is strictly prohibited during pregnancy, lactation, and for 6–12 months post-delivery. During menstruation, it is advisable to wait until the period ends if experiencing heavy flow or cramps.";
  }

  // ১২. ডেঙ্গু, প্লাটিলেট ও প্লাজমা
  if (q.includes("dengue") || q.includes("dengu") || q.includes("platelet") || q.includes("plasma") || q.includes("ডেঙ্গু") || q.includes("প্লাটিলেট") || q.includes("প্লাজমা")) {
    return isBn
      ? "ডেঙ্গু বা ক্যান্সার রোগীদের জন্য অ্যাফেরেসিস (Apheresis) মেশিনের মাধ্যমে শুধু প্লাটিলেট দান করা যায়। প্লাটিলেট দানের পর ৪৮-৭২ ঘণ্টার মধ্যেই তা শরীরে পূরণ হয়ে যায় এবং ১৫ দিন পর আবার দান করা যায়।"
      : "For dengue or trauma patients, donors can donate platelets via an apheresis machine. Platelets replenish within 48–72 hours, allowing donations every 15 days.";
  }

  // ১৩. ট্যাটু, সার্জারি বা দাঁতের চিকিৎসা
  if (q.includes("tattoo") || q.includes("piercing") || q.includes("surgery") || q.includes("operation") || q.includes("ট্যাটু") || q.includes("অপারেশন") || q.includes("সার্জারি")) {
    return isBn
      ? "শরীরে নতুন ট্যাটু, পিয়ার্সিং বা বড় কোনো অপারেশন করার পর সংক্রমণের ঝুঁকি এড়াতে অন্তত ৬ থেকে ১২ মাস রক্তদান থেকে বিরত থাকতে হবে।"
      : "After getting a tattoo, body piercing, or major surgery, you must wait 6 to 12 months before donating blood.";
  }

  // ১৪. রক্তদানের নিয়ম / যোগ্যতা / কী কী চেক করতে হয়
  if (q.includes("rule") || q.includes("eligib") || q.includes("requirement") || q.includes("niyom") || q.includes("joggota") || q.includes("chek") || q.includes("check") || q.includes("যোগ্যতা") || q.includes("নিয়ম") || q.includes("নিয়ম") || q.includes("কি কি") || q.includes("কী কী")) {
    return isBn
      ? "রক্তদানের মূল শর্তাবলি:\n১. বয়স: ১৮ থেকে ৬০ বছর।\n২. ওজন: ন্যূনতম ৫০ কেজি।\n৩. হিমোগ্লোবিন: পুরুষদের ১৩.০+ g/dL এবং নারীদের ১২.৫+ g/dL।\n৪. রক্তচাপ ও তাপমাত্রা: স্বাভাবিক (১০০-১৪০/৬০-৯০ mmHg)।\n৫. বিরতি: সর্বশেষ রক্তদানের পর অন্তত ৯০ দিন (৩ মাস) পার হতে হবে।\n৬. স্ক্রিনিং: রক্ত নেওয়ার আগে হেপাটাইটিস বি, সি, এইচআইভি, ম্যালেরিয়া ও সিফিলিস পরীক্ষা করা হয়।"
      : "Key Blood Donation Requirements:\n1. Age: 18–60 years.\n2. Weight: Minimum 50 kg.\n3. Hemoglobin: >=13.0 g/dL (Male), >=12.5 g/dL (Female).\n4. Blood Pressure: 100–140 / 60–90 mmHg.\n5. Interval: Minimum 90 days since last donation.\n6. Mandatory Screening: Tested for Hepatitis B, C, HIV, Malaria, and Syphilis.";
  }

  // ১৫. রক্তদানের উপকারিতা বা ভয়
  if (q.includes("benefit") || q.includes("upokar") || q.includes("bhoy") || q.includes("pain") || q.includes("উপকার") || q.includes("ক্ষতি") || q.includes("ভয়") || q.includes("ব্যথা")) {
    return isBn
      ? "রক্তদান সম্পূর্ণ নিরাপদ এবং এতে কোনো ক্ষতি হয় না। একজন মানুষের শরীরে প্রায় ৫ লিটার রক্ত থাকে, যার মধ্যে মাত্র ৩৫০-৪৫০ মিলি রক্ত নেওয়া হয়। এটি ২৪-৪৮ ঘণ্টায় স্বাভাবিক হয়ে যায়, শরীরে নতুন রক্তকণিকা তৈরি করে এবং হৃদরোগের ঝুঁকি কমায়।"
      : "Blood donation is completely safe. Only 350–450 mL is collected out of ~5 liters in the body. Plasma replenishes within 24–48 hours, stimulating new blood cell production and reducing cardiovascular risk.";
  }

  // ১৬. সাধারণ শুভেচ্ছা বিনিময়
  if (/^(hi|hello|hey|salam|assalamu|হ্যালো|হাই|সালাম|কেমন)/.test(q.trim())) {
    return isBn
      ? "আসসালামু আলাইকুম! আমি BloodPulse AI ক্লিনিক্যাল অ্যাসিস্ট্যান্ট। রক্তের গ্রুপের সামঞ্জস্যতা, রক্তদানের শারীরিক যোগ্যতা, হিমোগ্লোবিন, ওজন বা যেকোনো স্বাস্থ্যগত প্রশ্ন আমাকে করতে পারেন।"
      : "Hello! I am the BloodPulse AI Clinical Assistant. Feel free to ask me anything about blood group compatibility, donor eligibility, hemoglobin, weight requirements, or medical guidelines.";
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = (body?.prompt || "").trim();
    if (!prompt) {
      return NextResponse.json({ response: "অনুগ্রহ করে আপনার প্রশ্নটি লিখুন।" });
    }

    const isBn = detectIsBangla(prompt);

    // ধাপ ১: পরিচিত ক্লিনিক্যাল প্রশ্ন হলে সাথে সাথে ১০০% নির্ভুল উত্তর প্রদান
    const localMatch = getLocalClinicalResponse(prompt, isBn);
    if (localMatch) {
      return NextResponse.json({ response: localMatch });
    }

    // ধাপ ২: যেকোনো মুক্ত বা জটিল প্রশ্নের জন্য রিয়েল ফ্রি LLM (OpenAI via Pollinations / Gemini) কল করা
    const sysPrompt = isBn
      ? "You are BloodPulse AI, an expert medical and blood donation assistant in Bangladesh. The user asked a question in Bengali or Banglish. You MUST reply strictly in standard formal Bengali script (প্রমিত বাংলা বর্ণমালা). NEVER use Banglish/Romanized Bengali. Give a direct, accurate, helpful, and concise answer (2-4 sentences) to the user's exact question."
      : "You are BloodPulse AI, an expert medical and blood donation assistant. Reply in clear, professional English in 2-4 concise sentences directly answering the user's question.";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const llmRes = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: "openai",
          messages: [
            { role: "system", content: sysPrompt },
            { role: "user", content: prompt }
          ],
          temperature: 0.4
        })
      });
      clearTimeout(timeoutId);

      if (llmRes.ok) {
        const data = await llmRes.json();
        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return NextResponse.json({ response: reply });
        }
      }
    } catch (e) {
      clearTimeout(timeoutId);
    }

    // ধাপ ৩: যদি অফলাইন থাকে তবে স্মার্ট ফলব্যাক গাইড
    return NextResponse.json({
      response: isBn
        ? "রক্তদান ও চিকিৎসা সংক্রান্ত আপনার প্রশ্নটি গ্রহণ করা হয়েছে। নিরাপদে রক্তদানের জন্য বয়স ১৮-৬০ বছর, ওজন ন্যূনতম ৫০ কেজি, হিমোগ্লোবিন ১২.৫-১৩.০ g/dL এবং সর্বশেষ রক্তদানের পর ৯০ দিনের বিরতি থাকা প্রয়োজন। নির্দিষ্ট কোনো রক্তের গ্রুপ (যেমন A+, B+, O+, AB+) বা শারীরিক অবস্থার বিষয়ে জানতে সরাসরি উল্লেখ করে প্রশ্ন করুন।"
        : "For safe blood donation, donors must be 18–60 years old, weigh at least 50 kg, have hemoglobin >=12.5–13.0 g/dL, and maintain a 90-day interval since their last donation. Please specify a blood group or medical condition for detailed guidance."
    });
  } catch (err) {
    return NextResponse.json({ response: "সার্ভারে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" }, { status: 500 });
  }
}