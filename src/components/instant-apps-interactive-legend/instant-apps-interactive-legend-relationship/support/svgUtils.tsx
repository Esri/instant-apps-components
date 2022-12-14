import { h } from '@stencil/core';

import { mat2df32 } from './mat2df32';

import has from './has';

let patternCount = 0;
let linearGradientCount = 0;

// export async function generateFillAttributes(fill: FillDescriptor): Promise<FillAtrributes> {
export function generateFillAttributes(fill: any, Color): any {
  const attrs: any = {
    // FillAtrributes
    fill: 'none',
    pattern: null,
    linearGradient: null,
  };

  if (fill) {
    if ('type' in fill && fill.type === 'pattern') {
      const id = `patternId-${++patternCount}`;
      attrs.fill = `url(#${id})`;
      attrs.pattern = {
        id,
        x: fill.x,
        y: fill.y,
        width: fill.width,
        height: fill.height,
        image: {
          x: 0,
          y: 0,
          width: fill.width,
          height: fill.height,
          href: fill.src,
        },
      };
    } else if ('type' in fill && fill.type === 'linear') {
      const id = `linearGradientId-${++linearGradientCount}`;
      attrs.fill = `url(#${id})`;
      attrs.linearGradient = {
        id,
        x1: fill.x1,
        y1: fill.y1,
        x2: fill.x2,
        y2: fill.y2,
        stops: fill.colors.map(stop => ({
          offset: stop.offset,
          color: stop.color && new Color(stop.color).toString(),
        })),
      };
    } else if (fill) {
      const color = new Color(fill);
      attrs.fill = color.toString();
    }
  }

  return attrs;
}

export function getTransformMatrix(
  bbox: any, // BBox
  width: number,
  height: number,
  overallStrokeWidth: number,
  scale: boolean,
  rotation: number | null,
  useRotationSize: boolean,
  offset?: [number, number],
  bloomSize?: [number, number],
): string {
  let surfaceCenterX = (useRotationSize && rotation ? getRotationSize(rotation, width) : width) / 2;
  let surfaceCenterY = (useRotationSize && rotation ? getRotationSize(rotation, height) : height) / 2;

  if (bloomSize) {
    const bloomWidth = bloomSize[0]; // increase width by a factor of size
    const bloomHeight = bloomSize[1]; // increase height by a factor of size
    surfaceCenterX = (useRotationSize && rotation ? getRotationSize(rotation, bloomWidth) : bloomWidth) / 2;
    surfaceCenterY = (useRotationSize && rotation ? getRotationSize(rotation, bloomHeight) : bloomHeight) / 2;
  }

  const bWidth = bbox.width + overallStrokeWidth;
  const bHeight = bbox.height + overallStrokeWidth;
  const temp = mat2df32.create();
  const out = mat2df32.create();
  let isScaled = false;

  // 1. First scale up the shape to surface dimensions
  if (scale && bWidth !== 0 && bHeight !== 0) {
    // getScaleMatrix
    const aspect = width !== height ? width / height : bWidth / bHeight;
    // const factor = width / 5;
    const size = width > height ? width : height;

    let xx = 1;
    let yy = 1; // scales

    // Preserve aspect ratio when applying "size"
    if (!isNaN(size)) {
      if (aspect > 1) {
        // width gets "size"
        xx = size / bWidth;
        yy = size / aspect / bHeight;
      } else {
        // height gets "size"
        yy = size / bHeight;
        xx = (size * aspect) / bWidth;
      }
    }

    multiply(out, out, getScaleMatrix(temp, xx, yy, surfaceCenterX, surfaceCenterY));

    isScaled = true;
  }

  // 2. Translate the shape to center of the surface
  // This logic is specifically required for SMS symbols with STYLE_PATH style
  const shapeCenterX = bbox.x + (bWidth - overallStrokeWidth) / 2;
  const shapeCenterY = bbox.y + (bHeight - overallStrokeWidth) / 2;
  const centerX = surfaceCenterX - shapeCenterX;
  const centerY = surfaceCenterY - shapeCenterY;
  multiply(out, out, getTranslateMatrix(temp, centerX, centerY));

  // 3. Scale down the shape surface dimensions if shape dimensions are bigger
  if (!isScaled) {
    if (bWidth > width || bHeight > height) {
      const test = bWidth / width > bHeight / height;
      const actualSize = test ? bWidth : bHeight;
      const refSize = test ? width : height;
      const scaleBy = refSize / actualSize;

      multiply(out, out, getScaleMatrix(temp, scaleBy, scaleBy, shapeCenterX, shapeCenterY));
    }
  }

  // 4. Rotate the shape at the center of the shape
  if (rotation) {
    multiply(out, out, getRotationMatrix(temp, rotation, shapeCenterX, shapeCenterY));
  }

  if (offset) {
    multiply(out, out, getTranslateMatrix(temp, offset[0], offset[1]));
  }

  // out.toString() is not working as TypedArray.toString is not supported in ie
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toString#Browser_compatibility
  return `matrix(${out[0]},${out[1]},${out[2]},${out[3]},${out[4]},${out[5]})`;
}

