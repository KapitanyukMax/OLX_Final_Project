import ComponentsPreview from './ComponentsPreview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdvertCreatePage } from './pages/AdvertCreatePage';
import { AuthModal } from './pages/RegistrationPage/AuthModal';
import { AdvertPage } from './pages/AdvertPage';
import { ProfilePage } from './pages/ProfilePage';
import { Layout } from './Layout';
import './App.css';
import { UserProfilePage } from './pages/UserProfilePage';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="advert/:advertId" element={<AdvertPage />} />
                        <Route path="profile-page" element={<ProfilePage />} />
                        <Route path="advert-create" element={<AdvertCreatePage />} />
                        <Route path="user/:userId" element={<UserProfilePage />} />
                    </Route>

                    <Route path="/components-preview" element={<ComponentsPreview />} />
                    <Route path="/registration" element={<AuthModal />} />
                </Routes>
            </Router>
        </>
    )
}

export default App 
