/*******************Button component*********************/
import React from 'react';
import s from './button.module.css'

export const Button: React.FC<ButtonPropsType> = React.memo(({name, callBack, active}) => {

    const onClickHandler = () => callBack()

    console.log('super-button')

    return (<button className={!active ? s.button : s.button + " " + s.activeFilter} onClick={onClickHandler}>{name}</button>)
});

type ButtonPropsType = {
    name: string
    callBack: () => void
    active?: boolean
};

/*************************************************************/

