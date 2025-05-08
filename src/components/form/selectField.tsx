import { useFieldContext } from ".";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldErrors } from "./fieldErrors";

type SelectOption = string;

type SelectFieldProps = {
  label: string;
  options: SelectOption[];
  placeholder?: string;
};

export const SelectField = ({
  label,
  options,
  placeholder,
}: SelectFieldProps) => {
  const field = useFieldContext<string>();
  
  return (
    <div className="space-y-2">
      <div className="space-y-1 mb-2">
        <Label htmlFor={field.name}>{label}</Label>
        <Select
          value={field.state.value}
          onValueChange={(value) => field.handleChange(value)}
        >
          <SelectTrigger id={field.name} onBlur={field.handleBlur}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FieldErrors meta={field.state.meta} />
    </div>
  );
};
