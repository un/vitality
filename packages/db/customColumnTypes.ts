import { customType } from "drizzle-orm/mysql-core";

import type {
  CloudIdTypePrefixNames,
  CloudTypeId,
} from "@augmented/utils/typeid";
import {
  cloudTypeIdFromUUIDBytes,
  cloudTypeIdToUUIDBytes,
} from "@augmented/utils/typeid";

export const typeIdColumn = <const T extends CloudIdTypePrefixNames>(
  prefix: T,
  columnName: string,
) =>
  customType<{ data: CloudTypeId<T>; driverData: string }>({
    dataType() {
      return "binary";
    },
    fromDriver(input: string): CloudTypeId<T> {
      return cloudTypeIdFromUUIDBytes(prefix, Buffer.from(input));
    },
    toDriver(input: CloudTypeId<T>): string {
      return cloudTypeIdToUUIDBytes(input).uuid.toString();
    },
  })(columnName);
