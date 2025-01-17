export const englishAlphabet = "abcdefghijklmnopqrstuvwxyz";
export const russianAlphabet = "йцукенгшщзхъфывапролджэячсмитьбю";
export const hebrewAlphabet = "קראטופשדגכעיחלזסבהנמצת";

export const alphabets = [
  {alphabet: englishAlphabet, name: "English"},
  {alphabet: russianAlphabet, name: "Русский"},
  {alphabet: hebrewAlphabet, name: "עברית"},
];

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
