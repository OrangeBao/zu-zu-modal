import {TemplateRef } from '@angular/core';

export enum AlertType {
    SUCCESS,
    INFO,
    WARNING,
    ERROR
}

export class Modal {
    type: AlertType;
    title: string;
    remark: string;
    content: TemplateRef<any> | string;
    cancelText: string;
    okText: string;
    onCancel: Function;
    onOk: Function;
}
