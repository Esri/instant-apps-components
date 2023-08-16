import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { styles } from './support/constants';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  tag: 'instant-apps-ckeditor-wrapper',
  styleUrl: 'instant-apps-ckeditor-wrapper.scss',
})
export class InstantAppsCkeditorWrapper {
  @Element()
  el: HTMLElement;

  @Event()
  isFocused: EventEmitter<{ fieldName: string; isFocused: boolean }>;

  @Event()
  dataChanged: EventEmitter<string>;

  /**
   * Current value of text editor instance.
   */
  @Prop({
    mutable: true,
  })
  value: string;

  /**
   * Instance of text editor
   */
  @Prop({
    mutable: true,
  })
  editorInstance: any;

  @Watch('value')
  updateValue(): void {
    if (this.value) this.editorInstance.setData(this.value);
  }

  async componentDidLoad() {
    this.init();
  }

  render() {
    return (
      <Host>
        <div />
      </Host>
    );
  }

  async init(): Promise<void> {
    this.applyStyles();
    const config = { toolbar: [] };
    const editor = await ClassicEditor.create(this.el, config);
    this.editorInstance = editor;
    if (this.value) this.editorInstance.setData(this.value);
    editor.editing.view.document.on('change:isFocused', (_event, _data, _isFocused: boolean) => {
      if (!_isFocused) {
        const editorData = editor.getData();
        if (this.value !== editorData) {
          this.value = editorData;
          this.dataChanged.emit(editorData);
        }
      } else {
        this.isFocused.emit();
      }
    });
  }

  applyStyles(): void {
    const id = 'instant-apps-components__ckeditor-wrapper';
    const exists = !!document.getElementById(id);
    if (exists) return;
    const style = document.createElement('style') as HTMLStyleElement;
    style.id = id;
    style.innerHTML = styles;
    document.head.prepend(style);
  }
}
