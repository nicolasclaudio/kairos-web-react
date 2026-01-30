import { create } from 'zustand';

export type SyncStatus = 'SYNCING' | 'SAVED' | 'OFFLINE' | 'ERROR';

interface SyncState {
    status: SyncStatus;
    lastSyncedAt: string | null;
    setStatus: (status: SyncStatus) => void;
    sync: () => Promise<void>;
}

export const useSyncStore = create<SyncState>((set) => ({
    status: 'SAVED',
    lastSyncedAt: new Date().toISOString(),

    setStatus: (status) => set({ status }),

    sync: async () => {
        set({ status: 'SYNCING' });
        // Simulate sync delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        set({ status: 'SAVED', lastSyncedAt: new Date().toISOString() });
    }
}));
