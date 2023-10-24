import "./App.css";
import Login from "./assets/Auth/Login";
import Register from "./assets/Auth/Register";
import Dashboard from "./assets/Reminder/Dashboard";
import Header from "./assets/Reminder/Header";
import { Route, Routes ,BrowserRouter} from "react-router-dom";

function App() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      
    </>
  );
}

export default App;
