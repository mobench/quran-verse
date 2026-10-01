import { Plugin } from "obsidian";
import { buildIndex } from "./quran-data";
import { QuranSearchModal } from "./search-modal";
import { QuranVerseSettings, DEFAULT_SETTINGS, QuranVerseSettingTab } from "./settings";

export default class QuranVersePlugin extends Plugin {
	settings: QuranVerseSettings = DEFAULT_SETTINGS;

	async onload(): Promise<void> {
		await this.loadSettings();

		buildIndex();

		this.addCommand({
			id: "search-quran",
			name: "Search Quran verse",
			editorCallback: (editor) => {
				const selection = editor.getSelection();
				new QuranSearchModal(this.app, editor, this.settings, selection).open();
			},
		});

		this.addSettingTab(new QuranVerseSettingTab(this.app, this));
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
