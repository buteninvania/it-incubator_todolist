/*******************Error component*********************/
import React from 'react';
import './../App.css'

export const Error: React.FC<ErrorPropsType> = ({text}) => {
    return (
        <div className="error-message">
            {text}
        </div>
    );
};

type ErrorPropsType = {
    text: string | boolean
};

/*************************************************************/

