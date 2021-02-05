import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';
import { Breadcrumb } from '@navikt/nav-dekoratoren-moduler/dist/functions/breadcrumbs';
import { onBreadcrumbClick, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';

export function useBreadcrumbs(crumbs: Array<Breadcrumb>) {
    useEffect(() => {
        const inAppCrumbs = crumbs.map((crumb) => ({ ...crumb, handleInApp: true }));
        setBreadcrumbs([...inAppCrumbs]);
    }, [crumbs]);
}

export function useBreadcrumbsListener(history: History) {
    useEffect(() => {
        onBreadcrumbClick((crumb) => {
            history.push(crumb.url);
        });
    }, [history]);
}

function Brodsmuler() {
    const history = useHistory();
    useBreadcrumbsListener(history);

    return null;
}

export default Brodsmuler;
