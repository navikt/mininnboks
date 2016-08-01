import React, { PropTypes as PT } from 'react';
import classNames from 'classnames';
import { visibleIfHOC } from './../utils/hocs/visible-if';

const panelklasse = (className, horisontal) => classNames('panel panel-ramme info-panel', className, {
    'panel-komprimert': horisontal
});
const hodeklasse = (type, horisontal) => classNames('hode', `hode-${type}`, {
    horisontal: horisontal
});

function infopanelBase({ type, horisontal, className, children }) {
    return (
        <div className={panelklasse(className, horisontal)}>
            <p className="vekk">{`${type}-infopanel: `}</p>
            <p className={hodeklasse(type, horisontal)}>
                {children}
            </p>
        </div>
    );
}

infopanelBase.propTypes = {
    type: 'standard',
    horisontal: false
};

infopanelBase.propTypes = {
    type: PT.oneOf(['standard', 'suksess', 'advarsel', 'feil']).isRequired,
    className: PT.string,
    horisontal: PT.bool,
    children: PT.node.isRequired
};

const InfopanelBase = visibleIfHOC(infopanelBase);
export default InfopanelBase;

export const StandardInfopanel = (props) => <InfopanelBase type="standard" {...props} />;
export const SuksessInfopanel = (props) => <InfopanelBase type="suksess" {...props} />;
export const AdvarselInfopanel = (props) => <InfopanelBase type="advarsel" {...props} />;
export const FeilInfopanel = (props) => <InfopanelBase type="feil" {...props} />;
