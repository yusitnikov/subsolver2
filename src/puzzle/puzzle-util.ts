import { useState } from "react";
import keysPressed from "../keyspressed";
import useEventListener from "@use-it/event-listener";

const getLettersPressed = (alphabet: string) =>
  new Set(
    Array.from(keysPressed.getKeysPressed())
      .map((key) => key === " " ? "space" : key.toLowerCase())
      .filter((key) => alphabet.includes(key) || key === "space")
  );

export const useKeysDown = (
  alphabet: string,
  handleKeysChange: (keys: Set<string>) => unknown = () => {}
) => {
  const [keysDown, setKeysDown] = useState<Set<string>>(new Set());

  const keyDownHandler = () => {
    const next = getLettersPressed(alphabet);
    setKeysDown(next);
    handleKeysChange(next);
  };

  const keyUpHandler = () => {
    const next = getLettersPressed(alphabet);
    setKeysDown(next);
    handleKeysChange(next);
  };

  useEventListener("keydown", keyDownHandler);
  useEventListener("keyup", keyUpHandler);

  return keysDown;
};
