import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import React from "react";
import {legacy_createStore as createStore} from "redux";
import {render} from "@testing-library/react";
import {rootReducer} from "../store/root-reducer";

export const renderWithProviders = (
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = createStore(rootReducer, preloadedState),
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({children}) =>
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>;

    // Return an object with the store and all of RTL's query functions
    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
