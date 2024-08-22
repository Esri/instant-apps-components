# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## v1.0.0-beta.247

### instant-apps-control-panel

- feat: add ability to expand components that uses the expand widget

## v1.0.0-beta.246

### instant-apps-time-filter

- fix: time slider prop changes

## v1.0.0-beta.245

### instant-apps-time-filter

- feat: Add support for auto play and time slider config

## v1.0.0-beta.244

### General

- chore: update calcite to 2.11.1

## v1.0.0-beta.243

### instant-apps-scoreboard

- fix: check if timeExtent exists for scoreboard stats query

### instant-apps-interactive-legend

- fix: check LayerView.featureEffects if timeExtent exists

## v1.0.0-beta.242

### instant-apps-time-filter

- fix: move state init to `componentWillLoad`

## v1.0.0-beta.241

## v1.0.0-beta.240

### instant-apps-time-filter

- Filter time aware data in both web maps and web scenes.
- Web maps filter time data on a per layer basis, while web scenes filter all available time data.
- Client-side filtering in both 2D/3D
- Feature effects support in 2D

## v1.0.0-beta.239

### instant-apps-filter-list

- fix string and number sort and query functions

## v1.0.0-beta.238

### instant-apps-filter-list

- When querying large datasets for features in dropdown, query for additional features in the background

## v1.0.0-beta.237

### instant-apps-filter-list

- Update maxRecordCountFactor to 5

## v1.0.0-beta.236

### instant-apps-export-views

- Add export for multiple views

## v1.0.0-beta.235

### instant-apps-filter-list

- fix: filter distint values

## v1.0.0-beta.234

- Update Calcite Components to 2.8.5

## v1.0.0-beta.233

- Address breaking changes in ArcGIS Maps SDK for JS

## v1.0.0-beta.232

### instant-apps-social-share

- Tweak hiddenLayer logic

## v1.0.0-beta.231

### instant-apps-interactive-legend

- Add title attribute to headers

## v1.0.0-beta.230

- Revert Calcite Components back to 2.8.3

## v1.0.0-beta.228 & v1.0.0-beta.229

### General

- Release prep

## v1.0.0-beta.227

### instant-apps-interactive-legend

- Create helper function to flatten active layer infos to properly generate data
- Correctly pass in extent object for zoomTo button.

### General

- Resolve compiler errors

## v1.0.0-beta.226

- Update t9n files

## v1.0.0-beta.225

### instant-apps-sign-in

- Remove red font color for sign out

### instant-apps-header

- Add `--instant-apps-header-actions-end-height`

## v1.0.0-beta.224

### instant-apps-social-share

- Add `popoverPositioning` and `removePopoverOffset` props for popover mode

### instant-apps-filter

- fix: add displayOption drop-down to range type

## v1.0.0-beta.223

### instant-apps-interactive-legend

- Add hover tip for field name

## v1.0.0-beta.222

### instant-apps-landing-page

- remove non-null assertion

## v1.0.0-beta.221

### instant-apps-sign-in

- Update sign in CSS, remove icons, and local storage check

## v1.0.0-beta.220

### instant-apps-export

- Add check for popup and turn includePopover switch on when there is one visible

## v1.0.0-beta.219

### instant-apps-create

- Change to UI, styling, and defaults

## v1.0.0-beta.218

### General

- Update package versions.

## v1.0.0-beta.217

### instant-apps-social-share

- Remove width and height attributes from 'X' svg.

## v1.0.0-beta.216

### General

- Fix build issue.

## v1.0.0-beta.215

### General

- Fix build issue.

## v1.0.0-beta.214

### General

- Fix build issue.

## v1.0.0-beta.213

### instant-apps-interactive-legend

- fix: filtering when 'Other' category is hidden in interactive legend

## v1.0.0-beta.212

### instant-apps-create

- Instant Apps Create Component

## v1.0.0-beta.211

### instant-apps-interactive-legend

- Updates to dynamically add/remove/reorder layers

## v1.0.0-beta.210

### instant-apps-sign-in

- Add sign in btn color, subtitleText, update prop name

## v1.0.0-beta.209

### instant-apps-language-switcher

fix: Increase max results when fetching resources

## v1.0.0-beta.208

### instant-apps-sign-in

fix: remove await for whenOnce portal.user, add type to set look of the component, remove box-shadow

## v1.0.0-beta.207

