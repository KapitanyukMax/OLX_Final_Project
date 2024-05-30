import { Register } from './components/RegisterPage/Register';
import { Login } from './components/LoginPage/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
