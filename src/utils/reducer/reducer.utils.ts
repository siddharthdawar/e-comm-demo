import {UnknownAction} from 'redux';

type Matchable<AC extends () => UnknownAction> = AC & { // AC -> some generic action creator that returns a generic action type
    type: ReturnType<AC>['type']; // this will reach into the action and get the "type" value
    match(action: UnknownAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => UnknownAction & {type: string}>(actionCreator: AC): Matchable<AC>;
export function withMatcher<AC extends (...args: any[]) => UnknownAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;

    return Object.assign(actionCreator, {
        type,
        match: (action: UnknownAction) => action.type === type
    });
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

export type ActionWithoutPayload<T> = {
    type: T;
};

// Function overloading for createAction
// now createAction can return either ActionWithPayload (if both type and payload are passed)
// or ActionWithoutPayload (if only type is passed)
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string>(type: T, payload: void): ActionWithoutPayload<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
    return {type, payload};
}

/* export const createAction = (type, payload) => ({
    type,
    payload
}); */
