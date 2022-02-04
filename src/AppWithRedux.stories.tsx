import {Meta, Story} from '@storybook/react';
import AppWitchRedux from './AppWitchRedux';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator';

export default {
    title: 'Todolist/AppWitchRedux',
    component: AppWitchRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWitchRedux/>

export const AppWitchReduxStory = Template.bind({})

AppWitchReduxStory.args = {}