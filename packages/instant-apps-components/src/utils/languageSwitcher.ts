import { loadModules } from '../utils/loadModules';

export async function fetchResourceData(request, resource: __esri.PortalItemResource): Promise<any> {
  try {
    const token = resource?.portalItem?.portal?.['credential']?.['token'];
    const reqConfig: __esri.RequestOptions = { responseType: 'json' };
    if (token) reqConfig.query = { token };
    var cacheBuster = 'cacheBuster=' + Date.now();
    const url = `${resource.url}?${cacheBuster}`;
    const reqRes = await request(url, reqConfig);
    const t9nData = reqRes.data;
    return Promise.resolve(t9nData);
  } catch (err) {
    console.error('Unable to get resource t9n data.');
  }
}

export async function getPortalItemResource(portalItem: __esri.PortalItem): Promise<__esri.PortalItemResource | null> {
  if (!portalItem) return null;
  const [PortalItemResource] = await loadModules(['esri/portal/PortalItemResource']);
  const existingResourcesRes = await portalItem.fetchResources();
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
