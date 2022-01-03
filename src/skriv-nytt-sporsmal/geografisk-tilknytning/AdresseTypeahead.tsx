import React, { useEffect, useState } from 'react';
import { Input } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Downshift, { ControllerStateAndHelpers } from 'downshift';
import useFetch, { hasError, isPending, Status } from '@nutgaard/use-fetch';
import { Adresse, formaterAdresseString, removeDuplicatesAfterTransform } from './AdresseUtils';
import { MED_CREDENTIALS, SOK_ADRESSE_PATH } from '../../utils/api';
import { useDebounce } from '../../utils/custom-hooks';
import './adresseTypeahead.less';

interface Props {
    onVelgAnnenAdresse: (adresse: Adresse | null) => void;
}

interface FetcherProps {
    search: string;
    renderLoading(): React.ReactElement;
    renderError(): React.ReactElement;
    render(items: Array<Adresse>): React.ReactElement;
}

function Fetcher(props: FetcherProps) {
    const search = useDebounce(props.search, 200);
    const request = useFetch<Array<Adresse>>(SOK_ADRESSE_PATH + encodeURI(search), MED_CREDENTIALS, { lazy: true });
    const rerun = request.rerun;

    useEffect(() => {
        if (search.length > 0) {
            rerun();
        }
    }, [rerun, search]);

    if (request.status === Status.INIT) {
        return null;
    } else if (isPending(request)) {
        return props.renderLoading();
    } else if (hasError(request)) {
        return props.renderError();
    }

    const data = removeDuplicatesAfterTransform(request.data, formaterAdresseString);
    return props.render(data);
}

function renderer(helpers: ControllerStateAndHelpers<Adresse>) {
    const fetcher =
        !helpers.isOpen && helpers.inputValue !== null ? null : (
            <Fetcher
                search={helpers.inputValue!!}
                renderLoading={() => (
                    <div className="typeahead__spinner">
                        <NavFrontendSpinner />
                    </div>
                )}
                renderError={() => <>Det skjedde en feil</>}
                render={(data: Adresse[]) => (
                    <ul className="typeahead__dropdown">
                        {data.map((adresse, index) => (
                            <li key={helpers.itemToString(adresse)} {...helpers.getItemProps({ item: adresse, index })}>
                                {helpers.itemToString(adresse)}
                            </li>
                        ))}
                    </ul>
                )}
            />
        );

    return (
        <div className="typeahead blokk-xxs">
            <Input {...helpers.getInputProps()} />
            {fetcher}
        </div>
    );
}

function AdresseTypeahead(props: Props) {
    const [selected, setSelected] = useState<Adresse | null>(null);
    const [value, setValue] = useState<string>('');

    return (
        <Downshift<Adresse>
            itemToString={formaterAdresseString}
            selectedItem={selected}
            onSelect={(newSelected) => {
                setSelected(newSelected);
                props.onVelgAnnenAdresse(newSelected);
            }}
            defaultHighlightedIndex={0}
            inputValue={value}
            onInputValueChange={(newValue) => setValue(newValue)}
        >
            {renderer}
        </Downshift>
    );
}

export default AdresseTypeahead;
