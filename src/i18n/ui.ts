export const languages = {
  en: "English",
  es: "Español",
  fr: "Français",
  jp: "日本語"
};

export const defaultLanguage = "en";

export const ui = {
    en: {
        'nav.about': "ABOUT US",
        'nav.services': "SERVICES",
        'nav.contact': "CONTACT US",
        'hero.mainTitle': "Building high-performance software and digital infrastructure.",
        'btn.diveIntoIt': "Dive into it",
        'btn.getStarted': "Get Started",
        'btn.pricing': "Pricing",
        'btn.more': "More..."
    },
    es: {
        'nav.about': "SOBRE NOSOTROS",
        'nav.services': "SERVICIOS",
        'nav.contact': "CONTACTO",
        'hero.mainTitle': "Construyendo software de alto rendimiento e infraestructura digital.",
        'btn.diveIntoIt': "Sumérgete en ello",
        'btn.getStarted': "Comenzar",
        'btn.pricing': "Precios",
        'btn.more': "Más..."
    },
    fr: {
        'nav.about': "À PROPOS DE NOUS",
        'nav.services': "SERVICES",
        'nav.contact': "CONTACTEZ-NOUS",
        'hero.mainTitle': "Construisant un logiciel à haut débit et une infrastructure digitale.",
        'btn.diveIntoIt': "Plongez dedans",
        'btn.getStarted': "Commencer",
        'btn.pricing': "Tarification",
        'btn.more': "Plus..."
    },
    jp: {
        'nav.about': "私たちについて",
        'nav.services': "サービス",
        'nav.contact': "お問い合わせ",
        'hero.mainTitle': "高性能なソフトウェアとデジタルインフラを構築する。",
        'btn.diveIntoIt': "詳しく見る",
        'btn.getStarted': "始めよう",
        'btn.pricing': "料金",
        'btn.more': "もっと..."
    }
}as const;

export function useTranslation(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLanguage]) {
        return ui[lang][key] || ui[defaultLanguage][key];
    };
}