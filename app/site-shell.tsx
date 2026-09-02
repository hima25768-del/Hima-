"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpLeft,
  BarChart3,
  Blocks,
  Check,
  Code2,
  Film,
  Globe2,
  LayoutDashboard,
  Megaphone,
  Menu,
  MessageCircle,
  Rocket,
  Search,
  Send,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from "lucide-react";

type PageKey = "home" | "services" | "solutions" | "about" | "packages" | "work" | "contact" | "privacy" | "terms";
type Lang = "ar" | "en";

const CONTACT = {
  email: "a.eae2010@icloud.com",
  whatsappNumber: "971503358014",
  whatsappDisplay: "050 335 8014",
} as const;

const LEADS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzhFvMWUU2z3cQ4CgjrTfMxXivnnRq0Z11eh4BI9WeduXUVuDq2LIKZxc_t2MIQrNUVog/exec";

const nav = [
  ["home", "/", "الرئيسية", "Home"],
  ["services", "/services", "الخدمات", "Services"],
  ["solutions", "/solutions", "الحلول", "Solutions"],
  ["packages", "/packages", "الباقات", "Packages"],
  ["work", "/work", "أعمالنا", "Work"],
  ["about", "/about", "من نحن", "About"],
  ["contact", "/contact", "تواصل", "Contact"],
] as const;

const services = [
  { icon: Globe2, ar: "تصميم وتطوير المواقع", en: "Website Design & Development", dar: "مواقع سريعة، متجاوبة ومبنية لتحويل الزيارات إلى فرص.", den: "Fast, responsive websites built to turn visits into opportunities." },
  { icon: ShoppingBag, ar: "التجارة الإلكترونية", en: "E-Commerce", dar: "متاجر واضحة وسهلة الإدارة ومهيأة للبيع في السوق الإماراتي.", den: "Clear, manageable stores designed to sell in the UAE market." },
  { icon: Smartphone, ar: "تطبيقات الجوال", en: "Mobile Apps", dar: "تجارب عملية تربط علامتك بعملائك على مدار الساعة.", den: "Practical experiences that keep your brand close to customers." },
  { icon: Blocks, ar: "أنظمة CRM مخصصة", en: "CRM & Custom Systems", dar: "أنظمة مبسطة لتنظيم العملاء والطلبات والعمليات.", den: "Streamlined systems for leads, orders and operations." },
  { icon: Megaphone, ar: "التسويق الرقمي", en: "Digital Marketing", dar: "خطط نمو مبنية على أهداف واضحة ونتائج قابلة للقياس.", den: "Growth plans built around clear, measurable goals." },
  { icon: Target, ar: "إعلانات Google", en: "Google Ads", dar: "حملات دقيقة للوصول إلى العميل في لحظة البحث.", den: "Focused campaigns that reach customers while they search." },
  { icon: Users, ar: "إدارة التواصل الاجتماعي", en: "Social Media Management", dar: "محتوى وجدولة وإدارة تعكس هوية نشاطك باحتراف.", den: "Content, scheduling and management true to your brand." },
  { icon: Film, ar: "المحتوى والفيديو", en: "Content & Video", dar: "محتوى بصري يشرح قيمتك ويجذب الانتباه.", den: "Visual content that explains your value and earns attention." },
];

const packages = [
  { ar: "انطلاقة", en: "Launch", descAr: "للأنشطة التي تحتاج حضورًا رقميًا احترافيًا", descEn: "For businesses establishing a professional digital presence", itemsAr: ["موقع تعريفي متجاوب", "تهيئة أساسية لمحركات البحث", "ربط واتساب ونموذج التواصل"], itemsEn: ["Responsive company website", "Essential SEO setup", "WhatsApp and contact form"] },
  { ar: "نمو", en: "Growth", descAr: "للشركات الجاهزة لجذب عملاء جدد باستمرار", descEn: "For companies ready to acquire customers consistently", featured: true, itemsAr: ["موقع أو متجر متكامل", "خطة تسويق شهرية", "إدارة الإعلانات والتقارير"], itemsEn: ["Complete website or store", "Monthly marketing plan", "Ads management and reporting"] },
  { ar: "توسع", en: "Scale", descAr: "للشركات التي تحتاج نظامًا رقميًا متكاملًا", descEn: "For companies needing an integrated digital system", itemsAr: ["حلول وتطبيقات مخصصة", "ربط العمليات والعملاء", "دعم وتطوير مستمر"], itemsEn: ["Custom solutions and apps", "Connected operations and CRM", "Ongoing support and iteration"] },
];