// export function computeBBox() {}
// export function getBoundingBox() {}

const PI = Math.PI;

// https://math.stackexchange.com/questions/60718/given-a-width-height-and-angle-of-a-rectangle-and-an-allowed-final-size-deter
export function getRotationSize(rotation: number, size: number): number {
  const radians = rotation * (PI / 180);
  return Math.abs(size * Math.sin(radians)) + Math.abs(size * Math.cos(radians));
}

//   export function multiply<T extends Mat2d>(out: T, a: ReadonlyMat2d, b: ReadonlyMat2d): T {
export function multiply<T extends any>(out: T, a: any, b: any): T {
  const a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3],
    a4 = a[4],
    a5 = a[5];
  const b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}

function getTranslateMatrix(out: any, dx: number, dy: number): any {
  //   function getTranslateMatrix(out: Mat2d, dx: number, dy: number): Mat2d {
  return translate(out, identity(out), [dx, dy]);
}

//   export function translate<T extends Mat2d>(out: T, a: ReadonlyMat2d, v: ReadonlyVec2): T {
export function translate<T extends any>(out: T, a: any, v: any): T {
  const a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3],
    a4 = a[4],
    a5 = a[5];
  const v0 = v[0],
    v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}

//   function getScaleMatrix(out: Mat2d, scaleX: number, scaleY: number, cx: number, cy: number): Mat2d {
function getScaleMatrix(out: any, scaleX: number, scaleY: number, cx: number, cy: number): any {
  scale(out, identity(out), [scaleX, scaleY]);
  out[4] = out[4] * scaleX - cx * scaleX + cx;
  out[5] = out[5] * scaleY - cy * scaleY + cy;

  return out;
}

//   export function scale<T extends Mat2d>(out: T, a: ReadonlyMat2d, v: ReadonlyVec2): T {
export function scale<T extends any>(out: T, a: any, v: any): T {
  const a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3],
    a4 = a[4],
    a5 = a[5];
  const v0 = v[0],
    v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}

// export function identity<T extends Mat2d>(out: T): T {
export function identity<T extends any>(out: T): any {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}

//   function getRotationMatrix(out: Mat2d, rotation: number, cx: number, cy: number): Mat2d {
function getRotationMatrix(out: any, rotation: number, cx: number, cy: number): any {
  const angle = ((rotation % 360) * Math.PI) / 180;
  rotate(out, identity(out), angle);

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = out[4];
  const dy = out[5];

  out[4] = dx * cos - dy * sin + cy * sin - cx * cos + cx;
  out[5] = dy * cos + dx * sin - cx * sin - cy * cos + cy;

  return out;
}

export function rotate<T extends any>(out: T, a: any, rad: number): T {
  // export function rotate<T extends Mat2d>(out: T, a: ReadonlyMat2d, rad: number): T {
  const a0 = a[0],
    a1 = a[1],
    a2 = a[2],
    a3 = a[3],
    a4 = a[4],
    a5 = a[5];
  const s = Math.sin(rad);
  const c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}

const styleToDashArray = {
  solid: 'none',
  shortdash: [4, 1],
  shortdot: [1, 1],
  shortdashdot: [4, 1, 1, 1],
  shortdashdotdot: [4, 1, 1, 1, 1, 1],
  dot: [1, 3],
  dash: [4, 3],
  longdash: [8, 3],
  dashdot: [4, 3, 1, 3],
  longdashdot: [8, 3, 1, 3],
  longdashdotdot: [8, 3, 1, 3, 1, 3],
};

