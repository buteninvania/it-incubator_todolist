import { ComponentMeta, ComponentStory } from "@storybook/react";
import {action} from "@storybook/addon-actions";
import AppWitchRedux from "./AppWitchRedux";
import { Provider } from "react-redux";
import { store } from "./state/store-redux";

export default {
    title: 'Todolist/AppWitchRedux',
    component: AppWitchRedux,

} as ComponentMeta<typeof AppWitchRedux>;

const Template:ComponentStory<typeof AppWitchRedux> = (args) => <Provider store={store}><AppWitchRedux /></Provider>

export const AppWitchReduxStory = Template.bind({})

AppWitchReduxStory.args = {

}