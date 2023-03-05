import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">
        <p>
            Sold By:
            <Link href="/shop">
                <a>
                    <strong> {product.userId.companyname}</strong>
                </a>
            </Link>
        </p>
        <ul className="ps-list--dot">
            <li>{product.description }</li>
            <li>Unrestrained and portable active stereo speaker</li>
            <li> Free from the confines of wires and chords</li>
            <li> 20 hours of portable capabilities</li>
            <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
            
        </ul>
    </div>
);

export default ModuleProductDetailDescription;
