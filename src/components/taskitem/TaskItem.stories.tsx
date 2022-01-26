import { ComponentMeta, ComponentStory } from "@storybook/react";
import {action} from "@storybook/addon-actions";
import { TaskItem } from "./TaskItem";

export default {
    title: 'Todolist/TaskItem',
    component: TaskItem,
    argTypes: {

    }
} as ComponentMeta<typeof TaskItem>;

const Template:ComponentStory<typeof TaskItem> = (args) => <TaskItem {...args}/>

export const TaskItemStory = Template.bind({})

TaskItemStory.args = {

}
