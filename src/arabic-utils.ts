const TASHKEEL_RE = /[ؐ-ًؚ-ٕٖ-ٰٟۖ-ۭ̀-ͯ]/g;
const ALEF_RE = /[آأإاٱ]/g;
const YA_RE = /ى/g;
const TA_MARBUTA_RE = /ة/g;
const TATWEEL_RE = /ـ/g;

export function removeTashkeel(text: string): string {
	return text.replace(TASHKEEL_RE, "");
}

export function normalizeArabic(text: string): string {
	return removeTashkeel(text)
		.replace(ALEF_RE, "ا")
		.replace(YA_RE, "ي")
		.replace(TA_MARBUTA_RE, "ه")
		.replace(TATWEEL_RE, "");
}
