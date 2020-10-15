import * as React from 'react';
import Innholdslaster from "../innholdslaster/Innholdslaster";
import {useAppState} from "../utils/custom-hooks";
import {Avhengighet} from "../avhengigheter";
import {Traad} from "../Traad";
import { harTraader } from 'ducks/traader';


function Traader(props : React.HtmlHTMLAttributes<HTMLElement>) {

    const traaderResources = useAppState(state => state.traader);
    const traader = harTraader(traaderResources) ? traaderResources.data : [];
    const traaderAvhengigheter: Avhengighet<Traad[]> = {data: traader, status: traaderResources.status}
    return (
        <Innholdslaster avhengigheter={[traaderAvhengigheter]}>
            {props.children}
        </Innholdslaster>
    );
}
export default Traader;
