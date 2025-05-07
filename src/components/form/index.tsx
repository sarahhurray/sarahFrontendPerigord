import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TextField } from "./textField";
import { CheckboxField } from "./checkboxField";
import { SelectField } from "./selectField";
import { NumberField } from "./numberField";
import { SubmitButton } from "./submitButton";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    CheckboxField,
    SelectField,
    NumberField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
