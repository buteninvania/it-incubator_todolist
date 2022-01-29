import { ComponentMeta, ComponentStory, Meta, Story } from "@storybook/react";
import {action} from "@storybook/addon-actions";
import { EditableSpan, EditableSpanPropsType } from "./EditableSpan";

export default {
    title: "Todolist/EditableSpan",
    component: EditableSpan,
    argTypes: {
        title: {
            description: "init title of the editable span",
            defaultValue: "Editable span"
        },
        onChangeSpan: {
            description: "Value editable span changed"
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args = {
    onChangeSpan: action('Value Editable Span changed'),
}