import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import jp from "./locales/jp.json";

export const languages = {
  en: "English",
  es: "Español",
  fr: "Français",
  jp: "日本語"
};

export const defaultLanguage = "en";

export const ui = {
    en,
    es,
    fr,
    jp
}as const;

export function useTranslation(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLanguage]) {
        return ui[lang][key] || ui[defaultLanguage][key];
    };
}