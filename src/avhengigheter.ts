import { STATUS } from './ducks/ducks-utils';

export interface OtherState {
    status: STATUS.NOT_STARTED | STATUS.PENDING
}

export interface OkState<T> {
    status: STATUS.OK | STATUS.RELOADING;
    data: T;
}

export interface ErrorState {
    status: STATUS.ERROR;
    error: Error;
}

export function harData<T>(state: Avhengighet<T>): state is OkState<T> {
    return [STATUS.OK, STATUS.RELOADING].includes(state.status);
}

export function harFeil<T>(state: Avhengighet<T>): state is ErrorState {
    return STATUS.ERROR === state.status;
}

export type Avhengighet<T> = OkState<T> | ErrorState | OtherState;
