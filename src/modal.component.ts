import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from './modal.service';
import { Modal, AlertType } from './modal.model';

@Component({
  selector: 'zu-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html',
  host: {
    '[style.display]': "showModal ? 'block' : 'none'"
  }
})
export class ModalComponent {
  title:string = '';
  defaultOkText:string = '确定';
  defaultCancelText:string = '取消';
  okText:string = '';
  cancelText:string = '';
  contentTpl: TemplateRef<void>;
  content: string = '';
  showModal:boolean = false;
  onOkHandle: Function;
  onCancelHandle: Function;
  type: AlertType;
  remark: string = '';
  alertContent: string = '';

  @ViewChild('alertTemp') tempUrl: TemplateRef<any>;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.modalService.getMessage().subscribe((option: Modal) => {
      if (option.type !== undefined) {
        this.contentTpl = this.tempUrl;
        this.type = option.type;
        this.alertContent = option.content as string;
        this.remark = option.remark;
      } else if (option.content instanceof TemplateRef) {
        this.contentTpl = option.content;
      } else {
        this.content = option.content;
      }
      if (option.okText) {
        this.okText = option.okText;
      }
      if (option.cancelText) {
        this.cancelText = option.cancelText;
      }
      this.title = option.title;
      this.showModal = true;
      this.onOkHandle = option.onOk;
      this.onCancelHandle = option.onCancel;
    });
  }

  closeModal() {
    if (this.showModal) {
      this.showModal = false;
      this.content = '';
      this.contentTpl = null;
      this.okText = this.cancelText = this.title = '';
      this.onOkHandle = this.onCancelHandle = null;
      this.type = null;
      this.alertContent = this.remark = '';
    }
  }

  onOk() {
    if (this.onOkHandle) {
      const okRes = this.onOkHandle();
      if (okRes && Object.prototype.toString.call(okRes) === "[object Promise]") {
        okRes.then(() => this.closeModal());
      } else {
        this.closeModal()
      }
    } else {
      this.closeModal()
    }
  }

  onCancel() {
    if (this.onCancelHandle) {
      const cancelRes = this.onCancelHandle();
      if (cancelRes && Object.prototype.toString.call(cancelRes) === "[object Promise]") {
        cancelRes.then(() => this.closeModal());
      } else {
        this.closeModal()
      }
    } else {
      this.closeModal()
    }
  }

}
