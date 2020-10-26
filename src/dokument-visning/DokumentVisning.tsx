import * as React from "react";
import Lenke from "nav-frontend-lenker";
import { FormattedMessage } from "react-intl";
import Personalia from "./dokumentvisning/personalia/Personalia";
import Dokumenter from "./dokumentvisning/dokument/Dokumenter";
import IntlLenke from "../utils/IntlLenke";
import "./dokument-visning.less";
import { useEffect } from "react";
import { DokumentMetadata, Journalpostmetadata } from "../dokument";

interface Props {
  dokumentmetadata: DokumentMetadata[];
  lastNedPdfOnClick: (url: string, event: React.MouseEvent) => void;
  printPdfOnClick: (url: string, event: React.MouseEvent) => void;
  journalpostmetadata: Journalpostmetadata;
}

function DokumentVisning(props: Props) {
  useEffect(() => {
    document.body.scrollTop = 1;
    document.documentElement.scrollTop = 1;
  }, []);

  const { temakode } = props.journalpostmetadata.resultat;

  return (
    <div className="dokinnsyn">
      <section className="dokumentvisning-header blokk-m">
        <Personalia
          journalpostmetadata={props.journalpostmetadata}
          hode={false}
          className="blokk-m"
        />
        <ul className="ustilet">
          <li>
            <Lenke href={`/saksoversikt/app/tema/${temakode}`}>
              <FormattedMessage id="dokumentvisning.gatil.saksoversikt" />
            </Lenke>
          </li>
          <li>
            <IntlLenke href="skriv.ny.link" className="lenke">
              <FormattedMessage id="dokumentvisning.kontakt.nav" />
            </IntlLenke>
          </li>
        </ul>
      </section>
      <section className="dokumenter">
        <Dokumenter
          journalpostId={props.journalpostmetadata.resultat.journalpostId}
          dokumentmetadata={props.dokumentmetadata}
          lastNedPdfOnClick={props.lastNedPdfOnClick}
          printPdfOnClick={props.printPdfOnClick}
        />
      </section>
    </div>
  );
}

export default DokumentVisning;