### instant-apps-sign-in

- Add sign in component. Requires `portal` and `oauthappid` props.

### instant-apps-landing-page

- Add sign in capability to landing page.

## v1.0.0-beta.206

### instant-apps-social-share

- Prevent embed text from flipping to RTL

## v1.0.0-beta.205

### instant-apps-social-share

- Update 'Twitter' to 'X'

## v1.0.0-beta.204

### instant-apps-splash

- Add support for `outsideCloseDisabled`: When `true`, disables the closing of the component when clicked outside.
- Secondary action
- Custom action within content.

## v1.0.0-beta.203

### instant-apps-export

fix: make sure map's portalItem.id isn't undefined in legend's id check and check for legend.activeLayerInfos to hide the legend when there isn't one.

## v1.0.0-beta.202

### instant-apps-landing-page

- Include background-position for background image

## v1.0.0-beta.201

### instant-apps-filter-list

- Update combobox scale and CSS

## v1.0.0-beta.200

### instant-apps-interactive-legend

- fix: group layer issue

## v1.0.0-beta.199

### instant-apps-social-share

- Add `--instant-apps-social-share-action-width` CSS variable to be able to set the width of action button

### instant-apps-export

- fix: use view.ui.getComponents() to retrieve scale bar

## v1.0.0-beta.198

### instant-apps-filter-list

- Add comboboxOverlayPositioning argument

## v1.0.0-beta.197

### instant-apps-export

- Update view width check for scale bar

## v1.0.0-beta.196

### instant-apps-interactive-legend

- fix: issue regarding legend not interacting with a layer with a visibility range when the map extent of the web map is saved with the features hidden
- fix: legend not loading if measing dot value title

### instant-apps-filter-list

- Add `filterCount` param to get the number of active filters

### instant-apps-export

- fix: Move units to side of scale bar due to spacing issue, update scale bar CSS for rtl

## v1.0.0-beta.195

- Update package version numbers

## v1.0.0-beta.194

### instant-apps-filter-list

- fix: add check for geometry property before using the create fromJSON() method

## v1.0.0-beta.193

### instant-apps-export

- fix: add showScaleBar checks

## v1.0.0-beta.192

### instant-apps-export

- fix: update how scale bar is created and scale bar font-size

## v1.0.0-beta.191

### instant-apps-filter-list

- fix: update input font-size

## v1.0.0-beta.190

### instant-apps-filter-list

- fix: update input scale and font-size

## v1.0.0-beta.189

### instant-apps-filter-list

- fix: add date expression builder, remove fixed position

## v1.0.0-beta.188

### instant-apps-language-switcher

- fix: optional chaining for map

## v1.0.0-beta.187

### instant-apps-splash

- fix: update messages set up

## v1.0.0-beta.186

### instant-apps-filter-list

- fix: format dates

## v1.0.0-beta.185

### instnat-apps-splash

Add translation files.

## v1.0.0-beta.184

Update Calcite Components to 2.4.0.

## v1.0.0-beta.183

Update Calcite Components to 2.3.0.

## v1.0.0-beta.182

### instant-apps-language-translator

- feat: added a slot for a custom action, `translation-custom-action`, that will be placed in the translation header section of the UI.
- chore: Update jsdoc.

## v1.0.0-beta.181

### instant-apps-language-translator-item

- fix: resolve JSX runtime error when translatedLanguageLabels are loading

## v1.0.0-beta.180

### instant-apps-splash

### instant-apps-header

- fix: honor resized image value

## v1.0.0-beta.179

### instant-apps-filter-list

- add support for tables

## v1.0.0-beta.178

### instant-apps-export

- remove loading prop from export btn

## v1.0.0-beta.177

### instant-apps-filter-list

- add drop-down option to date types

## v1.0.0-beta.176

### instant-apps-language-translator

- feat: batchWriteToPortalItemResource - Exposed public method to batch write to portal item resource.

## v1.0.0-beta.175

### instant-apps-language-translator

Exposed public methods to use for custom actions.

- getTranslationData - Gets translation data for all languages and fields.
- setTranslationData - Updates translation data for all languages and fields.
- getPortalItemResource - Gets portal item resource containing the translation data.

## v1.0.0-beta.174

# General

- feat: Implemented font family utility function

### instant-apps-landing-page

- feat: added `fontFamily` property

## v1.0.0-beta.173

