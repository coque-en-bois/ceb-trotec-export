import { useCallback, useEffect, useReducer } from "react";

interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

type Action<T> =
  | { type: "SET"; newPresent: T }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET"; newPresent: T };

function undoRedoReducer<T>(
  state: UndoRedoState<T>,
  action: Action<T>,
): UndoRedoState<T> {
  switch (action.type) {
    case "SET": {
      // Skip if value hasn't changed (shallow comparison via JSON)
      if (JSON.stringify(state.present) === JSON.stringify(action.newPresent)) {
        return state;
      }
      return {
        past: [...state.past, state.present],
        present: action.newPresent,
        future: [],
      };
    }
    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
      };
    }
    case "RESET": {
      return {
        past: [],
        present: action.newPresent,
        future: [],
      };
    }
    default:
      return state;
  }
}

export function useUndoRedo<T>(initialPresent: T) {
  const [state, dispatch] = useReducer(undoRedoReducer<T>, {
    past: [],
    present: initialPresent,
    future: [],
  });

  const set = useCallback(
    (newPresentOrUpdater: T | ((prev: T) => T)) => {
      if (typeof newPresentOrUpdater === "function") {
        const updater = newPresentOrUpdater as (prev: T) => T;
        dispatch({ type: "SET", newPresent: updater(state.present) });
      } else {
        dispatch({ type: "SET", newPresent: newPresentOrUpdater });
      }
    },
    [state.present],
  );

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);
  const reset = useCallback(
    (newPresent: T) => dispatch({ type: "RESET", newPresent }),
    [],
  );

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  // Keyboard shortcuts: Ctrl+Z / Ctrl+Shift+Z (or Cmd on Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (!isCtrlOrCmd || e.key.toLowerCase() !== "z") return;

      // Don't intercept when user is typing in an input/select
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  return {
    state: state.present,
    set,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
  } as const;
}
