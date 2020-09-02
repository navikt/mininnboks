import * as React from 'react';
import Innholdslaster from './../innholdslaster/innholdslaster';
import { useSelector} from "react-redux";
import {AppState} from "../reducer";


interface Props {
    children: JSX.Element
}

function Traader(props : Props) {
    const traader = useSelector((state: AppState) => state.traader).data;
    return (
        <Innholdslaster avhengigheter={[traader]}>
            {props.children}
        </Innholdslaster>
    );
}
export default Traader;
