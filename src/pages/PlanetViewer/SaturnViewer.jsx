import React from 'react';
import NASAViewer from '../../components/NASAViewer/NASAViewer';
import { useNavigate } from 'react-router-dom';

const SaturnViewer = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/web-navigation');
    };

    return (
        <NASAViewer 
            planetName="Saturn" 
            onClose={handleClose}
        />
    );
};

export default SaturnViewer;
