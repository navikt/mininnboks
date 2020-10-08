import * as React from 'react';
import Innholdslaster from "../innholdslaster/Innholdslaster";
import {useAppState} from "../utils/custom-hooks";
import {TraaderState} from "../ducks/traader";
import {Avhengighet} from "../avhengigheter";
import {Traad} from "../Traad";

export const hasTraader = (traader : TraaderState) => {
    if(traader.data instanceof Error){
        return []
    }
    return traader.data
}
function Traader(props : React.HtmlHTMLAttributes<HTMLElement>) {

    const traader = useAppState(state => state.traader);
    const traaderAvhengigheter: Avhengighet<Traad> = {data: hasTraader(traader), status: traader.status}
    return (
        <Innholdslaster avhengigheter={traaderAvhengigheter}>
            {props.children}
        </Innholdslaster>
    );
}
export default Traader;
