const DEFAULT_FONT_FAMILY = "'Avenir Next','Avenir','Helvetica Neue',sans-serif";

export function getFontFamily(fontFamily: string) {
  return fontFamily ? fontFamily : DEFAULT_FONT_FAMILY;
}
