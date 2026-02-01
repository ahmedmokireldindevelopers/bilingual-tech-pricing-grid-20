import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicyContent = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-tech-dark mb-8 text-center">
            {t("Privacy Policy", "سياسة الخصوصية")}
          </h1>
          
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("1. Introduction", "١. مقدمة")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.",
                  "نحن نقدر خصوصيتك ونلتزم بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية بياناتك عند استخدام موقعنا وخدماتنا."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("2. Information We Collect", "٢. المعلومات التي نجمعها")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {t(
                  "We may collect the following types of information:",
                  "قد نقوم بجمع الأنواع التالية من المعلومات:"
                )}
              </p>
              <ul className="list-disc leading-relaxed pl-6 space-y-2 text-gray-600">
                <li>{t("Personal identification information (Name, email address, phone number, etc.)", "معلومات الهوية الشخصية (الاسم، عنوان البريد الإلكتروني، رقم الهاتف، إلخ)")}</li>
                <li>{t("Usage data (IP address, browser type, pages visited)", "بيانات الاستخدام (عنوان IP، نوع المتصفح، الصفحات التي تمت زيارتها)")}</li>
                <li>{t("Cookies and tracking technologies", "ملفات تعريف الارتباط وتقنيات التتبع")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("3. How We Use Your Information", "٣. كيف نستخدم معلوماتك")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "We use the collected information to provide and improve our services, communicate with you, analyze usage patterns, and ensure the security of our platform.",
                  "نستخدم المعلومات التي تم جمعها لتقديم خدماتنا وتحسينها، والتواصل معك، وتحليل أنماط الاستخدام، وضمان أمان منصتنا."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("4. Data Security", "٤. أمن البيانات")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
                  "نحن ننفذ تدابير فنية وتنظيمية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التغيير أو الإفصاح أو التدمير."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("5. Contact Us", "٥. اتصل بنا")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "If you have any questions about this Privacy Policy, please contact us.",
                  "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا."
                )}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const PrivacyPolicy = () => (
  <LanguageProvider>
    <SEO 
      title="Privacy Policy" 
      description="Read our Privacy Policy to understand how we collect, use, and protect your personal information."
      keywords={['Privacy Policy', 'Data Protection', 'Terms']}
    />
    <PrivacyPolicyContent />
  </LanguageProvider>
);

export default PrivacyPolicy;
