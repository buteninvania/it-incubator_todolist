import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { TaskItem } from "../taskitem/TaskItem";
import {SuperInputTextPropsType, TextInput } from "./TextInput";

export default {
    title: 'Todolist/TextInput',
    component: TextInput,
    argTypes: {
        onChangeText: {
            description: 'callback function on text changes in input'
        },
        onEnter: {
            description: "callback function after pressing the 'Enter' button"
        },
        error: {
            description: 'Have an error? Show "span" with an error',
        },
        spanClassName: {
            description: 'Set class for span error?'
        }
    }
} as Meta;

const onChangeTextCallback = action('Entered into symbol')
const onEnterCallback = action('Pressed enter')

const Template: Story<SuperInputTextPropsType> = (args) => <TextInput {...args}/>

const baseArgs = {
    onChangeText: onChangeTextCallback,
    onEnter: onEnterCallback,
}

export const TaskInputStory = Template.bind({})

TaskInputStory.args = {
    ...baseArgs
}
