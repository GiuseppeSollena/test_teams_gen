import { z } from "zod";

// Definiamo lo schema di validazione per i nostri dati
export const sampleFormSchema = z.object({
  name: z.string().min(3, { message: "Il nome deve contenere almeno 3 caratteri." }),
  description: z
    .string()
    .min(10, { message: "La descrizione deve essere di almeno 10 caratteri." })
    .max(200, { message: "La descrizione non può superare i 200 caratteri." }),
});

// Inferiamo il tipo TypeScript direttamente dallo schema Zod
export type SampleFormValues = z.infer<typeof sampleFormSchema>;