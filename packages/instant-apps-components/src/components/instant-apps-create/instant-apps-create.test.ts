import { expect, test, describe } from 'vitest';

import '../../../dist/components/instant-apps-create.js';
//import './instant-apps-create.js';
// import MapView  from 'esri/views/MapView' ;
import Portal from "@arcgis/core/portal/Portal.js";
import WebScene from '@arcgis/core/WebScene';
import config from '@arcgis/core/config'
// import SceneView from '@arcgis/core/views/SceneView';


describe('inline', async () =>{
    const create = document.createElement('instant-apps-create');
    create.setAttribute('mode','inline');
    create.setAttribute('show-scale-bar','true');
    create.setAttribute('id','create-inline');
    test('test if create option map works in inline', async () => {

        config.portalUrl = 'https://nw-brews.mapsdevext.arcgis.com';
        const portal = new Portal({
                url: 'https://nw-brews.mapsdevext.arcgis.com', // dev test
            });


        const webscene = new WebScene({
            portalItem: {
                id: 'd8881fc5e49d4bbcbd62ed23a620b89e', // dev test - scene
                portal,
            },
            });
    
        //const inline = document.getElementById('create-inline');


        create.portal = portal;
        create.content = webscene;

        document.body.appendChild(create);

        await new Promise(resolve => requestIdleCallback(resolve));
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const shadowRoot = document.getElementById('create-inline')?.shadowRoot;
        
        const listOptions  = shadowRoot?.querySelectorAll(".instant-apps-create__option");

        expect(listOptions?.length).toBe(5);

        const hrefs = listOptions && Array.from(listOptions).map((option: HTMLAnchorElement) => option.href);
        const validSubstrings = ["instantgallery", "mapviewer", "stories", "template", "dashboards"];
        
        const testValidity = (testString: string, substrings: string[]) => 
            substrings.some(substring => {
                if (testString.includes(substring) && validSubstrings.includes(substring)){
                    delete validSubstrings[substring]
                    return true;
                }
                return false;
            });
        const hrefsAreValid = hrefs?.every(href => testValidity(href, validSubstrings));

        expect(hrefsAreValid).toBe(true);



    });
});

describe('popover', async () =>{
    const create = document.createElement('instant-apps-create');
    create.setAttribute('mode','popover');
    create.setAttribute('show-scale-bar','true');
    create.setAttribute('id','create-popover');

    test('test if create option map works in popover', async () => {
        config.portalUrl = 'https://nw-brews.mapsdevext.arcgis.com';
        const portal = new Portal({
                url: 'https://nw-brews.mapsdevext.arcgis.com', // dev test
            });


        const webscene = new WebScene({
            portalItem: {
                id: 'd8881fc5e49d4bbcbd62ed23a620b89e', // dev test - scene
                portal,
            },
            });
    
        //const inline = document.getElementById('create-inline');


        create.portal = portal;
        create.content = webscene;

        document.body.appendChild(create);

        await new Promise(resolve => requestIdleCallback(resolve));
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const shadowRoot = document.getElementById('create-popover')?.shadowRoot;

        const listOptions  = shadowRoot?.querySelectorAll(".instant-apps-create__option");

        expect(listOptions?.length).toBe(5);

        const hrefs = listOptions && Array.from(listOptions).map((option: HTMLAnchorElement) => option.href);
        const validSubstrings = ["instantgallery", "mapviewer", "stories", "template", "dashboards"];
        
        const testValidity = (testString: string, substrings: string[]) => 
            substrings.some(substring => {
                if (testString.includes(substring) && validSubstrings.includes(substring)){
                    delete validSubstrings[substring]
                    return true;
                }
                return false;
            });
        const hrefsAreValid = hrefs?.every(href => testValidity(href, validSubstrings));

        expect(hrefsAreValid).toBe(true);

    });

});