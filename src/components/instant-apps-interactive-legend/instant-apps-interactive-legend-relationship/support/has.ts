let cache: HashMap<any>;

if (globalThis['dojoConfig']?.has || globalThis['esriConfig']?.has) {
  // use clone of dojoConfig.has and esriConfig.has
  cache = { ...globalThis['dojoConfig']?.has, ...globalThis['esriConfig']?.has };
} else {
  cache = {};
}

export interface HasFlags {
  // BUILD
  // set to false by Rollup build
  'esri-ts-build': boolean;
  'esri-esbuild-build': boolean;
  'esri-cdn-build': boolean;
  'esri-amd-build': boolean;
  'esri-npm-build': boolean;
  'esri-next': boolean;

  // LOGGING
  // displays debug log in the console
  'esri-debug-messages': boolean;
  // displays deprecation warnings in the console
  'esri-deprecation-warnings': boolean;
  // throws an error when an unknown property is set on Accessor, instead of logging a warning
  'esri-unknown-property-errors': boolean;

  // DEBUG
  'esri-webgl-debug': boolean;
  'esri-2d-debug': boolean;
  'esri-2d-profiler': boolean;
  'esri-tiles-debug': boolean;
  'esri-glyph-debug': boolean;
  'esri-feature-tiles-debug': boolean;
  'esri-feature-highlight-debug': boolean;
  'esri-update-debug': boolean;
  'esri-2d-log-updating': boolean;
  'esri-2d-log-allocations': boolean;
  'esri-2d-update-debug': boolean;
  'esri-workers-debug': boolean;
  'esri-2d-graphic-debug': boolean;

  // ENV
  'host-webworker': boolean;
  'host-browser': boolean;
  'host-node': boolean;

  'dom': boolean;
  'esri-force-webgl': 1 | 2 | undefined;
  // IE11 has a limitation where canvases become tainted when loading SVGs into them
  // This leads to a SecurityError when uploading it to a WebGL texture.
  'esri-canvas-svg-support': boolean;

  // BROWSER/ENGINE VERSIONS
  'wp': number | undefined;
  'msapp': number | undefined;
  'khtml': number | undefined;
  'edge': number | undefined;
  'opr': number | undefined;
  'webkit': number | undefined;
  'chrome': number | undefined;
  'android': number | undefined;
  'safari': number | undefined;
  'mac': boolean;
  'ipod': boolean | undefined;
  'iphone': boolean | undefined;
  'ipad': number | undefined;
  'ios': number | undefined;
  'trident': number | undefined;
  'mozilla': number | undefined;
  'ff': number | undefined;

  'esri-mobile': boolean;
  'esri-iPhone': boolean;

  // WEB FEATURES
  'esri-geolocation': boolean;
  'esri-wasm': boolean;
  'esri-shared-array-buffer': boolean;
  'esri-atomics': boolean;
  'esri-workers': boolean;
  // Use Cache API to store clientside query results
  'web-feat:cache': boolean;
  'esri-workers-arraybuffer-transfer': boolean;
  'esri-csp-restrictions': boolean;
  'esri-image-decode': boolean | undefined;
  'esri-url-encodes-apostrophe': boolean;

  // FEATURELAYER
  // Four-tuple corresponding to the simplification intensity of <small, medium, large, massive> polygons
  'featurelayer-simplify-thresholds': number[];

  // Three-tuple corresponding to the payload simplification factors of <500K, 1MM, 4MM>-sized payloads
  'featurelayer-simplify-payload-size-factors': number[];

  // Amount by which to multiply simplification for mobile
  'featurelayer-simplify-mobile-factor': number;

