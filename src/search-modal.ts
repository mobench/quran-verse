import { App, Editor, SuggestModal } from "obsidian";
import { search, SearchableVerse } from "./quran-data";
import type { QuranVerseSettings } from "./settings";

export class QuranSearchModal extends SuggestModal<SearchableVerse> {
	private editor: Editor;
	private settings: QuranVerseSettings;
	private initialQuery: string;
	private selectionFrom: { line: number; ch: number };
	private selectionTo: { line: number; ch: number };

	constructor(app: App, editor: Editor, settings: QuranVerseSettings, initialQuery: string) {
		super(app);
		this.editor = editor;
		this.settings = settings;
		this.initialQuery = initialQuery;

		this.selectionFrom = editor.getCursor("from");
		this.selectionTo = editor.getCursor("to");

		this.setPlaceholder("ابحث في القرآن...");
	}

	onOpen(): void {
		super.onOpen();
		this.inputEl.value = this.initialQuery;
		this.inputEl.dir = "rtl";
		// @ts-ignore - updateSuggestions is not in the public API
		this.updateSuggestions();
	}

	getSuggestions(query: string): SearchableVerse[] {
		return search(query, 50);
	}

	renderSuggestion(verse: SearchableVerse, el: HTMLElement): void {
		const container = el.createDiv({ cls: "quran-verse-suggestion" });

		const textEl = container.createDiv({ cls: "quran-verse-text" });
		textEl.setText(verse.text);

		const refEl = container.createDiv({ cls: "quran-verse-ref" });
		refEl.setText(`${verse.surahName} : ${verse.verseNumber}`);
	}

	onChooseSuggestion(verse: SearchableVerse): void {
		const wrapped = `${this.settings.openBracket}${verse.text}${this.settings.closeBracket}`;
		this.editor.replaceRange(wrapped, this.selectionFrom, this.selectionTo);
	}
}
