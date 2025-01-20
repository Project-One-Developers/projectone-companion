import type {
    Character,
    EditCharacter,
    EditPlayer,
    NewCharacter,
    Player,
    PlayerWithCharacters
} from '@shared/types/types'
import {
    addCharacter,
    addCharacterWowAudit,
    deleteAllCharacterWowAudit,
    deleteCharacter,
    editCharacter,
    getCharacterById,
    getCharactersList
} from '@storage/players/characters.storage'
import {
    addPlayer,
    deletePlayer,
    editPlayer,
    getPlayerById,
    getPlayerWithCharactersList
} from '@storage/players/players.storage'
import { getConfig } from '@storage/settings/settings.storage'
import { fetchWowAuditData, parseWowAuditData } from './characters.utils'

// Characters

export const addCharacterHandler = async (character: NewCharacter): Promise<Player> => {
    return await addCharacter(character)
}

export const getCharacterHandler = async (id: string): Promise<Character | null> => {
    return await getCharacterById(id)
}

export const getChracterListHandler = async (): Promise<Character[]> => {
    const res = await getCharactersList()
    return res
}

export const deleteCharacterHandler = async (id: string): Promise<void> => {
    return await deleteCharacter(id)
}

export const editCharacterHandler = async (edited: EditCharacter): Promise<Character | null> => {
    // edit
    await editCharacter(edited)

    // retrieve updated entity
    return await getCharacterById(edited.id)
}

export const syncCharacterWowAudit = async (): Promise<void> => {
    const key = await getConfig('WOW_AUDIT_API_KEY')

    if (key === null) {
        throw new Error('WOW_AUDIT_API_KEY not set in database')
    }

    const json = await fetchWowAuditData(key)

    if (json != null) {
        const charsData = parseWowAuditData(json)
        await deleteAllCharacterWowAudit()
        await addCharacterWowAudit(charsData)
    }
}

// export const getCharacterListHandler = async (): Promise<Character[]> => {
//     const players = await getPlayerWithCharactersList()
//     return players
// }

// Players

export const addPlayerHandler = async (playerName: string): Promise<Player> => {
    return await addPlayer(playerName)
}

export const deletePlayerHandler = async (playerId: string): Promise<void> => {
    return await deletePlayer(playerId)
}

export const editPlayerHandler = async (edited: EditPlayer): Promise<Player | null> => {
    // edit
    await editPlayer(edited)

    // retrieve updated entity
    return await getPlayerById(edited.id)
}

export const getPlayerWithCharactersListHandler = async (): Promise<PlayerWithCharacters[]> => {
    const players = await getPlayerWithCharactersList()
    return players
}
