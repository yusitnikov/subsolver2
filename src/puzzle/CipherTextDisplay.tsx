import { Card } from "@mui/material";
import { useKeysDown } from "./puzzle-util";
import { englishAlphabet, hebrewAlphabet } from "../constants";
import { finalToRegular } from "./mapping";

interface CipherTextDisplayProps {
  text: string;
  lockedLetters?: Set<string>;
  alphabet?: string;
}

const CipherTextDisplay = ({
  text,
  lockedLetters = new Set(),
  alphabet = englishAlphabet,
}: CipherTextDisplayProps) => {
  const keysDown = useKeysDown(alphabet);

  const children = text.split("").map((letter, index) => {
    const normalized = finalToRegular(letter.toLowerCase());
    return (
        <span
          className={
            "puzzle-letter " +
            (lockedLetters.has(normalized) ? "locked" : "unlocked") +
            (keysDown.has(normalized) ? " pressed" : "")
          }
          key={letter + index}
        >
          {letter}
        </span>
    );
  });

  return <Card>
    <div className="cipher-text-display" dir={alphabet === hebrewAlphabet ? "rtl" : "ltr"}>{children}</div>
  </Card>;
};

export default CipherTextDisplay;
