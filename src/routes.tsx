import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Listevisning from './listevisning/listevisning';
import Traadvisning from './traadvisning/traadvisning';
import Oppgavevisning from './oppgave-visning/oppgave-visning';
import SkrivNyttSporsmal from './skriv-nytt-sporsmal/skriv-nytt-sporsmal';
import DokumentVisningSide from './dokument-visning/dokument-visning-side';
import Traader from './traader/traader';
import Brodsmuler from './brodsmuler/brodsmuler';

function TradRouting() {
    return (
        <React.Fragment>
            <Brodsmuler/>
            <Traader>
                <Switch>
                    <Route exact path="/traad/:traadId" component={Traadvisning}/>
                    <Route exact path="/dokument/:id" component={DokumentVisningSide}/>
                    <Route exact path="/oppgave/:id" component={Oppgavevisning}/>
                    <Route component={Listevisning}/>
                </Switch>
            </Traader>
        </React.Fragment>
    );
}

export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/sporsmal/skriv/:temagruppe" component={SkrivNyttSporsmal}/>
                <Route component={TradRouting}/>
            </Switch>
        </BrowserRouter>
    );
}