  // Whether or not to enable snapshot mode
  'featurelayer-snapshot-enabled': boolean;
  // Enable snapshot mode, for points, if we have less than <threshold> features
  'featurelayer-snapshot-point-min-threshold': number;
  // If we exceed `featurelayer-snapshot-point-min-threshold`, but the map extent is such
  // that we cover at least `featurelayer-snapshot-point-coverage` of the total layer's extent,
  // enable snapshot mode so long as we fall below featurelayer-snapshot-point-max-threshold
  'featurelayer-snapshot-point-max-threshold': number;
  // Minimum coverage of the total layer's extent needed to enable snapshot mode when we have
  // more than `featurelayer-snapshot-point-min-threshold` features
  'featurelayer-snapshot-point-coverage': number;
  // FeatureLayer requests CIM symbology
  'featurelayer-advanced-symbols': boolean;
  // FeatureLayer.queryFeatures() uses PBF if supported by service.
  'featurelayer-pbf': boolean;
  // Determines whether to enable pbf support for MapServer which has some known issues
  'mapserver-pbf-enabled': boolean;
  // Enables PBF for statistics query.
  'featurelayer-pbf-statistics': boolean;
  // Enable server-side sorting optimization for orderBy
  'featurelayer-order-by-server-enabled': boolean;
  // Use workers for FeatureLayer w/ feature collection, CSVLayer, and GeoJSONLayer
  'feature-layers-workers': boolean;
  // Multiplies the maxAllowableOffset sent to generalize polylines. Default is 1. Lower values results in more detailed polylines.
  'feature-polyline-generalization-factor': number;
  'esri-2d-query-centroid-enabled': boolean;
  'esri-cluster-arcade-enabled': boolean;
  'stable-symbol-rendering': boolean;

  // Max click tolerance for popup using identify
  'mapimagelayer-popup-identify-max-tolerance': number;

  // Duration of the transitions in ms. Affects opacity and effects transitions.
  'mapview-transitions-duration': number;

  // When switching spatial reference, min scale at which the rotation is adjusted.
  // At smaller scale values, rotation is reset to 0.
  // At larger scale values, rotation is adjusted to match the content on screen.
  'mapview-srswitch-adjust-rotation-scale-threshold': number;

  'disable-feature:i3s-basis': boolean;
  'disable-feature:i3s-draco': boolean;
  'disable-feature:reduce-map-tile-levels': boolean;
  'disable-feature:idb-cache': boolean;
  'enable-feature:idb-mock-cache': boolean;
  'enable-feature:force-wosr': boolean;
  // this flag can be used to enforce webgl debugging, e.g. shader errors over an SV flag
  'enable-feature:webgl-debug': boolean;
  'enable-feature:direct-3d-object-feature-layer-display': boolean;
  'enable-feature:enable-weather': boolean;

  'enable-feature:virtual-light': boolean;

  'enable-feature:terrain-shading': boolean;

  'force-double-precision-obfuscation': boolean;
  'esri-validate-shaders': boolean;

  'wasm-simd': boolean;

  // FEATURE LAYER: HEATMAP
  'heatmap-allow-raster-fallback': boolean;
  'heatmap-force-raster': boolean;

  // WIDGET
  'esri-basemaplayerlist-new-ui': boolean;
  'esri-layerlist-new-ui': boolean;

  // TESTS
  'esri-performance-tests': boolean;
  'edt-test': boolean;
  'edt-suite': boolean;
}

export type HasFlag = keyof HasFlags;

/**
 * Return the current value of the named feature.
 *
 * Returns the value of the feature named by name. The feature must have been
 * previously added to the cache by `has.add`.
 *
 * @param name - The name of the feature to test.
 */
function has<Flag extends HasFlag>(name: Flag): HasFlags[Flag] {
  return typeof cache[name] === 'function' ? (cache[name] = cache[name](globalThis)) : cache[name];
}

/**
 * Register a new feature test for some named feature.
 *
 * @param name - The name of the feature to test.
 * @param test - A test function to register. If a function, queued for testing until actually
 * needed. The test function should return a boolean indicating the presence of a feature or bug.
 * @param [now] - Provides a way to immediately run the test and cache the result.
 * @param [force] - If the test already exists and force is true, then the existing
 * test will be replaced; otherwise, add does not replace an existing test (that
 * is, by default, the first test advice wins).
 */
