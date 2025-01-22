import { Language } from "./Language";

export const english: Language = {
  code: "en",
  name: "English",
  alphabet: "abcdefghijklmnopqrstuvwxyz",
  layout: ["qwertyuiop", "asdfghjkl", "zxcvbnm"],
};
export const russian: Language = {
  code: "ru",
  name: "Русский",
  alphabet: "йцукенгшщзхъфывапролджэячсмитьбю",
  layout: ["йцукенгшщзхъ", "фывапролджэ", "ячсмитьбю"],
};
export const hebrew: Language = {
  code: "he",
  name: "עברית",
  alphabet: "קראטופשדגכעיחלזסבהנמצת",
  layout: ["קראטוןםפ", "שדגכעיחלךף", "זסבהנמצתץ"],
  rtl: true,
};
export const languages = [english, russian, hebrew];

export const finalLettersMap: Record<string, string> = {
  "נ": "ן",
  "מ": "ם",
  "כ": "ך",
  "פ": "ף",
  "צ": "ץ",
};
export const finalLettersReverseMap = Object.fromEntries(Object.entries(finalLettersMap).map(
  ([key, value]) => [value, key]
));
