/* eslint-env mocha */
import * as Validationutils from "./validationutil";

describe("validationRules", () => {
  describe("fritekst", () => {
    it("skal feile om teksten ikke er definert", () => {
      const undefinedTekst = Validationutils.validationRules.fritekst();
      const tomTekst = Validationutils.validationRules.fritekst("");

      expect(undefinedTekst).toEqual("required");
      expect(tomTekst).toEqual("required");
    });
  });

  describe("godkjennVilkår", () => {
    it("skal feile om verdien er false", () => {
      const undefinedTest = Validationutils.validationRules.godkjennVilkaar();
      const ikkeTrueTest = Validationutils.validationRules.godkjennVilkaar(
        false
      );

      expect(undefinedTest).toEqual("required");
      expect(ikkeTrueTest).toEqual("required");
    });
  });
});

describe("validate", () => {
  it("skal gi tomt object om alt er ok", () => {
    const formState = {
      fritekst: "hei",
      godkjennVilkaar: true,
    };
    const formStatus = Validationutils.validate(formState);

    expect(formStatus).toEqual({});
  });

  it("skal gi feilmeldinger for alle feilene", () => {
    const formState = { fritekst: undefined, godkjennVilkaar: undefined };
    const formStatus = Validationutils.validate(formState);

    expect(formStatus).toEqual({
      fritekst: "required",
      godkjennVilkaar: "required",
    });
  });

  it("skal gi true på tegn under 2500 ", () => {
    const langTekst = new Array(2499).join("x");

    const formState = {
      fritekst: langTekst,
    };
    const formStatus = Validationutils.validate(formState, { maxLength: 2500 });

    expect(formStatus).toEqual({});
  });

  it("skal gi false på tegn over 2500 ", () => {
    const langTekst = new Array(2505).join("x");

    const formState = {
      fritekst: langTekst,
    };
    const formStatus = Validationutils.validate(formState, { maxLength: 2500 });

    expect(formStatus).toEqual({ fritekst: "max-len" });
  });

  it("skal gi true på tegn over under 1000 ", () => {
    const langTekst = new Array(999).join("x");
    const formState = {
      fritekst: langTekst,
    };
    const formStatus = Validationutils.validate(formState);

    expect(formStatus).toEqual({});
  });
  it("skal gi false på tegn over 1000 ", () => {
    const langTekst = new Array(1005).join("x");

    const formState = {
      fritekst: langTekst,
    };
    const formStatus = Validationutils.validate(formState);

    expect(formStatus).toEqual({ fritekst: "max-len" });
  });
});
