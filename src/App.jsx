import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsList from './features/Posts/PostsList/PostsList.jsx';
import PostDetail from './features/Posts/PostDetail/PostDetail.jsx';
import Header from "./widgets/Header/Header.jsx";
import { Provider } from 'react-redux';
import store from './store/store.js';
import './App.scss'

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<PostsList/>} />
                    <Route path="/post/:id" element={<PostDetail/>} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;