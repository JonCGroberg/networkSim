// store/users.ts
import { atom } from 'nanostores';

export const sessionId = atom<string|undefined>(undefined);