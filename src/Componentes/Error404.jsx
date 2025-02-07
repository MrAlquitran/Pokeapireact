import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

    const inicio = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Error 404</h1>
            <p>Upss... Parece que ha habido un error</p>
            <button onClick={inicio} style={{ padding: '10px 20px', fontSize: '16px' }}>
                ¿Quieres volver al inicio?
            </button>
        </div>
    );
};

export default Error404;