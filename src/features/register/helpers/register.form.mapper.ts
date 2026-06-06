import { RegisterFormType } from "../schemas/register.schema";

export const mapRegisterFormToCharacter = (values: RegisterFormType) => ({
  name: values.name,
  userId: values.userId,

  idRace: values.idRace,
  affinityId: values.affinityId,

  positiveCharacteristic_1: values.positiveCharacteristic_1,

  positiveCharacteristic_2: values.positiveCharacteristic_2,

  positiveCharacteristic_3: values.positiveCharacteristic_3,

  negativeCharacteristic_1: values.negativeCharacteristic_1,

  negativeCharacteristic_2: values.negativeCharacteristic_2,
});

export const mapRegisterFormToUser = (values: RegisterFormType) => ({
  email: values.email,
  password: values.password,
});
