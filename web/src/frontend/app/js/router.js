import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import Listevisning from './listevisning/listevisning';
import Traadvisning from './traadvisning/traadvisning';
import SkrivNyttSporsmal from './skriv-nytt-sporsmal/skriv-nytt-sporsmal';
import Application from './application';
import { createHistory } from 'history';
import DokumentVarsel from './dokumentvarsel/dokumentvarsel';
import PrintPage from './print/print-page';

const history = useRouterHistory(createHistory)({ basename: '/mininnboks' });

export default() => (
    <Router history={history}>
        <Route path="/" component={Application} breadcrumbIgnore>
            <IndexRoute component={Listevisning} breadcrumbName="Min innboks" />
            <Route breadcrumbName="Min innboks" >
                <Route path="/traad/:traadId" component={Traadvisning} breadcrumbName=":tema" />
                <Route path="/sporsmal/skriv/:temagruppe" component={SkrivNyttSporsmal} breadcrumbName="Ny melding"/>
                <Route path="/dokument/:id" component={DokumentVarsel} breadcrumbName="Dokumentvisning"/>
            </Route>
            <Route path="print/:journalpostid/:dokumentreferanse" component={PrintPage}/>
        </Route>
    </Router>
);