const legalContent = {
  privacy: {
    ar: [
      ["البيانات التي نجمعها", "عند إرسال نموذج التواصل قد نجمع الاسم، رقم الهاتف، البريد الإلكتروني، الخدمة المطلوبة، وتفاصيل المشروع التي تختار مشاركتها."],
      ["كيف نستخدم البيانات", "نستخدم هذه البيانات للرد على طلبك، إعداد عرض مناسب، متابعة المشروع، وتحسين خدماتنا. لا نبيع بياناتك الشخصية."],
      ["الحفظ والحماية", "نحتفظ بالبيانات بقدر ما يلزم لمتابعة الطلب وتقديم الخدمة، ونتخذ إجراءات معقولة لحمايتها من الوصول غير المصرح به."],
      ["مشاركة البيانات", "قد نستخدم مزودي خدمات موثوقين لتشغيل الموقع وإدارة الطلبات، وبالقدر اللازم فقط لتقديم الخدمة."],
      ["حقوقك", "يمكنك طلب الاطلاع على بياناتك أو تصحيحها أو حذفها بالتواصل معنا عبر البريد الإلكتروني الظاهر في الموقع."],
      ["التحديثات", "قد نحدّث هذه السياسة عند تغير خدماتنا أو المتطلبات النظامية. يظهر آخر تحديث في أسفل الصفحة."],
    ],
    en: [
      ["Information we collect", "When you submit our contact form, we may collect your name, phone number, email address, requested service, and any project details you choose to share."],
      ["How we use information", "We use this information to respond to your request, prepare a suitable proposal, follow up on the project, and improve our services. We do not sell personal information."],
      ["Retention and security", "We retain information for as long as reasonably needed to handle your request and provide services, and take reasonable steps to protect it from unauthorized access."],
      ["Service providers", "We may use trusted providers to operate the website and manage requests, and only to the extent needed to deliver the service."],
      ["Your choices", "You may ask to access, correct, or delete your information by contacting us through the email shown on this website."],
      ["Updates", "We may update this policy when our services or legal requirements change. The latest update date appears below."],
    ],
  },
  terms: {
    ar: [
      ["نطاق الخدمات", "تعرض HIM BAZ خدمات رقمية وتقنية وتسويقية. يتم تحديد النطاق النهائي، المدة، السعر، والمخرجات في عرض أو اتفاق مستقل لكل مشروع."],
      ["عروض الأسعار", "أي أسعار أو باقات منشورة هي أسعار ابتدائية ما لم ينص عرض السعر النهائي على خلاف ذلك، وقد تتغير بحسب حجم المشروع ومتطلباته."],
      ["مسؤوليات العميل", "يلتزم العميل بتقديم المعلومات والمحتوى والموافقات اللازمة في الوقت المناسب، والتأكد من امتلاكه حقوق استخدام المواد التي يزودنا بها."],
      ["الملكية الفكرية", "تحدد ملكية المخرجات وحقوق الاستخدام في اتفاق المشروع. تبقى الأدوات والمكونات السابقة للمشروع مملوكة لأصحابها."],
      ["المدفوعات والتغييرات", "تحدد مواعيد الدفعات وسياسة التعديل والإلغاء في عرض السعر أو العقد. أي أعمال إضافية خارج النطاق تتطلب موافقة منفصلة."],
      ["حدود المسؤولية", "نبذل عناية مهنية في تنفيذ الخدمات، لكن النتائج التسويقية والتجارية قد تتأثر بعوامل خارج سيطرتنا ولا يمكن ضمانها بشكل مطلق."],
    ],
    en: [
      ["Scope of services", "HIM BAZ provides digital, technology, and marketing services. Final scope, timing, price, and deliverables are defined in a separate proposal or agreement for each project."],
      ["Quotations", "Published package prices are starting estimates unless a final quotation states otherwise, and may vary with project size and requirements."],
      ["Client responsibilities", "The client provides required information, content, and approvals on time and confirms they have the right to use all materials supplied to us."],
      ["Intellectual property", "Ownership and usage rights are defined in the project agreement. Pre-existing tools and components remain the property of their respective owners."],
      ["Payments and changes", "Payment dates, revisions, and cancellation terms are defined in the proposal or contract. Work outside the agreed scope requires separate approval."],
      ["Limitations", "We perform services with professional care, but marketing and business outcomes can be affected by factors outside our control and cannot be guaranteed absolutely."],
    ],
  },
} as const;

