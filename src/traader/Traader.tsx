import * as React from 'react';
import Innholdslaster from '../innholdslaster/Innholdslaster';
import { useAppState, useOnMount } from '../utils/custom-hooks';
import { useDispatch } from 'react-redux';
import { hentTraader } from '../ducks/traader';

function Traader(props: React.HtmlHTMLAttributes<HTMLElement>) {
    const traaderState = useAppState((state) => state.traader);
    const dispatch = useDispatch();
    useOnMount(() => {
        dispatch(hentTraader());
    });

    return <Innholdslaster avhengigheter={[traaderState]}>{props.children}</Innholdslaster>;
}

export default Traader;
