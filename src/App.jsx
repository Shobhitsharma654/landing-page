import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const LandingPage    = lazy(() => import("./components/LandingPage"));
const SolutionsPage  = lazy(() => import("./components/SolutionsPage"));
const EcommercePage  = lazy(() => import("./components/EcommercePage"));
const SmbPage        = lazy(() => import("./components/SmbPage"));
const ServicePage    = lazy(() => import("./components/ServicePage"));
const RetailPage     = lazy(() => import("./components/RetailPage"));
const PricingPage    = lazy(() => import("./components/PricingPage"));
const ResourcesPage  = lazy(() => import("./components/ResourcesPage"));
const AboutPage      = lazy(() => import("./components/AboutPage"));
const BusinessPage   = lazy(() => import("./components/BusinessPage"));
const ContactPage    = lazy(() => import("./components/ContactPage"));
const FaqPage        = lazy(() => import("./components/FaqPage"));
const DocsPage       = lazy(() => import("./components/DocsPage"));
const TermsPage      = lazy(() => import("./components/TermsPage"));
const PrivacyPage    = lazy(() => import("./components/PrivacyPage"));
const CookiesPage    = lazy(() => import("./components/CookiesPage"));
const LicensePage    = lazy(() => import("./components/LicensePage"));
const RefundPage     = lazy(() => import("./components/RefundPage"));
const CareersPage         = lazy(() => import("./components/CareersPage"));
const BlogPage            = lazy(() => import("./components/BlogPage"));
const HelpCenterPage      = lazy(() => import("./components/HelpCenterPage"));
const BusinessLibraryPage = lazy(() => import("./components/BusinessLibraryPage"));
const DpaPage             = lazy(() => import("./components/DpaPage"));
const CrmPage             = lazy(() => import("./components/CrmPage"));
const WaPage              = lazy(() => import("./components/WhatsAppPage"));
const MarketingPage       = lazy(() => import("./components/MarketingPage"));
const AiPage              = lazy(() => import("./components/AiAutomationPage"));
const DigitalStorePage    = lazy(() => import("./components/DigitalStorePage"));

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const Loader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#fff" }}>
    <div style={{ width: 40, height: 40, border: "4px solid #e5e7eb", borderTop: "4px solid #16A34A", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ScrollToTop />
      <Routes>
        <Route path="/"                                 element={<LandingPage />} />
        <Route path="/solutions"                         element={<SolutionsPage />} />
        <Route path="/solutions/e-commerce"              element={<EcommercePage />} />
        <Route path="/solutions/ecommerce"               element={<EcommercePage />} />
        <Route path="/ecommerce"                         element={<EcommercePage />} />
        <Route path="/e-commerce"                         element={<EcommercePage />} />
        <Route path="/solutions/small-medium-businesses" element={<SmbPage />} />
        <Route path="/solutions/smb"                     element={<SmbPage />} />
        <Route path="/small-medium-businesses"           element={<SmbPage />} />
        <Route path="/solutions/service-businesses"      element={<ServicePage />} />
        <Route path="/solutions/service"                 element={<ServicePage />} />
        <Route path="/service-businesses"                element={<ServicePage />} />
        <Route path="/solutions/retail-local-businesses" element={<RetailPage />} />
        <Route path="/solutions/retail"                 element={<RetailPage />} />
        <Route path="/retail-local-businesses"           element={<RetailPage />} />
        <Route path="/pricing"                          element={<PricingPage />} />
        <Route path="/resources"                         element={<BusinessLibraryPage />} />
        <Route path="/resources/business-library"        element={<BusinessLibraryPage />} />
        <Route path="/business-library"                  element={<BusinessLibraryPage />} />
        <Route path="/blog"                      element={<BlogPage />} />
        <Route path="/resources/blog"            element={<BlogPage />} />
        <Route path="/help-center"               element={<HelpCenterPage />} />
        <Route path="/resources/help-center"     element={<HelpCenterPage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/business"  element={<BusinessPage />} />
        <Route path="/contact"                   element={<ContactPage />} />
        <Route path="/contact-support"           element={<ContactPage />} />
        <Route path="/resources/contact"         element={<ContactPage />} />
        <Route path="/resources/contact-support" element={<ContactPage />} />
        <Route path="/faq"                       element={<FaqPage />} />
        <Route path="/faqs"                      element={<FaqPage />} />
        <Route path="/resources/faq"             element={<FaqPage />} />
        <Route path="/resources/faqs"            element={<FaqPage />} />
        <Route path="/docs"                      element={<DocsPage />} />
        <Route path="/resources/docs"            element={<DocsPage />} />
        <Route path="/resources/getting-started" element={<DocsPage />} />
        <Route path="/resources/api-docs"        element={<DocsPage />} />
        <Route path="/terms"     element={<TermsPage />} />
        <Route path="/privacy"   element={<PrivacyPage />} />
        <Route path="/cookies"      element={<CookiesPage />} />
        <Route path="/license"      element={<LicensePage />} />
        <Route path="/refundpolicy" element={<RefundPage />} />
        <Route path="/careers"      element={<CareersPage />} />
        <Route path="/dpa"          element={<DpaPage />} />
        <Route path="/crm"                element={<CrmPage />} />
        <Route path="/whatsapp-business"   element={<WaPage />} />
        <Route path="/marketing-automation" element={<MarketingPage />} />
        <Route path="/ai-automation"         element={<AiPage />} />
        <Route path="/digital-store"          element={<DigitalStorePage />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
