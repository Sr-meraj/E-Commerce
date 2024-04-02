import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [location.pathname]);

    return children;
};

export default ScrollToTop;
