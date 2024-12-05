import { importPortalPortalItemResource } from '@arcgis/core-adapter';

export async function fetchResourceData(resource: __esri.PortalItemResource): Promise<any> {
  try {
    const t9nData = await resource.fetch('json', { cacheBust: true });
    return Promise.resolve(t9nData);
  } catch (err) {
    console.error('Unable to get resource t9n data.');
  }
}

export async function getPortalItemResource(portalItem: __esri.PortalItem): Promise<__esri.PortalItemResource | null> {
  if (!portalItem) return null;
  const PortalItemResource = await importPortalPortalItemResource();
  const existingResourcesRes = await portalItem.fetchResources({
    num: 100,
  });
  const path = `t9n/${portalItem?.id}.json`;
  const resource = new PortalItemResource({ path, portalItem });
  const existingResourceArr = existingResourcesRes.resources.filter(resourceItem => resourceItem.resource.path === path);
  if (existingResourceArr.length === 0) {
    const type = 'application/json';
    const content = new Blob([JSON.stringify({})], { type });
    try {
      await portalItem.addResource(resource, content);
      const existingResourcesRes = await portalItem.fetchResources();
      const path = `t9n/${portalItem?.id}.json`;
      const existingResourceArr = existingResourcesRes.resources.filter(resourceItem => resourceItem.resource.path === path);
      const existingResource = existingResourceArr[0].resource;
      return Promise.resolve(existingResource);
    } catch (err) {
      console.error('ERROR: ', err);
      return Promise.reject(null);
    }
  } else {
    const existingResource = existingResourceArr[0].resource;
    return Promise.resolve(existingResource);
  }
}
