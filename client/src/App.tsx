import ComponentsPreview from './ComponentsPreview';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/components-preview" element={<ComponentsPreview />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
