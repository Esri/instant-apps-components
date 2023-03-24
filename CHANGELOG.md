# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
