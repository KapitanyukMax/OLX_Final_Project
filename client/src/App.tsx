import ComponentsPreview from './ComponentsPreview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AdvertCreatePage } from './pages/AdvertCreatePage';
import './App.css';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/components-preview" element={<ComponentsPreview />} />
                    <Route path="/advert-create" element={<AdvertCreatePage />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
