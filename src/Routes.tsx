import * as React from 'react';
import { useParams } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Listevisning from './listevisning/ListeVisning';
import Traadvisning from './traadvisning/TraadVisning';
import Oppgavevisning from './oppgave-visning/OppgaveVisning';
import SkrivNyttSporsmal from './skriv-nytt-sporsmal/SkrivNyttSporsmal';
import DokumentVisningSide from './dokument-visning/DokumentVisningSide';
import Traader from './traader/Traader';
import Brodsmuler from './brodsmuler/Brodsmuler';
import SkrivNyttSporsmalFDAG from './skriv-nytt-sporsmal/SkrivNyttSporsmalFDAG';
import SkrivNyttSporsmalOKSOS from './skriv-nytt-sporsmal/SkrivNyttSporsmalOKSOS';
import { Ledetekster, Temagruppe } from './utils/constants';
import Feilmelding from './feilmelding/Feilmelding';
import { AndreFeilmeldinger } from './skriv-nytt-sporsmal/common';

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
    const godkjenteTemagrupper = props.ledetekster['temagruppe.liste'].split(' ') as Array<Temagruppe>;

    return (
        <BrowserRouter>
            <Brodsmuler />
            <Switch>
                <Route path="/sporsmal/skriv/:temagruppe">
                    <GodkjentTemagrupperKontroll godkjenteTemagrupper={godkjenteTemagrupper}>
                        <Switch>
                            <Route exact path="/sporsmal/skriv/FDAG" component={SkrivNyttSporsmalFDAG} />
                            <Route exact path="/sporsmal/skriv/OKSOS" component={SkrivNyttSporsmalOKSOS} />
                            <Route exact path="/sporsmal/skriv/:temagruppe/" component={SkrivNyttSporsmal} />
                            <Route exact path="/sporsmal/skriv/:temagruppe/direkte" component={SkrivNyttSporsmal} />
                        </Switch>
                    </GodkjentTemagrupperKontroll>
                </Route>
                <Route>
                    <Traader>
                        <Switch>
                            <Route exact path="/traad/:traadId" component={Traadvisning} />
                            <Route exact path="/dokument/:id" component={DokumentVisningSide} />
                            <Route exact path="/oppgave/:id" component={Oppgavevisning} />
                            <Route component={Listevisning} />
                        </Switch>
                    </Traader>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
