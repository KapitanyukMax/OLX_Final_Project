import ComponentsPreview from './ComponentsPreview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdvertCreatePage } from './pages/AdvertCreatePage';
import { AuthModal } from './pages/RegistrationPage/AuthModal';
import { AdvertPage } from './pages/AdvertPage';
import './App.css';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/components-preview" element={<ComponentsPreview />} />
                    <Route path="/advert-create" element={<AdvertCreatePage />} />
                    <Route path="/registration" element={<AuthModal />} />
                    <Route path="/advert-page" element={<AdvertPage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