### instant-apps-export

- fix: update set map area button check

## v1.0.0-beta.172

### instant-apps-landing-page

- Added `landingPageOpen` and `landingPageClose` events that are emitted when the landing page is opened or closed, respectively.

### instant-apps-export

- Add set map area functionality
- Update layout

## v1.0.0-beta.171

### instant-apps-language-translator

- Add missing ID to RTE node

## v1.0.0-beta.170

### instant-apps-splash

### instant-apps-landing-page

- Hardcoded button text due to issue with `calcite-button` not updating button text when initially empty.

## v1.0.0-beta.169

## v1.0.0-beta.168

### instant-apps-export

- Update export's t9n

## v1.0.0-beta.167

## v1.0.0-beta.166

### instant-apps-language-translator

- Add support for nested/grouped settings

  Examples: Search configuration search sources, filter configuration layer expressions, cover page configuration, portfolio section descriptions

- Display icon based on stringType property to indicate different types of string settings
  - calcite-icons used: title, subheading, text, button, string
- Update language translator sample with new updates
- Clean up/refactor in instant-apps-language-translator-item

## v1.0.0-beta.165

# General

- fix: properly mixin messageOverrides into getMessages utility

## v1.0.0-beta.164

### instant-apps-social-share

- Add `shareButtonScale` prop to adjust the scale of the popover button

## v1.0.0-beta.163

## v1.0.0-beta.162

## v1.0.0-beta.161

- fix: iac react

## v1.0.0-beta.160

- fix: use customElementsExportBehavior with autoDefineCustomElements in stencil.config.ts
- chore: update @stencil/store to 2.0.8

## v1.0.0-beta.159

- Dependency version updates
- Address breaking changes from Calcite 2.0.0
- Update package-lock.json files

## v1.0.0-beta.158

- Update to Calcite 2.0.0

## v1.0.0-beta.157

### instant-apps-measure

- Add header
- Add closable option

## v1.0.0-beta.156

### instant-apps-export

- Add `--instant-apps-export-action-height`

## v1.0.0-beta.155

### instant-apps-filter-list

- fix: load filterLayer if status is not-loaded or failed

### instant-apps-social-share

- fix: update defaultUrlParams.hiddenLayers check

## v1.0.0-beta.154

### instant-apps-filter-list

- fix: add `findFilterLayer` to get sublayer when needed

## v1.0.0-beta.153

### instant-apps-filter-list

- Add mapImageLayer sublayer support
- Add loader
- revert back to limiting features to maxRecords

## v1.0.0-beta.152

### instant-apps-language-switcher

- fix: prevent locale param from being set if default language matches user's locale

## v1.0.0-beta.151

### instant-apps-interactive-legend

- fix: group sublayers that don't have any legends enabled

## v1.0.0-beta.150

### instant-apps-export

- fix: remove reactiveUtils, use onMouseEnter for widget creation, fix extraContent not showing and order of setting up printing

## v1.0.0-beta.149

### instant-apps-filter-list

- fix: use toLocaleString to add commas in numbers

## v1.0.0-beta.148

### instant-apps-interactive-legend

- Legend load fix

## v1.0.0-beta.147

### instant-apps-landing-page

- Use `display: none;`
- CSS updates

## v1.0.0-beta.146

### General

- Use 'loadModules' from src/utils/loadModules

### instant-apps-social-share

- Update projection.loadModules to projection.load
- fix: projection point logic

## v1.0.0-beta.145

### instant-apps-switcher

- fix: re-work default locale logic

## v1.0.0-beta.144

### instant-apps-control-panel

- chore: add support for expand icon in control panel's expand widgets

## v1.0.0-beta.143

### instant-apps-language-translator

### instant-apps-language-switcher

- chore: add t9n files

## v1.0.0-beta.142

### instant-apps-header

- fix: check for fontFamily and use default value if it's not set

## v1.0.0-beta.141

### instant-apps-language-switcher

- fix: Get layer's init definitionExpressions before initExpressions()

## v1.0.0-beta.140

### instant-apps-filter-list

- fix: Get layer's init definitionExpressions before initExpressions()

## v1.0.0-beta.139

### instant-apps-filter-list

- fix: when zooming to features only update query if layerViews filter has the corresponding value.
- For numbers, use fieldInfo.format to get max decimal places and to check if commas as separators are necessary

## v1.0.0-beta.138

