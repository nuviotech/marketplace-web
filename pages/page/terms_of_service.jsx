import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Terms_of_service from '~/components/partials/page/Terms_of_service';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

const terms_of_service = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'terms of service',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Blank page">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <Terms_of_service />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default terms_of_service;
