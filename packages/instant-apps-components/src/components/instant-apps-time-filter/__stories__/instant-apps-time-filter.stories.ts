/*
 *   Copyright (c) 2024 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

export default {
    title: 'Components/TimeFilter',
  };
  
  const Template = args => {
    const el = document.createElement('instant-apps-time-filter');
    el.filterMode = args.filterMode;
    return el;
  };
  
  export const Default = Template.bind({});
  