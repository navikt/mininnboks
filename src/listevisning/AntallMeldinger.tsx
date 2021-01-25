import * as React from 'react';
import classNames from 'classnames';

function AntallMeldinger({ antall }: { antall: number }) {
    const antallCls = classNames('antall-ikon', {
        'antall-en': antall === 1,
        'antall-flere': antall > 1
    });
    let antallTekst = antall === 1 ? '' : null;
    let flereMeldingerAriaLabel = null;

    if (antall > 1) {
        if (antall < 10) {
            antallTekst = antall.toString();
        } else {
            antallTekst = '9+';
        }

        flereMeldingerAriaLabel = antall === 1 ? `${antall} melding i tråden` : `${antall} meldinger i tråden`;
    }

    return (
        <div className={antallCls}>
            <span aria-hidden="true">{antallTekst}</span>
            <span className="vekk">{flereMeldingerAriaLabel}</span>
        </div>
    );
}

export default AntallMeldinger;
