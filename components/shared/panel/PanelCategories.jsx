import React, { Component, useEffect, useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import categories from '../../../public/static/data/static-categories.json';
import ProductRepository from '~/repositories/ProductRepository';

const { SubMenu } = Menu;

function PanelCategories() {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);

/*
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };*/

    const getCategories = async() => {
        setLoading(true);
        const responseData = await ProductRepository.getProductCategories();
        if (responseData) {
            setCategories(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    
        return (
            <Menu
                mode="inline"
                >
                {categories?.map(category => (
                    <Menu.Item key={category.categoryId}>
                        <Link href={`/category/${category.categoryId}`} >{category.name}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        );
    
}

export default PanelCategories;
