import { expect, test } from 'vitest';

import '../../../dist/components/instant-apps-create.js';
//import './instant-apps-create.js';
// import MapView  from 'esri/views/MapView' ;
import Portal from "@arcgis/core/portal/Portal.js";
import WebScene from '@arcgis/core/WebScene';
import config from '@arcgis/core/config'
// import SceneView from '@arcgis/core/views/SceneView';



test('test if create option map works in inline', async () => {
    const create = document.createElement('instant-apps-create');
    create.setAttribute('mode','inline');
    create.setAttribute('show-scale-bar','true');
    create.setAttribute('id','create-inline');
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

    document.body.appendChild(create)

    create.portal = portal;

    create.content = webscene;

    console.log(document.documentElement);
    await new Promise(resolve => requestIdleCallback(resolve));
    
    const listOptions  = document.getElementById('create-inline')?.shadowRoot?.querySelectorAll(".instant-apps-create__option");
    expect(listOptions?.length).toBe(5);
    //expect(listOptions?.length).toBe(5)

    

});