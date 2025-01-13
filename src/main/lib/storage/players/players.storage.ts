import { playerSchema } from '@shared/schemas/characters.schemas'
import type { NewCharacter, Player } from '@shared/types/types'
import { db } from '@storage/storage.config'
import { charTable, playerTable } from '@storage/storage.schema'
import { takeFirstResult } from '@storage/storage.utils'
import { eq } from 'drizzle-orm'
import { newUUID } from '../../utils'
import { playersListStorageSchema } from './players.schemas'

export const getPlayerWithCharactersList = async (): Promise<Player[]> => {
    const result = await db.query.playerTable.findMany({
        with: {
            chars: true
        }
    })
    return playersListStorageSchema.parse(result)
}

export const getPlayerById = async (playerId: string): Promise<Player | null> => {
    const result = await db
        .select()
        .from(playerTable)
        .where(eq(playerTable.id, playerId))
        .then(takeFirstResult)

    if (!result) {
        return null
    }

    return playerSchema.parse(result)
}

export const getPlayerByName = async (playerName: string): Promise<Player | null> => {
    const result = await db
        .select()
        .from(playerTable)
        .where(eq(playerTable.name, playerName))
        .then(takeFirstResult)

    if (!result) {
        return null
    }

    return playerSchema.parse({ id: result.id, name: result.name })
}

export const addCharacter = async (character: NewCharacter): Promise<Player> => {
    const player =
        (await getPlayerByName(character.playerName)) ?? (await addPlayer(character.playerName))

    const id = newUUID()

    const result = await db
        .insert(charTable)
        .values({
            id,
            name: character.name,
            realm: character.realm,
            class: character.class,
            role: character.role,
            playerId: player.id
        })
        .returning()
        .then(takeFirstResult)

    return playerSchema.parse({
        id,
        name: player.name,
        characters: [
            {
                id,
                name: result?.name,
                realm: result?.realm,
                class: result?.class,
                role: result?.role,
                playerId: player.id
            }
        ]
    })
}

export const addPlayer = async (playerName: string): Promise<Player> => {
    const id = newUUID()

    const result = await db
        .insert(playerTable)
        .values({
            id: id,
            name: playerName
        })
        .returning()
        .then(takeFirstResult)

    return playerSchema.parse({
        id,
        name: result?.name
    })
}

export const deletePlayer = async (playerId: string): Promise<void> => {
    await db.delete(charTable).where(eq(charTable.playerId, playerId))
    await db.delete(playerTable).where(eq(playerTable.id, playerId))
}
