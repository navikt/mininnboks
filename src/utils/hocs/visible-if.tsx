import * as React from "react";
import { fn, getDisplayName } from '../../utils';

interface Props extends React.HTMLAttributes<HTMLElement>{
    visibleIf: boolean | (() => boolean);
}

function VisibleIf(props: Props) {
    if (fn(props.visibleIf)()) {
        return <div>{props.children}</div>;
    }
    return null;
}

export default VisibleIf;

export function visibleIfHOC<T extends { children?: React.ReactNode|JSX.Element }>(komponent: React.ComponentType<T>): React.ComponentType<T & Props> {
    function visibleIfWrapper({ visibleIf} : {visibleIf: boolean | (() => boolean)}) {
        if (fn(visibleIf)()) {
            return React.createElement(komponent);
        }
        return null;
    }

    visibleIfWrapper.displayName = `visibleIfWrapper(${getDisplayName(komponent)})`;

    return visibleIfWrapper;
}
