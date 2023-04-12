export const printStyling = `
  @media print {
    @page {
      size:  auto;
      margin: 0;
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
    color: #323232 !important;
  }

  .instant-apps-export-print, .instant-apps-export-print * {
    box-sizing: border-box;
  }

  .instant-apps-export-print__view-section {
    padding: .25in;
    height: 100%;
  }

  .instant-apps-export-print__view-section--grid {
    display: grid;
    grid-gap: 8px;
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
    width: max-content;
    background: #fff;
    grid-area: legend;
    break-inside: avoid;
  }

  .esri-legend--card__section {
    min-width: unset;
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

  .instant-apps-export-print .esri-legend--card__service-caption-container {
    border-bottom: 1.5pt solid #323232;
  }

  .instant-apps-export-print .esri-legend--card__section {
    border-left: none;
  }

  .instant-apps-export-print .esri-legend--card__section:first-child {
    border-left: none;
  }

  .instant-apps-export-print .esri-legend--card__service {
    border: unset;
    flex: 1 1 auto;
  }

  .instant-apps-export-print .esri-legend--card {
    border: unset;
  }

  .instant-apps-export-print .esri-legend--card, .instant-apps-export-print .esri-legend--card__service {
    border: 1pt solid #323232;
  }

  .instant-apps-export-print__extra-container {
    padding: .25in;
  }
  `;
