// esri.core.libs.gl-matrix-2.types
// import type { Mat2df32, ReadonlyMat2d } from "../types/mat2d";

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
export function create(): any {
  const out = new Float32Array(6) as any;
  out[0] = 1;
  out[3] = 1;
  return out;
}

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
export function clone(a: any): any {
  const out = new Float32Array(6) as any;
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}

/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */
export function fromValues(a: number, b: number, c: number, d: number, tx: number, ty: number): any {
  const out = new Float32Array(6) as any;
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}

export function createView(buffer: ArrayBuffer, byteOffset: number): any {
  return new Float32Array(buffer, byteOffset, 6) as any;
}

/**
 * Transforms the vec2 at the offset with a matrix
 *
 * @param {mat2d} m matrix to transform with
 * @param {Float32Array} a the array to transform
 * @param {number} offset into the array
 */
export function transform(out: Float32Array, a: Float32Array, m: any, offset: number): void {
  const x = a[offset],
    y = a[offset + 1];

  out[offset] = m[0] * x + m[2] * y + m[4];
  out[offset + 1] = m[1] * x + m[3] * y + m[5];
}

/**
 * Transforms the vec2 at the offset with a matrix
 *
 * @param {mat2d} m matrix to transform with
 * @param {Float32Array} out outputarray
 * @param {Float32Array} a the array to transform
 * @param {number} start first vertex to transform
 * @param {number} end last vertex to transform
 */
export function transformMany(out: Float32Array, a: Float32Array, m: any, start = 0, end = 0, stride = 2): void {
  const vertexEnd = end || a.length / stride;

  for (let i = start; i < vertexEnd; i++) {
    const vertexStart = i * stride;

    transform(out, a, m, vertexStart);
  }
}
