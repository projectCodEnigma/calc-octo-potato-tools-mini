import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Calculators from './pages/Calculators';
import CategoryPage from './pages/CategoryPage';
import CalculatorPage from './pages/CalculatorPage';
import About from './pages/About';
import SubmitTool from './pages/SubmitTool';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/categories/:category" element={<CategoryPage />} />
            <Route path="/calculator/:calculatorId" element={<CalculatorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/submit-tool" element={<SubmitTool />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;