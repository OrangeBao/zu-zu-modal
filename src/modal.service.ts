import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Modal, AlertType } from './modal.model';

@Injectable()
export class ModalService {

  private spinnerSubject: Subject<Modal> = new Subject<Modal>();
  constructor() { }

  getMessage(): Observable<Modal> {
    return this.spinnerSubject.asObservable();
  }

  open(option: Modal) {
    this.spinnerSubject.next(option);
  }

  warn(option: Modal) {
    this.spinnerSubject.next({...option, type: AlertType.WARNING});
  }

  error(option: Modal) {
    this.spinnerSubject.next({...option, type: AlertType.ERROR});
  }

  info(option: Modal) {
    this.spinnerSubject.next({...option, type: AlertType.INFO});
  }

  success(option: Modal) {
    this.spinnerSubject.next({...option, type: AlertType.SUCCESS});
  }
}
