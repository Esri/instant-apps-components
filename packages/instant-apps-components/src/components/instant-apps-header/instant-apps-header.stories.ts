export default {
  title: 'Components/Header',
};

const Template = args => {
  return `<instant-apps-header
    title-text="${args.titleText}"
    background-color="${args.backgroundColor}"
    text-color="${args.textColor}"
    logo-image="${args.logoImage}"
    logo-link="${args.logoLink}"
    info-button="${args.infoButton}"
    info-title-text="${args.infoTitleText}"
  >
      <instant-apps-social-share
        slot="actions-end"
        share-button-color="inverse"
        popover-button-icon-scale="s"
      />
  </instant-apps-header>`;
};

export const Default = Template.bind({});
Default.args = {
  titleText: 'ArcGIS Instant Apps Components',
  backgroundColor: '#0079c1',
  textColor: '#ffffff',
  logoImage: 'https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/arcgis-instant-apps-64.svg',
  logoLink: 'https://www.esri.com/en-us/arcgis/products/arcgis-instant-apps/overview',
  infoButton: true,
};
