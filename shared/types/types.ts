import { bossSchema, bossWithItemsSchema } from '@shared/schemas/boss.schema'
import { itemSchema, itemToCatalystSchema, itemToTiersetSchema } from '@shared/schemas/items.schema'
import {
    lootSchema,
    lootWithItemSchema,
    newLootSchema,
    newLootsFromManualInputSchema,
    newLootsFromRcSchema
} from '@shared/schemas/loot.schema'
import {
    editRaidSessionSchema,
    newRaidSessionSchema,
    raidSessionSchema
} from '@shared/schemas/raid.schemas'
import { appSettingsSchema } from '@shared/schemas/store.schemas'
import { z } from 'zod'
import {
    characterGameInfoSchema,
    characterSchema,
    characterWithPlayerSchema,
    charWowAuditSchema,
    editCharacterSchema,
    editPlayerSchema,
    newCharacterSchema,
    newPlayerSchema,
    playerSchema,
    playerWithCharacterSchema
} from '../schemas/characters.schemas'
import {
    droptimizerCurrenciesSchema,
    droptimizerGearItemSchema,
    droptimizerSchema,
    droptimizerUpgradeSchema,
    droptimizerWeeklyChestSchema,
    newDroptimizerSchema,
    newDroptimizerUpgradeSchema,
    raidbotsURLSchema
} from '../schemas/simulations.schemas'
import {
    wowArmorTypeSchema,
    wowClassSchema,
    wowItemSlotSchema,
    wowRaidDiffSchema,
    wowRolesSchema
} from '../schemas/wow.schemas'

export type WowClass = z.infer<typeof wowClassSchema>
export type WowRaidDifficulty = z.infer<typeof wowRaidDiffSchema>
export type WowItemSlot = z.infer<typeof wowItemSlotSchema>
export type WowArmorType = z.infer<typeof wowArmorTypeSchema>
export type WoWRole = z.infer<typeof wowRolesSchema>

export type Player = z.infer<typeof playerSchema>
export type PlayerWithCharacters = z.infer<typeof playerWithCharacterSchema>
export type NewPlayer = z.infer<typeof newPlayerSchema>
export type EditPlayer = z.infer<typeof editPlayerSchema>

export type Character = z.infer<typeof characterSchema>
export type CharacterGameInfo = z.infer<typeof characterGameInfoSchema>
export type CharacterWithPlayer = z.infer<typeof characterWithPlayerSchema>
export type NewCharacter = z.infer<typeof newCharacterSchema>
export type EditCharacter = z.infer<typeof editCharacterSchema>

export type CharacterWowAudit = z.infer<typeof charWowAuditSchema>

export type Droptimizer = z.infer<typeof droptimizerSchema>
export type DroptimizerUpgrade = z.infer<typeof droptimizerUpgradeSchema>
export type DroptimizerWeeklyChest = z.infer<typeof droptimizerWeeklyChestSchema>
export type DroptimizerCurrenciesUpgrade = z.infer<typeof droptimizerCurrenciesSchema>
export type DroptimizerGearItem = z.infer<typeof droptimizerGearItemSchema>

export type NewDroptimizer = z.infer<typeof newDroptimizerSchema>
export type NewDroptimizerUpgrade = z.infer<typeof newDroptimizerUpgradeSchema>
export type RaidbotsURL = z.infer<typeof raidbotsURLSchema>

export type Item = z.infer<typeof itemSchema>
export type ItemToTierset = z.infer<typeof itemToTiersetSchema>
export type ItemToCatalyst = z.infer<typeof itemToCatalystSchema>

// encounter
export type Boss = z.infer<typeof bossSchema>
export type BossWithItems = z.infer<typeof bossWithItemsSchema>

export type RaidSession = z.infer<typeof raidSessionSchema>
export type NewRaidSession = z.infer<typeof newRaidSessionSchema>
export type EditRaidSession = z.infer<typeof editRaidSessionSchema>

// Raid loots
export type Loot = z.infer<typeof lootSchema>
export type LootWithItem = z.infer<typeof lootWithItemSchema>
export type NewLoot = z.infer<typeof newLootSchema>
export type NewLootsFromRc = z.infer<typeof newLootsFromRcSchema>
export type NewLootsFromManualInput = z.infer<typeof newLootsFromManualInputSchema>

// App config
export type AppSettings = z.infer<typeof appSettingsSchema>
