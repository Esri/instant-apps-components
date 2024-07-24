import { expect, test, describe } from 'vitest';

import '../../../dist/components/instant-apps-social-share.js';



describe('test popover', async () => {
    const social_share = document.createElement('instant-apps-social-share');
    social_share.setAttribute('id','create-popover');
    document.body.appendChild(social_share);
    await new Promise(resolve => requestIdleCallback(resolve));

    test('should be defaulted to popover without explicit prop', async () => {
        expect(social_share.mode).toBe('popover');

    });

    test('should be current URL window', async () => {
        expect(social_share.shareUrl).toBe(window.location.href);

    });
    //autoUpdateShareUrl
    test('autoUpdateShareUrl should haev default value ', async () => {
        expect(social_share.autoUpdateShareUrl).toBe(true);

    });
    //shareText
    test('test setting shareText and checking default value', async () => {
        expect(social_share.shareText).toBe('');
        social_share.shareText = 'This is the test shareText !';
        expect(social_share.shareText).toBe('This is the test shareText !');

    });
    test('test setting embed prop and checking default value', async () => {
        expect( social_share.embed).toBe(false);
        social_share.embed = true;
        expect( social_share.embed).toBe(true);


    });
    test('test shareButtonColor and check default value', async () => {
        expect(social_share.shareButtonColor).toBe('neutral');
        social_share.shareButtonColor = 'inverse';
        expect(social_share.shareButtonColor).toBe('inverse');

    });
    //shareButtonType
    test('test shareButtonType and setting defualt values', async () => {
        expect(social_share.shareButtonType).toBe('button');
        social_share.shareButtonType = 'action';
        expect(social_share.shareButtonType).toBe('action');

    });
    //shareButtonScale
    test('test shareButtonType and setting defualt values', async () => {
        expect(social_share.shareButtonScale).toBe(undefined);
        //should be defualted to whatever scale is in the render logic
        social_share.shareButtonScale = 's';
        expect(social_share.shareButtonScale).toBe('s');

    });
    //iframeInnerText
    test('test shareButtonType and setting defualt values', async () => {
        expect(social_share.iframeInnerText).toBe('');
       
        social_share.iframeInnerText = 'This is the test for ifrmae inner text !@';
        expect(social_share.iframeInnerText).toBe('This is the test for ifrmae inner text !@');

    });
    //popoverButtonIconScale
    test('test popoverButtonIconScale and setting defualt values', async () => {
        expect(social_share.popoverButtonIconScale).toBe('m');
       
        social_share.popoverButtonIconScale = 's';
        expect(social_share.popoverButtonIconScale).toBe('s');

    });
    test('test displayTipText and setting defualt values', async () => {
        expect(social_share.displayTipText).toBe(true);
       
        social_share.displayTipText = false;
        expect(social_share.displayTipText).toBe(false);

    });
    test('test shortenShareUrl and setting defualt values', async () => {
        expect(social_share.shortenShareUrl).toBe(true);
       
        social_share.shortenShareUrl = false;
        expect(social_share.shortenShareUrl).toBe(false);

    });
    test('test socialMedia and setting defualt values', async () => {
        expect(social_share.socialMedia).toBe(true);
       
        social_share.socialMedia = false;
        expect(social_share.socialMedia).toBe(false);

    });
    test('test shareIconsLayout and setting defualt values', async () => {
        expect(social_share.shareIconsLayout).toBe('vertical');
       
        social_share.shareIconsLayout = 'horizontal';
        expect(social_share.shareIconsLayout).toBe('horizontal');

    });
    test('test scale and setting defualt values', async () => {
        expect(social_share.scale).toBe('m');
       
        social_share.scale = 'l';
        expect(social_share.scale).toBe('l');

    });
    test('test successMessage and setting defualt values', async () => {
        expect(social_share.successMessage).toBe('');
       
        social_share.successMessage = 'Your awsome map has been copied to clipboard';
        expect(social_share.successMessage).toBe('Your awsome map has been copied to clipboard');

    });
    //defaultUrlParams
    test('test defaultUrlParams and setting defualt values', async () => {
        expect(social_share.defaultUrlParams).toBe(null);
        const shareParams =  {
            center: true,
            level: true,
            viewpoint : true,
            selectedFeature: false,
            hiddenLayers: true
        } 
        social_share.defaultUrlParams = shareParams;
        
        expect(social_share.defaultUrlParams).toBe(shareParams);

    });
    //popoverPositioning
    test('test popoverPositioning and setting defualt values', async () => {
        expect(social_share.popoverPositioning).toBe('absolute');
       
        social_share.popoverPositioning = 'fixed';
        expect(social_share.popoverPositioning).toBe('fixed');

    });

    test('test removePopoverOffset and setting defualt values', async () => {
        expect(social_share.removePopoverOffset).toBe(false);
       
        social_share.removePopoverOffset = true;
        expect(social_share.removePopoverOffset).toBe(true);

    });
});



