import * as React from 'react';
import { fn, getDisplayName } from '../../utils';

type VisibleIfProp = { visibleIf: boolean | (() => boolean) };
interface Props extends VisibleIfProp, React.HTMLAttributes<HTMLElement> {}

function VisibleIf(props: Props) {
    if (fn(props.visibleIf)()) {
        return <div>{props.children}</div>;
    }
    return null;
}

export default VisibleIf;

export function visibleIfHOC<T>(komponent: React.ComponentType<T>): React.ComponentType<T & Props> {
    function visibleIfWrapper(props: VisibleIfProp & T) {
        const { visibleIf, ...rest } = props;
        if (fn(visibleIf)()) {
            return React.createElement(komponent, (rest as unknown) as T);
        }
        return null;
    }

    visibleIfWrapper.displayName = `visibleIfWrapper(${getDisplayName(komponent)})`;

    return visibleIfWrapper;
}
