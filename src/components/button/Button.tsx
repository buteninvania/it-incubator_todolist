import React from 'react';
import s from './button.module.css';

export type ButtonPropsType = {
  name: string
  callBack: () => void
  active?: boolean
};

export const Button: React.FC<ButtonPropsType> = React.memo(({
                                                               name,
                                                               callBack,
                                                               active,
                                                             }) => {

  const onClickHandler = () => callBack();

  return (
    <button className={!active ? s.button : s.button + ' ' + s.activeFilter}
            onClick={onClickHandler}>
      {name}
    </button>
  );
});

