import React from 'react';
import MarsViewer from '../../components/MarsViewer/MarsViewer';
import { useNavigate } from 'react-router-dom';

const MarsViewerPage = () => {
    const navigate = useNavigate();

    const handleCloseViewer = () => {
        navigate('/web-navigation');
    };

    return (
        <MarsViewer onClose={handleCloseViewer} />
    );
};

export default MarsViewerPage;
