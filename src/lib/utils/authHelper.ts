import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const tokenConfirmEvent:Writable<TokenConfirmEvent|null> = writable(null)