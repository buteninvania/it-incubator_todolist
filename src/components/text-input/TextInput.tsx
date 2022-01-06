/*******************TextInput component*********************/
import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import React from 'react';
import s from './textInput.module.css'

export const TextInput: React.FC<SuperInputTextPropsType> = React.memo(({   type, onChange,
                                                                 onChangeText, onKeyPress,
                                                                 onEnter, error,
                                                                 className, spanClassName, ...restProps}) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter()
    }


    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = error ? `${s.errorInput} ${className}` : `${className}`


    return <>
        <input
            type={'text'}
            onChange={onChangeCallback}
            onKeyPress={onKeyPressCallback}
            className={finalInputClassName}

            {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        />
        {error && <span className={finalSpanClassName}>{error}</span>}
    </>
});


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}
/*************************************************************/

