import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Calendar, Search } from 'lucide-react';
import CalendarModal from './CalendarModal';
import SearchModal from './SearchModal';
import { findDayByBookChapter } from '../data/readingPlan';
import '../styles/Header.css';

const Header = ({ darkMode, toggleTheme, completedDays }) => {
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const navigate = useNavigate();

    const handleDateSelect = (slug) => {
        setCalendarOpen(false);
        navigate(`/lectura/${slug}`);
    };

    const handleSearchResult = (result) => {
        // Find which day contains this book/chapter
        const dayPlan = findDayByBookChapter(result.book, result.chapter);
        if (dayPlan) {
            setSearchOpen(false);
            navigate(`/lectura/${dayPlan.slug}`);
        } else {
            alert("Este capítulo no se encontró en el plan de lectura (o es un error de búsqueda).");
        }
    };

    return (
        <header className="app-header">
            <div className="header-content">
                <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <h1>Biblia365</h1>
                </div>

                <div className="header-controls">
                    <button
                        className="icon-button"
                        aria-label="Search"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search size={20} color="var(--color-text-secondary)" />
                    </button>

                    <button
                        className="icon-button"
                        aria-label="Select Date"
                        onClick={() => setCalendarOpen(true)}
                    >
                        <Calendar size={20} color="var(--color-text-secondary)" />
                    </button>

                    <button
                        className="icon-button"
                        onClick={toggleTheme}
                        aria-label={darkMode ? "Switch to Light Mode" : "Switch to Sepia/Dark Mode"}
                    >
                        {darkMode ? (
                            <Sun size={20} color="var(--color-text-secondary)" />
                        ) : (
                            <Moon size={20} color="var(--color-text-secondary)" />
                        )}
                    </button>
                </div>
            </div>

            <CalendarModal
                isOpen={isCalendarOpen}
                onClose={() => setCalendarOpen(false)}
                onSelectDate={handleDateSelect}
                completedDays={completedDays}
            />

            <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setSearchOpen(false)}
                onNavigate={handleSearchResult}
            />
        </header>
    );
};

export default Header;