has.add = <Flag extends HasFlag>(name: Flag, test: HasFlags[Flag] | ((globalThis: any) => HasFlags[Flag]), now?: boolean, force?: boolean) => {
  if (force || typeof cache[name] === 'undefined') {
    cache[name] = test;
  }
  return now && has(name);
};

has.cache = cache;

has.add('esri-debug-messages', false);
has.add('esri-deprecation-warnings', true);
has.add('esri-ts-build', true);

(() => {
  //
  // browser sniff flags
  //

  has.add('host-webworker', typeof globalThis['WorkerGlobalScope'] !== 'undefined' && self instanceof globalThis['WorkerGlobalScope']);

  const isBrowser =
    // the most fundamental decision: are we in the browser?
    typeof window !== 'undefined' && typeof location !== 'undefined' && typeof document !== 'undefined' && window.location === location && window.document === document;

  has.add('host-browser', isBrowser);
  has.add('host-node', typeof (globalThis as any).process === 'object' && (globalThis as any).process.versions?.node && (globalThis as any).process.versions.v8);
  has.add('dom', isBrowser);

  if (has('host-browser')) {
    const n = navigator,
      dua = n.userAgent,
      dav = n.appVersion,
      tv = parseFloat(dav);
    has.add('wp', parseFloat(dua.split('Windows Phone')[1]) || undefined);
    has.add('msapp', parseFloat(dua.split('MSAppHost/')[1]) || undefined);
    has.add('khtml', dav.includes('Konqueror') ? tv : undefined);
    has.add('edge', parseFloat(dua.split('Edge/')[1]) || undefined);
    has.add('opr', parseFloat(dua.split('OPR/')[1]) || undefined);
    // NOTE: https://dev.opera.com/blog/opera-user-agent-strings-opera-15-and-beyond/
    has.add(
      'webkit',
      (!has('wp') && // NOTE: necessary since Windows Phone 8.1 Update 1, see #18540
        !has('edge') &&
        parseFloat(dua.split('WebKit/')[1])) ||
        undefined,
    );
    has.add('chrome', (!has('edge') && !has('opr') && parseFloat(dua.split('Chrome/')[1])) || undefined);
    has.add(
      'android',
      (!has('wp') && // NOTE: necessary since Windows Phone 8.1 Update 1, see #18528
        parseFloat(dua.split('Android ')[1])) ||
        undefined,
    );
    has.add(
      'safari',
      dav.includes('Safari') &&
        !has('wp') && // NOTE: necessary since Windows Phone 8.1 Update 1, see #18540
        !has('chrome') &&
        !has('android') &&
        !has('edge') &&
        !has('opr')
        ? parseFloat(dav.split('Version/')[1])
        : undefined,
    );
    has.add('mac', dav.includes('Macintosh'));

    if (
      !has('wp') && // NOTE: necessary since Windows Phone 8.1 Update 1, see #18528
      dua.match(/(iPhone|iPod|iPad)/)
    ) {
      const p = RegExp.$1.replace(/P/, 'p') as 'iphone' | 'ipad' | 'ipod';
      const v = dua.match(/OS ([\d_]+)/) ? RegExp.$1 : '1';
      const os = parseFloat(v.replace(/_/, '.').replace(/_/g, ''));
      has.add(p, os); // "iphone", "ipad" or "ipod"
      has.add('ios', os);
    }
    has.add('trident', parseFloat(dav.split('Trident/')[1]) || undefined);

    if (!has('webkit')) {
      // Mozilla and firefox
      if (
        dua.includes('Gecko') &&
        !has('wp') && // NOTE: necessary since Windows Phone 8.1 Update 1
        !has('khtml') &&
        !has('trident') &&
        !has('edge')
      ) {
        has.add('mozilla', tv);
      }

      if (has('mozilla')) {
        //We really need to get away from this. Consider a sane isGecko approach for the future.
        has.add('ff', parseFloat(dua.split('Firefox/')[1] || dua.split('Minefield/')[1]) || undefined);
      }
    }
  }
})();

