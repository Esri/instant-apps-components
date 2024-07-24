import { expect, test, describe} from 'vitest';

import '../../../dist/components/instant-apps-landing-page.js';
// import Portal from "@arcgis/core/portal/Portal.js";
// import WebMap from '@arcgis/core/WebMap';
// import MapView from "@arcgis/core/views/MapView";
// import config from '@arcgis/core/config'
// import { IPortal } from '../../interfaces/interfaces';


// import SceneView from '@arcgis/core/views/SceneView';

const enable_sign_in = 'true';
const title_text = 'Vitest Instant App';
const subtitle_text = 'Hi this is only for testing purposes';
const description_text = "Áádóó naashnishgo, náásht'įįh łeets'óózh jiní. Diné be'elyá bee iináanii át'éego, shił yá'";
const entry_button_text = 'Click me!';
const icon_image_scale  = 's';
const icon_image = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png";


describe('unitilialized enableSignIn Prop', async () => {

    const landing_page = document.createElement("instant-apps-landing-page")

    landing_page.setAttribute('title-text',title_text);
    landing_page.setAttribute('subtitle-text',subtitle_text);
    landing_page.setAttribute('description-text',description_text);
    landing_page.setAttribute('entry-button-text',entry_button_text);
    landing_page.setAttribute('icon-image-scale',icon_image_scale);
    landing_page.setAttribute('icon-image',icon_image);
    document.body.appendChild(landing_page);
    await new Promise(resolve => requestIdleCallback(resolve));
    test('test customization', async () => {
        expect(landing_page.subtitleText).toBe('Hi this is only for testing purposes');
        expect(landing_page.titleText).toBe('Vitest Instant App');
        expect(landing_page.descriptionText).toBe("Áádóó naashnishgo, náásht'įįh łeets'óózh jiní. Diné be'elyá bee iináanii át'éego, shił yá'");
        expect(landing_page.entryButtonText).toBe('Click me!');
        
        expect(landing_page.iconImageScale).toBe('s');
        expect(landing_page.iconImage).toBe("https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png");
    });

    test('test empty string', async () => {
        landing_page.iconImageAltText = ""
        expect(landing_page.iconImageAltText).toBe("");
    })
    test('test prop change', async () => {
        landing_page.entryButtonText = 'Do Not Click me!'
        expect(landing_page.entryButtonText).toBe('Do Not Click me!');
    })

    test('test uninitialized button scale', async () => {
        expect(landing_page.entryButtonScale).toBe('l');

    });

    test('test toggle open prop', async () => {
        expect(landing_page.open).toBe(true);
        landing_page.open = false;
        expect(landing_page.open).toBe(false);

    });

    test('test font family', async () => {
        expect(landing_page.fontFamily).toBe('var(--calcite-sans-family);');
        landing_page.fontFamily = 'var(--monospace-family);';
        expect(landing_page.fontFamily).toBe('var(--monospace-family);');

    });
    test('test unitilialized enableSignIn prop', async () => {
        //enableSignIn is not initialized anywehre therefore it must be undefined
        expect(landing_page.enableSignIn).toBe(undefined);
    });

});

describe('unitilialized enableSignIn Prop', async () => {

    const landing_page = document.createElement("instant-apps-landing-page")

    landing_page.setAttribute('title-text',title_text);
    landing_page.setAttribute('subtitle-text',subtitle_text);
    landing_page.setAttribute('description-text',description_text);
    landing_page.setAttribute('entry-button-text',entry_button_text);
    landing_page.setAttribute('icon-image-scale',icon_image_scale);
    landing_page.setAttribute('icon-image',icon_image);
    landing_page.setAttribute('enable-sign-in',enable_sign_in);
    document.body.appendChild(landing_page);
    await new Promise(resolve => requestIdleCallback(resolve));
    test('test itilialized enableSignIn prop', async () => {
        expect(landing_page.enableSignIn).toBe(true);

    });
    test('test port and oauthappid', async () => {
        
        // const map = new WebMap({
        //     portalItem: {
        //       id: 'a235bfc2d24b4568a3b2832b3336d0cc',
        //     },
        //   });
  
        //   const view = new MapView({
        //     map,
        //     container: 'viewDiv',
        //   });
        // const landing_page_DOM = document.querySelector('instant-apps-landing-page');
        // landing_page_DOM!.portal = map.portalItem.portal;
        landing_page.oauthappid = 'wfblKnj2mvxLOiCx';

        expect(landing_page.oauthappid).toBe('wfblKnj2mvxLOiCx');
        

    });
    


});
