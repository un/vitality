import {
  fromString,
  fromUUIDBytes,
  getType,
  toUUID,
  toUUIDBytes,
  TypeID,
  typeid,
} from "typeid-js";
import { z } from "zod";

export const TYPE_ID_LENGTH = 26;

export const cloudIdTypesMapNameToPrefix = {
  userProfile: "up",
  integration: "i",
  sleep: "s",
  sleepRawData: "srd",
  air: "a",
  airRawData: "ard",
  food: "f",
  foodRawData: "frd",
  drink: "d",
  drinkRawData: "frd",

  workout: "w",
  workoutRawData: "wrd",

  // Consumption related items
  mineral: "cm",
  vitamin: "cv",
  supplementCombo: "csc",
  supplementIngredient: "csi",
  supplementVitamin: "csv",
  supplementMineral: "csm",
  supplement: "cs",
  // items starting with "ac" are account items
  user: "acu",
  session: "acs",
  account: "aca",
  verification: "acv",
  passkey: "acpk",
} as const;

type CloudIdTypesMapNameToPrefix = typeof cloudIdTypesMapNameToPrefix;
type CloudIdTypesMapPrefixToName = {
  [K in keyof CloudIdTypesMapNameToPrefix as CloudIdTypesMapNameToPrefix[K]]: K;
};

const cloudIdTypesMapPrefixToName = Object.fromEntries(
  Object.entries(cloudIdTypesMapNameToPrefix).map(([x, y]) => [y, x]),
) as CloudIdTypesMapPrefixToName;

export type CloudIdTypePrefixNames = keyof typeof cloudIdTypesMapNameToPrefix;
export type CloudTypeId<T extends CloudIdTypePrefixNames> =
  `${CloudIdTypesMapNameToPrefix[T]}_${string}`;

export const cloudTypeIdValidator = <const T extends CloudIdTypePrefixNames>(
  prefix: T,
) =>
  z
    .string()
    .startsWith(`${cloudIdTypesMapNameToPrefix[prefix]}_`)
    .length(TYPE_ID_LENGTH + cloudIdTypesMapNameToPrefix[prefix].length + 1) // suffix length + prefix length + underscore
    .transform(
      (input) =>
        TypeID.fromString(input)
          .asType(cloudIdTypesMapNameToPrefix[prefix])
          .toString() as CloudTypeId<T>,
    );

export const cloudTypeIdGenerator = <const T extends CloudIdTypePrefixNames>(
  prefix: T,
) => typeid(cloudIdTypesMapNameToPrefix[prefix]).toString() as CloudTypeId<T>;

export const cloudTypeIdFromUUID = <const T extends CloudIdTypePrefixNames>(
  prefix: T,
  uuid: string,
) => TypeID.fromUUID(prefix, uuid).toString() as CloudTypeId<T>;

export const cloudTypeIdToUUID = <const T extends CloudIdTypePrefixNames>(
  input: CloudTypeId<T>,
) => {
  const id = fromString(input);
  return {
    uuid: toUUID(id).toString(),
    prefix: getType(id),
  };
};

export const cloudTypeIdFromUUIDBytes = <
  const T extends CloudIdTypePrefixNames,
>(
  prefix: T,
  uuid: Uint8Array<ArrayBufferLike>,
) => {
  return fromUUIDBytes(prefix, uuid) as CloudTypeId<T>;
};

export const cloudTypeIdToUUIDBytes = <const T extends CloudIdTypePrefixNames>(
  input: CloudTypeId<T>,
) => {
  const id = fromString(input);
  return {
    uuid: toUUIDBytes(id),
    prefix: getType(id),
  };
};

export const validateCloudTypeId = <const T extends CloudIdTypePrefixNames>(
  prefix: T,
  data: unknown,
): data is CloudTypeId<T> =>
  cloudTypeIdValidator(prefix).safeParse(data).success;

export const inferCloudTypeId = <T extends keyof CloudIdTypesMapPrefixToName>(
  input: `${T}_${string}`,
) => cloudIdTypesMapPrefixToName[TypeID.fromString(input).getType() as T];
