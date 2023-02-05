import React from 'react';
import Link from 'next/link';

const Logo = ({ type }) => {
    let data;
    if (type === 'autopart') {
        data = {
            url: '/home/autopart',
            img: 'img/nuvio.png',
        };
    }
    else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'static/img/nuvio.png',
        };
    }
    else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'static/img/nuvio.png',
        };
    }
    else if (type === 'electronic') {
        data = {
            url: '/home/electronic',
            img: 'static/img/nuvio.png',
        };
    }
    else if (type === 'furniture') {
        data = {
            url: '/home/furniture',
            img: 'static/img/nuvio.png',
        };
    }
    else if (type === 'organic') {
        data = {
            url: '/home/organic',
            img: 'static/img/nuvio.png',
        };
    }
    else {
        data = {
            url: '/',
            img: '/static/img/nuvio.png',
        };
    }
    return (
        <Link href={data.url}>
            <a className="ps-logo">
                <img src={data.img} alt="" style={{width:128 ,height:66,marginLeft:85}} />
            </a>
        </Link>
    );
};

export default Logo;
