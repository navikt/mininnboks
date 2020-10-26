import { render } from "../test-config";
import * as React from "react";
import Innholdslaster from "./Innholdslaster";
import { STATUS } from "../ducks/ducks-utils";

describe("Innholdslaster", () => {
  it("skal vise laster om noen laster", () => {
    const laster1 = { status: STATUS.PENDING, data: {} };
    const laster2 = { status: STATUS.PENDING, data: {} };
    const lastet = { status: STATUS.PENDING, data: {} };

    const wrapper = render(
      <Innholdslaster avhengigheter={[laster1, laster2, lastet]} />
    );
    expect(wrapper.find(".spinner").length).toBeGreaterThan(0);
  });

  it("skal vise feilmelding om noe feilet", () => {
    const feil = { status: STATUS.ERROR, data: { response: { status: 500 } } };
    const lastet = { status: STATUS.ERROR, data: {} };
    const lastet2 = { status: STATUS.ERROR, data: {} };

    const wrapper = render(
      <Innholdslaster avhengigheter={[lastet, feil, lastet2]} />
    );
    expect(wrapper.find(".alertstripe").length).toBeGreaterThan(0);
  });

  it("skal vise child om alt gikk greit", () => {
    const lastet = { status: STATUS.OK, data: {} };
    const lastet2 = { status: STATUS.OK, data: {} };

    const wrapper = render(
      <Innholdslaster avhengigheter={[lastet, lastet2]}>
        DETTE SKAL VISES
      </Innholdslaster>
    );
    expect(wrapper.text()).toEqual("DETTE SKAL VISES");
  });
});
