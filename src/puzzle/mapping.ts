import { englishAlphabet } from "../constants";

interface MappingOptions {
  hideSpaces?: boolean;
  showPunctuation?: boolean;
  keepCapitals?: boolean;
  alphabet?: string;
}

const _normalizeText = (
  inText: string,
  {
    hideSpaces = false,
    showPunctuation = false,
    keepCapitals = false,
    alphabet = englishAlphabet,
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
    const rejectionRegex = new RegExp(`[^${alphabet}${hideSpaces ? "" : " "}]`, "ig");
    text = text.replace(rejectionRegex, "");
  }
  return text;
};

export const applyMapping = (
  text: string,
  mapping: string,
  mappingOptions: MappingOptions = {}
) => {
  const {alphabet = englishAlphabet} = mappingOptions;

  return _normalizeText(text, mappingOptions)
    .split("")
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
