import * as React from "react";
import { fn, getDisplayName } from '../../utils';

interface Props {
    visibleIf: boolean | (() => boolean);
    children: React.ReactNode;
    id?: string;
}

function VisibleIf(props: Props) {
    if (fn(props.visibleIf)()) {
        return <div>{props.children}</div>;
    }
    return null;
}

export default VisibleIf;

export function visibleIfHOC<T extends { children: React.ReactNode }>(komponent: React.ComponentType<T>): React.ComponentType<T & Props> {
    function visibleIfWrapper({ visibleIf} : {visibleIf: boolean | (() => boolean)}) {
        if (fn(visibleIf)()) {
            return React.createElement(komponent);
        }
        return null;
    }

    visibleIfWrapper.displayName = `visibleIfWrapper(${getDisplayName(komponent)})`;

    return visibleIfWrapper;
}
