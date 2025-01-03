import type { NewCharacter, Player } from '@shared/types/types'
import {
    addCharacter,
    addPlayer,
    deletePlayer,
    getCharactersList
} from '@storage/players/players.storage'

export const addCharacterHandler = async (character: NewCharacter): Promise<Player> => {
    return await addCharacter(character)
}

export const getCharactersListHandler = async (): Promise<{ players: Player[] }> => {
    const players = await getCharactersList()
    return { players }
}

export const addPlayerHandler = async (playerName: string): Promise<Player> => {
    return await addPlayer(playerName)
}

export const deletePlayerHandler = async (playerId: string): Promise<void> => {
    return await deletePlayer(playerId)
}
