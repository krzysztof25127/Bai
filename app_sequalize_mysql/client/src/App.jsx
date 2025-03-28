import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TutorialsList from "./components/TutorialsList.jsx";
import AddTutorial from "./components/AddTutorial.jsx";
import EditTutorial from "./components/EditTutorial.jsx";


const App = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<TutorialsList />} />
                    <Route path="/add" element={<AddTutorial />} />
                    <Route path="/tutorials/:id/edit" element={<EditTutorial />} />
                </Routes>
            </div>
        </>
    );
};

export default App;