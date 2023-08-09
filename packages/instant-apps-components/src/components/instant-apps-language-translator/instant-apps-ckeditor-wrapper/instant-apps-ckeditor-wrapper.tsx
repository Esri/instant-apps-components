import { Component, Element, h } from '@stencil/core';
import { Editor } from '@ckeditor/ckeditor5-build-classic';

@Component({
  tag: 'instant-apps-ckeditor-wrapper',
  styleUrl: 'instant-apps-ckeditor-wrapper.scss',
})
export class InstantAppsCkeditorWrapper {
  @Element()
  el: HTMLElement;

  editorInstance: any;

  async componentDidLoad() {
    // console.log(ClassicCustomEditor);
    // ClassicCustomEditor.create().then(res => {
    //   this.editorInstance = res;
    // });
    // res.create();
    // (ClassicEditor as any).create(this.el.querySelector('#editor') as HTMLElement).then(editor => {
    //   this.editorInstance = editor;
    // });
  }

  render() {
    console.log(Editor);
    // console.log(ClassicEditor);
    return (
      <div>
        <div id="editor"></div>
      </div>
    );
  }
}
