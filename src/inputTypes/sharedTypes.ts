import { FunctionComponent } from "react";
import { Language } from "../Language";

export interface UserInputHandlerProps {
  swap?: (letterA: string, letterB: string) => unknown;
  setLock?: (letter: string, lockState: boolean) => unknown;
  lockedLetters?: Set<string>;
  language?: Language;
}

export interface InputSchema {
  lockable: boolean;
  inputHandler: FunctionComponent<UserInputHandlerProps>;
  bottomHelpText: React.ReactNode;
}
