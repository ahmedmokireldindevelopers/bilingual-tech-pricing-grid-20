import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsContent = () => {
  const { t, isRtl } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-tech-dark mb-8 text-center">
            {t("Terms of Service", "شروط الخدمة")}
          </h1>
          
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("1. Acceptance of Terms", "١. قبول الشروط")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
                  "من خلال الوصول إلى هذا الموقع واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("2. Use License", "٢. ترخيص الاستخدام")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.",
                  "يتم منح الإذن لتنزيل نسخة واحدة مؤقتًا من المواد (المعلومات أو البرامج) الموجودة على موقعنا الإلكتروني للمشاهدة الشخصية غير التجارية العابرة فقط."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("3. Disclaimer", "٣. إخلاء المسؤولية")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
                  "يتم توفير المواد الموجودة على موقعنا 'كما هي'. نحن لا نقدم أي ضمانات، صريحة أو ضمنية، ونخلي مسؤوليتنا بموجب هذا وننفي جميع الضمانات الأخرى بما في ذلك، على سبيل المثال لا الحصر، الضمانات الضمنية أو شروط القابلية للتسويق، أو الملاءمة لغرض معين، أو عدم التعدي على الملكية الفكرية أو أي انتهاك آخر للحقوق."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("4. Limitations", "٤. القيود")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.",
                  "لا نتحمل نحن أو موردونا بأي حال من الأحوال المسؤولية عن أي أضرار (بما في ذلك، على سبيل المثال لا الحصر، الأضرار الناجمة عن فقدان البيانات أو الربح، أو بسبب انقطاع الأعمال) الناشئة عن استخدام أو عدم القدرة على استخدام المواد الموجودة على موقعنا."
                )}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-tech-blue">
                {t("5. Governing Law", "٥. القانون الحاكم")}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t(
                  "These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.",
                  "تخضع هذه الشروط والأحكام وتفسر وفقًا للقوانين، وأنت تخضع بشكل لا رجعة فيه للاختصاص القضائي الحصري للمحاكم في ذلك الموقع."
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

const Terms = () => (
  <LanguageProvider>
    <SEO 
      title="Terms of Service" 
      description="Read our Terms of Service to understand the rules and regulations for using our website and services."
      keywords={['Terms of Service', 'Conditions', 'Legal']}
    />
    <TermsContent />
  </LanguageProvider>
);

export default Terms;