## v1.0.0-beta.137

### instant-apps-switcher

- Expose option to set default language item in dropdown.

## v1.0.0-beta.136

### instant-apps-social-share

- Revert X back to Twitter branding

## v1.0.0-beta.135

### instant-apps-language-switcher

- Prevent duplicate render of default locale if it already exists in locale dropdown items

## v1.0.0-beta.134

### instant-apps-language-translator

- use setTimeout to select contents

## v1.0.0-beta.133

### instant-apps-language-translator

- Add copy buttons to text editor elements
- Move copy button out of calcite-input
- Reposition information icons to end of labels

### instant-apps-language-switcher

- Swap calcite-action with calcite-button and add chevron-up/down to indicate that it's a dropdown.

## v1.0.0-beta.132

### instant-apps-export

- Add `--instant-apps-export-action-background` to update the action button background color

### instant-apps-header

- Update `actions-end` slot so that it doesn't have padding

### instant-apps-social-share

- Add container div for calcite-icon so that it can be properly centered

## v1.0.0-beta.131

### instant-apps-export

- fix: arcgis v4.28 changed compass to calcite-button and calcite-icon, icon takes time to load so added a work around.

## v1.0.0-beta.130

### instant-apps-language-translator

- fix: instant-apps-language-translator-search to return results

## v1.0.0-beta.129

### instant-apps-language-translator

- fix: instant-apps-language-translator-search to return results
- fix: maintain order based on app settings by using hash map rather than just an object
- feat: update data structure to use an array of objects to maintain insertion order
- feat: add support for 'textarea' setting type to include map description from Instant Apps configuration

## v1.0.0-beta.128

### instant-apps-filter-list

- Fix: use featureCount and maxRecordCount to get all features, check if `layerExpressions` is undefined

## v1.0.0-beta.127

### instant-apps-language-switcher & instant-apps-language-translator &

- Update default icon from 'globe' to 'languge'

## v1.0.0-beta.126

### instant-apps-splash

- Added `onSplashClose` event emitter.

## v1.0.0-beta.125

### instant-apps-landing-page

- Update `alignment` values to a string value
- Update `disableTransition` default to `true`

## v1.0.0-beta.124

### instant-apps-filter-list

- Fix: Add disconnectedCallback that resets definitionExpressions and filterLayerExpressions

## v1.0.0-beta.123

- Fix: Update hostElement name so that getMessages works as expected

## v1.0.0-beta.122

### instant-apps-social-share

- Update 'Twitter' branding to 'X'

## v1.0.0-beta.121

### instant-apps-filter-list

- Add point cloud layer filtering

## v1.0.0-beta.120

### instant-apps-language-translator

- Current language bug fix

## v1.0.0-beta.119

- Address build issue

## v1.0.0-beta.118

- Resolve build issue
- Generate README documentation for control-panel, export, filter-list, keyboard-shortcuts, and measurement.

## v1.0.0-beta.117

- Update package version numbers

## v1.0.0-beta.116

### instant-apps-language-translator & instant-apps-language-switcher

- fix: selected translator-item on input change
- fix: portal item resource access
- fix: portal item resource data on create

## v1.0.0-beta.115

- Fix build issue

## v1.0.0-beta.114

### instant-apps-language-translator & instant-apps-language-switcher

- Bust cache when requesting t9n data from portal item resource to get latest data within instant apps config

## v1.0.0-beta.113

- Updated doc with typings and examples for language-translator and langauge-switcher comoponents

## v1.0.0-beta.112

### instant-apps-language-translator & instant-apps-language-switcher

- Update language translator/switcher doc.
- Render switcher dropdown with or without portal item resource.

## v1.0.0-beta.111

- T9N updates

## v1.0.0-beta.110

- Created `getMessages` utility function to be used in all components to listen for `onLocaleChange`.

### instant-apps-language-translator

- Component to translate strings in different languages

### instant-apps-language-switcher

- Component to switch between different languages via

### instant-apps-export

- Update export icon

## v1.0.0-beta.109

### instant-apps-export

- Update export icon

## v1.0.0-beta.107

### instant-apps-export

- Add scale bar widget and `showScaleBar` prop

## v1.0.0-beta.99

### instant-apps-filter-list

### instant-apps-export

- Fix: update t9n files

## v1.0.0-beta.98

### instant-apps-interactive-legend

