import bibleData from '../data/bibleData.json';

export const searchBible = (query) => {
    if (!query || query.length < 3) return [];

    const lowerQuery = query.toLowerCase();
    const results = [];
    let count = 0;
    const MAX_RESULTS = 50;

    // Structure: Book -> Chapter -> Verse
    const books = Object.keys(bibleData);

    for (const book of books) {
        const chapters = bibleData[book];
        for (const [chapterNum, verses] of Object.entries(chapters)) {
            for (const [verseNum, text] of Object.entries(verses)) {
                if (text.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        book,
                        chapter: chapterNum,
                        verse: verseNum,
                        text: text
                    });
                    count++;
                    if (count >= MAX_RESULTS) return results;
                }
            }
        }
    }

    return results;
};