describe('test inline', async () => {
    const social_share = document.createElement('instant-apps-social-share');
    social_share.setAttribute('mode','inline');
    social_share.setAttribute('id','create-inline');
    document.body.appendChild(social_share);
    await new Promise(resolve => requestIdleCallback(resolve));

    test('should be defaulted to popover without explicit prop', async () => {
        expect(social_share.mode).toBe('inline');

    });

    test('should be current URL window', async () => {
        expect(social_share.shareUrl).toBe(window.location.href);

    });
        //autoUpdateShareUrl
        test('autoUpdateShareUrl should haev default value ', async () => {
            expect(social_share.autoUpdateShareUrl).toBe(true);
    
        });
        //shareText
        test('test setting shareText and checking default value', async () => {
            expect(social_share.shareText).toBe('');
            social_share.shareText = 'This is the test shareText !';
            expect(social_share.shareText).toBe('This is the test shareText !');
    
        });
        test('test setting embed prop and checking default value', async () => {
            expect( social_share.embed).toBe(false);
            social_share.embed = true;
            expect( social_share.embed).toBe(true);
    
    
        });
        test('test shareButtonColor and check default value', async () => {
            expect(social_share.shareButtonColor).toBe('neutral');
            social_share.shareButtonColor = 'inverse';
            expect(social_share.shareButtonColor).toBe('inverse');
    
        });
        //shareButtonType
        test('test shareButtonType and setting defualt values', async () => {
            expect(social_share.shareButtonType).toBe('button');
            social_share.shareButtonType = 'action';
            expect(social_share.shareButtonType).toBe('action');
    
        });
        //shareButtonScale
        test('test shareButtonType and setting defualt values', async () => {
            expect(social_share.shareButtonScale).toBe(undefined);
            //should be defualted to whatever scale is in the render logic
            social_share.shareButtonScale = 's';
            expect(social_share.shareButtonScale).toBe('s');
    
        });
        //iframeInnerText
        test('test shareButtonType and setting defualt values', async () => {
            expect(social_share.iframeInnerText).toBe('');
           
            social_share.iframeInnerText = 'This is the test for ifrmae inner text !@';
            expect(social_share.iframeInnerText).toBe('This is the test for ifrmae inner text !@');
    
        });
        //popoverButtonIconScale
        test('test popoverButtonIconScale and setting defualt values', async () => {
            expect(social_share.popoverButtonIconScale).toBe('m');
           
            social_share.popoverButtonIconScale = 's';
            expect(social_share.popoverButtonIconScale).toBe('s');
    
        });
        test('test displayTipText and setting defualt values', async () => {
            expect(social_share.displayTipText).toBe(true);
           
            social_share.displayTipText = false;
            expect(social_share.displayTipText).toBe(false);
    
        });
        test('test shortenShareUrl and setting defualt values', async () => {
            expect(social_share.shortenShareUrl).toBe(true);
           
            social_share.shortenShareUrl = false;
            expect(social_share.shortenShareUrl).toBe(false);
    
        });
        test('test socialMedia and setting defualt values', async () => {
            expect(social_share.socialMedia).toBe(true);
           
            social_share.socialMedia = false;
            expect(social_share.socialMedia).toBe(false);
    
        });
        test('test shareIconsLayout and setting defualt values', async () => {
            expect(social_share.shareIconsLayout).toBe('vertical');
           
            social_share.shareIconsLayout = 'horizontal';
            expect(social_share.shareIconsLayout).toBe('horizontal');
    
        });
        test('test scale and setting defualt values', async () => {
            expect(social_share.scale).toBe('m');
           
            social_share.scale = 'l';
            expect(social_share.scale).toBe('l');
    
        });
        test('test successMessage and setting defualt values', async () => {
            expect(social_share.successMessage).toBe('');
           
            social_share.successMessage = 'Your awsome map has been copied to clipboard';
            expect(social_share.successMessage).toBe('Your awsome map has been copied to clipboard');
    
        });
        //defaultUrlParams
        test('test defaultUrlParams and setting defualt values', async () => {
            expect(social_share.defaultUrlParams).toBe(null);
            const shareParams =  {
                center: true,
                level: true,
                viewpoint : true,
                selectedFeature: false,
                hiddenLayers: true
            } 
            social_share.defaultUrlParams = shareParams;
            
            expect(social_share.defaultUrlParams).toBe(shareParams);
    
        });
        //popoverPositioning
        test('test popoverPositioning and setting defualt values', async () => {
            expect(social_share.popoverPositioning).toBe('absolute');
           
            social_share.popoverPositioning = 'fixed';
            expect(social_share.popoverPositioning).toBe('fixed');
    
        });
    
        test('test removePopoverOffset and setting defualt values', async () => {
            expect(social_share.removePopoverOffset).toBe(false);
           
            social_share.removePopoverOffset = true;
            expect(social_share.removePopoverOffset).toBe(true);
    
        });
});