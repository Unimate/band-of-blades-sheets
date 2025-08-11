import { getContext } from "svelte";
import { CONSTANTS } from "../../../constants";
import type { CoarseReactivityProvider } from "../../../utils/reactivity/reactivity.svelte";

export function getSheetContext<TContext = any>(): TContext {
  return getContext<CoarseReactivityProvider<TContext>>(
    CONSTANTS.SVELTE_CONTEXT.DIALOG
  ).data;
}

export function getDialogContext(): any {
  return getSheetContext();
}