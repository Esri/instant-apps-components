export const printStyling = `
  @media print {
    @page {
      size:  Portrait;
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
    display: flex;
    flex-flow: row wrap;
    gap: 16px 36px;
  }

  .instant-apps-export-print, .instant-apps-export-print * {
    box-sizing: border-box;
  }

  .instant-apps-export-print__view-section {
    height: 100%;
  }

  .instant-apps-export-print__view-container {
    position: relative;
    height: 60%;
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
    max-width: 350px;
    display: none;
    color: #323232;
    background: #fff;
    border: 1pt solid #323232;
    break-inside: avoid;
  }

  .instant-apps-export-print__popup-title {
    border-bottom: 1pt solid #323232;
  }

  .instant-apps-export-print__popup-content {
    background: #fff;
    padding-top: 8pt;
  }

  .instant-apps-export-print__popup-content .esri-feature-media__chart {
    background: #fff;
  }

  .instant-apps-export-print__legend-container {
    height: min-content;
    max-width: 300px;
    background: #fff;
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
    margin: 2pt 7pt;
    padding: 0;
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

  .instant-apps-export-print .esri-legend--card__service-caption-container {
    height: unset;
    padding: 0;
    border-bottom: none;
  }

  .instant-apps-export-print .esri-legend--card__service-caption-text {
    padding-bottom: 0;
  }

  .instant-apps-export-print__compass-container {
    position: absolute;
    top: 65px;
    left: 15px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  instant-apps-export-print__compass-container .esri-compass__icon.esri-icon-compass {
    color: #6e6e6e;
  }

  .instant-apps-export-print__popup-container .esri-feature-media__item-navigation {
    display: none;
  }

  .instant-apps-export-print__popup-container .esri-feature-media__chart.esri-feature-media__chart--rendered * {
    width: 100%!important;
  }

  .instant-apps-export-print__popup-content .esri-popup__content {
    margin: 0;
  }`;
