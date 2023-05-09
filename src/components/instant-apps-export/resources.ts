export const printStyling = `
  @media print {
    @page {
      size:  auto;
      margin: .25in;
    }
    html {
      background-color: #FFFFFF;
      margin: 0;
    }
    body {
      padding: 0;
    }
    body > *:not(.instant-apps-export-print) { display: none; }
  }

  * {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }


  .instant-apps-export-print {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -999;
    color: #323232 !important;
  }

  .instant-apps-export-print, .instant-apps-export-print * {
    box-sizing: border-box;
  }

  .instant-apps-export-print__view-section {
    height: 100%;
  }

  .instant-apps-export-print__view-section--grid {
    display: grid;
    gap: 8px;
  }

  .instant-apps-export-print__view-section--full-view {
    display: block;
    height: 100vh;
  }

  .instant-apps-export-print__view-popup-legend {
    grid-template-areas:
      "view view popup"
      "legend legend popup";
  }

  .instant-apps-export-print__view-legend {
    grid-template-areas:
      "view"
      "legend";
  }

  .instant-apps-export-print__view-popup {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  .instant-apps-export-print__view-container {
    grid-area: view;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 2pt solid #323232;
  }

  .instant-apps-export-print__view {
    height: 100%;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
  }

  .instant-apps-export-print__popup-container {
    height: min-content;
    grid-area: popup;
    display: none;
    color: #323232;
    background: #fff;
    border: 2pt solid #323232;
  }

  .instant-apps-export-print__popup-title {
    border-bottom: 1pt solid #323232;
  }

  .instant-apps-export-print__popup-content {
    padding: 8pt;
  }

  .instant-apps-export-print__popup-content .esri-feature-media__chart {
    background: #fff;
  }

  .instant-apps-export-print__legend-container {
    height: min-content;
    max-width: 8in;
    background: #fff;
    grid-area: legend;
  }

  .esri-legend--card, .esri-legend--card__service-content {
    flex-flow: row wrap;
  }

  .instant-apps-export-print .esri-widget > * {
    background: #fff;
    color: #323232;
  }

  .instant-apps-export-print__popup-content * {
    color: #323232;
  }

  .instant-apps-export-print .esri-widget__heading {
    color: #323232;
  }

  .instant-apps-export-print .esri-legend__ramp-label:before {
    border-color: rgba(0,0,0,0) rgba(50,50,50,.8) rgba(0,0,0,0) rgba(0,0,0,0);
  }

  .instant-apps-export-print .esri-legend--card__section {
    padding: 4pt 0 4pt;
    min-width: unset;
    border-left: none;
  }

  .instant-apps-export-print .esri-legend--card__section:first-child {
    border-left: none;
  }

  .instant-apps-export-print .esri-legend--card__service {
    border: none;
    flex: 0 1 auto;
    break-inside: avoid;
  }

  .instant-apps-export-print .esri-legend--card {
    border: none;
    gap: 6pt 12pt;
  }

  .instant-apps-export-print .esri-legend--card:not(:first-child) {
    display: none;
  }

  .instant-apps-export-print__extra-container {
    break-inside: avoid;
  }

  .instant-apps-export-print .esri-legend--card__service-caption-container {
    height: unset;
    padding: 0;
    border-bottom: none;
  }

  .instant-apps-export-print .esri-legend--card__service-caption-text {
    padding-bottom: 0;
  }
  `;
