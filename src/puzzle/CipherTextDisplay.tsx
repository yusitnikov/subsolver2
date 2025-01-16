import { Card } from "@mui/material";
import { useKeysDown } from "./puzzle-util";
import { englishAlphabet } from "../constants";

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
    const lowerCased = letter.toLowerCase();
    return (
        <span
          className={
            "puzzle-letter " +
            (lockedLetters.has(lowerCased) ? "locked" : "unlocked") +
            (keysDown.has(lowerCased) ? " pressed" : "")
          }
          key={letter + index}
        >
          {letter}
        </span>
    );
  });

  return <Card>
    <div className="cipher-text-display">{children}</div>
  </Card>;
};

export default CipherTextDisplay;
