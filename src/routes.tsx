import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Listevisning from './listevisning/ListeVisning';
import Oppgavevisning from './oppgave-visning/OppgaveVisning';
import DokumentVisningSide from './dokument-visning/v2/DokumentVarselVisningSide';
import Traader from './traader/Traader';
import Brodsmuler from './brodsmuler/Brodsmuler';
import NyDialogLosning from './ny-dialog-losning-alerts/ny-dialog-losning';

function Routes() {
    return (
        <BrowserRouter>
            <Brodsmuler />
            <NyDialogLosning />
            <Switch>
                <Route>
                    <Traader>
                        <Switch>
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
