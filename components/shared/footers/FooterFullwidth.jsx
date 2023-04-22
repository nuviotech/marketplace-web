import React from 'react';
import FooterWidgets from './modules/FooterWidgets';
import FooterLinks from './modules/FooterLinks';
import FooterCopyright from './modules/FooterCopyright';

const FooterFullwidth = () => (
    <footer className="ps-footer">
        <div className="ps-container">
            <FooterWidgets />
            <FooterLinks />
            <h5 className='text-muted'>Nuvio sellers private limited</h5>

            <FooterCopyright />
        </div>
    </footer>
);

export default FooterFullwidth;
