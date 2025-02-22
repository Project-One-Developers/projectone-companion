import { WowClassName, WoWRole, WowSpec } from '@shared/types/types'
import { WOW_CLASS_WITH_SPECS } from './spec-utils.schemas'

export const getClassSpecs = (wowClass: number | WowClassName): WowSpec[] => {
    return (
        WOW_CLASS_WITH_SPECS.find((c) =>
            typeof wowClass === 'number' ? c.id === wowClass : c.name === wowClass
        )?.specs ?? []
    )
}

export const getClassSpecsForRole = (wowClass: number | WowClassName, role: WoWRole): WowSpec[] => {
    return WOW_CLASS_WITH_SPECS.filter((c) =>
        typeof wowClass === 'number' ? c.id === wowClass : c.name === wowClass
    )
        .flatMap((c) => c.specs)
        .filter((spec) => spec.role === role)
}

export const getSpec = (id: number): WowSpec => {
    const res = WOW_CLASS_WITH_SPECS.flatMap((c) => c.specs).find((s) => s.id === id)
    if (!res) throw Error('getSpec(): spec ' + id + 'not mapped')
    return res
}
