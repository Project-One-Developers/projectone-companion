import { Droptimizer } from "@/lib/types";
import { eq } from "drizzle-orm";
import { db } from "../storage.config";
import { droptimizerTable } from "../storage.schema";
import { parseAndValidate, takeFirstResult } from "../storage.utils";
import { droptimizerModelSchema } from "./droptimizer.schemas";

export const getDroptimizer = async (
    droptimizerId: string,
): Promise<Droptimizer | null> => {
    const result = await db
        .select()
        .from(droptimizerTable)
        .where(eq(droptimizerTable.id, droptimizerId))
        .then(takeFirstResult);

    return parseAndValidate(droptimizerModelSchema, result);
};
