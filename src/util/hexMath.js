import { Vector2, Vector3 } from 'three';

export function cubeToAxial(cubeVec3) {
  const q = cubeVec3.x;
  const r = cubeVec3.z;
  return new Vector2(q, r);
}

export function axialToCube(axialVec2) {
  const x = axialVec2.q;
  const z = axialVec2.r;
  const y = -x - z;
  return new Vector3(x, y, z);
}

export function generateKey(axialVec2) {
  const { x: q, y: r } = axialVec2;
  return `q:${q},r:${r}`;
}

export function axialHexToLocation(axialVec2, size) {
  const { x: r, y: q } = axialVec2;
  var x = size * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
  var y = size * ((3 / 2) * r);
  return new Vector2(x, y);
}

export const CUBE_DIRECTIONS = [
  new Vector3(+1, -1, 0),
  new Vector3(+1, 0, -1),
  new Vector3(0, +1, -1),
  new Vector3(-1, +1, 0),
  new Vector3(-1, 0, +1),
  new Vector3(0, -1, +1),
];

export function cube_direction(direction) {
  return CUBE_DIRECTIONS[direction];
}

export function cube_neighbor(cube, direction) {
  return cube.clone().add(cube_direction(direction));
}

export function cube_ring(radius) {
  var results = [];
  var cube = cube_direction(4).clone().multiplyScalar(radius);
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < radius; j++) {
      results.push(cube);
      cube = cube_neighbor(cube, i);
    }
  }
  return results;
}

export function cube_spiral(radius) {
  const center = new Vector3(0, 0, 0);
  const results = [center];
  for (let i = 0; i <= radius; i++) {
    results.push(...cube_ring(i));
  }
  return results;
}
