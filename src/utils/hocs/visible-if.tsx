import * as React from "react";
import { ReactNode} from 'react';
import { fn, getDisplayName } from '../../utils';

interface Props {
    visibleIf: () => boolean,
    children: ReactNode
}

function VisibleIf(props: Props) {
    if (fn(props.visibleIf)()) {
        return <div>{props.children}</div>;
    }
    return null;
}

export default VisibleIf;

export function visibleIfHOC(komponent : React.ReactElement) {
    function visibleIfWrapper({ visibleIf, ...props } : {visibleIf: boolean}) {
        if (fn(visibleIf)()) {
            return React.createElement(komponent, props);
        }
        return null;
    }

    visibleIfWrapper.displayName = `visibleIfWrapper(${getDisplayName(komponent)})`;

    return visibleIfWrapper;
}
