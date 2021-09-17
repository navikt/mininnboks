import * as React from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import classNames from 'classnames';

function noAriaTellerTekst(antallTegn: number, maxLength: number) {
    const difference = maxLength - antallTegn;
    const cls = classNames('teller-tekst', { 'teller-tekst--overflow': difference < 0 });
    return (
        <span className={cls} aria-live={difference < 20 ? 'polite' : 'off'}>
            {difference >= 0 && `Du har ${difference} tegn igjen`}
            {difference < 0 && `Du har ${Math.abs(difference)} tegn for mye`}
        </span>
    );
}

function NoAriaTextarea(props: TextareaProps) {
    return <Textarea {...props} tellerTekst={noAriaTellerTekst} />;
}

export default NoAriaTextarea;
