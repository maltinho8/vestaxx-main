import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NavigationBar from '../Bar/NavigationBar/index.js';
import HeatingComp from '../Pages/HeatingComp/HeatingComp.js';
import LandingPage from '../Pages/LandingPage/LandingPage';
import Modellierung from '../Pages/Modellierung/Modellierung.js';
import DXF from '../Pages/DXF/DXF.js';
import HeatingCompBerlin from '../Pages/HeatingComp/bundesland1/HeatingCompBerlin';
import HeatingCompHessen from '../Pages/HeatingComp/bundesland1/HeatingCompHessen';
import HeatingCompBayern from '../Pages/HeatingComp/bundesland1/HeatingCompBayern';
import Footer from '../Footer/index.js';
import ScrollToTop from '../ScrollToTop/index';
import HeatingCompBrandenburg from '../Pages/HeatingComp/bundesland1/HeatingCompBrandenburg.js';
import HeatingCompSachsen from '../Pages/HeatingComp/bundesland1/HeatingCompSachsen.js';
import HeatingCompSachsenAnhalt from '../Pages/HeatingComp/bundesland1/HeatingCompSachsen_Anhalt.js';
import HeatingCompSaarland from '../Pages/HeatingComp/bundesland1/HeatingCompSaarland.js';
import HeatingCompThueringen from '../Pages/HeatingComp/bundesland1/HeatingCompThueringen.js';
import HeatingCompNordrhein from '../Pages/HeatingComp/bundesland1/HeatingCompNordrhein.js';
import HeatingCompRheinland from '../Pages/HeatingComp/bundesland1/HeatingCompRheinland.js';
import HeatingCompMecklenburg from '../Pages/HeatingComp/bundesland1/HeatingCompMecklenburg.js';
import HeatingCompHamburg from '../Pages/HeatingComp/bundesland1/HeatingCompHamburg.js';
import HeatingCompBremen from '../Pages/HeatingComp/bundesland1/HeatingCompBremen.js';
import HeatingCompBaden from '../Pages/HeatingComp/bundesland1/HeatingCompBaden.js';
import HeatingCompNiedersachsen from '../Pages/HeatingComp/bundesland1/HeatingCompNiedersachsen.js';
import HeatingCompSchleswig from '../Pages/HeatingComp/bundesland1/HeatingCompSchleswig.js';

const Routing = () => {
  return (
    <Router>
      <ScrollToTop />
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Navigate replace to="/LandingPage" />} />
        <Route path="/Heizvergleich" element={<HeatingComp />} />
        <Route path="/HeizvergleichBerlin" element={<HeatingCompBerlin />} />
        <Route path="/HeizvergleichHessen" element={<HeatingCompHessen />} />
        <Route path="/HeizvergleichBayern" element={<HeatingCompBayern />} />
        <Route
          path="/HeizvergleichBrandenburg"
          element={<HeatingCompBrandenburg />}
        />
        <Route path="/HeizvergleichSachsen" element={<HeatingCompSachsen />} />
        <Route
          path="/HeizvergleichSachsenAnhalt"
          element={<HeatingCompSachsenAnhalt />}
        />
        <Route
          path="/HeizvergleichSaarland"
          element={<HeatingCompSaarland />}
        />
        <Route
          path="/HeizvergleichThueringen"
          element={<HeatingCompThueringen />}
        />
        <Route
          path="/HeizvergleichNordrhein"
          element={<HeatingCompNordrhein />}
        />
        <Route
          path="/HeizvergleichRheinland"
          element={<HeatingCompRheinland />}
        />
        <Route
          path="/HeizvergleichMecklenburg"
          element={<HeatingCompMecklenburg />}
        />
        <Route path="/HeizvergleichHamburg" element={<HeatingCompHamburg />} />
        <Route path="/HeizvergleichBremen" element={<HeatingCompBremen />} />
        <Route path="/HeizvergleichBaden" element={<HeatingCompBaden />} />
        <Route
          path="/HeizvergleichNiedersachsen"
          element={<HeatingCompNiedersachsen />}
        />
        <Route
          path="/HeizvergleichSchleswig"
          element={<HeatingCompSchleswig />}
        />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Modellierung" element={<Modellierung />} />
        <Route path="/DXF" element={<DXF />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routing;
