// store/users.ts
import { atom } from 'nanostores';
import type { UserProfile } from '@/types/User'

export const mainUser = atom<UserProfile | undefined>(undefined);

// Function to save mainUser to localStorage
export function saveMainUser(user: UserProfile) {
    mainUser.set(user);
    localStorage.setItem('mainUser', JSON.stringify(user) ?? undefined);
}

// Function to load mainUser from localStorage
export function loadMainUser() {
    const storedUser = localStorage.getItem('mainUser');
    if (storedUser) {
        mainUser.set(JSON.parse(storedUser));
    }
}

// Initialize mainUser from localStorage when the module loads
loadMainUser();
