import { queryClient } from '@renderer/lib/tanstack-query/client'
import { queryKeys } from '@renderer/lib/tanstack-query/keys'
import { assignLoot, getLootAssignmentInfo } from '@renderer/lib/tanstack-query/loots'
import { ITEM_SLOTS_KEY_TIERSET } from '@shared/consts/wow.consts'
import type { CharAssignmentHighlights, LootWithAssigned } from '@shared/types/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { type JSX } from 'react'
import { DroptimizerUpgradeForItemEquipped } from './droptimizer-upgrade-for-item'
import { toast } from './hooks/use-toast'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { WowClassIcon } from './ui/wowclass-icon'
import { WowGearIcon } from './ui/wowgear-icon'

type LootsEligibleCharsProps = {
    selectedLoot: LootWithAssigned
    setSelectedLoot: (loot: LootWithAssigned) => void
    allLoots: LootWithAssigned[]
}

export default function LootsEligibleChars({
    selectedLoot,
    setSelectedLoot,
    allLoots
}: LootsEligibleCharsProps): JSX.Element {
    const lootAssignmentInfoQuery = useQuery({
        queryKey: [queryKeys.lootsAssignInfo, selectedLoot.id],
        queryFn: () => getLootAssignmentInfo(selectedLoot.id)
    })

    const assignLootMutation = useMutation({
        mutationFn: ({
            charId,
            lootId,
            highlights: highlights
        }: {
            charId: string
            lootId: string
            highlights: CharAssignmentHighlights
        }) => assignLoot(charId, lootId, highlights),
        onMutate: async (variables) => {
            // Optimistically update the selected loot assignment
            const previousSelectedLoot = { ...selectedLoot }
            setSelectedLoot({
                ...selectedLoot,
                assignedCharacterId: variables.charId
            })

            // Return a rollback function
            return { previousSelectedLoot }
        },
        onError: (error, _, context) => {
            // Rollback to the previous state
            if (context?.previousSelectedLoot) {
                setSelectedLoot(context.previousSelectedLoot)
            }
            toast({
                title: 'Error',
                description: `Unable to assign loot. Error: ${error.message}`
            })
        },
        onSettled: () => {
            // we dont need to refetch the loot assignment info, we just need to refetch the loots from the parent to also refresh loot tabs panel
            queryClient.invalidateQueries({
                queryKey: [queryKeys.lootsBySession]
                //queryKey: [queryKeys.lootsAssignInfo, selectedLoot.id] queryKeys.lootsBySession
            })
        }
    })

    if (lootAssignmentInfoQuery.isLoading) {
        return (
            <div className="flex flex-col items-center w-full justify-center mt-10 mb-10">
                <LoaderCircle className="animate-spin text-5xl" />
            </div>
        )
    }

    const showTiersetInfo =
        selectedLoot.gearItem.item.slotKey === 'omni' ||
        ITEM_SLOTS_KEY_TIERSET.find((i) => i === selectedLoot.gearItem.item.slotKey) != null
    const showHightestInSlot = selectedLoot.gearItem.item.slotKey !== 'omni'

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-center">
                <WowGearIcon
                    item={selectedLoot.gearItem}
                    showSlot={true}
                    showTierBanner={true}
                    showExtendedInfo={true}
                    showArmorType={true}
                    iconClassName="h-12 w-12"
                />
            </div>
            <div className="flex">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Highlights</TableHead>
                            <TableHead>Droptimizer</TableHead>
                            <TableHead>Vault</TableHead>
                            <TableHead>Other Assignment</TableHead>
                            {showHightestInSlot && <TableHead>Highest</TableHead>}
                            {showTiersetInfo && <TableHead>Tierset</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lootAssignmentInfoQuery.data?.eligible
                            .sort((a, b) => b.highlights.score - a.highlights.score)
                            .map((charInfo) => {
                                const assignedLoots = allLoots.filter(
                                    (loot) =>
                                        loot.id !== selectedLoot.id &&
                                        loot.assignedCharacterId === charInfo.character.id &&
                                        loot.gearItem.item.slotKey ===
                                            selectedLoot.gearItem.item.slotKey
                                )
                                return (
                                    <TableRow
                                        key={charInfo.character.id}
                                        className={`cursor-pointer hover:bg-gray-700 ${selectedLoot.assignedCharacterId === charInfo.character.id ? 'bg-gray-700' : ''}`}
                                        onClick={() =>
                                            assignLootMutation.mutate({
                                                charId: charInfo.character.id,
                                                lootId: selectedLoot.id,
                                                highlights: charInfo.highlights
                                            })
                                        }
                                    >
                                        <TableCell>
                                            <div className="flex flex-row space-x-4 items-center">
                                                <WowClassIcon
                                                    wowClassName={charInfo.character.class}
                                                    charname={charInfo.character.name}
                                                    className="h-8 w-8 border-2 border-background rounded-lg"
                                                />
                                                <div className="flex flex-col">
                                                    <h1 className="font-bold">
                                                        {charInfo.character.name}
                                                    </h1>
                                                    <p className="text-xs">
                                                        {charInfo.highlights?.score ?? 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-row space-x-4 items-center">
                                                <div className="flex flex-col">
                                                    <p className="text-xs font-bold">
                                                        {charInfo.highlights.gearIsBis && 'BIS'}
                                                    </p>
                                                    <p className="text-xs font-bold">
                                                        {charInfo.highlights.tierSetCompletion
                                                            .type === '2p' && '2p'}
                                                    </p>
                                                    <p className="text-xs font-bold">
                                                        {charInfo.highlights.tierSetCompletion
                                                            .type === '4p' && '4p'}
                                                    </p>
                                                    <p className="text-xs font-bold">
                                                        {charInfo.highlights.dpsGain > 0 && 'DPS'}
                                                    </p>
                                                    <p className="text-xs font-bold">
                                                        {(charInfo.highlights.ilvlDiff > 0 ||
                                                            charInfo.highlights.isTrackUpgrade) &&
                                                            'SLOT'}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {charInfo.droptimizers.map((droptWithUpgrade) => (
                                                <DroptimizerUpgradeForItemEquipped
                                                    key={droptWithUpgrade.droptimizer.url}
                                                    upgrade={droptWithUpgrade.upgrade}
                                                    droptimizer={droptWithUpgrade.droptimizer}
                                                    itemEquipped={droptWithUpgrade.itemEquipped}
                                                />
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-row space-x-1">
                                                {charInfo.weeklyChest
                                                    .filter(
                                                        (vault) =>
                                                            vault.item.slotKey ===
                                                            selectedLoot.gearItem.item.slotKey
                                                    )
                                                    .map((gear) => (
                                                        <WowGearIcon
                                                            key={gear.item.id}
                                                            item={gear}
                                                        />
                                                    ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-row space-x-1">
                                                {assignedLoots.map((otherLoot) => (
                                                    <WowGearIcon
                                                        key={otherLoot.id}
                                                        item={otherLoot.gearItem}
                                                    />
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-row space-x-1">
                                                {showHightestInSlot &&
                                                    charInfo.bestItemInSlot.map((bestInSlot) => (
                                                        <WowGearIcon
                                                            key={bestInSlot.item.id}
                                                            item={bestInSlot}
                                                            showTierBanner={true}
                                                        />
                                                    ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-row gap-1">
                                                {showTiersetInfo &&
                                                    charInfo.tierset.map((tierset) => (
                                                        <div
                                                            key={tierset.item.id}
                                                            className="flex flex-col items-center space-x-1"
                                                        >
                                                            <WowGearIcon
                                                                item={tierset}
                                                                showTierBanner={false}
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
