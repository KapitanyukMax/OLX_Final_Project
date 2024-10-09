import ComponentsPreview from './ComponentsPreview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdvertCreatePage } from './pages/AdvertCreatePage';
import { AdvertEditPage } from './pages/AdvertEditPage';
import { AuthModal } from './pages/RegistrationPage/AuthModal';
import { AdvertPage } from './pages/AdvertPage';
import { ProfilePage } from './pages/ProfilePage';
import { HomePage } from './pages/HomePage';
import { Layout } from './Layout';
import './App.css';
import { UserProfilePage } from './pages/UserProfilePage';
import { FavoritesPage } from './pages/FavoritesPage';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="home" element={<HomePage />} />
                        <Route path="advert/:advertId" element={<AdvertPage />} />
                        <Route path="profile-page" element={<ProfilePage />} />
                        <Route path="advert-create" element={<AdvertCreatePage />} />
                        <Route path="advert-edit/:advertId" element={<AdvertEditPage />} />
                        <Route path="user/:userId" element={<UserProfilePage />} />
                        <Route path="favorites/:userId" element={<FavoritesPage />} />
                    </Route>

                    <Route path="/components-preview" element={<ComponentsPreview />} />
                    <Route path="/registration" element={<AuthModal />} />
                </Routes>
            </Router>
        </>
    )
}

export default App 
