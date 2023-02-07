import React from 'react';
import { Route, Routes } from 'react-router-dom';

// React components
import { Auth, MainApp } from './pages';

const App = () => {
    return (
        <Routes>
            <Route exact path='/' element={<MainApp />} />
            <Route exact path='/:chatId' element={<MainApp />} />
            <Route exact path='/authenticate' element={<Auth />} />
        </Routes>
    );
};

export default App;
