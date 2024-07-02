export const printStyling = `
  @media print {
    @page {
      size:  Portrait;
      margin: .25in;
    }

    html, body {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }

    body > *:not(.instant-apps-export-print) { display: none; }
  }

  * {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  instant-apps-header {
    height: 50px;
    display: block;
  }


  .instant-apps-export-print {
    z-index: -999;
    color: #323232 !important;
    display: grid;
    grid-auto-flow: row;
    --esri-calcite-mode-name: "light";
    position: absolute;
  }

  .instant-apps-export-print__views-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .instant-apps-export-print__view-content:first-child {
    page-break-before: unset;
  } 

  .instant-apps-export-print__view-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    page-break-before: always;
  }

  .instant-apps-export-print, .instant-apps-export-print * {
    box-sizing: border-box;
  }

  .instant-apps-export-print__view-section {
    height: 100%;
  }

  .instant-apps-export-print__view-container {
    height: 100%;
    width: 100%;
    break-inside: avoid;
  }

  .instant-apps-export-print__view-wrapper {
    height: fit-content;
    width: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;
    border: 2pt solid #323232;
    overflow: hidden;
  }

  .instant-apps-export-print__view {
    max-height: 60vh;
    max-width: calc(100vw - .25in);
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
    background: #fff;
    overflow: unset;
  }

  .esri-legend--card, .esri-legend--card__service-content {
    flex-flow: row wrap;
  }

  .instant-apps-export-print .esri-widget > *:not(.esri-scale-bar.esri-widget > *) {
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

  .instant-apps-export-print .esri-legend--card:not(:first-child),
  .instant-apps-export-print .esri-compass.esri-widget:not(:first-child) {
    display: none;
  }

  .instant-apps-export-print .esri-legend--card__service-caption-container {
    height: unset;
    padding: 0;
    border-bottom: none;
  }

  .instant-apps-export-print .esri-legend--card__service-caption-text {
    padding-bottom: 4px;
  }

  .instant-apps-export-print__compass-container {
    position: absolute;
    top: 65px;
    left: 15px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    --calcite-ui-icon-color: #000;
    border-radius: 50%;
    height: fit-content;
  }

  .instant-apps-export-print__compass-container .esri-compass {
    background: #fff;
  }

  .instant-apps-export-print__compass-container .esri-compass__icon.esri-icon-compass {
    color: #000;
  }

  .instant-apps-export-print__compass-container.esri-compass.esri-widget--button {
    background: #fff;
  }

  .instant-apps-export-print__scale-bar-container {
    width: 100%;
    position: absolute;
    bottom: 15px;
    margin: 0 15px;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__label {
    background-color: rgba(255, 255, 255, 0.66);
    color: #323232;
    font-size: 10px;
    padding: 0 4px;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__label-container--line {
    height: 16px;
    overflow: hidden;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__label-container--top {
    bottom: 1px;
  }
  
  .instant-apps-export-print__scale-bar-container--position .esri-scale-bar__label {
    height: 10px;
    padding: 0 2px;
    line-height: 11px;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__bar-container:nth-child(1n+3) {
    display: none;
  }

  .instant-apps-export-print__scale-bar-container--position .esri-scale-bar__bar-container.esri-scale-bar__bar-container--line {
    align-items: center;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line {
    background-color: rgba(255, 255, 255, 0.66);
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--top {
    width: var(--instant-apps-scale-bar-top) !important;
    border-bottom: 2px solid #323232;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--bottom {
    width: var(--instant-apps-scale-bar-bottom) !important;
    border-top: 2px solid #323232;
  }

  .instant-apps-export-print__scale-bar-container--position .esri-scale-bar__label-container--line {
    position: unset;
    margin: 0 2px;
    background-color: rgba(255, 255, 255, 0.66);
    height: 10px;
    display: flex;
    align-items: center;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--top:before,
  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--top:after,
  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--bottom:before,
  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--bottom:after {
    background-color: #323232;
    border-right: 2px solid #323232;
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
