import { useState } from "react";
import { useKeysDown } from "./puzzle-util";
import { Language } from "../Language";

const key =
  (keysDown: Set<string>) =>
  ({ children }: { children: string }) =>
    (
      <span
        className={"key-indicator" + (keysDown.has(children) ? " pressed" : "")}
      >
        {children}
      </span>
    );

type LockState = "active" | "keyspressed" | "released";

const ANIMATION_DURATION = 1500;

interface PuzzleLockProps {
  language: Language;
  unlock: () => void;
}

const PuzzleLock = ({ language, unlock }: PuzzleLockProps) => {
  const key1 = language.layout[1][3];
  const key2 = language.layout[1][6];

  const [lockState, setLockState] = useState<LockState>("active");
  const keysDown = useKeysDown(language, (newKeys) => {
    if (newKeys.has(key1) && newKeys.has(key2) && lockState === "active") {
      setLockState("keyspressed");
    } else if (newKeys.size === 0 && lockState === "keyspressed") {
      setLockState("released");
      setTimeout(() => unlock(), ANIMATION_DURATION);
    }
  });
  const Key = key(keysDown);
  console.log(keysDown);

  const firstKey = lockState === "released" ? key2 : key1;
  const secondKey = lockState === "released" ? key1 : key2;
  return (
    <div className={"puzzle-overlay puzzle-lock " + lockState}>
      <p>To begin, simultaneously press and release the following keys:</p>
      <div>
        <Key key={firstKey}>{firstKey}</Key> ↔{" "}
        <Key key={secondKey}>{secondKey}</Key>
      </div>
    </div>
  );
};

export default PuzzleLock;
