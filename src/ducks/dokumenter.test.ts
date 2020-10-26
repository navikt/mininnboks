/* eslint-env mocha */
import reducer from "./dokumenter";
import { STATUS } from "./ducks-utils";
// @ts-ignore
import configureMockStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
// @ts-ignore
import fetchMock from "fetch-mock";
import { AnyAction, Store } from "redux";
import {
  DokumentState,
  hentDokumentVisningData,
  skjulLastNedPdfModal,
  TypeKeys,
  visLastNedPdfModal,
} from "./dokumenter";

function dataAction<T>(type: any, data?: T) {
  if (data) {
    return { type, data };
  }
  return { type };
}
type ThunkStore = Store & { dispatch: ThunkDispatch<any, any, AnyAction> };
type MockStore = { getActions(): Array<AnyAction> } & ((
  initialState?: any
) => ThunkStore);

const middlewares = [thunk];
const mockStore: MockStore = configureMockStore(middlewares);
const array = (value: any) => (Array.isArray(value) ? value : [value]);

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveReceived<E extends AnyAction | Array<AnyAction>>(
        expectedActions: E
      ): R;
    }
  }
}

expect.extend({
  toHaveReceived(store: MockStore, expectedActions: Array<AnyAction>) {
    const receivedActions = store.getActions();
    const errorMessage: Array<string> = [];

    for (const action of array(expectedActions)) {
      const received = receivedActions.find(
        (receivedAction) => action.type === receivedAction.type
      );
      const receivedJson = JSON.stringify(received);
      const actionJson = JSON.stringify(action);
      if (received === null || received === undefined) {
        errorMessage.push(
          `expected store to have received ${actionJson}, but didn't find matching type.`
        );
      } else {
        const nonMatchingProperties = Object.keys(action).some(
          (key: string) => {
            const expectedValue = JSON.stringify(action[key]);
            const receivedValue = JSON.stringify(received[key]);
            if (receivedValue !== expectedValue) {
              return true;
            }
            return false;
          }
        );
        if (nonMatchingProperties) {
          errorMessage.push(
            `expected store to have received ${actionJson}, but got ${receivedJson}.`
          );
        }
      }
    }

    return {
      pass: errorMessage.length === 0,
      message: () => errorMessage.join("\n"),
    };
  },
});
function getInitialState(): DokumentState {
  return {
    status: STATUS.NOT_STARTED,
    pdfModal: {
      skalVises: false,
      dokumentUrl: undefined,
    },
  };
}

