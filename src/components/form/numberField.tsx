import React from "react";
import { useFieldContext } from ".";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors } from "./fieldErrors";

type NumberFieldProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const NumberField = ({ label, ...inputProps }: NumberFieldProps) => {
  const field = useFieldContext<number>();
  return (
    <div className="space-y-2">
      <div className="space-y-1 mb-2">
        <Label htmlFor={field.name}>{label}</Label>
        <Input
          id={field.name}
          value={field.state.value}
          /* using Number(e.target.value) or e.targer.valueAsNumber causes 'expected a string but recievd a number error' in the UI
          using ts-ignore for now */
          //@ts-ignore
          onChange={(e) => field.handleChange(e.target.value)}
          type="number"
          min="18"
          max="120"
          onBlur={field.handleBlur}
          {...inputProps}
        />
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
