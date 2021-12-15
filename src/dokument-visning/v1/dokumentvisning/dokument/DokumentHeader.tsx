import * as React from 'react';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    tabbable: boolean;
    scrollToTopOnFocus: boolean;
}
const scrollToTop = (event: React.FocusEvent<HTMLDivElement>) => {
    event.preventDefault();
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // Firefox and IE
};

const DokumentHeader = (props: Props) => {
    const dokumentHeaderProps: React.HTMLAttributes<HTMLDivElement> = {
        className: 'dokumentheader blokk-xxxs'
    };

    if (props.tabbable) {
        dokumentHeaderProps.tabIndex = 0;
    }

    if (props.scrollToTopOnFocus) {
        dokumentHeaderProps.onFocus = scrollToTop;
    }

    return <div {...dokumentHeaderProps}>{props.children}</div>;
};

export default DokumentHeader;
