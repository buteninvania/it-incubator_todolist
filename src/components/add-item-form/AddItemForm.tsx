import {TextInput} from '../text-input/TextInput';
import {Button} from '../button/Button';
import {Error} from '../Error';
import React, {useCallback, useState} from 'react';
import s from './addItemForm.module.css'

/***********************AddItemForm**************************/

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({addItem}) => {

    const [inputText, setInputText] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onChangeInputHandler = (text: string) => {
        setError('')
        setInputText(text)
    }

    const addTaskButtonHandler = () => {
        if (inputText.trim()) {
            addItem(inputText.trim())
            setInputText('')
        } else {
            setError('Enter something')
            setInputText('')
        }
    }

    console.log('Add-Item-Form')

    return (
        <div className={s.form}>
            <TextInput placeholder={'Enter text...'}
                       className={error ? "error" : s.input}
                       type={'text'}
                       value={inputText}
                       onChangeText={onChangeInputHandler}
                       onEnter={addTaskButtonHandler}/>
            <Button name={'+'} callBack={addTaskButtonHandler}/>
            {error && <Error text={error}/>}
        </div>
    )
})

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

/**********************************************************/