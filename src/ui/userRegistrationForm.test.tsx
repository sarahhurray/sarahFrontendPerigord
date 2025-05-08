import { expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UserRegistrationForm } from "./userRegistrationForm";

/* there is currently no documentation on mocking tanstack/react-form 
this attempt needs to be improved 
 */
vi.mock("../components/form", async () => {
  const actual: object = await vi.importActual("../components/form");
  return {
    ...actual,
    useAppForm: vi.fn(() => ({
      form: {
        handleSubmit: vi.fn(),
        reset: vi.fn(),
        setValue: vi.fn(),
        getValues: vi.fn(),
        watch: vi.fn(),
        trigger: vi.fn(),
        formState: {
          isSubmitting: false,
          isValidating: false,
          isDirty: false,
          isValid: true,
          errors: {},
        },
      },
      field: {
        name: "name",
        type: "text",
        label: "Name",
        value: "John Doe",
        onChange: vi.fn(),
      },

      AppField: vi.fn(({ children }) => {
        return children({
          name: "name",
          type: "text",
          label: "Name",
          value: "John Doe",
          onChange: vi.fn(),
        });
      }),
      AppForm: vi.fn(({ children }) => {
        return <form onSubmit={(e) => e.preventDefault()}>{children}</form>;
      }),
      SubmitButton: vi.fn(({ children }) => {
        return <button type="submit">{children}</button>;
      }),
      TextField: vi.fn(({ label, type }) => {
        return <input type={type} placeholder={label} />;
      }),
      CheckboxField: vi.fn(({ label }) => {
        return (
          <div>
            <input type="checkbox" />
            <label>{label}</label>
          </div>
        );
      }),
      SelectField: vi.fn(({ options }) => {
        return (
          <select>
            {options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }),
      NumberField: vi.fn(({ label, type }) => {
        return <input type={type} placeholder={label} />;
      }),
    }),),
    useFieldContext: vi.fn(),
  };
});
/*currently fails due to inacdequate mocking of the form library*/
test("UserRegistrationForm renders correctly", () => {
  const formData = {
    title: "User Registration",
    fields: [
      { label: "Name", type: "text", name: "name", require: true },
      { label: "Age", type: "number", name: "age" },
      {
        label: "Subscribe",
        type: "checkbox",
        name: "subscribe",
      },
      {
        label: "Gender",
        type: "select",
        name: "gender",
        options: ["Male", "Female", "Other"],
      },
    ],
  };
  render(<UserRegistrationForm formData={formData} />);
  expect(screen.getByText("User Registration")).toBeInTheDocument();
});
