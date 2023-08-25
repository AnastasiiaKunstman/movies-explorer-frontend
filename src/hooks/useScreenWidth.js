import { useEffect, useState } from 'react';

function useScreenWidth() {
    const [windowWidth, setWindowWidth] = useState(undefined);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        function resizeThrottle() {
            let timer;
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    handleResize();
                }, 500);
            };
        };

        window.addEventListener('resize', resizeThrottle);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowWidth;
};

export default useScreenWidth;
