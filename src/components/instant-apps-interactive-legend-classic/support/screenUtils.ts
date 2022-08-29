const DPI = 96;

export function pt2px(pt: number): number {
  if (!pt) {
    return 0;
  }

  return (pt / 72) * DPI;
}