(() => {
  if (globalThis.navigator) {
    const nua = navigator.userAgent;
    const mobileMatch = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(nua);
    const iPhoneMatch = /iPhone/i.test(nua);

    if (mobileMatch) {
      has.add('esri-mobile', mobileMatch);
    }

    if (iPhoneMatch) {
      has.add('esri-iPhone', iPhoneMatch);
    }

    has.add('esri-geolocation', !!navigator.geolocation);
  }

  has.add('esri-canvas-svg-support', !has('trident'));
  has.add('esri-wasm', 'WebAssembly' in globalThis);

  has.add('esri-shared-array-buffer', () => {
    const hasSharedArrayBuffer = 'SharedArrayBuffer' in globalThis;

    // SharedArrayBuffer has new security requirements (in FF 74) which require additional headers
    // in order to make it `crossOriginIsolated`. However, some browsers (chrome) support
    // SharedArrayBuffer but not the new crossOriginIsolated flag.
    // See https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/25766
    const notCrossOriginIsolated = globalThis.crossOriginIsolated === false; // `false` if undefined or true

    // If `hasSharedArrayBuffer` is true and not explicitly prevented by the presence of a `false`
    // crossOriginIsolated flag, then it is safe to use. Otherwise it will throw an error on `postMessage`
    return hasSharedArrayBuffer && !notCrossOriginIsolated;
  });

  has.add('wasm-simd', () => {
    const SIMD_WASM_CODE = [0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11];
    return WebAssembly.validate(new Uint8Array(SIMD_WASM_CODE));
  });

  has.add('esri-atomics', 'Atomics' in globalThis);
  has.add('esri-workers', 'Worker' in globalThis);
  has.add('web-feat:cache', 'caches' in globalThis);

  has.add('esri-workers-arraybuffer-transfer', !has('safari') || Number(has('safari')) >= 12);

  has.add('featurelayer-simplify-thresholds', [0.5, 0.5, 0.5, 0.5]);
  has.add('featurelayer-simplify-payload-size-factors', [1, 1, 4]);

  has.add('featurelayer-snapshot-enabled', true);
  has.add('featurelayer-snapshot-point-min-threshold', 80_000);
  has.add('featurelayer-snapshot-point-max-threshold', 400_000);
  has.add('featurelayer-snapshot-point-coverage', 0.1);
  has.add('featurelayer-advanced-symbols', false);
  has.add('featurelayer-pbf', true);
  has.add('featurelayer-pbf-statistics', false);
  has.add('feature-layers-workers', true);
  has.add('feature-polyline-generalization-factor', 1);
  has.add('mapview-transitions-duration', 200);
  has.add('mapview-srswitch-adjust-rotation-scale-threshold', 24_000_000);
  has.add('mapserver-pbf-enabled', false);

  has.add('mapimagelayer-popup-identify-max-tolerance', 20);

  has.add('heatmap-allow-raster-fallback', true);
  has.add('heatmap-force-raster', false);

  // return early if in a worker, later checks can be ignored
  if (has('host-webworker')) {
    return;
  }

  // return early if not in browser window, later checks can be ignored
  if (!has('host-browser')) {
    return;
  }

  has.add('esri-csp-restrictions', () => {
    try {
      // eslint-disable-next-line no-new-func
      new Function();
    } catch {
      return true;
    }
    return false;
  });

  // Add check for complete Image.decode support
  // Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1501794 (Fixed in Firefox 68)
  // Safari: https://bugs.webkit.org/show_bug.cgi?id=201243 (Fixed in STP 92)
  has.add('esri-image-decode', () => {
    if ('decode' in new Image()) {
      // validate SVG support
      const img = new Image();
      img.src = `data:image/svg+xml;charset=UTF-8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>`;
      img
        .decode()
        .then(() => {
          has.add('esri-image-decode', true, true, true);
        })
        .catch(() => {
          has.add('esri-image-decode', false, true, true);
        });

      return undefined;
    }

    return false;
  });

  has.add('esri-url-encodes-apostrophe', () => {
    const a = window.document.createElement('a');
    a.href = "?'";
    return a.href.includes('?%27');
  });
})();

export default has;
