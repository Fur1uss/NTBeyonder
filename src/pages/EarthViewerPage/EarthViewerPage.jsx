import React from 'react';
import EarthViewer from '../../components/EarthViewer/EarthViewer';

const EarthViewerPage = () => {
    const handleClose = () => {
        window.history.back();
    };

    return <EarthViewer onClose={handleClose} />;
};

export default EarthViewerPage;
