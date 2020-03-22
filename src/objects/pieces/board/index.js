import * as THREE from 'three';
import ResourceTile from './resourceTile';
import shuffleArray from '../../../util/shuffleArray';

const tileAmounts = {
  brick: 3,
  ore: 3,
  wheat: 4,
  sheep: 4,
  wood: 4,
  desert: 1,
};

function createTilesOld() {
  const tiles = Object.entries(tileAmounts).reduce(
    (accTiles, [resource, amount]) => {
      for (let i = 0; i < amount; i++) {
        accTiles.push(new ResourceTile(resource));
      }
      return accTiles;
    },
    []
  );

  shuffleArray(tiles);

  tiles[1].position.x = 2;
  tiles[2].position.x = -2;
  tiles[3].position.x = 4;
  tiles[4].position.x = -4;

  // 2nd from bottom
  tiles[5].position.z = Math.sqrt(3);
  tiles[5].position.x = 1;

  tiles[6].position.z = Math.sqrt(3);
  tiles[6].position.x = 3;

  tiles[7].position.z = Math.sqrt(3);
  tiles[7].position.x = -1;

  tiles[8].position.z = Math.sqrt(3);
  tiles[8].position.x = -3;

  // 2nd from top
  tiles[9].position.z = -Math.sqrt(3);
  tiles[9].position.x = 1;

  tiles[10].position.z = -Math.sqrt(3);
  tiles[10].position.x = 3;

  tiles[11].position.z = -Math.sqrt(3);
  tiles[11].position.x = -1;

  tiles[12].position.z = -Math.sqrt(3);
  tiles[12].position.x = -3;

  // bottom
  tiles[13].position.z = Math.sqrt(3) * 2;
  tiles[13].position.x = 0;

  tiles[14].position.z = Math.sqrt(3) * 2;
  tiles[14].position.x = -2;

  tiles[15].position.z = Math.sqrt(3) * 2;
  tiles[15].position.x = 2;

  // Top
  tiles[16].position.z = -Math.sqrt(3) * 2;
  tiles[16].position.x = 0;

  tiles[17].position.z = -Math.sqrt(3) * 2;
  tiles[17].position.x = -2;

  tiles[18].position.z = -Math.sqrt(3) * 2;
  tiles[18].position.x = 2;

  return tiles;
}

// represented in cube coordinates,
// https://www.redblobgames.com/grids/hexagons/
// with respect to the center of the grid
export default class Board extends THREE.Group {
  constructor() {
    super();

    const tilesFromCenter = 2;

    this.tiles = new Map();

    for (let x = -tilesFromCenter; x <= tilesFromCenter; x++) {
      for (let y = -tilesFromCenter; y <= tilesFromCenter; y++) {
        for (let z = -tilesFromCenter; z <= tilesFromCenter; z++) {
          if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 4) {
            continue;
          } // enforce hex
          const key = `x:${x},y:${y},z:${z}`;
          const tile = new ResourceTile();
          tile.position.x = 0;

          this.tiles.set(key, tile);
        }
      }
    }

    this.tiles.forEach((tile) => this.add(tile));
  }
}
