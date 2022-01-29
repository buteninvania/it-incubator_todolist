import {ComponentMeta, ComponentStory, Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import AppWitchRedux from "./AppWitchRedux";
import {Provider} from "react-redux";
import {store} from "./state/store-redux";
import { ReduxStoreProviderDecorator } from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWitchRedux',
    component: AppWitchRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWitchRedux/>

export const AppWitchReduxStory = Template.bind({})

AppWitchReduxStory.args = {}