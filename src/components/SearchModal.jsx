import React, { useState, useEffect } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { searchBible } from '../utils/searchService';
import '../styles/SearchModal.css';

const SearchModal = ({ isOpen, onClose, onNavigate }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.trim().length >= 3) {
                setIsSearching(true);
                // Wrap in timeout to unblock UI if large
                setTimeout(() => {
                    const hits = searchBible(query);
                    setResults(hits);
                    setIsSearching(false);
                }, 10);
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    if (!isOpen) return null;

    const handleResultClick = (result) => {
        // We need to map Book/Chapter to a plan Slug? 
        // Or navigation to a specific chapter regardless of day?
        // The current app is Day-based. 
        // A direct navigation to "Genesis 1" without a Day context might break the "Reading Plan" flow.
        // BUT, the user wants to "Find verses". 
        // Ideally, we'd have a Generic Reader View.
        // For now, let's just alert or log, or try to find which Day includes this chapter. This is expensive.
        // Option B: Just show the verse text here.
        // Option C: Update App to handle /biblia/:book/:chapter separate from /lectura/:slug.
        // Let's implement Option C later. For now, let's try Option B+C hybrid:
        // We will pass book/chapter to onNavigate, and App needs to handle it.
        // Actually, let's just find the day.

        // Simpler approach for MVP: Just navigate to a generic reader route (which we don't have yet)
        // OR, find the reading plan day that contains this chapter.

        onNavigate(result);
        onClose();
    };

    return (
        <div className="search-modal-overlay" onClick={onClose}>
            <div className="search-modal" onClick={e => e.stopPropagation()}>
                <div className="search-header">
                    <SearchIcon size={20} className="search-icon-static" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Buscar versículo..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <button className="close-button" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="search-results">
                    {query.length > 0 && query.length < 3 && (
                        <div className="search-message">Escribe al menos 3 caracteres...</div>
                    )}

                    {isSearching && <div className="search-message">Buscando...</div>}

                    {!isSearching && results.length === 0 && query.length >= 3 && (
                        <div className="search-message">No se encontraron resultados.</div>
                    )}

                    {results.map((r, i) => (
                        <div key={i} className="search-result-item" onClick={() => handleResultClick(r)}>
                            <div className="result-ref">{r.book} {r.chapter}:{r.verse}</div>
                            <div className="result-text">{r.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
