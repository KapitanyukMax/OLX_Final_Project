import { StyledEngineProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import Footer from './components/footer';

const Layout = () => {
    return (
        <StyledEngineProvider injectFirst>
            <Header />
            <Outlet />
            <Footer />
        </StyledEngineProvider>
    );
};

export { Layout };
