import { NewRaidSession, RaidSession } from '@shared/types/types'
import {
    addRaidSession,
    deleteRaidSession,
    getRaidSession,
    getRaidSessionList
} from '@storage/raid-session/raid-session.storage'
import { parseRaidSessionCsv } from './raid-session.utils'

export const loadRaidSessionCsvHandler = async (sessionId: string, csv: string): Promise<void> => {
    const parsedData = parseRaidSessionCsv(sessionId, csv)
    console.log(parsedData)

    // TODO: insertion
}

export const getRaidSessionListHandler = async (): Promise<RaidSession[]> => {
    return await getRaidSessionList()
}

export const addRaidSessionHandler = async (raidSession: NewRaidSession): Promise<RaidSession> => {
    const id = await addRaidSession(raidSession)
    return await getRaidSession(id)
}

export const deleteRaidSessionHandler = async (id: string): Promise<void> => {
    return await deleteRaidSession(id)
}
