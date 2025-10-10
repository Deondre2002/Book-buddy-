import { useContext } from "react";
import { AuthContext } from "./RoleA/AuthContext";
import { Register } from "./RoleA/Register";

export default function App() {
  const value = useContext(AuthContext);
  return (<>
    <main>
      <h1>RUNNING</h1>
      <Register />
    </main>
  
  
  
  
  
  </>);
}
