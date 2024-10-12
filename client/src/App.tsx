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
import { AllAdvertsPage } from './pages/AllAdvertsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AdminPage } from './pages/AdminPage';
import { CategoryEditPage } from './pages/AdminPage/categoryEdit';
import { CategoryCreatePage } from './pages/AdminPage/categoryCreate';
import { SubCategoryCreatePage } from './pages/AdminPage/subCategoryCreate';
import './App.css';
import { SubCategoryEditPage } from './pages/AdminPage/subCategoryEdit';
import { DeliveryPage } from './pages/DeliveryPage';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import axios from 'axios';

function App() {
    const host = import.meta.env.VITE_HOST;

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        });

        return () => unsubscribe();
    }, []);

    const setUser = async () => {
        if (currentUser) {
            try {
                const response = await axios.get(`${host}/users/email?email=${currentUser.email}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        }
    }

    useEffect(() => {
        setUser();
    }, [currentUser]);

    useEffect(() => {
        setIsAdmin(userData?.isAdmin);
        console.log("Admin " + isAdmin);
    }, [userData]);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="home" element={<HomePage />} />
                        <Route path="adverts/:categoryName" element={<AllAdvertsPage />} />
                        <Route path="adverts" element={<AllAdvertsPage />} />
                        <Route path="adverts-top" element={<AllAdvertsPage top />} />
                        <Route path="adverts-vip" element={<AllAdvertsPage vip />} />
                        <Route path="advert/:advertId" element={<AdvertPage />} />
                        <Route path="profile-page" element={<ProfilePage />} />
                        <Route path="advert-create" element={<AdvertCreatePage />} />
                        <Route path="advert-edit/:advertId" element={<AdvertEditPage />} />
                        <Route path="user/:userId" element={<UserProfilePage />} />
                        <Route path="favorites/:userId" element={<FavoritesPage />} />
                        <Route path="admin-panel" element={<AdminPage />} />
                        <Route path="delivery/:advertId" element={<DeliveryPage />} />
                    </Route>

                    {
                        isAdmin && (
                            <Route path="/" element={<Layout />}>
                                <Route path="admin-panel" element={<AdminPage />} />
                                <Route path="subcategory-create/:categoryId" element={<SubCategoryCreatePage />} />
                                <Route path="subcategory-edit/:subcategoryId" element={<SubCategoryEditPage />} />
                                <Route path="category-edit/:categoryId" element={<CategoryEditPage />} />
                                <Route path="category-create" element={<CategoryCreatePage />} />
                                <Route path="admin-panel" element={<AdminPage />} />
                            </Route>
                        )
                    }

                    <Route path="/components-preview" element={<ComponentsPreview />} />
                    <Route path="/registration" element={<AuthModal />} />
                </Routes>
            </Router>
        </>
    )
}

export default App 
