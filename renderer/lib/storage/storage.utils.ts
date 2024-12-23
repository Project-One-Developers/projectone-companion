import { z, ZodTypeAny } from "zod";

// TODO: this should handle both zod objects with transform and normal schemas
// if not this can be simplified to just zod objects
export const parseAndValidate = <Schema extends ZodTypeAny>(
    schema: Schema,
    rawData: unknown,
): z.infer<Schema> | null => {
    const parsedResult = schema.safeParse(rawData);

    if (!parsedResult.success) {
        console.log(`Failed to parse data: ${parsedResult.error.errors}`);
        return null;
    }

    return parsedResult.data;
};
