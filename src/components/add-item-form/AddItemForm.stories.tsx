import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AddItemForm } from './AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: 'Callback function that fires when a value is submitted from the form (use the \'Enter\' and \'+\' button',
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder of the input is set for flexible display of the input',
    },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
  addItem: action('AddItemForm'),
};
