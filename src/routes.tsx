import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Listevisning from './listevisning/ListeVisning';
import Traadvisning from './traadvisning/TraadVisning';
import Oppgavevisning from './oppgave-visning/OppgaveVisning';
import SkrivNyttSporsmal from './skriv-nytt-sporsmal/SkrivNyttSporsmal';
import DokumentVisningSide from './dokument-visning/DokumentVisningSide';
import Traader from './traader/Traader';
import Brodsmuler from './brodsmuler/Brodsmuler';
import SkrivNyttSporsmalFDAG from "./skriv-nytt-sporsmal/SkrivNyttSporsmalFDAG";

export default function () {
    return (
        <BrowserRouter>
            <Brodsmuler />
            <Switch>
                <Route exact path="/sporsmal/skriv/FDAG" component={SkrivNyttSporsmalFDAG}/>
                <Route exact path="/sporsmal/skriv/:temagruppe/" component={SkrivNyttSporsmal} />
                <Route exact path="/sporsmal/skriv/:temagruppe/direkte" component={SkrivNyttSporsmal} />
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
