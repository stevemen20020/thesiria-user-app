import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Correo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  userId: z.string(),
  idRace: z.string(),
  affinityId: z.string(),
  positiveCharacteristic_1: z
    .string()
    .min(5, "La característica debe tener al menos 5 caracteres"),
  positiveCharacteristic_2: z
    .string()
    .min(5, "La característica debe tener al menos 5 caracteres"),
  positiveCharacteristic_3: z
    .string()
    .min(5, "La característica debe tener al menos 5 caracteres"),
  negativeCharacteristic_1: z
    .string()
    .min(5, "La característica debe tener al menos 5 caracteres"),
  negativeCharacteristic_2: z
    .string()
    .min(5, "La característica debe tener al menos 5 caracteres"),
});

export type RegisterFormType = z.infer<typeof registerSchema>;
