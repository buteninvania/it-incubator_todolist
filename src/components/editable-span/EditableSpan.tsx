/***********************EditableSpan**************************/
import React, {useState} from 'react';
import { TextInput } from '../text-input/TextInput';
import s from './editableSpan.module.css'

export const EditableSpan: React.FC<EditableSpanPropsType> = ({onChangeSpan, title}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputText, setInputText] = useState<string>('')

    const changeTextInputHandler = (text: string) => {
        setInputText(text)
    }
    const keyPressEnterHandler = () => {
        setEditMode(false)
        onChangeSpan(inputText)
    }
    const onBlurInputHandler = () => {
        setEditMode(false)
        onChangeSpan(inputText)
    }
    const onDoubleClickSpan = () => {
        setEditMode(true)
        setInputText(title)
    }


    return (
        <>
            {editMode ? <TextInput className={s.input} onBlur={onBlurInputHandler} autoFocus
                                   onChangeText={changeTextInputHandler} value={inputText} onEnter={keyPressEnterHandler}/>
                      : <span className={s.span} onDoubleClick={onDoubleClickSpan}>{title}</span>}
        </>
    )
}

type EditableSpanPropsType = {
    onChangeSpan: (title: string) => void
    title: string
}

/**********************************************************/