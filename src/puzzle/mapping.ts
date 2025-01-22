import { english, finalLettersMap, finalLettersReverseMap } from "../constants";
import { Language } from "../Language";

interface MappingOptions {
  hideSpaces?: boolean;
  showPunctuation?: boolean;
  keepCapitals?: boolean;
  language?: Language;
}

export const regularToFinal = (letter: string) => finalLettersMap[letter] ?? letter;
export const finalToRegular = (letter: string) => finalLettersReverseMap[letter] ?? letter;

const _normalizeText = (
  inText: string,
  {
    hideSpaces = false,
    showPunctuation = false,
    keepCapitals = false,
    language = english,
  }: MappingOptions
) => {
  let text = inText;
  if (!keepCapitals) {
    text = text.toLowerCase();
  }
  text = text.replace(/[\s]+/g, " ");
  if (!showPunctuation) {
    text = text.replace(/[-…—]/g, " ");
  }
  if (!showPunctuation) {
    const rejectionRegex = new RegExp(`[^${language.alphabet}${hideSpaces ? "" : " "}]`, "ig");
    text = text.replace(rejectionRegex, "");
  }
  return text;
};

export const applyMapping = (
  text: string,
  mapping: string,
  mappingOptions: MappingOptions = {}
) => {
  const {language = english} = mappingOptions;
  const {alphabet} = language;

  return _normalizeText(text, mappingOptions)
    .split("")
    .map(finalToRegular)
    .map((letter) => {
      // For both capital and lowercase letters
      const fullMapping = mapping + mapping.toUpperCase();
      const fullAlphabet = alphabet + alphabet.toUpperCase();
      const idx = fullAlphabet.indexOf(letter);
      if (idx === -1) {
        return letter;
      } else {
        return fullMapping[fullAlphabet.indexOf(letter)];
      }
    })
    .map((letter, index, array) => alphabet.includes(array[index + 1]) ? letter : regularToFinal(letter))
    .join("");
};

export const swapLetters = (mapping: string, a: string, b: string) => {
  const newMapping = mapping.split("");
  const aPos = newMapping.indexOf(a);
  const bPos = newMapping.indexOf(b);
  const temp = newMapping[aPos];
  newMapping[aPos] = newMapping[bPos];
  newMapping[bPos] = temp;
  return newMapping.join("");
};
