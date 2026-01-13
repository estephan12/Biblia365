import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import '../styles/Controls.css';

const Controls = ({
    isCompleted,
    onToggleComplete,
    onPrevDay,
    onNextDay,
    currentDayLabel,
    disablePrev,
    disableNext
}) => {
    return (
        <div className="controls-container">
            <div className="nav-controls">
                <button
                    onClick={onPrevDay}
                    className="nav-button"
                    aria-label="Previous Day"
                    disabled={disablePrev}
                    style={{ opacity: disablePrev ? 0.5 : 1, cursor: disablePrev ? 'default' : 'pointer' }}
                >
                    <ChevronLeft size={24} />
                    <span className="nav-label">Prev</span>
                </button>

                <div className="date-display">
                    {currentDayLabel}
                </div>

                <button
                    onClick={onNextDay}
                    className="nav-button"
                    aria-label="Next Day"
                    disabled={disableNext}
                    style={{ opacity: disableNext ? 0.5 : 1, cursor: disableNext ? 'default' : 'pointer' }}
                >
                    <span className="nav-label">Next</span>
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="action-area">
                <button
                    className={`mark-read-button ${isCompleted ? 'completed' : ''}`}
                    onClick={onToggleComplete}
                >
                    {isCompleted ? (
                        <>
                            <Check size={20} />
                            <span>Completed</span>
                        </>
                    ) : (
                        <span>Mark as Read</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Controls;
