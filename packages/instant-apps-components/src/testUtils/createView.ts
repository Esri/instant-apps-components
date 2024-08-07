import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';

export async function createMapAndViews(id: string): Promise<__esri.MapView | __esri.SceneView> {
  const container = document.createElement('div');
  container.id = id;
  container.style.width = '500px';
  container.style.height = '500px';

  const mapConfig = { portalItem: { id } };
  const map = new WebMap(mapConfig);
  const view = new MapView({ map, container });

  document.body.appendChild(view.container);

  await map.loadAll();
  await view.when();

  return Promise.resolve(view);
}
