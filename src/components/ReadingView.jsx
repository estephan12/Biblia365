import React from 'react';
import '../styles/ReadingView.css';

const ReadingView = ({ readingData, highlights, onToggleHighlight }) => {
    if (!readingData) {
        return <div className="reading-view-placeholder">Select a day to begin reading.</div>;
    }

    return (
        <article className="reading-view">
            <div className="reading-content">
                {readingData.map((block, index) => {
                    switch (block.type) {
                        case 'heading':
                            return <h3 key={index} className="passage-heading">{block.content}</h3>;
                        case 'verse':
                            const verseId = `${block.book} ${block.chapter}:${block.number}`;
                            const isHighlighted = highlights && highlights[verseId];

                            return (
                                <span
                                    key={index}
                                    className={`verse ${isHighlighted ? 'highlighted' : ''}`}
                                    onClick={() => onToggleHighlight && onToggleHighlight(verseId)}
                                    title="Click to highlight"
                                >
                                    <sup className="verse-number">{block.number}</sup>
                                    {block.content}{' '}
                                </span>
                            );
                        case 'paragraph-break':
                            return <div key={index} className="paragraph-break" />;
                        default:
                            return null;
                    }
                })}
            </div>
        </article>
    );
};

export default ReadingView;
