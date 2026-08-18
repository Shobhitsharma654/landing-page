import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const LandingPage    = lazy(() => import("./components/LandingPage"));
const SolutionsPage  = lazy(() => import("./components/SolutionsPage"));
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
const CareersPage    = lazy(() => import("./components/CareersPage"));
const DpaPage        = lazy(() => import("./components/DpaPage"));
const CrmPage        = lazy(() => import("./components/CrmPage"));
const WaPage         = lazy(() => import("./components/WhatsAppPage"));
const MarketingPage  = lazy(() => import("./components/MarketingPage"));
const AiPage         = lazy(() => import("./components/AiAutomationPage"));
const DigitalStorePage = lazy(() => import("./components/DigitalStorePage"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
        <Route path="/"          element={<LandingPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/pricing"   element={<PricingPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/business"  element={<BusinessPage />} />
        <Route path="/contact"   element={<ContactPage />} />
        <Route path="/faq"       element={<FaqPage />} />
        <Route path="/docs"      element={<DocsPage />} />
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
