import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Listevisning from './listevisning/ListeVisning';
import Traadvisning from './traadvisning/TraadVisning';
import Oppgavevisning from './oppgave-visning/OppgaveVisning';
import SkrivNyttSporsmal from './skriv-nytt-sporsmal/SkrivNyttSporsmal';
import DokumentVisningSide from './dokument-visning/DokumentVisningSide';
import Traader from './traader/Traader';
import Brodsmuler from './brodsmuler/Brodsmuler';
import SkrivNyttSporsmalFDAG from "./skriv-nytt-sporsmal/SkrivNyttSporsmalFDAG";
import NyDialogLosning from "./ny-dialog-losning/ny-dialog-losning";
import { useFeaturetoggles } from "./utils/api";
import { hasError, isPending } from "@nutgaard/use-fetch";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";

export default function () {
    const featuretoggles = useFeaturetoggles();
    if (hasError(featuretoggles)) {
        return <AlertStripeAdvarsel>Det skjedde en feil ved lasting av featuretoggles</AlertStripeAdvarsel>;
    } else if (isPending(featuretoggles)) {
        return null;
    }
    const brukerSFSomBackend: boolean = featuretoggles.data["modiabrukerdialog.bruker-salesforce-dialoger"];

    return (
        <BrowserRouter>
            <Brodsmuler />
            <NyDialogLosning visibleIf={brukerSFSomBackend} />
            <Switch>
                { !brukerSFSomBackend && <Route exact path="/sporsmal/skriv/FDAG" component={SkrivNyttSporsmalFDAG}/> }
                { !brukerSFSomBackend && <Route exact path="/sporsmal/skriv/:temagruppe/" component={SkrivNyttSporsmal} /> }
                { !brukerSFSomBackend && <Route exact path="/sporsmal/skriv/:temagruppe/direkte" component={SkrivNyttSporsmal} /> }
                { brukerSFSomBackend && <Redirect from="/sporsmal" to="/" /> }
                <Route>
                    <Traader>
                        <Switch>
                            { !brukerSFSomBackend && <Route exact path="/traad/:traadId" component={Traadvisning} /> }
                            { brukerSFSomBackend && <Redirect from="/traad" to="/" /> }
                            <Route exact path="/dokument/:id" component={DokumentVisningSide} />
                            <Route exact path="/oppgave/:id" component={Oppgavevisning} />
                            <Route render={() => <Listevisning brukerSFSomBackend={brukerSFSomBackend}/>} />
                        </Switch>
                    </Traader>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
