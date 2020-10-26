import * as React from "react";
import Alertstripe from "nav-frontend-alertstriper";

function Feilmelding(props: React.HtmlHTMLAttributes<HTMLElement>) {
  return (
    <Alertstripe className={props.className} type="advarsel">
      {props.children}
    </Alertstripe>
  );
}

export default Feilmelding;
