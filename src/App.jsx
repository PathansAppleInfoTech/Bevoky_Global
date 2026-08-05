import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import ScrollToTop from './components/layout/ScrollToTop';
import useLenis from './hooks/useLenis';

// Home stays eager (it's the primary landing experience);
// secondary pages are code-split and fetched on demand.
import Home from './pages/Home';
import BubbleField from './components/ui/BubbleField';
import BackToTop from './components/layout/BackToTop';
import Imprint from './pages/Imprint';
import Privacy from './pages/Privacy';

const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Contact = lazy(() => import('./pages/Contact'));

export default function App() {
  const location = useLocation();
  useLenis();

  return (
    <>
      <BubbleField />
      <ScrollToTop />
      <Header />
      <main>
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                }
              />
              <Route
                path="/products"
                element={
                  <PageTransition>
                    <Products />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                }
              />
              <Route
                path="/imprint"
                element={
                  <PageTransition>
                    <Imprint />
                  </PageTransition>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <PageTransition>
                    <Privacy />
                  </PageTransition>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
            </Routes>
      </main>
      <BackToTop />
      <Footer />
    </>
  );
}