/*******************Error component*********************/
import React from 'react';
import './../App.css'

export const Error: React.FC<ErrorPropsType> = React.memo(({text}) => {

    console.log('super-error')

    return (
        <div className="error-message">
            {text}
        </div>
    );
});

type ErrorPropsType = {
    text: string | boolean
};

/*************************************************************/

