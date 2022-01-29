import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import React from 'react';
import s from './textInput.module.css';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type SuperInputTextPropsType = DefaultInputPropsType & {
    /**
     * @param value - string, callback function on text changes in input
     */
    onChangeText?: (value: string) => void
    /**
     * callback function after pressing the 'Enter' button
     */
    onEnter?: () => void
    /**
     * Have an error? Show 'span' with an error
     */
    error?: string
    /**
     * Set class for span error?
     */
    spanClassName?: string
}

export const TextInput: React.FC<SuperInputTextPropsType> = React.memo(({
                                                                            type, onChange, onChangeText, onKeyPress,
                                                                            onEnter, error,
                                                                            className, spanClassName, ...restProps
                                                                        }) => {

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

            {...restProps}
        />
        {error && <span className={finalSpanClassName}>{error}</span>}
    </>
});


