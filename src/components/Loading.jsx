import React from 'react';

function Loading(props) {
    return (
        <div className='spinner-border text-primary' role="status">
            <span className='visual-hidden'>Loading....</span>
        </div>
    );
}

export default Loading;