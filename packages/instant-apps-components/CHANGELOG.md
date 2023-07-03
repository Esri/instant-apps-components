# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
