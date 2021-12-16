import React, { useState } from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Panel from 'nav-frontend-paneler';
import AdresseTypeahead from './AdresseTypeahead';
import { Adresse } from './AdresseUtils';

function ManglerGtAdvarsel(props: { mangletGt: boolean }) {
    if (props.mangletGt) {
        return <AlertStripeAdvarsel>Kunne ikke utlede geografisk tilknytning basert på adressen.</AlertStripeAdvarsel>;
    }
    return null;
}

function Adressesok(props: { skalVises: boolean; setAdresse: (adresse: Adresse | null) => void }) {
    const [mangletGT, setMangletGt] = useState<boolean>(false);
    if (!props.skalVises) {
        return null;
    }

    return (
        <Panel className="adressesok blokk-xs">
            <Element>Hvor oppholder du deg nå?</Element>
            <Normaltekst>Eksempel: Eksempelveien 47, 0123 OSLO</Normaltekst>
            <Normaltekst className="blokk-xxxs">
                Hvis du ikke vet postnummeret ditt kan du skrive kommunen din i stedet for postnummeret
            </Normaltekst>
            <AdresseTypeahead
                onVelgAnnenAdresse={(adresse) => {
                    if (adresse === null || adresse.geografiskTilknytning !== null) {
                        setMangletGt(false);
                        props.setAdresse(adresse);
                    } else {
                        setMangletGt(true);
                        props.setAdresse(null);
                    }
                }}
            />
            <ManglerGtAdvarsel mangletGt={mangletGT} />
        </Panel>
    );
}

export default Adressesok;
