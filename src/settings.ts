import { App, PluginSettingTab, Setting } from "obsidian";
import type QuranVersePlugin from "./main";

export interface QuranVerseSettings {
	openBracket: string;
	closeBracket: string;
}

export const DEFAULT_SETTINGS: QuranVerseSettings = {
	openBracket: "﴿",
	closeBracket: "﴾",
};

export class QuranVerseSettingTab extends PluginSettingTab {
	plugin: QuranVersePlugin;

	constructor(app: App, plugin: QuranVersePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Opening bracket")
			.setDesc("Character(s) placed before the verse text")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.openBracket)
					.onChange(async (value) => {
						this.plugin.settings.openBracket = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Closing bracket")
			.setDesc("Character(s) placed after the verse text")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.closeBracket)
					.onChange(async (value) => {
						this.plugin.settings.closeBracket = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
