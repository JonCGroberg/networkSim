import { atom } from 'nanostores';

export interface DashboardData {
    [x: string]: any;
}

export const dashboardData = atom<DashboardData | undefined>(undefined);
