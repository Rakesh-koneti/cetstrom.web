import { useEffect, useState } from 'react';

export function UgadiGreeting() {
    const [show, setShow] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        // Check if this is the first visit
        if (!sessionStorage.getItem('ugadiShown')) {
            // Set a flag to indicate the image has been shown
            sessionStorage.setItem('ugadiShown', 'true');
            
            // Start countdown only after image is loaded
            if (imageLoaded) {
                const timer = setInterval(() => {
                    setCountdown(prev => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setShow(false);
                            // Force a hard redirect
                            window.location.href = 'https://cetstrom.in';
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(timer);
            }
        } else {
            // If already shown, redirect immediately
            window.location.href = 'https://cetstrom.in';
        }
    }, [imageLoaded]);

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            zIndex: 9999
        }}>
            <div style={{ textAlign: 'center' }}>
                <img 
                    src="/ugadi-wishes.jpg" 
                    alt="Happy Ugadi" 
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        transition: 'transform 0.3s ease',
                        display: imageLoaded ? 'block' : 'none'
                    }}
                    onLoad={() => setImageLoaded(true)}
                />
                {imageLoaded && (
                    <div style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        Redirecting in {countdown} seconds...
                    </div>
                )}
            </div>
        </div>
    );
} 