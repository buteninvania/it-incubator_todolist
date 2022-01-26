import { ComponentMeta, ComponentStory } from "@storybook/react";
import {action} from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        title: {
            description: 'default title'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template:ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args = {
    onChangeSpan: action('EditableSpan'),
}