- Fix: Force re-render on active layer info change

## v1.0.0-beta.97

### instant-apps-interactive-legend

- Fix: Update to "Re-calculate layer data when layer is off by default" fix.

## v1.0.0-beta.96

### instant-apps-interactive-legend

- Fix: Use `activeLayerInfo.ready` instead of `activeLayerInfo.legendElements.length`.

## v1.0.0-beta.95

### instant-apps-interactive-legend

- Fix: Re-calculate layer data when layer is off by default.

## v1.0.0-beta.94

### instant-apps-interactive-legend

- Fix: Always show single symbol when legend element is collapsed and 'Zoom to' is disabled.

## v1.0.0-beta.93

### instant-apps-filter-list

- Fix: reset number/range type when it's a dropdown

## v1.0.0-beta.92

### instant-apps-measurement

- Style background of active tool
- Allow active tool on startup
- Destroy tools when widget destroyed.

- Fix: popup load correctly and turn canvas to png, `extraContent` is removed when checked off, update CSS

## v1.0.0-beta.91

### instant-apps-export

- Fix: popup load correctly and turn canvas to png, `extraContent` is removed when checked off, update CSS

## v1.0.0-beta.90

### instant-apps-interactive-legend

- Add support for up to three nested groups.
- Re-adjust line clamp back to 2.

## v1.0.0-beta.89

### instant-apps-interactive-legend

- Update font size and justification of text in legend
- Re-position UI elements in captions
- Improve group layer experience
  - Add support for nested group layers
  - Add indentation to group layer legend elements/nested group layer legend elements to easily visualize the groupings
- Re-apply correct filter when filter mode has changed

## v1.0.0-beta.88

- Update package versions

## v1.0.0-beta.87

### instant-apps-header

- Apply `textColor` to links for `titleTextLink`.
- Add CSS variable `--instant-apps-header-title-text-link-decoration` to control text-decoration for `titleTextLink`.

### instant-apps-filter-list

- Fix for when layerExpressions is updated.

## v1.0.0-beta.86

### instant-apps-header

- Add `headerAlignment` prop

### instant-apps-export

- Fix: add checks

## v1.0.0-beta.85

### instant-apps-scoreboard

- Add support for mobile

## v1.0.0-beta.84

### instant-apps-export

- Update from checkbox to switch

## v1.0.0-beta.83

### instant-apps-interactive-legend

- Fix load state

## v1.0.0-beta.82

### instant-apps-interactive-legend

- Fix group layers
- Feature count logic update
- Prevent interactivity for 'Other' in nested unique category legend types

## v1.0.0-beta.81

## v1.0.0-beta.80

### instant-apps-interactive-legend

- Add support for nested unique categories
  - Count
  - Zoom to
  - Selected/non-selected state
  - Show all