// export function generateStrokeAttributes(stroke: StrokeDescriptor): StrokeAttributes {
export async function generateStrokeAttributes(stroke: any, Color): Promise<any> {
  const strokeAttrs: any = {
    color: 'none',
    width: 1,
    cap: 'butt',
    join: '4',
    dashArray: 'none',
    dashOffset: '0',
  };

  if (stroke) {
    if (stroke.width != null) {
      strokeAttrs.width = stroke.width;
    }

    if (stroke.cap) {
      strokeAttrs.cap = stroke.cap;
    }

    if (stroke.join) {
      strokeAttrs.join = stroke.join.toString();
    }

    if (stroke.color) {
      strokeAttrs.color = new Color(stroke.color).toString();
    }

    if (stroke.dashArray) {
      strokeAttrs.dashArray = stroke.dashArray;
    }

    if (stroke.dashArray) {
      strokeAttrs.dashOffset = stroke.dashoffset;
    }

    if (stroke.style) {
      let da;

      if (stroke.style in styleToDashArray) {
        da = styleToDashArray[stroke.style];
      }

      if (Array.isArray(da)) {
        da = da.slice(0);

        for (let i = 0; i < da.length; ++i) {
          da[i] *= stroke.width;
        }

        if (stroke.cap !== 'butt') {
          for (let i = 0; i < da.length; i += 2) {
            da[i] -= stroke.width;
            if (da[i] < 1) {
              da[i] = 1;
            }
          }
          for (let i = 1; i < da.length; i += 2) {
            da[i] += stroke.width;
          }
        }

        da = da.join(',');
      }

      strokeAttrs.dashArray = da;
    }
  }

  return Promise.resolve(strokeAttrs);
}

// export function renderDef(attrs: FillAtrributes): VNode {
export function renderDef(attrs: any): any {
  const { pattern, linearGradient } = attrs;

  if (pattern) {
    return (
      <pattern id={pattern.id} patternUnits="userSpaceOnUse" x={pattern.x} y={pattern.y} width={pattern.width} height={pattern.height}>
        <image x={pattern.image.x} y={pattern.image.y} width={pattern.image.width} height={pattern.image.height} href={pattern.image.href} />
      </pattern>
    );
  }

  if (linearGradient) {
    const stops = linearGradient.stops.map((stop, index) => <stop key={`${index}-stop`} offset={stop.offset} stop-color={stop.color} />);

    return (
      <linearGradient id={linearGradient.id} gradientUnits="userSpaceOnUse" x1={linearGradient.x1} y1={linearGradient.y1} x2={linearGradient.x2} y2={linearGradient.y2}>
        {stops}
      </linearGradient>
    );
  }

  return null;
}

// function getSvgPathFromCommandObjects(commandObjects: CommandObject[]): string {
function getSvgPathFromCommandObjects(commandObjects: any[]): string {
  return commandObjects
    .map(commandObj => `${commandObj.command} ${commandObj.values.join(' ')}`)
    .join(' ')
    .trim();
}

// export function renderShape(
//   shape: ShapeDescriptor,
//   fill: string,
//   stroke: StrokeAttributes,
//   textAttrs: TextAttributes
// ): VNode {

const android = has('android');
const textRenderingFix = has('chrome') || (android && android >= 4) ? 'auto' : 'optimizeLegibility';

