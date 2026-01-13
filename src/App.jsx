import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DailyReading from './pages/DailyReading';
import './App.css';

function App() {
  // State
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem('biblia365-completed');
    return saved ? JSON.parse(saved) : {};
  });
  const [darkMode, setDarkMode] = useState(false);

  const [highlights, setHighlights] = useState(() => {
    const saved = localStorage.getItem('biblia365-highlights');
    return saved ? JSON.parse(saved) : {};
  });

  // Effects
  useEffect(() => {
    localStorage.setItem('biblia365-completed', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('biblia365-highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('sepia-mode');
    } else {
      document.body.classList.remove('sepia-mode');
    }
  }, [darkMode]);

  // Handlers
  const handleToggleTheme = () => setDarkMode(!darkMode);

  const handleToggleComplete = (slug) => {
    setCompletedDays(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const handleToggleHighlight = (verseId) => {
    setHighlights(prev => {
      const next = { ...prev };
      if (next[verseId]) {
        delete next[verseId];
      } else {
        next[verseId] = { color: 'yellow', date: new Date().toISOString() };
      }
      return next;
    });
  };



  return (
    <Router>
      <div className="app-container">
        <Header
          darkMode={darkMode}
          toggleTheme={handleToggleTheme}
          completedDays={completedDays}
        />

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/lectura/ene-01" replace />} />
            <Route
              path="/lectura/:slug"
              element={
                <DailyReading
                  completedDays={completedDays}
                  toggleComplete={handleToggleComplete}
                  highlights={highlights}
                  onToggleHighlight={handleToggleHighlight}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
