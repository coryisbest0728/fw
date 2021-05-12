/**
 * @author Cory(coryisbest0728#gmail.com)
 * @copyright © 2021 Cory. All rights reserved
 */
import React from 'react';
import styles from './DefaultHeader.module.less';

import AsyncComponent from '../components/AsyncComponent';

export interface IDefaultHeaderProps {}
export interface IDefaultHeaderState {}

/**
 * @TODO Describe the class
 */
export default class DefaultHeader extends AsyncComponent<IDefaultHeaderProps, IDefaultHeaderState> {

    /**
     * @description Renders DefaultHeader
     * @returns render 
     */
    public render(): React.ReactNode {
        return (
            <div>Header</div>
        );
    }
}