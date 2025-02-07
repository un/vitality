import { TypeID, typeid, toUUID, getType, fromString } from 'typeid-js';
import { z } from 'zod';

const typeIdLength = 26;

export const idTypesMapNameToPrefix = {
  // items starting with "ac" are account items
  user: 'acu',
  session: 'acs',
  account: 'aca',
  verification: 'acv',
  passkey: 'acpk'
} as const;

type IdTypesMapNameToPrefix = typeof idTypesMapNameToPrefix;
type IdTypesMapPrefixToName = {
  [K in keyof IdTypesMapNameToPrefix as IdTypesMapNameToPrefix[K]]: K;
};

const idTypesMapPrefixToName = Object.fromEntries(
  Object.entries(idTypesMapNameToPrefix).map(([x, y]) => [y, x])
) as IdTypesMapPrefixToName;

export type IdTypePrefixNames = keyof typeof idTypesMapNameToPrefix;
export type TypeId<T extends IdTypePrefixNames> =
  `${IdTypesMapNameToPrefix[T]}_${string}`;

export const typeIdValidator = <const T extends IdTypePrefixNames>(prefix: T) =>
  z
    .string()
    .startsWith(`${idTypesMapNameToPrefix[prefix]}_`)
    .length(typeIdLength + idTypesMapNameToPrefix[prefix].length + 1) // suffix length + prefix length + underscore
    .transform(
      (input) =>
        TypeID.fromString(input)
          .asType(idTypesMapNameToPrefix[prefix])
          .toString() as TypeId<T>
    );

export const typeIdGenerator = <const T extends IdTypePrefixNames>(prefix: T) =>
  typeid(idTypesMapNameToPrefix[prefix]).toString() as TypeId<T>;

export const typeIdFromUUID = <const T extends IdTypePrefixNames>(
  prefix: T,
  uuid: string
) => TypeID.fromUUID(prefix, uuid).toString() as TypeId<T>;

export const typeIdToUUID = <const T extends IdTypePrefixNames>(
  input: TypeId<T>
) => {
  const id = fromString(input);
  return {
    uuid: toUUID(id).toString(),
    prefix: getType(id)
  };
};

export const validateTypeId = <const T extends IdTypePrefixNames>(
  prefix: T,
  data: unknown
): data is TypeId<T> => typeIdValidator(prefix).safeParse(data).success;

export const inferTypeId = <T extends keyof IdTypesMapPrefixToName>(
  input: `${T}_${string}`
) => idTypesMapPrefixToName[TypeID.fromString(input).getType() as T];
