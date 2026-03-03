import { type FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard/DashboardPage';

const AppRouter: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
