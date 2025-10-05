import React from 'react';
import NASAViewer from '../../components/NASAViewer/NASAViewer';
import { useNavigate } from 'react-router-dom';

const VenusViewer = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/web-navigation');
    };

    return (
        <NASAViewer 
            planetName="Venus" 
            onClose={handleClose}
        />
    );
};

export default VenusViewer;
