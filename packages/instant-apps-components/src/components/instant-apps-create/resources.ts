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


  .instant-apps-export-print {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -999;
    color: #323232 !important;
    display: grid;
    gap: 24px;
    grid-auto-flow: row;
    --esri-calcite-mode-name: "light";
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
    display: flex;
    justify-content: center;
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
    object-fit: contain;
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
    color: #323232;
    font-size: 10px;
    padding: 0 4px;
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
  }

  .instant-apps-export-print__content-container {
    display: flex;
    gap: 24px;
    break-inside: avoid;
    break-before: auto;
  }`;

export const screenshotStyling = `
.screenshot-preview.hide, .hide {
  display: none;
}

.screenshot-cursor {
  cursor: crosshair;
}

.relative {
  position: relative;
}

#screenshot-mask {
  position: absolute;
  background: var(--instant-apps-screenshot-mask-background);
  border: var(--instant-apps-screenshot-mask-border);
}

.screenshot-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.75);
}

.screenshot-preview * {
  box-sizing: border-box;
}

.screenshot-img-container img {
  max-height: 75%;
  max-width: 75%;
  object-fit: contain;
  border: 10px solid white;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5em;
}

.screenshot-img-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 8px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.screenshot-img-container calcite-button {
  margin: 5px;
}`;
