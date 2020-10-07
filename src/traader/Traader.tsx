import * as React from 'react';
import Innholdslaster from "../innholdslaster/Innholdslaster";
import {useAppState} from "../utils/custom-hooks";
import {TraaderState} from "../ducks/traader";

export const hasTraader = (traader : TraaderState) => {
    if(traader.data instanceof Error){
        return []
    }
    return traader.data
}
function Traader(props : React.HtmlHTMLAttributes<HTMLElement>) {

    const traader = useAppState(state => state.traader);

    return (
        <Innholdslaster avhengigheter={hasTraader(traader)}>
            {props.children}
        </Innholdslaster>
    );
}
export default Traader;
