import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { axios } from './config';

// React components
import { Auth, MainApp } from './pages';

const App = () => {
    const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get('/messages/sync')
    //         .then((response) => setMessages(response.data))
    //         .catch((err) => console.log(err));
    // }, []);

    return (
        <Routes>
            <Route exact path='/' element={<MainApp messages={messages} />} />
            <Route exact path='authenticate' element={<Auth />} />
        </Routes>
    );
};

export default App;
