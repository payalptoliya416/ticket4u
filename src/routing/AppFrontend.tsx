import React from 'react';
import MainPage from '@/frontend/routing/MainPage';
import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import EventParchas from '@/frontend/routing/EventParchas';
import PageHandler from '@/frontend/routing/PageHandler';
import PageNotFound from './PageNotFound';


function AppFrontend() {

    return (
        <>
            <ScrollToTop>
                <Routes >
                    <Route path="/" element={<MainPage />} />
                    <Route  path="/:title" element={<PageHandler />}  />
                    <Route path="/eventparchas" element={<EventParchas />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </ScrollToTop>
        </>
    );
}

export default AppFrontend;
