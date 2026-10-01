const TASHKEEL_RE = /[ؗ-ًؚ-ْٰۖ-ۭؐ-ٖؕ-ٟݐ-ݿ࣓-ࣿ̀-ͯ]/g;
const ALEF_RE = /[أإآٱا]/g;
const YA_RE = /ى/g;
const TA_MARBUTA_RE = /ة/g;
const TATWEEL_RE = /ـ/g;
const SMALL_SIGNS_RE = /[ې-ەۡ-ۤۧ-ۨ۫-ٰۭ]/g;

export function removeTashkeel(text: string): string {
	return text.replace(TASHKEEL_RE, "");
}

export function normalizeArabic(text: string): string {
	return removeTashkeel(text)
		.replace(ALEF_RE, "ا")
		.replace(YA_RE, "ي")
		.replace(TA_MARBUTA_RE, "ه")
		.replace(TATWEEL_RE, "")
		.replace(SMALL_SIGNS_RE, "");
}
