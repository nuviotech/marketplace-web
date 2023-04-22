import React from 'react';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';

const FooterDefault = () => (
    <footer className="ps-footer">
        <div className="container">
            <FooterWidgets />
            <FooterLinks />
            <>Nuvio sellers private limited</>
            <FooterCopyright />
        </div>
    </footer>
);

export default FooterDefault;
