import * as THREE from 'three';
import HexTile from './hexTile';
import {
  cube_spiral,
  generateKey,
  axialHexToLocation,
  cubeToAxial,
  cube_ring,
} from '../../../util/hexMath';
const TILE_SIZE = 1;

// represented in cube coordinates,
// https://www.redblobgames.com/grids/hexagons/
// with respect to the center of the grid
export default class Board extends THREE.Group {
  constructor({ tiles: seedTiles, radius }) {
    super();

    this.tiles = new Map();
    const resourcePositions = cube_spiral(radius);
    const waterPositions = cube_ring(radius + 1);

    resourcePositions.map((cubePos) => {
      const axialPos = cubeToAxial(cubePos);
      const key = generateKey(axialPos);

      const resource = seedTiles[key].resource;

      const tile = new HexTile(resource, TILE_SIZE, true);

      const tilePosition = axialHexToLocation(axialPos, TILE_SIZE);

      tile.position.x = tilePosition.x;
      tile.position.z = tilePosition.y;
      tile.name = key;
      this.tiles.set(key, tile);
    });

    waterPositions.map((cubePos) => {
      const axialPos = cubeToAxial(cubePos);
      const key = generateKey(axialPos);
      const tile = new HexTile('water', TILE_SIZE, false);
      const tilePosition = axialHexToLocation(axialPos, TILE_SIZE);
      tile.position.x = tilePosition.x;
      tile.position.z = tilePosition.y;
      tile.name = key;
      this.tiles.set(key, tile);
    });

    this.tiles.forEach((tile) => this.add(tile));
  }
}