- Remove use of reRender state property to update UI (rely on store update)
- Refactor store update to helper functions
- UI flicker fix (remove usage of keys where it isn't needed/causes issues).
- Refactor, clean up, and organize business logic into helper functions
- Refactor legend elements and captions to sub components
- Handle expanded states within sub components, remove usage of tracking state in store

## v1.0.0-beta.79

### instant-apps-export

- Update to use portrait mode only
- Add `popoverIcon` prop to allow user to change the popover button's icon
- Add compass to view

### instant-apps-filter-list

- Fix: check for featureEffect

## v1.0.0-beta.78

### instant-apps-filter-list

- Fix: Use LayerView's filter when not null to refine results for zoom to

## v1.0.0-beta.77

### instant-apps-control-panel

- Added support for 'expandTooltip' for components nested in esri/widgets/Expand
- Added support for 'collapseTooltip' for components nested in esri/widgets/Expand

## v1.0.0-beta.76

### instant-apps-scoreboard

- Re-calculate scoreboard items based on view.update

## v1.0.0-beta.75

### instant-apps-scoreboard

- CSS updates
- Reflect layer visibility in UI

## v1.0.0-beta.74

## v1.0.0-beta.73

Fix build.

## v1.0.0-beta.72

### instant-apps-scoreboard

- Fix: Watch handle remove fix.

## v1.0.0-beta.71

### instant-apps-scoreboard

- Fix: Re-calculate when layer visibility is toggled.

## v1.0.0-beta.70

### instant-apps-control-panel

- Fix: Re-update UI when components are set.

## v1.0.0-beta.69

### instant-apps-control-panel

- Component to group components together.

## v1.0.0-beta.68

## v1.0.0-beta.67

### instant-apps-filter-list

- Add zoom to button that gets all the current features and zooms in or out to show them all

## v1.0.0-beta.66

### instant-apps-export

- Fix: Put print container behind main container
- Fix: Legend creation
- Add `beforeExport()` prop to run function before window.print() is called

## v1.0.0-beta.65

### instant-apps-scoreboard

- Feat: Implement toggle visibility
- Fix: Sample app
- Fix: N/A bug

## v1.0.0-beta.64

### instant-apps-filter-list

- Add drop-down display option for number and range filter types

### instant-apps-scoreboard

- BREAKING CHANGE: Renamed `data` property to `items`; and, updated it's interface to `ScoreboardItem[]`.

## v1.0.0-beta.63

### instant-apps-filter-list

- Bug fix: Watch doesn't trigger initially so change method used to watch view

### instant-apps-export

- Add label and checkbox for `extraContent`

## v1.0.0-beta.62

### instant-apps-export

- Add exports component that can be used to print or create a PDF of view elements, a screenshot of the view, and additional content when adding an HTML element to the `extraContent` prop in inline or popover mode. Also, allows the dev to listen for updates to the `output` prop and create their own print layout based on those options.

## v1.0.0-beta.61

- Version updates
  - ArcGIS JS API CDN to next
  - Calcite Components to v1.0.7

### instant-apps-scoreboard

- Bug fixes:
- Set min-width and min-height on load state
- Update 'onclick' to 'onClick' to previous/next buttons
- Added label and text to previous/next buttons

## v1.0.0-beta.60

### instant-apps-scoreboard

- Bug fix: Address destructure issue.

## v1.0.0-beta.59

### instant-apps-scoreboard

- Component to calculate and display a series of statistics based on a layer(s) and field attributes.

## v1.0.0-beta.58

- Add Measurement component that displays line, area, point measure tools
- Add individual test apps

## v1.0.0-beta.57

- Bug fixes:
  - Add check for t9n object
  - Remove default header in favor of header slot

## v1.0.0-beta.56

- Add FilterList
- Add functions to get Calcite mode and class

## v1.0.0-beta.55

- Update relative path instead of absolute path for locale assets

## v1.0.0-beta.54

- Revert assets path to /assets instead of /instant-apps-assets

## v1.0.0-beta.53

- Update fetch locale logic.

## v1.0.0-beta.51 and v1.0.0-beta.52

- Update asset management.

## v1.0.0-beta.50

### instant-apps-interactive-legend

- Bug fixes:
  - Data update when layer visibility is toggled.

## v1.0.0-beta.49

### instant-apps-interactive-legend

- Bug fixes:
  - Feature count

## v1.0.0-beta.48

### instant-apps-interactive-legend

- Bug fixes:
  - Predominance rendering

## v1.0.0-beta.47

### instant-apps-interactive-legend

- Bug fixes:
  - Group layer rendering
  - Layer type check

## v1.0.0-beta.46

### instant-apps-interactive-legend

- Bug fixes:
  - Swap zoom/show all with collapsible actions
  - Double scroll bar
  - Dark mode support for relationship drawing style's instructional text
  - Legend caption for group layer - css updates

## v1.0.0-beta.45

### instant-apps-interactive-legend

- Added support for layer effects in instant-apps-interactive-legend-relationship

- Bug fixes:
  - Group layer rendering
  - 'Other' category
  - Feature count style tweaks

## v1.0.0-beta.44

### instant-apps-interactive-legend

- Relationship drawing style
- Bug fixes:
  - Group layer formatting
  - Strength of predominance formatting
  - Word wrap for long field names

## v1.0.0-beta.43

### instant-apps-social-share

- Explicitly set `text-align: left` text within textarea of embed mode while in RTL languages.

## v1.0.0-beta.42

### @esri/calcite-components

- Upgrade to v1.0.7

## v1.0.0-beta.41

### instant-apps-interactive-legend(beta)

- Temporarily removed support for nested unique symbol drawing style.

## v1.0.0-beta.40

### instant-apps-interactive-legend(beta)

- Bug fixes

## v1.0.0-beta.39

### instant-apps-interactive-legend(beta)

- Added string translations

### instant-apps-header

- Added `titleTextLink` property to link out from title text.

## v1.0.0-beta.38

### @esri/calcite-components

- Updated @esri/calcite-components to 1.0.5.

## v1.0.0-beta.37

### instant-apps-interactive-legend(beta)

- Selection/hover state color tweaks

### Other:

- Update usage of `calcite-theme-x` to `calcite-mode-x`.
- Updated @esri/calcite-components to 1.0.4.

## v1.0.0-beta.36

### instant-apps-interactive-legend(beta)

- Increment version number.

## v1.0.0-beta.35

### instant-apps-interactive-legend(beta)

- Add support for sub layers, unsupported drawing style bug fixes, and layer redraw bug fix.

## v1.0.0-beta.34

### a11y

- Converted use of `px` to `rem` for font-size CSS values to honor font size browser settings.

## v1.0.0-beta.33

### instant-apps-interactive-legend(beta)

- Bug fixes

## v1.0.0-beta.32

### instant-apps-interactive-legend(beta)

- Bug fixes

## v1.0.0-beta.31

### instant-apps-interactive-legend(beta)

- Developed web component version of ArcGIS Instant Apps Interactive Legend widget.

## v1.0.0-beta.30

### instant-apps-social-share

- `autoUpdateShareUrl`: controls whether share URL is automatically updated. Default: `true`.

## v1.0.0-beta.29

### General

- Address @esri/calcite-components breaking changes

### instant-apps-social-share

- Provide the option for an alternate success message
- Refresh the shareUrl each time it is generated
- Support restrictions of sharing to iOS and macOS

## v1.0.0-beta.28

### instant-apps-social-share

- Add `shorten-share-url` to control whether to use URL shortener.

## v1.0.0-beta.27

### instant-apps-header

- Truncate title text to prevent overflow to handle mobile devices

## v1.0.0-beta.26

### instant-apps-header

- Fix CSS typo

## v1.0.0-beta.25

### instant-apps-header

- Expose CSS variables to control header height and logo height if needed.

## v1.0.0-beta.24

### instant-apps-header

- Add `header` tag to sanitizer whitelist.

## v1.0.0-beta.23

### instant-apps-header

- Remove sanitization from customHeaderCss property, so it doesn't mess up css formatting

## v1.0.0-beta.22

### instant-apps-social-share

- Prevent embed width/height inputs to allow 'e', 'E', '+', and '-'

## v1.0.0-beta.21

### instant-apps-social-share

- Prevent embed width/height inputs to allow negative values

## v1.0.0-beta.20

### instant-apps-header

- Auto adjust 'logoScale' based off of 'medium' mobile width breakpoint

## v1.0.0-beta.19

### instant-apps-popovers

- Expose currentId

## v1.0.0-beta.18

### instant-apps-popovers

- Expose currentId

## v1.0.0-beta.17

### instant-apps-header

- Handle empty logos.
- Adjust header text font size if logo scale is adjusted.

## v1.0.0-beta.16

### instant-apps-header

- Update custom-header-html to use `div` to avoid double nested `header` tags
- Fix publish

## v1.0.0-beta.15

### instant-apps-header

- Update custom-header-html to use `div` to avoid double nested `header` tags
- Fix publish

## v1.0.0-beta.14

### instant-apps-header

- Update custom-header-html to use `div` to avoid double nested `header` tags

## v1.0.0-beta.13

### instant-apps-header

- Update default colors to use neutral colors.

## v1.0.0-beta.12

### instant-apps-header

- Added support for logo scale.

## v1.0.0-beta.11

### instant-apps-header

- Added properties to support custom font family and custom headers.

## v1.0.0-beta.10

### instant-apps-header

- Added CSS variables to control height and width of elements within header.

## v1.0.0-beta.9

### instant-apps-header

- Added min-height.

## v1.0.0-beta.8

### instant-apps-header

- `infoButton` icon color fix.

## v1.0.0-beta.7

### instant-apps-header

- `infoButton` property fix.

## v1.0.0-beta.6

### instant-apps-header

- `infoButton` property fix.

## v1.0.0-beta.5

### instant-apps-header

- Style fixes
- Added info button property to display at end of title

## v1.0.0-beta.4

### instant-apps-header

- Style fixes

## v1.0.0-beta.3

Bug fixes.

## v1.0.0-beta.2

Bug fixes.

## v1.0.0-beta.1

First initial beta release.
