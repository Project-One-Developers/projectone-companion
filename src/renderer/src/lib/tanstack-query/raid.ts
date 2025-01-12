import type { Boss, NewRaidSession, RaidSession } from 'shared/types/types'

export const fetchRaidLootTable = async (raidId: number): Promise<Boss[]> => {
    return await window.api.getRaidLootTable(raidId)
}

export const fetchRaidSessions = async (): Promise<RaidSession[]> => {
    return await window.api.getRaidSessions()
}

export const fetchRaidSession = async (id: string | undefined): Promise<RaidSession> => {
    if (!id) {
        throw new Error('No raid session id provided')
    }
    return await window.api.getRaidSession(id)
}

export const addRaidSession = async (newRaidSession: NewRaidSession): Promise<RaidSession> => {
    return await window.api.addRaidSession(newRaidSession)
}

export const deleteRaidSession = async (id: string): Promise<void> => {
    return await window.api.deleteRaidSession(id)
}