export function renderShape(shape: any, fill: string, stroke: any, textAttrs: any): any {
  if (shape) {
    if (shape.type === 'circle') {
      return (
        <circle
          fill={fill}
          fill-rule="evenodd"
          stroke={stroke.color}
          stroke-width={stroke.width}
          stroke-linecap={stroke.cap}
          stroke-linejoin={stroke.join}
          stroke-dasharray={stroke.dashArray}
          stroke-dashoffset={stroke.dashOffset}
          stroke-miterlimit="4"
          cx={shape.cx}
          cy={shape.cy}
          r={shape.r}
        />
      );
    }

    if (shape.type === 'ellipse') {
      return (
        <ellipse
          fill={fill}
          fill-rule="evenodd"
          stroke={stroke.color}
          stroke-width={stroke.width}
          stroke-linecap={stroke.cap}
          stroke-linejoin={stroke.join}
          stroke-dasharray={stroke.dashArray}
          stroke-miterlimit="4"
          cx={shape.cx}
          cy={shape.cy}
          rx={shape.rx}
          ry={shape.ry}
        />
      );
    }

    if (shape.type === 'rect') {
      return (
        <rect
          // onClick={() => {}} // HANDLE REALTIONSHIP FILTER HERE
          fill={fill}
          fill-rule="evenodd"
          stroke={stroke.color}
          stroke-width={stroke.width}
          stroke-linecap={stroke.cap}
          stroke-linejoin={stroke.join}
          stroke-dasharray={stroke.dashArray}
          stroke-miterlimit="4"
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
        />
      );
    }

    if (shape.type === 'image') {
      return <image href={shape.src} x={shape.x} y={shape.y} width={shape.width} height={shape.height} preserveAspectRatio="none" />;
    }

    if (shape.type === 'path') {
      const path = typeof shape.path !== 'string' ? getSvgPathFromCommandObjects(shape.path) : shape.path;

      return (
        <path
          fill={fill}
          fill-rule="evenodd"
          stroke={stroke.color}
          stroke-width={stroke.width}
          stroke-linecap={stroke.cap}
          stroke-linejoin={stroke.join}
          stroke-dasharray={stroke.dashArray}
          stroke-miterlimit="4"
          d={path}
        />
      );
    }

    if (shape.type === 'text') {
      return (
        <text
          alignment-baseline={textAttrs.alignBaseline}
          fill={fill}
          fill-rule="evenodd"
          stroke={stroke.color}
          stroke-width={stroke.width}
          stroke-linecap={stroke.cap}
          stroke-linejoin={stroke.join}
          stroke-dasharray={stroke.dashArray}
          stroke-miterlimit="4"
          text-anchor={textAttrs.align}
          text-decoration={textAttrs.decoration}
          kerning={textAttrs.kerning}
          rotate={textAttrs.rotate}
          text-rendering={textRenderingFix}
          font-style={textAttrs.font.style}
          font-variant={textAttrs.font.variant}
          font-weight={textAttrs.font.weight}
          font-size={textAttrs.font.size}
          font-family={textAttrs.font.family}
          x={shape.x}
          y={shape.y}
        >
          {shape.text}
        </text>
      );
    }
  }

  return null;
}

// export function computeBBox(bboxes: BBox[]): BBox {
export function computeBBox(bboxes: any[]): any {
  const defaultBBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  let result: any | null = null;
  let endX: number = Number.NEGATIVE_INFINITY;
  let endY: number = Number.NEGATIVE_INFINITY;

  for (const bbox of bboxes) {
    if (result) {
      result.x = Math.min(result.x, bbox.x);
      result.y = Math.min(result.y, bbox.y);
      endX = Math.max(endX, bbox.x + bbox.width);
      endY = Math.max(endY, bbox.y + bbox.height);
    } else {
      result = defaultBBox;
      result.x = bbox.x;
      result.y = bbox.y;
      endX = bbox.x + bbox.width;
      endY = bbox.y + bbox.height;
    }
  }

  if (result) {
    result.width = endX - result.x;
    result.height = endY - result.y;
  }

  return result;
}

// export function getBoundingBox(shape: ShapeDescriptor): BBox {
export function getBoundingBox(shape: any): any {
  const bbox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  if (shape.type === 'circle') {
    bbox.x = shape.cx - shape.r;
    bbox.y = shape.cy - shape.r;
    bbox.width = 2 * shape.r;
    bbox.height = 2 * shape.r;
  } else if (shape.type === 'ellipse') {
    bbox.x = shape.cx - shape.rx;
    bbox.y = shape.cy - shape.ry;
    bbox.width = 2 * shape.rx;
    bbox.height = 2 * shape.ry;
  } else if (shape.type === 'image' || shape.type === 'rect') {
    bbox.x = shape.x;
    bbox.y = shape.y;
    bbox.width = shape.width;
    bbox.height = shape.height;
  } else if (shape.type === 'path') {
    const pathBBox = getBoundingBoxForPath(shape);
    bbox.x = pathBBox.x;
    bbox.y = pathBBox.y;
    bbox.width = pathBBox.width;
    bbox.height = pathBBox.height;
  }

  return bbox;
}

const PATH_REGEX = /([A-DF-Za-df-z])|([-+]?\d*[.]?\d+(?:[eE][-+]?\d+)?)/g;

// function getBoundingBoxForPath(shape: PathDescriptor): BBox {
function getBoundingBoxForPath(shape: any): any {
  const path = typeof shape.path !== 'string' ? getSvgPathFromCommandObjects(shape.path) : shape.path;
  const p = path.match(PATH_REGEX);
  const segments: any[] = []; // Segment[]
  const bboxRect: any = {};

  if (!p) {
    return null;
  }

  // create segments
  let action = ''; // current action
  let args: number[] = []; // current arguments
  const l = p.length;

  for (let i = 0; i < l; ++i) {
    const item = p[i];
    const value = parseFloat(item);

    if (isNaN(value)) {
      if (action) {
        pushSegment(action, args, segments);
      }

      args = [];
      action = item;
    } else {
      args.push(value);
    }
  }

  pushSegment(action, args, segments);

  const bbox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  if (bboxRect && 'left' in bboxRect) {
    bbox.x = bboxRect.left;
    bbox.y = bboxRect.top;
    bbox.width = bboxRect.right - bboxRect.left;
    bbox.height = bboxRect.bottom - bboxRect.top;
  }

  return bbox;
}

