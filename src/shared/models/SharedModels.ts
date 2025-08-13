import { FieldValues, Path } from "react-hook-form";

export interface CommonOption {
  label: string;
  value: string;
}

export type DateLimit<T> = {
  type: "date";
  value: Date;
} | {
  type: "field"
  value: keyof T;
}


export type FieldBase<T> =
  {
    label?: string;
    name: keyof T;
    component: "input" | "textarea";
    type?: string;
    hint?: string;
    required?: boolean;
    options?: never;
    placeHolder?: string;
    description?: string;
    maxLength?: number;
    maxDate?: never;
    minDate?: never;
  } |
  {
    label?: string;
    name: keyof T;
    component: "date";
    type?: string;
    hint?: string;
    required?: boolean;
    options?: never;
    placeHolder?: string;
    description?: string;
    maxLength: never
    maxDate?: DateLimit<T>;
    minDate?: DateLimit<T>;
  } |
  {
    label?: string;
    name: keyof T;
    component: "select" | "radio";
    type?: string;
    hint?: string;
    required?: boolean;
    options?: CommonOption[];
    placeHolder?: string;
    description?: string;
    maxLength: never
    maxDate?: never;
    minDate?: never;
  }

export interface FieldConfig<T extends FieldValues>
  extends Omit<FieldBase<T>, "name"> {
  name: Path<T>;
}
