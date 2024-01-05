import type { settingsType } from "@/api/settings";
import type { FieldRule } from "@arco-design/web-vue";

export interface tabType {
  name: string;
  title: string;
}

export interface optionType {
  label: string;
  value: string | number;
}

export interface configColumnType<T extends settingsType> {
  label: string;
  field: keyof T;
  rules?: FieldRule[];
  placeholder?: string;
  iptType?: "password";
  type?: "string" | "number" | "boolean";
}
