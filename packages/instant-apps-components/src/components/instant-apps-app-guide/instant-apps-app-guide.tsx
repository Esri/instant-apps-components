import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'instant-apps-app-guide',
  styleUrl: 'instant-apps-app-guide.scss',
  shadow: true,
})
export class InstantAppsAppGuide {
  @Element()
  el: HTMLInstantAppsAppGuideElement;

  render() {
    return (
      <Host>
        <calcite-panel scale="s">
          <span slot="header-content">App Guide <calcite-icon icon="lightbulb" scale="s"></calcite-icon></span>
          <calcite-carousel arrow-type="none">
            <calcite-carousel-item>
              <div>
                {/* Begin: App Guide Page */}
                <b class="content-heading">Page One</b>
                <p>Lorem ipsum dolor sit amet, amet ullamco Lorem enim nulla est. </p>
                <p>Consequat sit sit ullamco magna ad et laborum sunt quis duis deserunt dolore dolore consequat com modo. </p>
                <p>Incididunt id ea Lorem duis. Esse sunt aute in laborum eu minim culpa pariatur anim sunt ex nulla. </p>
                <p>Pariatur eiusmod cillum sunt occaecat dolor do labore a dipisicing.</p>
                {/* End: App Guide Page */}
              </div>
            </calcite-carousel-item>
            <calcite-carousel-item>
              <div>
                {/* Begin: App Guide Page */}
                <b class="content-heading">Page Two</b>
                <p>
                  Lorem ipsum dolor sit amet, aliqua ut consectetur fugiat labore sunt nisi c
                  onsequat laboris quis ut mollit pariatur. Ut reprehenderit ex magna consect
                  etur sint occaecat incididunt. Consectetur veniam deserunt ad aute aliquip
                  culpa aute duis ad nulla cupidatat irure. Proident veniam anim ea culpa aut
                  e laboris elit eiusmod nostrud eu ea Lorem veniam reprehenderit elit offici
                  a ipsum in enim. Occaecat excepteur sit aliquip incididunt ut quis commodo
                  nostrud in proident nisi dolore dolore velit in. Est dolor ex exercitation
                  elit amet sunt sunt id eiusmod velit.
                </p>
                <p>
                  Id minim commodo cillum cillum minim laboris. Laborum incididunt ipsum cupi
                  datat dolor consectetur proident ut esse eiusmod et do pariatur ut anim. Ma
                  gna laboris occaecat nulla duis proident sunt do adipisicing nostrud nulla
                  esse mollit in nisi Lorem do anim enim. Laborum excepteur irure consectetur
                  duis laborum ipsum duis pariatur sit voluptate enim et mollit cillum cupid
                  atat labore in.
                </p>
                {/* End: App Guide Page */}
              </div>
            </calcite-carousel-item>
          </calcite-carousel>
        </calcite-panel>
      </Host>
    )
  }
}
