import ComponentsPreview from './ComponentsPreview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdvertCreatePage } from './pages/AdvertCreatePage';
import { AdvertEditPage } from './pages/AdvertEditPage';
import { AuthModal } from './pages/RegistrationPage/AuthModal';
import { AdvertPage } from './pages/AdvertPage';
import { ProfilePage } from './pages/ProfilePage';
import { HomePage } from './pages/HomePage';
import { Layout } from './Layout';
import { UserProfilePage } from './pages/UserProfilePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AdminPage } from './pages/AdminPage';
import { CategoryEditPage } from './pages/AdminPage/categoryEdit';
import { CategoryCreatePage } from './pages/AdminPage/categoryCreate';
import { SubCategoryCreatePage } from './pages/AdminPage/subCategoryCreate';
import './App.css';
import { SubCategoryEditPage } from './pages/AdminPage/subCategoryEdit';
import { DeliveryPage } from './pages/DeliveryPage';

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
                        <Route path="category-edit/:categoryId" element={<CategoryEditPage />} />
                        <Route path="category-create" element={<CategoryCreatePage />} />
                        <Route path="subcategory-edit/:subcategoryId" element={<SubCategoryEditPage />} />
                        <Route path="subcategory-create/:categoryId" element={<SubCategoryCreatePage />} />
                        <Route path="user/:userId" element={<UserProfilePage />} />
                        <Route path="favorites/:userId" element={<FavoritesPage />} />
                        <Route path="admin-panel" element={<AdminPage />} />
                        <Route path="delivery/:advertId" element={<DeliveryPage />} />
                    </Route>

                    <Route path="/components-preview" element={<ComponentsPreview />} />
                    <Route path="/registration" element={<AuthModal />} />
                </Routes>
            </Router>
        </>
    )
}

export default App 
