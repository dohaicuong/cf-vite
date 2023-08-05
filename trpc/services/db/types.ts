import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type another = {
    id: string;
    name: string;
};
export type kv = {
    key: string;
    value: string;
};
export type DB = {
    another: another;
    kv: kv;
};
