import { TextInput } from '../text-input/TextInput';
import { Button } from '../button/Button';
import React, { useCallback, useState } from 'react';
import s from './AddItemForm.module.css';
import { Error } from './../error/Error';

interface AddItemFormPropsType {
  /** @param title the parameter must be a string */
  addItem: (title: string) => void;
  /** Will placeholder be set for the text field? */
  placeholder?: string;
}

/**
 * The main component that adds some text entity through the callback function
 */
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({
                                                                         addItem,
                                                                         placeholder,
                                                                       }) => {

  const [inputText, setInputText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onChangeInputHandler = (text: string) => {
    setError('');
    setInputText(text);
  };

  const addTaskButtonHandler = useCallback(() => {
    if (inputText.trim()) {
      addItem(inputText.trim());
      setInputText('');
    } else {
      setError('Enter something');
      setInputText('');
    }
  }, [inputText, addItem]);

  console.log('Add-Item-Form');

  return (
    <div className={s.form}>
      <TextInput placeholder={placeholder ? placeholder : 'Enter text...'}
                 className={error ? 'error' : s.input}
                 type={'text'}
                 value={inputText}
                 onChangeText={onChangeInputHandler}
                 onEnter={addTaskButtonHandler} />
      <Button name={'+'} callBack={addTaskButtonHandler} />
      {error && <Error text={error} />}
    </div>
  );
});
