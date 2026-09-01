import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import BackToTop from "./components/layout/BackToTop";
import useLenis from "./hooks/useLenis";

import Home from "./pages/Home";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";
import BubbleField from "./components/ui/BubbleField";

// Lazy-load secondary pages
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));

function Loading() {
  return null;
}

export default function App() {
  useLenis();

  return (
    <>
      <ScrollToTop />

      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/privacy-policy" element={<Privacy />} />

            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>

      <BackToTop />
      <Footer />
      <BubbleField />
    </>
  );
}