import formJson from "./components/form/form.json";
import { DynamicForm } from "./ui/dynamicForm";

import "./App.css";

function App() {
  return (
    <>
      <DynamicForm formData={formJson} />
    </>
  );
}

export default App;
