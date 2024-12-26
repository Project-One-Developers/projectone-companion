import { z } from 'zod'

const upgradesModelSchema = z.object({
    itemId: z.number(),
    dps: z.string()
})

export const droptimizerModelSchema = z
    .object({
        id: z.string(),
        url: z.string().url(),
        resultRaw: z.string(),
        date: z.number(),
        raidDifficulty: z.string(),
        fightStyle: z.string(),
        duration: z.number().min(1),
        nTargets: z.number().min(1),
        characterName: z.string(),
        upgrades: z.array(upgradesModelSchema)
    })
    .transform((data) => {
        return {
            id: data.id,
            url: data.url,
            resultRaw: data.resultRaw,
            date: data.date,
            raidDifficulty: data.raidDifficulty,
            characterName: data.characterName,
            fightInfo: {
                fightstyle: data.fightStyle,
                duration: data.duration,
                nTargets: data.nTargets
            },
            upgrades: data.upgrades.map((up) => ({
                itemId: up.itemId,
                dps: parseFloat(up.dps)
            }))
        }
    })
