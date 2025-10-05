import React from 'react';
import NASAViewer from '../../components/NASAViewer/NASAViewer';
import { useNavigate } from 'react-router-dom';

const MarsViewer = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/web-navigation');
    };

    return (
        <NASAViewer 
            planetName="Mars" 
            onClose={handleClose}
        />
    );
};

export default MarsViewer;
