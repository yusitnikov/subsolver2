class KeysPressed {
  keysMap: Record<string, string> = {};
  constructor() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
      }
      this.keysMap[event.code] = event.key;
    });
    document.addEventListener("keyup", (event: KeyboardEvent) => {
      delete this.keysMap[event.code];
    });
  }
  getKeysPressed(): Set<string> {
    return new Set(Object.values(this.keysMap));
  }
}

const keysPressed = new KeysPressed();

export default keysPressed;
