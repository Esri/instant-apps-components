import type { Plugin, ResolveIdResult } from 'rollup';
import { normalizeId } from './plugin';

/**
 * Plugin for setting @arcgis/core as external in stencil builds.
 */
export function makeArcgisExternal(): Plugin {
  return {
    name: 'make-arcgis-core-external',

    /**
     * Set @arcgis/core as external.
     */
    resolveId(id, importer): ResolveIdResult {
      if (!importer) {
        return null;
      }

      if (id.startsWith('@arcgis/core') && !id.includes('@arcgis/core-adapter')) {
        return { id: normalizeId(id), external: true };
      }

      return null;
    },
  };
}

/**
 * Plugin to prevent calcite components from being imported.
 */
export function makeCalciteExternal(): Plugin {
  return {
    name: 'no-calcite-imports',

    /**
     * Fail if calcite components are imported.
     */
    resolveId(id, importer): ResolveIdResult {
      if (!importer || !id.startsWith('@esri/calcite-components')) {
        return null;
      }

      this.error(`Calcite components must not be imported, the build system will inject them automatically as required: ${id} in ${importer}`);
    },
  };
}
