import * as React from 'react';
// import { Route, Switch } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Listevisning from './listevisning/listevisning';
import Traadvisning from './traadvisning/traadvisning';
import Oppgavevisning from './oppgave-visning/oppgave-visning';
import SkrivNyttSporsmal from './skriv-nytt-sporsmal/skriv-nytt-sporsmal';
// import Application from './application';
import DokumentVisningSide from './dokument-visning/dokument-visning-side';
import Traader from './traader/traader';

/*

<Router history={history} render={applyRouterMiddleware(useScroll(scrollHelper))}>
    <Route path="/" component={Application} breadcrumbIgnore>
        <Route breadcrumbName="Min innboks">
            <Route breadcrumbIgnore component={Traader}>
                <IndexRoute component={Listevisning} breadcrumbIgnore/>
                <Route path="/traad/:traadId" component={Traadvisning} breadcrumbName=":tema"/>
                <Route path="/dokument/:id" component={DokumentVisningSide}
                       breadcrumbName="Dokumentvisning"/>
                <Route path="/oppgave/:id" component={Oppgavevisning} breadcrumbName="Oppgavevisning"/>
            </Route>

            <Route
                path="/sporsmal/skriv/:temagruppe"
                component={SkrivNyttSporsmal}
                breadcrumbName="Ny melding"
            />
        </Route>
    </Route>
</Router>

*/

function TradRouting() {
    return (
        <Traader>
            <Switch>
                <Route exact path="/traad/:traadId" component={Traadvisning}/>
                <Route exact path="/dokument/:id" component={DokumentVisningSide}/>
                <Route exact path="/oppgave/:id" component={Oppgavevisning}/>
                <Route component={Listevisning}/>
            </Switch>
        </Traader>
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
