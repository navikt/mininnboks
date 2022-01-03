import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useParams } from 'react-router';
import Listevisning from './listevisning/ListeVisning';
import Traadvisning from './traadvisning/TraadVisning';
import Oppgavevisning from './oppgave-visning/OppgaveVisning';
import SkrivNyttSporsmal from './skriv-nytt-sporsmal/SkrivNyttSporsmal';
import DokumentVisningSideSwitcher from './dokument-visning/DokumentVisningSideSwitcher';
import DokumentVisningSideV2 from './dokument-visning/v2/DokumentVarselVisningSide';
import Traader from './traader/Traader';
import Brodsmuler from './brodsmuler/Brodsmuler';
import SkrivNyttSporsmalFDAG from './skriv-nytt-sporsmal/SkrivNyttSporsmalFDAG';
import SkrivNyttSporsmalOKSOS from './skriv-nytt-sporsmal/SkrivNyttSporsmalOKSOS';
import NyDialogLosning from './ny-dialog-losning-alerts/ny-dialog-losning';
import { useFeaturetoggles } from './utils/api';
import { hasError, isPending } from '@nutgaard/use-fetch';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import StengtSTO from './ny-dialog-losning-alerts/stengt-sto';
import { Ledetekster, Temagruppe } from './utils/constants';
import { AndreFeilmeldinger } from './skriv-nytt-sporsmal/common';
import Feilmelding from './feilmelding/Feilmelding';

function GodkjentTemagrupperKontroll(props: { godkjenteTemagrupper: Array<Temagruppe>; children: React.ReactNode }) {
    const { children, godkjenteTemagrupper } = props;
    const params = useParams<{ temagruppe?: string }>();

    if (params.temagruppe) {
        const temagruppe = params.temagruppe.toUpperCase() as Temagruppe;
        if (!godkjenteTemagrupper.includes(temagruppe)) {
            return <Feilmelding>{AndreFeilmeldinger.IKKE_GODKJENT_TEMAGRUPPE}</Feilmelding>;
        }
    }
    return <>{children}</>;
}

function Routes(props: { ledetekster: Ledetekster }) {
    const featuretoggles = useFeaturetoggles();
    const godkjenteTemagrupper = props.ledetekster['temagruppe.liste'].split(' ') as Array<Temagruppe>;
    if (hasError(featuretoggles)) {
        return <AlertStripeAdvarsel>Det skjedde en feil ved lasting av featuretoggles</AlertStripeAdvarsel>;
    } else if (isPending(featuretoggles)) {
        return null;
    }

    const stengtSTO: boolean = featuretoggles.data['modia.innboks.steng-sto'];
    const brukerSFSomBackend: boolean = featuretoggles.data['modia.innboks.bruker-salesforce-dialoger'];
    const oksosAdressesok: boolean = featuretoggles.data['modia.innboks.oksos-adressesok'];

    return (
        <BrowserRouter>
            <Brodsmuler />
            <StengtSTO visibleIf={stengtSTO && !brukerSFSomBackend} />
            <NyDialogLosning visibleIf={brukerSFSomBackend} />
            <Switch>
                <Route path="/sporsmal/skriv/:temagruppe">
                    <GodkjentTemagrupperKontroll godkjenteTemagrupper={godkjenteTemagrupper}>
                        <Switch>
                            {!stengtSTO && !brukerSFSomBackend && (
                                <Route exact path="/sporsmal/skriv/FDAG" component={SkrivNyttSporsmalFDAG} />
                            )}
                            {oksosAdressesok && !stengtSTO && !brukerSFSomBackend && (
                                <Route exact path="/sporsmal/skriv/OKSOS" component={SkrivNyttSporsmalOKSOS} />
                            )}
                            {!stengtSTO && !brukerSFSomBackend && (
                                <Route exact path="/sporsmal/skriv/:temagruppe/" component={SkrivNyttSporsmal} />
                            )}
                            {!stengtSTO && !brukerSFSomBackend && (
                                <Route exact path="/sporsmal/skriv/:temagruppe/direkte" component={SkrivNyttSporsmal} />
                            )}
                            {(stengtSTO || brukerSFSomBackend) && <Redirect from="/sporsmal" to="/" />}
                        </Switch>
                    </GodkjentTemagrupperKontroll>
                </Route>
                <Route>
                    <Traader>
                        <Switch>
                            {!brukerSFSomBackend && (
                                <Route
                                    exact
                                    path="/traad/:traadId"
                                    render={() => <Traadvisning stengtSTO={stengtSTO} />}
                                />
                            )}
                            {brukerSFSomBackend && <Redirect from="/traad" to="/" />}
                            <Route exact path="/dokument/:id" component={DokumentVisningSideSwitcher} />
                            <Route exact path="/v2/dokument/:id" component={DokumentVisningSideV2} />
                            <Route exact path="/oppgave/:id" component={Oppgavevisning} />
                            <Route
                                render={() => (
                                    <Listevisning stengtSTO={stengtSTO} brukerSFSomBackend={brukerSFSomBackend} />
                                )}
                            />
                        </Switch>
                    </Traader>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