function ProposalForm({ lang }: { lang: Lang }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) {
      setStatus("sent");
      form.reset();
      return;
    }
    data.set("language", lang);
    data.set("source", "him-baz-website");
    data.set("submittedAt", new Date().toISOString());
    try {
      await fetch(LEADS_ENDPOINT, { method: "POST", body: data, mode: "no-cors" });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  const whatsappFallback = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
    lang === "ar"
      ? "مرحباً HIM BAZ، تعذر إرسال النموذج وأرغب في مناقشة مشروعي."
      : "Hello HIM BAZ, the form could not be sent and I would like to discuss my project.",
  )}`;
  return (
    <form className="proposal-form" onSubmit={submit} aria-describedby="proposal-status">
      <label className="website-field" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="field-row">
        <label><span>{lang === "ar" ? "الاسم" : "Name"}</span><input name="name" autoComplete="name" required placeholder={lang === "ar" ? "اسمك أو اسم الشركة" : "Your name or company"} /></label>
        <label><span>{lang === "ar" ? "رقم التواصل" : "Phone"}</span><input name="phone" type="tel" autoComplete="tel" required placeholder="+971" /></label>
      </div>
      <label><span>{lang === "ar" ? "البريد الإلكتروني" : "Email"}</span><input name="email" type="email" autoComplete="email" placeholder="name@company.com" /></label>
      <label><span>{lang === "ar" ? "الخدمة المطلوبة" : "Service"}</span>
        <select name="service" required defaultValue="">
          <option value="" disabled>{lang === "ar" ? "اختر الخدمة" : "Select a service"}</option>
          {services.map((s) => <option key={s.en} value={s.en}>{lang === "ar" ? s.ar : s.en}</option>)}
        </select>
      </label>
      <label><span>{lang === "ar" ? "حدثنا عن مشروعك" : "Tell us about your project"}</span><textarea name="message" rows={4} placeholder={lang === "ar" ? "ما الذي تريد تحقيقه؟" : "What would you like to achieve?"} /></label>
      <label className="consent-field"><input name="privacyConsent" type="checkbox" required /><span>{lang === "ar" ? <>أوافق على استخدام بياناتي للرد على طلبي وفق <Link href="/privacy">سياسة الخصوصية</Link>.</> : <>I agree to the use of my information to respond to my request under the <Link href="/privacy">Privacy Policy</Link>.</>}</span></label>
      <button className="primary-btn form-btn" type="submit" disabled={status === "sending"} aria-live="polite">
        {status === "sent" ? <><Check size={19}/>{lang === "ar" ? "تم إرسال طلبك" : "Request sent"}</> : <><Send size={18}/>{status === "sending" ? (lang === "ar" ? "جارٍ الإرسال..." : "Sending...") : (lang === "ar" ? "اطلب عرضًا" : "Request a proposal")}</>}
      </button>
      <p id="proposal-status" className={`form-status ${status}`} role="status" aria-live="polite">
        {status === "sent" && (lang === "ar" ? "شكرًا لك. استلمنا طلبك وسنتواصل معك قريبًا." : "Thank you. We received your request and will contact you soon.")}
        {status === "error" && <>{lang === "ar" ? "تعذر الإرسال الآن. يمكنك " : "We could not send the form. You can "}<a href={whatsappFallback} target="_blank" rel="noreferrer">{lang === "ar" ? "متابعة الطلب عبر واتساب" : "continue on WhatsApp"}</a>.</>}
      </p>
    </form>
  );
}

export default function SiteShell({ page }: { page: PageKey }) {
  const [lang, setLang] = useState<Lang>("ar");
  const [menuOpen, setMenuOpen] = useState(false);
  const ar = lang === "ar";
  const title: Record<PageKey, [string, string, string, string]> = {
    home: ["نحوّل فكرتك إلى نمو رقمي حقيقي", "We turn your idea into real digital growth", "من الاستراتيجية إلى الإطلاق — نبني المواقع والتطبيقات والحملات التي تساعد أعمالك على التقدم.", "From strategy to launch, we build websites, apps and campaigns that move your business forward."],
    services: ["كل ما يحتاجه نموك الرقمي", "Everything your digital growth needs", "فريق واحد يجمع التقنية والتصميم والتسويق في تجربة مترابطة.", "One team connecting technology, design and marketing into one clear experience."],
    solutions: ["حلول مصممة حول طريقة عملك", "Solutions shaped around how you work", "نربط نقاط التجربة الرقمية حتى تعمل علامتك وعملياتك كمنظومة واحدة.", "We connect the digital touchpoints so your brand and operations work as one system."],
    about: ["شريك رقمي يفهم السوق والطموح", "A digital partner that understands ambition", "HIM BAZ تساعد الشركات في الإمارات على البناء والنمو والقيادة بثقة.", "HIM BAZ helps UAE businesses build, grow and lead with confidence."],
    packages: ["باقات مرنة لكل مرحلة", "Flexible packages for every stage", "نحدد النطاق المناسب بعد فهم هدفك، ثم نقدم عرضًا واضحًا يناسب مشروعك.", "We understand your goal first, then shape a clear proposal around your project."],
    work: ["نصنع أثرًا يمكن قياسه", "We create impact you can measure", "نركز على تجارب واضحة، تنفيذ متقن، ونتائج تخدم العمل.", "We focus on clear experiences, thoughtful execution and business outcomes."],
    contact: ["لنبدأ من هدفك", "Let’s start with your goal", "أخبرنا بما تريد تحقيقه وسنتواصل معك لمناقشة الخطوة المناسبة.", "Tell us what you want to achieve and we’ll discuss the right next step."],
    privacy: ["سياسة الخصوصية", "Privacy Policy", "نوضح هنا البيانات التي نجمعها وكيف نستخدمها ونحميها.", "This page explains what information we collect and how we use and protect it."],
    terms: ["الشروط والأحكام", "Terms & Conditions", "شروط عامة لاستخدام الموقع وطلب خدمات HIM BAZ.", "General terms for using this website and requesting HIM BAZ services."],
  };
  const t = title[page];
  const home = page === "home";

  useEffect(() => {
    const saved = window.localStorage.getItem("him-baz-lang");
    if (saved === "ar" || saved === "en") {
      queueMicrotask(() => setLang(saved));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ar ? "rtl" : "ltr";
  }, [lang, ar]);

  function switchLanguage() {
    const next: Lang = ar ? "en" : "ar";
    window.localStorage.setItem("him-baz-lang", next);
    setLang(next);
    setMenuOpen(false);
  }

  return (
    <div className="site" dir={ar ? "rtl" : "ltr"}>
      <header className="topbar">
        <Link className="brand" href="/" aria-label="HIM BAZ home"><span className="brand-mark">HB</span><span><b>HIM BAZ</b><small>DIGITAL GROWTH & TECHNOLOGY</small></span></Link>
        <nav className={menuOpen ? "open" : ""} aria-label={ar ? "التنقل الرئيسي" : "Primary navigation"}>{nav.map(([key, href, arLabel, enLabel]) => <Link key={key} className={page === key ? "active" : ""} href={href}>{ar ? arLabel : enLabel}</Link>)}</nav>
        <div className="header-actions"><button type="button" className="lang-btn" onClick={switchLanguage}>{ar ? "EN" : "العربية"}</button><Link className="nav-cta" href="/contact">{ar ? "ابدأ مشروعك" : "Start a project"}<ArrowUpLeft size={17}/></Link><button type="button" className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={ar ? "فتح قائمة التنقل" : "Open navigation menu"}>{menuOpen ? <X/> : <Menu/>}</button></div>
      </header>

      <main>
        <section className={`hero ${home ? "home-hero" : "inner-hero"}`}>
          {home && <div className="hero-image" aria-hidden="true" />}
          <div className="hero-grid"><div className="hero-copy">
            <div className="eyebrow"><Sparkles size={16}/>{ar ? "حلول رقمية للشركات في الإمارات" : "Digital solutions for UAE businesses"}</div>
            <h1>{ar ? t[0] : t[1]}</h1><p>{ar ? t[2] : t[3]}</p>
            <div className="hero-actions"><Link className="primary-btn" href="/contact">{ar ? "ناقش مشروعك معنا" : "Discuss your project"}<ArrowUpLeft size={19}/></Link><Link className="text-link" href="/services">{ar ? "استكشف خدماتنا" : "Explore services"}</Link></div>
          </div>{home && <div className="hero-orbit"><div className="orbit-card"><span>01</span><b>{ar ? "نبني" : "Build"}</b></div><div className="orbit-card"><span>02</span><b>{ar ? "ننمي" : "Grow"}</b></div><div className="orbit-card"><span>03</span><b>{ar ? "نقود" : "Lead"}</b></div></div>}</div>
        </section>

        {(home || page === "services") && <section className="section"><div className="section-head"><div><span className="kicker">{ar ? "الخدمات" : "SERVICES"}</span><h2>{ar ? "خبرة متكاملة، من الفكرة إلى النتيجة" : "Connected expertise, from idea to outcome"}</h2></div><p>{ar ? "نختار الأدوات والقنوات التي تخدم هدفك فعلاً." : "We choose the tools and channels that genuinely serve your goal."}</p></div><div className="service-grid">{services.map((s, i) => { const Icon=s.icon; return <article className="service-card" key={s.en}><span className="card-number">0{i+1}</span><Icon/><h3>{ar?s.ar:s.en}</h3><p>{ar?s.dar:s.den}</p></article>})}</div></section>}

        {(home || page === "solutions") && <section className="section solutions"><div className="solution-intro"><span className="kicker">{ar ? "كيف نعمل" : "HOW WE WORK"}</span><h2>{ar ? "وضوح في كل خطوة" : "Clarity at every step"}</h2><p>{ar ? "نبدأ بفهم عملك، ثم نصمم الحل، نطلقه، ونقيس أثره لنواصل التحسين." : "We understand your business, shape the solution, launch it, and measure the impact."}</p><Link className="text-link" href="/contact">{ar ? "تحدث مع الفريق" : "Talk to the team"}<ArrowUpLeft size={18}/></Link></div><div className="steps">{[
          [Search, "01", "الاكتشاف", "Discover", "نفهم السوق والهدف والعميل.", "We understand your market, goal and customer."],
          [LayoutDashboard, "02", "التصميم", "Design", "نحوّل الرؤية إلى تجربة واضحة.", "We turn the vision into a clear experience."],
          [Code2, "03", "التنفيذ", "Build", "ننفذ بعناية ونختبر التفاصيل.", "We build carefully and test the details."],
          [Rocket, "04", "الإطلاق والنمو", "Launch & Grow", "نطلق، نقيس، ونحسن باستمرار.", "We launch, measure and keep improving."],
        ].map(([Icon,n,a,e,da,de]) => { const I=Icon as typeof Search; return <article className="step" key={String(n)}><I/><span>{String(n)}</span><h3>{ar?String(a):String(e)}</h3><p>{ar?String(da):String(de)}</p></article>})}</div></section>}

        {page === "packages" && <section className="section"><div className="package-grid">{packages.map((p)=><article className={`package ${p.featured?"featured":""}`} key={p.en}>{p.featured&&<span className="popular">{ar?"الأكثر طلبًا":"MOST POPULAR"}</span>}<h2>{ar?p.ar:p.en}</h2><p>{ar?p.descAr:p.descEn}</p><ul>{(ar?p.itemsAr:p.itemsEn).map(x=><li key={x}><Check size={18}/>{x}</li>)}</ul><Link className={p.featured?"primary-btn":"outline-btn"} href="/contact">{ar?"اطلب عرضًا":"Request a proposal"}</Link></article>)}</div></section>}

        {page === "work" && <section className="section"><div className="work-grid">{[
          [Globe2,"حضور رقمي","Digital presence","مواقع وهوية رقمية تقدم العمل بوضوح وتدفع الزائر إلى الخطوة التالية.","Websites and digital identity that present the business clearly and guide action."],
          [ShoppingBag,"تجربة بيع","Commerce experience","متاجر ومسارات شراء تقلل التعقيد وتزيد فرص الإتمام.","Stores and purchase journeys that reduce friction and improve conversion."],
          [BarChart3,"منظومة نمو","Growth system","حملات ومحتوى وتقارير تربط الجهد بالنتيجة.","Campaigns, content and reporting that connect effort to outcomes."],
        ].map(([Icon,a,e,da,de],i)=>{const I=Icon as typeof Globe2;return <article className="work-card" key={String(a)}><div className="work-visual"><I/><span>0{i+1}</span></div><div><h2>{ar?String(a):String(e)}</h2><p>{ar?String(da):String(de)}</p></div></article>})}</div></section>}

        {page === "about" && <section className="section about-grid"><div><span className="kicker">HIM BAZ</span><h2>{ar?"نبني ما يحتاجه عملك، لا ما يضيف تعقيدًا":"We build what your business needs—not extra complexity"}</h2></div><div><p>{ar?"نجمع التقنية والإبداع والتسويق في شراكة عملية. هدفنا أن تحصل على حل واضح، قابل للاستخدام، ومهيأ للنمو مع نشاطك.":"We bring technology, creativity and marketing into one practical partnership. The goal is a clear, usable solution that can grow with your business."}</p><div className="values">{[[Zap,"سرعة بوعي","Purposeful speed"],[Target,"تركيز على النتيجة","Outcome focused"],[MessageCircle,"تواصل واضح","Clear communication"]].map(([Icon,a,e])=>{const I=Icon as typeof Zap;return <span key={String(a)}><I size={20}/>{ar?String(a):String(e)}</span>})}</div></div></section>}

        {page === "contact" && <section className="section contact-grid"><div className="contact-copy"><span className="kicker">{ar?"تواصل معنا":"CONTACT"}</span><h2>{ar?"شاركنا الفكرة، وسنرتب الطريق":"Share the idea. We’ll shape the path."}</h2><p>{ar?"أرسل تفاصيل مشروعك، أو تواصل مباشرة عبر واتساب.":"Send your project details or reach us directly on WhatsApp."}</p><div className="contact-list"><a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle/>{CONTACT.whatsappDisplay}</a><a href={`mailto:${CONTACT.email}`}><Send/>{CONTACT.email}</a><span><Globe2/>UAE</span></div></div><ProposalForm lang={lang}/></section>}

        {(page === "privacy" || page === "terms") && <section className="section legal-section"><div className="legal-meta"><span className="kicker">HIM BAZ</span><p>{ar ? "آخر تحديث: 2 سبتمبر 2026" : "Last updated: 2 September 2026"}</p></div><div className="legal-list">{legalContent[page][lang].map(([heading, body]) => <article key={heading}><h2>{heading}</h2><p>{body}</p></article>)}</div><p className="legal-note">{ar ? "هذه الشروط معلومات عامة، وتُستكمل باتفاق المشروع الخاص بكل عميل." : "These terms provide general information and are supplemented by each client’s project agreement."}</p></section>}

        {home && <section className="cta"><div><span>{ar?"جاهز للخطوة التالية؟":"READY FOR THE NEXT STEP?"}</span><h2>{ar?"لنصنع شيئًا ينمّي أعمالك":"Let’s build something that grows your business"}</h2></div><Link className="light-btn" href="/contact">{ar?"ابدأ مشروعك":"Start your project"}<ArrowUpLeft/></Link></section>}
      </main>

      <footer><div className="footer-brand"><span className="brand-mark">HB</span><div><b>HIM BAZ</b><p>Build. Grow. Lead.</p></div></div><div className="footer-contact"><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer">{CONTACT.whatsappDisplay}</a><Link href="/privacy">{ar ? "الخصوصية" : "Privacy"}</Link><Link href="/terms">{ar ? "الشروط" : "Terms"}</Link><span>United Arab Emirates</span></div><p className="copyright">© 2026 HIM BAZ</p></footer>
    </div>
  );
}
