import * as React from 'react';
import Lenkepanel from 'nav-frontend-lenkepanel';
import { Link } from 'react-router-dom';

function lenkeLager({ href, ...props }: { href: string }) {
    return <Link to={href} {...props} />;
}

export default function (props: any) {
    return <Lenkepanel linkCreator={lenkeLager} {...props} />;
}
