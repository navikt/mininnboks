import * as React from 'react';
import Innholdslaster from '../innholdslaster/Innholdslaster';
import { useAppState } from '../utils/custom-hooks';

function Traader(props: React.HtmlHTMLAttributes<HTMLElement>) {
    const traaderState = useAppState(state => state.traader);

    return (
        <Innholdslaster avhengigheter={[traaderState]}>
            {props.children}
        </Innholdslaster>
    );
}

export default Traader;
