export const styles = `
  .ck.ck-reset.ck-editor.ck-rounded-corners {
    margin-top: 10px !important;
    margin-left: 55px !important;
  }
  .ck-editor__editable {
    height: 70px !important;
    font-size: 0.875rem !important;
    line-height: 	1.375 !important;
    color: var(--calcite-ui-text-1) !important;
  }

  .ck.ck-editor__editable_inline>:first-child,
  .ck.ck-editor__editable_inline>:last-child {
    --ck-spacing-large: 0.5rem !important;
  }

  .ck.ck-balloon-panel.ck-powered-by-balloon {
    --ck-z-modal: 700;
    z-index: 700;
  }

  .calcite-mode-dark .ck-editor__editable {
    color: var(--calcite-ui-text-inverse) !important;
  }
`;
