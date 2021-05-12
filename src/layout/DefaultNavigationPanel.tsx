/**
 * @author Cory(coryisbest0728#gmail.com)
 * @copyright © 2021 Cory. All rights reserved
 */
import React from 'react';

export interface IDefaultNavigationPanelProps {}
export interface IDefaultNavigationPanelState {}

/**
 * @TODO Describe the class
 */
export default class DefaultNavigationPanel extends React.Component<IDefaultNavigationPanelProps, IDefaultNavigationPanelState> {

    /**
     * @description Renders DefaultNavigationPanel
     * @returns render 
     */
    public render(): React.ReactNode {
        return (
            <div>Navigation sider</div>
        );
    }
}