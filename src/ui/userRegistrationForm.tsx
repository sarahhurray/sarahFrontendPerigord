import { useState } from "react";
import { z } from "zod";
import { useAppForm } from "../components/form";

type Field = {
  label: string;
  type: string;
  name: string;
  require?: boolean;
  options?: string[];
};
type FormProps = {
  formData: {
    title: string;
    fields: Field[];
  };
};
// get the field input type from the supplied data field to set the correct default value
const getInputType = (field: Field) => {
  if (field.type === "text") {
    return "";
  }
  if (field.type === "number") {
    return undefined;
  }
  if (field.type === "checked") {
    return false;
  }
  if (field.type === "select" && field.options) {
    return field.options[0];
  }
};

export const UserRegistrationForm = ({ formData }: FormProps) => {
  //formValuesJson are the values to display below the form when the form is submitted
  const [formValuesJson, setFormValuesJson] = useState("");
  const form = useAppForm({
    defaultValues: formData.fields.reduce((acc, field) => {
      acc[field.name] = getInputType(field);
      return acc;
    }, {} as Record<string, string | Number | boolean | undefined>),
    validators: {
      onChange: z.object(
        formData.fields.reduce((acc, field) => {
          if (field.require) {
            acc[field.name] = z.string().nonempty(`${field.label} is required`);
          } else {
            acc[field.name] = z.string().optional();
          }
          return acc;
        }, {} as Record<string, z.ZodTypeAny>)
      ),
    },
    onSubmit: ({ value }) => {
      setFormValuesJson(JSON.stringify(value, null, 2));
    },
  });

  return (
    <>
      <form
        className="flex flex-col gap-2 w-[400px] mt-50 m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div>
          <h3> {formData.title} </h3>
          {formData.fields.map((data) => {
            return (
              <form.AppField
                name={data.name}
                key={data.name}
                children={(field) => {
                  if (data.type === "text") {
                    return (
                      <field.TextField type={data.type} label={data.label} />
                    );
                  }
                  if (data.type === "number") {
                    return (
                      <field.NumberField type={data.type} label={data.label} />
                    );
                  }
                  if (data.type === "checked") {
                    return <field.CheckboxField label={data.label} />;
                  }
                  if (data.type === "select" && data.options) {
                    return (
                      <field.SelectField
                        label={data.label}
                        options={data.options}
                      />
                    );
                  }
                }}
              />
            );
          })}
        </div>
        <form.AppForm>
          <form.SubmitButton>Submit</form.SubmitButton>
        </form.AppForm>
      </form>
      <div> Form Values as JSON {formValuesJson}</div>
    </>
  );
};
