import bibleData from '../data/bibleData.json';

// Helper to normalize book names if necessary (e.g. removing accents for matching if needed, but we'll try to match exact keys first)
// For now, we assume the reading plan uses the exact keys found in the JSON.

export const getPassageText = (book, chapterString) => {
    const bookData = bibleData[book];
    if (!bookData) {
        console.error(`Book not found: ${book}`);
        return null;
    }

    // Handle range like "1-3"
    let startChapter, endChapter;
    if (chapterString.toString().includes('-')) {
        const parts = chapterString.split('-');
        startChapter = parseInt(parts[0]);
        endChapter = parseInt(parts[1]);
    } else {
        startChapter = parseInt(chapterString);
        endChapter = parseInt(chapterString);
    }

    let allVerses = [];

    for (let c = startChapter; c <= endChapter; c++) {
        const chapterData = bookData[c.toString()];
        if (!chapterData) {
            console.warn(`Chapter not found: ${book} ${c}`);
            continue;
        }

        const verses = Object.entries(chapterData)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([verseNum, text]) => ({
                type: 'verse',
                number: verseNum,
                content: text,
                book: book,
                chapter: c
            }));

        allVerses.push({ type: 'heading', content: `${book} ${c}` });
        allVerses.push(...verses);
        allVerses.push({ type: 'paragraph-break' }); // Add break between chapters
    }

    return allVerses;
};

export const getBookList = () => {
    return Object.keys(bibleData);
};
