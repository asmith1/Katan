import * as THREE from 'three';
import ResourceTile from './resourceTile';
import {
  cube_spiral,
  generateKey,
  axialHexToLocation,
  cubeToAxial,
} from '../../../util/hexMath';
const TILE_SIZE = 1;

// represented in cube coordinates,
// https://www.redblobgames.com/grids/hexagons/
// with respect to the center of the grid
export default class Board extends THREE.Group {
  constructor({ tiles: seedTiles, radius }) {
    super();

    this.tiles = new Map();
    const positions = cube_spiral(radius);
    positions.map((cubePos) => {
      const axialPos = cubeToAxial(cubePos);
      const key = generateKey(axialPos);

      const resource = seedTiles[key].resource;

      const tile = new ResourceTile(resource, TILE_SIZE);

      const tilePosition = axialHexToLocation(axialPos, TILE_SIZE);

      tile.position.x = tilePosition.x;
      tile.position.z = tilePosition.y;
      tile.name = key;
      this.tiles.set(key, tile);
    });

    this.tiles.forEach((tile) => this.add(tile));
  }
}
