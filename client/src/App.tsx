// import { Register } from './components/RegisterPage/Register';
// import { Login } from './components/LoginPage/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateCategoryPage } from './pages/CreateCategoryPage';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
          <Route path="/create-category" element={<CreateCategoryPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
