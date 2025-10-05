import React from 'react';
import NASAViewer from '../../components/NASAViewer/NASAViewer';
import { useNavigate } from 'react-router-dom';

const EarthViewer = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/web-navigation');
    };

    return (
        <NASAViewer 
            planetName="Earth" 
            onClose={handleClose}
        />
    );
};

export default EarthViewer;
