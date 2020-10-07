import {STATUS} from "./ducks/ducks-utils";

export type Avhengighet<T> = { status: STATUS;  data: T}