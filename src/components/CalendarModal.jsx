import React, { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import '../styles/CalendarModal.css';

const MONTHS = [
    { name: 'Enero', slug: 'ene', days: 31 },
    { name: 'Febrero', slug: 'feb', days: 28 }, // 2026 isn't leap, but simplified
    { name: 'Marzo', slug: 'mar', days: 31 },
    { name: 'Abril', slug: 'abr', days: 30 },
    { name: 'Mayo', slug: 'may', days: 31 },
    { name: 'Junio', slug: 'jun', days: 30 },
    { name: 'Julio', slug: 'jul', days: 31 },
    { name: 'Agosto', slug: 'ago', days: 31 },
    { name: 'Septiembre', slug: 'sep', days: 30 },
    { name: 'Octubre', slug: 'oct', days: 31 },
    { name: 'Noviembre', slug: 'nov', days: 30 },
    { name: 'Diciembre', slug: 'dic', days: 31 },
];

const CalendarModal = ({ isOpen, onClose, onSelectDate, completedDays }) => {
    const [view, setView] = useState('months'); // 'months' | 'days'
    const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

    if (!isOpen) return null;

    const handleMonthClick = (index) => {
        setSelectedMonthIndex(index);
        setView('days');
    };

    const handleBack = () => {
        setView('months');
        setSelectedMonthIndex(null);
    };

    const handleDayClick = (day) => {
        const month = MONTHS[selectedMonthIndex];
        const formattedDay = day.toString().padStart(2, '0');
        const slug = `${month.slug}-${formattedDay}`;
        onSelectDate(slug);

        // Reset state for next open (optional)
        setView('months');
        setSelectedMonthIndex(null);
    };

    return (
        <div className="calendar-modal-overlay" onClick={onClose}>
            <div className="calendar-modal" onClick={e => e.stopPropagation()}>
                <div className="calendar-header">
                    {view === 'days' ? (
                        <button className="back-button" onClick={handleBack} aria-label="Volver">
                            <ChevronLeft size={20} />
                        </button>
                    ) : (
                        <div style={{ width: 24 }} /> // Spacer to balance close button
                    )}

                    <h2>
                        {view === 'months' ? 'Selecciona un Mes' : MONTHS[selectedMonthIndex].name}
                    </h2>

                    <button className="close-button" onClick={onClose} aria-label="Cerrar">
                        <X size={20} />
                    </button>
                </div>

                <div className={`calendar-grid ${view === 'days' ? 'days' : ''}`}>
                    {view === 'months' ? (
                        MONTHS.map((m, idx) => (
                            <button
                                key={m.slug}
                                className="month-btn"
                                onClick={() => handleMonthClick(idx)}
                            >
                                {m.name.substring(0, 3)}
                            </button>
                        ))
                    ) : (
                        Array.from({ length: MONTHS[selectedMonthIndex].days }, (_, i) => i + 1).map(day => {
                            const currentSlug = `${MONTHS[selectedMonthIndex].slug}-${day.toString().padStart(2, '0')}`;
                            const isCompleted = completedDays && completedDays[currentSlug];
                            return (
                                <button
                                    key={day}
                                    className={`day-btn ${isCompleted ? 'completed' : ''}`}
                                    onClick={() => handleDayClick(day)}
                                >
                                    {day}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarModal;
