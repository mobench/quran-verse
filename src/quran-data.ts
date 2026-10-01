import { normalizeArabic } from "./arabic-utils";
import quranRaw from "../data/quran.json";

export interface SearchableVerse {
	surahId: number;
	surahName: string;
	verseNumber: number;
	text: string;
	normalizedText: string;
}

interface RawSurah {
	id: number;
	name: string;
	transliteration: string;
	type: string;
	total_verses: number;
	verses: { id: number; text: string }[];
}

let index: SearchableVerse[] | null = null;

export function buildIndex(): SearchableVerse[] {
	if (index) return index;

	const surahs = quranRaw as RawSurah[];
	const entries: SearchableVerse[] = [];

	for (const surah of surahs) {
		for (const verse of surah.verses) {
			entries.push({
				surahId: surah.id,
				surahName: surah.name,
				verseNumber: verse.id,
				text: verse.text,
				normalizedText: normalizeArabic(verse.text),
			});
		}
	}

	index = entries;
	return entries;
}

export function search(query: string, limit: number = 50): SearchableVerse[] {
	const entries = buildIndex();
	const normalizedQuery = normalizeArabic(query.trim());
	if (!normalizedQuery) return [];

	const results: SearchableVerse[] = [];
	for (const entry of entries) {
		if (entry.normalizedText.includes(normalizedQuery)) {
			results.push(entry);
			if (results.length >= limit) break;
		}
	}
	return results;
}