const segmentTypeToArgCount = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7, z: 0 };

function pushSegment(action: string, args: number[], segments: any[]): void {
  // function pushSegment(action: string, args: number[], segments: Segment[]): void {
  const argCount = segmentTypeToArgCount[action.toLowerCase()];
  let segment: any; // Segment

  if (typeof argCount === 'number') {
    if (argCount) {
      if (args.length >= argCount) {
        segment = { action, args: args.slice(0, args.length - (args.length % argCount)) };
        segments.push(segment);
        updateWithSegment(segment);
      }
    } else {
      segment = { action, args: [] };
      segments.push(segment);
      updateWithSegment(segment);
    }
  }
}

let bboxRect: any = {};
const lastPoint: any = {};

function updateBBox(x: number, y: number): void {
  if (bboxRect && 'left' in bboxRect) {
    if (bboxRect.left > x) {
      bboxRect.left = x;
    }
    if (bboxRect.right < x) {
      bboxRect.right = x;
    }
    if (bboxRect.top > y) {
      bboxRect.top = y;
    }
    if (bboxRect.bottom < y) {
      bboxRect.bottom = y;
    }
  } else {
    bboxRect = { left: x, bottom: y, right: x, top: y };
  }
}

// function updateWithSegment(segment: Segment): void {
function updateWithSegment(segment: any): void {
  const n = segment.args;
  const l = n.length;
  let i: number;

  switch (segment.action) {
    case 'M':
    case 'L':
    case 'C':
    case 'S':
    case 'Q':
    case 'T':
      for (i = 0; i < l; i += 2) {
        updateBBox(n[i], n[i + 1]);
      }
      lastPoint.x = n[l - 2];
      lastPoint.y = n[l - 1];
      break;
    case 'H':
      for (i = 0; i < l; ++i) {
        updateBBox(n[i], lastPoint.y);
      }
      lastPoint.x = n[l - 1];
      break;
    case 'V':
      for (i = 0; i < l; ++i) {
        updateBBox(lastPoint.x, n[i]);
      }
      lastPoint.y = n[l - 1];
      break;
    case 'm': {
      let start = 0;
      if (!('x' in lastPoint)) {
        updateBBox((lastPoint.x = n[0]), (lastPoint.y = n[1]));
        start = 2;
      }
      for (i = start; i < l; i += 2) {
        updateBBox((lastPoint.x += n[i]), (lastPoint.y += n[i + 1]));
      }
      break;
    }
    case 'l':
    case 't':
      for (i = 0; i < l; i += 2) {
        updateBBox((lastPoint.x += n[i]), (lastPoint.y += n[i + 1]));
      }
      break;
    case 'h':
      for (i = 0; i < l; ++i) {
        updateBBox((lastPoint.x += n[i]), lastPoint.y);
      }
      break;
    case 'v':
      for (i = 0; i < l; ++i) {
        updateBBox(lastPoint.x, (lastPoint.y += n[i]));
      }
      break;
    case 'c':
      for (i = 0; i < l; i += 6) {
        updateBBox(lastPoint.x + n[i], lastPoint.y + n[i + 1]);
        updateBBox(lastPoint.x + n[i + 2], lastPoint.y + n[i + 3]);
        updateBBox((lastPoint.x += n[i + 4]), (lastPoint.y += n[i + 5]));
      }
      break;
    case 's':
    case 'q':
      for (i = 0; i < l; i += 4) {
        updateBBox(lastPoint.x + n[i], lastPoint.y + n[i + 1]);
        updateBBox((lastPoint.x += n[i + 2]), (lastPoint.y += n[i + 3]));
      }
      break;
    case 'A':
      for (i = 0; i < l; i += 7) {
        updateBBox(n[i + 5], n[i + 6]);
      }
      lastPoint.x = n[l - 2];
      lastPoint.y = n[l - 1];
      break;
    case 'a':
      for (i = 0; i < l; i += 7) {
        updateBBox((lastPoint.x += n[i + 5]), (lastPoint.y += n[i + 6]));
      }
      break;
  }
}
