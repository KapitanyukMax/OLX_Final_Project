import { Register } from './pages/RegisterPage/Register';
import { Login } from './pages/LoginPage/Login';
import TestPage from './pages/TestPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/test-page" element={<TestPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
