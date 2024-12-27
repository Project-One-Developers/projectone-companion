import { readFileSync } from 'fs'
import * as path from 'path'
import { z } from 'zod'
import { bossSchema, itemSchema, itemToTiersetSchema } from '../../../../shared/schemas/wow.schemas'
import { Boss, Item, ItemToTierset } from '../../../../shared/types/types'

export const fetchRaidItems = (): Item[] => {
    const jsonData = JSON.parse(
        readFileSync(path.join(__dirname, '../../resources/wow/items.json'), 'utf-8')
    )

    // cba validare qua
    const result = jsonData.map((itemRaw) => {
        return itemSchema.parse({
            id: Number(itemRaw.itemId),
            name: itemRaw.name,
            ilvlMythic: Number(itemRaw.mythicLevel) ?? null,
            ilvlHeroic: Number(itemRaw.heroicLevel) ?? null,
            ilvlNormal: Number(itemRaw.normalLevel) ?? null,
            boe: 'BoE' === itemRaw.bonusId,
            itemClass: itemRaw.itemClass,
            slot: itemRaw.slot,
            itemSubclass: itemRaw.itemSubclass,
            tierPrefix: itemRaw.token,
            tier: 'Token' === itemRaw.itemSubclass,
            veryRare: 'Very Rare' === itemRaw.bonusId,
            specs: itemRaw.specs ? itemRaw.specs.split(',') : null,
            specIds: itemRaw.specIds ? itemRaw.specIds.split('|') : null,
            classes: itemRaw.classes ? itemRaw.classes.split(',') : null,
            classesId: itemRaw.classesId ? itemRaw.classesId.split('|') : null,
            stats: itemRaw.stats,
            mainStats: itemRaw.mainStats,
            secondaryStats: itemRaw.secondaryStats,
            wowheadUrl: itemRaw.wowheadUrl,
            iconName: itemRaw.iconName,
            iconUrl: itemRaw.iconUrl,
            bossName: itemRaw.bossName,
            bossId: itemRaw.journalEncounterID
        })
    })

    return z.array(itemSchema).parse(result)
}

export const fetchRaidBosses = (): Boss[] => {
    const jsonData = JSON.parse(
        readFileSync(path.join(__dirname, '../../resources/wow/bosses.json'), 'utf-8')
    )

    return z.array(bossSchema).parse(jsonData)
}

export const fetchItemsToTierset = (): ItemToTierset[] => {
    const jsonData = JSON.parse(
        readFileSync(path.join(__dirname, '../../resources/wow/items_to_tierset.json'), 'utf-8')
    )

    return z.array(itemToTiersetSchema).parse(jsonData)
}
