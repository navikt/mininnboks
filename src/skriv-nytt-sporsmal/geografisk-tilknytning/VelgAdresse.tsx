import * as React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import useFetch, { hasError, isPending } from '@nutgaard/use-fetch';
import Adressesok from './Adressesok';
import { FOLKREGISTRERT_ADRESSE_PATH, MED_CREDENTIALS } from '../../utils/api';
import Spinner from '../../utils/Spinner';
import { Adresse, formaterAdresseString } from './AdresseUtils';

interface Props {
    submit(adresse: Adresse): void;
    folkeregistrertAdresse: Adresse | null;
}

type RadioValg = 'FOLKEREGISTRERT' | 'SOK';

function VelgAdresse(props: Props) {
    const [radiovalg, settRadiovalg] = useState<RadioValg>(
        props.folkeregistrertAdresse === undefined ? 'SOK' : 'FOLKEREGISTRERT'
    );
    const [overstyrtAdresse, settOverstyrtAdresse] = useState<Adresse | null>(null);

    const folkeregistrertValg =
        props.folkeregistrertAdresse === undefined
            ? null
            : {
                  label: (
                      <>
                          <Normaltekst tag="span" className="adressevalg__radio-label">
                              Folkeregistrert adresse:
                          </Normaltekst>
                          <Normaltekst tag="span">{formaterAdresseString(props.folkeregistrertAdresse)}</Normaltekst>
                      </>
                  ),
                  value: 'FOLKEREGISTRERT'
              };
    const radios = [folkeregistrertValg, { label: <>Annen adresse</>, value: 'SOK' }].filter((radio) => radio);

    const valgtEnhet: Adresse | null =
        radiovalg === 'FOLKEREGISTRERT' ? props.folkeregistrertAdresse : overstyrtAdresse;
    const isValid = valgtEnhet !== null;
    const submithandler = (event: FormEvent) => {
        event.preventDefault();
        if (valgtEnhet !== null) {
            props.submit(valgtEnhet);
        }
    };

    return (
        <form onSubmit={submithandler}>
            <RadioPanelGruppe
                name="typevalg"
                legend="Oppgi adressen der du bor (obligatorisk)"
                className="blokk-xs"
                radios={radios as any} // Bug i ts-config
                checked={radiovalg}
                onChange={(event) => {
                    const value = (event as ChangeEvent<HTMLInputElement>).target.value;
                    settRadiovalg(value as RadioValg);
                }}
            />
            <Adressesok skalVises={radiovalg === 'SOK'} setAdresse={settOverstyrtAdresse} />
            <div className="adressevalg__buttons">
                <Hovedknapp disabled={!isValid}>Velg</Hovedknapp>
            </div>
        </form>
    );
}

function AdresseLoader(props: Pick<Props, 'submit'>) {
    const folkeregistrertAdresse = useFetch<{ adresse: Adresse }>(FOLKREGISTRERT_ADRESSE_PATH, MED_CREDENTIALS);
    if (isPending(folkeregistrertAdresse)) {
        return (
            <div className="adressevalg__spinner">
                <Spinner />
            </div>
        );
    } else if (hasError(folkeregistrertAdresse)) {
        return <AlertStripeAdvarsel>Noe gikk galt, vennligst prøv igjen på et senere tidspunkt.</AlertStripeAdvarsel>;
    } else {
        return <VelgAdresse submit={props.submit} folkeregistrertAdresse={folkeregistrertAdresse.data.adresse} />;
    }
}

export default AdresseLoader;
