import { z } from "zod";
export const addTransactionSchema = z
  .object({
    amount: z
      .string({ error: "Please provide amount of transaction" })
      .refine((val) => !isNaN(Number(val))),
    type: z.enum(["INCOME", "EXPENSE"]),
    category: z.string({ error: "Please provide category of expense" }),
    description: z
      .string({ error: "Please provide valid description of transaction" })
      .min(5, {
        error:
          "Description of transaction should be at least 5 characters long",
      })
      .max(255, {
        error:
          "Description of transaction should be less than 255 characters long",
      })
      .optional()
      .or(z.literal("")),
    date: z.coerce.date({ error: "Please provide date of transaction" }),
    currency: z.string({ error: "Please provide currency" }).optional(),
    convertedAmount: z
      .string({ error: "Please provide converted amount of transaction" })
      .refine((val) => !isNaN(Number(val)), {
        message: "Converted amount must be valid",
      })
      .optional(),
    importId: z.string({ error: "Import id not received" }).optional(),
  })
  .refine(
    (data) => {
      if (data.currency && data.currency !== "INR") {
        return !!data.convertedAmount;
      }
      return true;
    },
    {
      error: "Converted amount required for non-INR transactions",
      path: ["convertedAmount"],
    },
  );
