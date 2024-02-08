import { useCallback, useEffect } from "react";

/**
 * A React hook for adding a global keyboard shortcut listener.
 * This hook allows you to specify a callback function that will be executed when a keyboard event occurs.
 * Optionally, you can configure the hook to ignore keyboard events that originate from input and textarea elements.
 *
 * @param {Function} callback - A callback function that is invoked when a keyboard event is detected.
 *                              This function receives the KeyboardEvent as its argument.
 * @param {boolean} [dontRunShortcutWhileInputFocus=true] - If set to true, the callback will not be executed
 *                                                          if the keyboard event originates from an input or textarea element.
 *                                                          Defaults to true, which means the callback is ignored
 *                                                          during typing in input or textarea elements.
 *
 * @example
 * // Example usage
 * useShortcutsListener((event) => {
 *   if (event.key === "Enter") {
 *     console.log("Enter key pressed");
 *   }
 * });
 *
 * @returns {void}
 */
export const useShortcutsListener = (
  callback: (event: KeyboardEvent) => void,
  dontRunShortcutWhileInputFocus = true
) => {
  const listenForShortcutClicking = useCallback(
    (event: KeyboardEvent) => {
      // Check if the event target is an input or textarea element and cancel the shortcut
      if (
        dontRunShortcutWhileInputFocus &&
        (event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement)
      ) {
        return;
      }

      callback(event);
    },
    [callback, dontRunShortcutWhileInputFocus]
  );

  useEffect(() => {
    document.addEventListener("keydown", listenForShortcutClicking);

    return () => {
      document.removeEventListener("keydown", listenForShortcutClicking);
    };
  }, [listenForShortcutClicking]);
};
