import "./TouchscreenInputHandler.css";
import { Portal } from "@mui/material";
import useEventListener from "@use-it/event-listener";
import { ReactNode, useState } from "react";
import { UserInputHandlerProps } from "./sharedTypes";
import { english } from "../constants";
import { finalToRegular } from "../puzzle/mapping";

type SwapState = {
  a: string;
  b?: string;
};

const TouchscreenInputHandler = ({
  swap = () => {},
  setLock = () => {},
  lockedLetters = new Set(),
  language = english,
}: UserInputHandlerProps) => {
  const maybeGetData = (event: any) => {
    const { clientX, clientY } = event.touches[0];
    const eventTarget = document.elementFromPoint(
      clientX,
      clientY
    ) as HTMLElement | void;
    return eventTarget?.attributes?.getNamedItem("data-faux-keyboard-key")
      ?.value;
  };

  const [swapState, setSwapState] = useState<SwapState | void>();
  useEventListener("touchstart", (event: any) => {
    const value = maybeGetData(event);
    if (value) {
      setSwapState({
        a: value,
      });
    }
  });

  useEventListener("touchmove", (event: any) => {
    if (!swapState) {
      return;
    }
    const value = maybeGetData(event);
    if (value !== swapState.a && value !== swapState.b) {
      setSwapState({
        a: swapState.a,
        b: value,
      });
    }
  });

  useEventListener("touchend", () => {
    setSwapState();
    if (!swapState || !swapState.b) {
      return;
    }
    if (swapState.a === "space") {
      setLock(swapState.b, !lockedLetters.has(swapState.b));
    } else if (swapState.b === "space") {
      setLock(swapState.a, !lockedLetters.has(swapState.a));
    } else {
      swap(swapState.a, swapState.b);
    }
  });

  let swapRep: string | undefined = undefined;
  if (swapState) {
    swapRep = JSON.stringify(swapState);
  }

  const pressed: Set<string> = new Set();
  if (swapState) {
    pressed.add(swapState.a);
    if (swapState.b) {
      pressed.add(swapState.b);
    }
  }

  let swapStateRep: ReactNode | undefined = undefined;

  if (swapState) {
    if (swapState.a === "space") {
      swapStateRep = <span>Toggling lock of {swapState.b || "_"}</span>;
    } else if (swapState.b === "space") {
      swapStateRep = <span>Toggling lock of {swapState.a || "_"}</span>;
    } else {
      swapStateRep = (
        <span>
          {swapState.a} ↔ {swapState.b || "_"}
        </span>
      );
    }
  }

  const maxRowLength = Math.max(...language.layout.map(line => line.length));

  return (
    <Portal container={document.body}>
      <div className="touchscreen-input-handler-wrapper">
        <div className="touchscreen-input-handler">
          {swapRep && (
            <div className="swap-rep-wrapper">
              <span className="swap-rep">{swapStateRep}</span>
            </div>
          )}
          <div className="faux-keyboard">
            {language.layout.map((row) => (
              <div className="row">
                {row.split("").map((key, index) => (
                  <span
                    key={index}
                    className={"key " + (pressed.has(key) && "pressed")}
                    data-faux-keyboard-key={finalToRegular(key)}
                    style={{minWidth: `${Math.floor(100 / maxRowLength)}%`}}
                  >
                    {key}
                  </span>
                ))}
              </div>
            ))}
            <div className="row">
              <span
                className={"key key-big " + (pressed.has("space") && "pressed")}
                data-faux-keyboard-key="space"
              >
                Lock/Unlock
              </span>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default TouchscreenInputHandler;
