import ComponentsPreview from './ComponentsPreview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdvertCreatePage } from './pages/AdvertCreatePage';
import { AuthModal } from './pages/RegistrationPage/AuthModal';
import { AdvertPage } from './pages/AdvertPage';
import { ProfilePage } from './pages/ProfilePage';
import './App.css';
import { UserProfilePage } from './pages/UserProfilePage';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/components-preview" element={<ComponentsPreview />} />
                    <Route path="/advert-create" element={<AdvertCreatePage />} />
                    <Route path="/registration" element={<AuthModal />} />
                    <Route path="/advert/:advertId" element={<AdvertPage />} />
                    <Route path="/profile-page" element={<ProfilePage />} />
                    <Route path="/user/:userId" element={<UserProfilePage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App 
