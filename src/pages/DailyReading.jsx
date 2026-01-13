import React, { useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import ReadingView from '../components/ReadingView';
import Controls from '../components/Controls';
import { getPlanBySlug, READING_PLAN } from '../data/readingPlan';
import { getPassageText } from '../utils/bibleService';

const DailyReading = ({ completedDays, toggleComplete, highlights, onToggleHighlight }) => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find the plan for the current slug
    const plan = useMemo(() => getPlanBySlug(slug), [slug]);

    // Derived data: Previous and Next slugs
    const { prevSlug, nextSlug } = useMemo(() => {
        if (!plan) return { prevSlug: null, nextSlug: null };
        const currentIndex = READING_PLAN.findIndex(p => p.slug === slug);
        const prev = currentIndex > 0 ? READING_PLAN[currentIndex - 1].slug : null;
        const next = currentIndex < READING_PLAN.length - 1 ? READING_PLAN[currentIndex + 1].slug : null;
        return { prevSlug: prev, nextSlug: next };
    }, [plan, slug]);

    // Fetch verse data
    const readingData = useMemo(() => {
        if (!plan) return null;
        let data = [];
        plan.passages.forEach(passage => {
            const verses = getPassageText(passage.book, passage.chapters);
            if (verses) {
                data = [...data, ...verses];
            }
        });
        return data;
    }, [plan]);

    if (!plan) {
        // Fallback or 404
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Día no encontrado. <button onClick={() => navigate('/')}>Volver al inicio</button></div>;
    }

    const handlePrev = () => {
        if (prevSlug) navigate(`/lectura/${prevSlug}`);
    };

    const handleNext = () => {
        if (nextSlug) navigate(`/lectura/${nextSlug}`);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', margin: '1rem 0', fontFamily: 'var(--font-heading)', color: 'var(--color-text-secondary)' }}>
                {plan.date} de {plan.month}
            </div>

            <ReadingView
                readingData={readingData}
                highlights={highlights}
                onToggleHighlight={onToggleHighlight}
            />

            <Controls
                isCompleted={!!completedDays[plan.slug]}
                onToggleComplete={() => toggleComplete(plan.slug)}
                onPrevDay={handlePrev}
                onNextDay={handleNext}
                currentDayLabel={`${plan.month} ${plan.date}`}
                disablePrev={!prevSlug}
                disableNext={!nextSlug}
            />
        </div>
    );
};

export default DailyReading;
