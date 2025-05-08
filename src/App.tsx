import formJson from "./components/form/form.json";
import { UserRegistrationForm } from "./ui/userRegistrationForm";

import "./App.css";

function App() {
  return (
    <>
      <UserRegistrationForm formData={formJson} />
    </>
  );
}

export default App;
