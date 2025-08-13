import { getContext } from "svelte";
import { CONSTANTS } from "../../../../constants";
import type { CoarseReactivityProvider } from "../../../../utils/reactivity/reactivity.svelte";

export function getSheetContext<TContext = any>(): TContext {
  return getContext<CoarseReactivityProvider<TContext>>(
    CONSTANTS.SVELTE_CONTEXT.CONTEXT
  ).data;
}

export function getActorSheetContext(): any {
  return getSheetContext();
}