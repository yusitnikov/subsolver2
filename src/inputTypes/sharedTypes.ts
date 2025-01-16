import { FunctionComponent } from "react";

export interface UserInputHandlerProps {
  swap?: (letterA: string, letterB: string) => unknown;
  setLock?: (letter: string, lockState: boolean) => unknown;
  lockedLetters?: Set<string>;
  alphabet?: string;
}

export interface InputSchema {
  lockable: boolean;
  inputHandler: FunctionComponent<UserInputHandlerProps>;
  bottomHelpText: React.ReactNode;
}
