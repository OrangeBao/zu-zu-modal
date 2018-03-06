# zu-modal

## Installation

To install this library, run:

```bash
$ npm install zu-modal --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install zu-modal
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild, TemplateRef } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ModalModule, ModalService }  from 'zu-modal';

@Component({
  selector: 'app',
  template: `<zu-modal></zu-modal>
  <button (click)="showModal()">show modal</button>
  <button (click)="warn()">warn</button>
  <button (click)="error()">error</button>
  <button (click)="success()">success</button>
  <button (click)="info()">info</button>
  <ng-template #tempUrl>
    <span (click)="print()">{{text}}</span>
  </ng-template>`
})
class AppComponent {
  constructor(private modalService: ModalService){
  
  }
  text:string = 'helloworld';
  @ViewChild('tempUrl') tempUrl: TemplateRef<any>;
  showModal() {
    this.modalService.open({
      title: '我是title',
      content: this.tempUrl,
      cancelText: 'cancel',
      // okText: 'ok',
      onOk: () => {
        console.log('ok');
      },
      // onCancel: () => {
      //   console.log('cancel');
      // }
    })
  }
  print() {
    console.log('work!');
  }
  warn() {
    this.modalService.warn({
      title: '我是warning',
      content: '我是描述',
      remark: '123123'
    })
  }
  error() {
    this.modalService.error({
      title: '我是warning',
      content: '我是描述',
      remark: '123123'
    })
  }
  success() {
    this.modalService.success({
      title: '我是warning',
      content: '我是描述',
      remark: '123123'
    })
  }
  info() {
    this.modalService.info({
      title: '我是warning',
      content: '我是描述',
      remark: '123123'
    })
  }
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, ModalModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<zu-modal></zu-modal>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [baoyinghai](mailto:yhbao@amarsoft.com)
