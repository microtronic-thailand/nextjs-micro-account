import { Profile } from '@/types';

export const DEMO_USER: Profile = {
    id: 'demo-user-001',
    email: 'demo@microtronic.biz',
    role: 'super_admin',
    points: 1000,
    mustChangePassword: false,
    lastActivityAt: new Date(),
    createdAt: new Date()
};

const DEMO_MODE_KEY = 'microaccount_demo_mode';

export function enableDemoMode(): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(DEMO_MODE_KEY, 'true');
    }
}

export function disableDemoMode(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(DEMO_MODE_KEY);
    }
}

export function isDemoMode(): boolean {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(DEMO_MODE_KEY) === 'true';
    }
    return false;
}

export function getDemoProfile(): Profile {
    return DEMO_USER;
}
