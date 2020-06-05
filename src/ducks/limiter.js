// Action Creators
import {doThenDispatch} from "./utils";
import * as Api from "../utils/api";

export function kanSendeMelding() {
    return doThenDispatch(() => Api.kanSendeMelding(), {
    });
}