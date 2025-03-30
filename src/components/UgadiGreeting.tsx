import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UgadiGreeting() {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if this is the first visit
        if (!sessionStorage.getItem('ugadiShown')) {
            // Set a flag to indicate the image has been shown
            sessionStorage.setItem('ugadiShown', 'true');
            
            // Start countdown
            const timer = setTimeout(() => {
                setShow(false);
                navigate('/');
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            // If already shown, redirect immediately
            navigate('/');
        }
    }, [navigate]);

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
                        transition: 'transform 0.3s ease'
                    }}
                />
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
                    Redirecting in 3 seconds...
                </div>
            </div>
        </div>
    );
} 