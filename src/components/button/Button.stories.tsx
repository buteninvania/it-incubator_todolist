import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonPropsType } from "./Button";

export default {
    title: 'Todolist/Button',
    component: Button,
    argTypes: {
        name: {
            description: 'button name',
            defaultValue: 'Click'
        },
        callBack: {
            description: 'callback function'
        },
        active: {
            description: 'Is the button active?'

        }
    }
} as Meta;

const Template: Story<ButtonPropsType> = (args) => <Button {...args}/>

export const ButtonStory = Template.bind({})

ButtonStory.args = {
    callBack: action('Callback function Button')
}