describe("dokumenter-ducks", () => {
  describe("reducer", () => {
    it("skal oppdatere data-status korrekt", () => {
      const initalState = getInitialState();

      const pendingState = reducer(
        initalState,
        dataAction(TypeKeys.DOKUMENTVISNING_DATA_PENDING)
      );
      const feiletState = reducer(
        initalState,
        dataAction(TypeKeys.DOKUMENTVISNING_DATA_FEILET)
      );
      const okState = reducer(
        initalState,
        dataAction(TypeKeys.DOKUMENTVISNING_DATA_OK, [0, 0])
      );

      expect(pendingState.status).toEqual(STATUS.PENDING);
      expect(feiletState.status).toEqual(STATUS.ERROR);
      expect(okState.status).toEqual(STATUS.OK);
    });

    it("skal oppdatere pdfModal korrekt", () => {
      const initalState = getInitialState();
      const dokumentUrl = "http://vg.no";

      const visPdfModal = reducer(initalState, {
        type: TypeKeys.STATUS_PDF_MODAL,
        pdfModal: {
          skalVises: true,
          dokumentUrl,
        },
      });
      const skjulPdfModal = reducer(initalState, {
        type: TypeKeys.STATUS_PDF_MODAL,
        pdfModal: {
          skalVises: false,
          dokumentUrl: null,
        },
      });

      expect(visPdfModal).toHaveProperty("pdfModal.skalVises", true);
      expect(visPdfModal).toHaveProperty("pdfModal.dokumentUrl", dokumentUrl);

      expect(skjulPdfModal).toHaveProperty("pdfModal.skalVises", false);
      expect(skjulPdfModal).toHaveProperty("pdfModal.dokumentUrl", null);
    });
  });

  describe("actioncreators", () => {
    afterEach(fetchMock.restore);

    describe("hentDokumentVisningData", () => {
      it("Skal sende pending, og ok med korrekte data", () => {
        fetchMock.get(
          "^/saksoversikt-api/tjenester/dokumenter/dokumentmetadata",
          { test: "asda" }
        );
        fetchMock.get(
          "^/saksoversikt-api/tjenester/dokumenter/journalpostmetadata",
          { data: "asda" }
        );
        const store = mockStore({ status: STATUS.NOT_STARTED });

        return store.dispatch(hentDokumentVisningData("", "")).then(() => {
          expect(store).toHaveReceived([
            dataAction(TypeKeys.DOKUMENTVISNING_DATA_PENDING, undefined),
            dataAction(TypeKeys.DOKUMENTVISNING_DATA_OK, [
              [{ test: "asda" }],
              { data: "asda" },
            ]),
          ]);
        });
      });

      it("skal sende pending, og error om dokumentmetadata feiler", (done) => {
        fetchMock.mock(
          "^/saksoversikt-api/tjenester/dokumenter/dokumentmetadata",
          {
            body: JSON.stringify({ test: "asda" }),
            status: 500,
          }
        );
        fetchMock.get(
          "^/saksoversikt-api/tjenester/dokumenter/journalpostmetadata",
          { data: "asda" }
        );
        const store = mockStore({ status: STATUS.NOT_STARTED });

        const res = store.dispatch(hentDokumentVisningData("", ""));

        setTimeout(() => {
          // Må vente litt pga masse async/promise og dispatching.
          res.then(() => {
            expect(store).not.toHaveReceived(
              dataAction(TypeKeys.DOKUMENTVISNING_DATA_OK)
            );
            expect(store).toHaveReceived([
              dataAction(TypeKeys.DOKUMENTVISNING_DATA_PENDING, undefined),
              dataAction(TypeKeys.DOKUMENTVISNING_DATA_FEILET),
            ]);
          });
          done();
        }, 0);
      });

      it("skal sende pending, og error om dokumentmetadata feiler", (done) => {
        fetchMock.get(
          "^/saksoversikt-api/tjenester/dokumenter/dokumentmetadata",
          { test: "asda" }
        );
        fetchMock.mock(
          "^/saksoversikt-api/tjenester/dokumenter/journalpostmetadata",
          {
            body: { data: "asda" },
            status: 500,
          }
        );
        const store = mockStore({ status: STATUS.NOT_STARTED });

        const res = store.dispatch(hentDokumentVisningData("", ""));

        setTimeout(() => {
          // Må vente litt pga masse async/promise og dispatching.
          res.then(() => {
            expect(store).not.toHaveReceived(
              dataAction(TypeKeys.DOKUMENTVISNING_DATA_OK)
            );
            expect(store).toHaveReceived([
              dataAction(TypeKeys.DOKUMENTVISNING_DATA_PENDING, undefined),
              dataAction(TypeKeys.DOKUMENTVISNING_DATA_FEILET),
            ]);
          });
          done();
        }, 0);
      });
    });

    it("visLastNedPdfModal", () => {
      const store = mockStore();
      const dokumentUrl = "http://vg.no";

      store.dispatch(visLastNedPdfModal(dokumentUrl));

      expect(store).toHaveReceived({
        type: TypeKeys.STATUS_PDF_MODAL,
        pdfModal: {
          skalVises: true,
          dokumentUrl,
        },
      });
    });
    it("skjulLastNedPdfModal", () => {
      const store = mockStore();

      store.dispatch(skjulLastNedPdfModal());

      expect(store).toHaveReceived({
        type: TypeKeys.STATUS_PDF_MODAL,
        pdfModal: {
          skalVises: false,
          dokumentUrl: null,
        },
      });
    });
  });
});
