import * as React from "react";
import { FormEvent } from "react";
import { FormattedMessage } from "react-intl";
import Modal from "nav-frontend-modal";
import { Sidetittel } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";

import "./betingelser.less";

interface Props {
  godkjennVilkaar: () => void;
  avbryt: () => void;
  visModal: boolean;
  lukkModal: () => void;
}

function Betingelser(props: Props) {
  const submit = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <Modal
      isOpen={props.visModal}
      onRequestClose={props.lukkModal}
      contentClass="betingelser"
      contentLabel={"Betingelser"}
    >
      <form onSubmit={submit} className="betingelser-panel panel side-innhold">
        <Sidetittel className="text-center blokk-l" tabIndex={0}>
          <FormattedMessage id="send-sporsmal.still-sporsmal.betingelser.overskrift" />
        </Sidetittel>
        <div className="blokk-m">
          <FormattedMessage id="send-sporsmal.still-sporsmal.betingelser.tekst" />
        </div>
        <hr className="blokk-m" />
        <div className="svar-godta text-center blokk-m">
          <Hovedknapp
            htmlType="submit"
            aria-controls="betingelser"
            onClick={props.godkjennVilkaar}
          >
            <FormattedMessage id="send-sporsmal.still-sporsmal.betingelser.godta" />
          </Hovedknapp>
        </div>
        <div className="text-center">
          <a
            href="javascript:void(0)"
            onClick={props.avbryt}
            aria-controls="betingelser"
            role="button"
          >
            <FormattedMessage id="send-sporsmal.still-sporsmal.betingelser.ikke-godta" />
          </a>
        </div>
      </form>
    </Modal>
  );
}

export default Betingelser;
