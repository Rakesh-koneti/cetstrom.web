import { useEffect, useState } from 'react';

export function UgadiGreeting() {
    const [show, setShow] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [countdown, setCountdown] = useState(10);

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
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(timer);
            }
        } else {
            // If already shown, hide immediately
            setShow(false);
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 9999,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{ 
                textAlign: 'center',
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '90vh',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}>
                <img 
                    src="/ugadi-wishes.jpg" 
                    alt="Happy Ugadi" 
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        transition: 'transform 0.3s ease',
                        display: imageLoaded ? 'block' : 'none',
                        borderRadius: '5px'
                    }}
                    onLoad={() => setImageLoaded(true)}
                />
                {imageLoaded && (
                    <div style={{
                        position: 'absolute',
                        bottom: '-40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        fontFamily: 'Arial, sans-serif',
                        whiteSpace: 'nowrap'
                    }}>
                        Closing in {countdown} seconds...
                    </div>
                )}
                <button 
                    onClick={() => setShow(false)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        transition: 'background 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'}
                >
                    ×
                </button>
            </div>
        </div>
    );
} 