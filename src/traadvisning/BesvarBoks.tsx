import * as React from 'react';
import { feilmelding } from '../utils/validationutil';
import { STATUS } from '../ducks/ducks-utils';
import { Textarea } from 'nav-frontend-skjema';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import { visibleIfHOC } from '../utils/hocs/visible-if';

import './besvar-boks.less';
import { skjulBesvarBoks } from '../ducks/ui';
import { sendSvar2 } from '../ducks/traader';
import useFormstate, { Values } from '@nutgaard/use-formstate';
import { useThunkDispatch } from '../useThunkDispatch';

interface Props {
    innsendingStatus: STATUS;
    traadId: string;
}

type BesvarForm = {
    fritekst: string;
};
const validator = useFormstate<BesvarForm>((values) => {
    let fritekst = undefined;
    if (values.fritekst.length === 0) {
        fritekst = 'Tekstfeltet er tomt';
    }
    if (values.fritekst.length > 2500) {
        fritekst = 'Teksten er for lang';
    }

    return { fritekst };
});

function BesvarBoks(props: Props) {
    const dispatch = useThunkDispatch();
    const initialValues: BesvarForm = {
        fritekst: ''
    };

    const state = validator(initialValues);

    function submitHandler<S>(values: Values<BesvarForm>): Promise<any> {
        return dispatch(sendSvar2(props.traadId, values.fritekst));
    }

    const avbryt = () => {
        dispatch(skjulBesvarBoks());
    };

    return (
        <form className="besvar-boks text-center blokk-center blokk-l" onSubmit={state.onSubmit(submitHandler)}>
            <Textarea
                textareaClass="fritekst"
                label={''}
                maxLength={2500}
                {...state.fields.fritekst.input}
                feil={feilmelding(state.fields.fritekst)}
            />
            <div className="blokk-xs">
                <Hovedknapp htmlType="submit" spinner={props.innsendingStatus === STATUS.PENDING}>
                    Send svar
                </Hovedknapp>
            </div>
            <Flatknapp onClick={avbryt}>Avbryt</Flatknapp>
        </form>
    );
}

export default visibleIfHOC(BesvarBoks);
