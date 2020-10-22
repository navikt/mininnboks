import * as React from 'react';
import Innholdslaster from '../innholdslaster/Innholdslaster';
import { useAppState } from '../utils/custom-hooks';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { hentTraader } from '../ducks/traader';

function Traader(props: React.HtmlHTMLAttributes<HTMLElement>) {
    const traaderState = useAppState(state => state.traader);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('fetching data');
        dispatch(hentTraader());
    }, []);

    return (
        <Innholdslaster avhengigheter={[traaderState]}>
            {props.children}
        </Innholdslaster>
    );
}

export default Traader;
