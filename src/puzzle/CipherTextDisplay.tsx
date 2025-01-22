import { Card } from "@mui/material";
import { useKeysDown } from "./puzzle-util";
import { english } from "../constants";
import { finalToRegular } from "./mapping";
import { Language } from "../Language";

interface CipherTextDisplayProps {
  text: string;
  lockedLetters?: Set<string>;
  language?: Language;
}

const CipherTextDisplay = ({
  text,
  lockedLetters = new Set(),
  language = english,
}: CipherTextDisplayProps) => {
  const keysDown = useKeysDown(language);

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
    <div className="cipher-text-display" dir={language.rtl ? "rtl" : "ltr"}>{children}</div>
  </Card>;
};

export default CipherTextDisplay;
