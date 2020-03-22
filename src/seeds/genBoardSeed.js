import { cube_spiral, cubeToAxial, generateKey } from '../util/hexMath';
import shuffleArray from '../util/shuffleArray';

// note: these keys are used as paths to images!
const TILE_AMOUNTS = {
  brick: 3,
  ore: 3,
  wheat: 4,
  sheep: 4,
  wood: 4,
  desert: 1,
};

export default function generateBoardSeed(
  radius,
  isBlank = false,
  isRandom = true
) {
  const tileOrder = Object.entries(TILE_AMOUNTS).reduce(
    (orderAcc, [resource, amount]) => {
      const resources = new Array(amount);
      resources.fill(resource);
      return [...orderAcc, ...resources];
    },
    []
  );

  if (isRandom) {
    shuffleArray(tileOrder);
  }

  const positionsCube = cube_spiral(radius);
  const positionsAxial = positionsCube.map(cubeToAxial);
  const seed = positionsAxial.reduce(
    (seed, axialPos) => ({
      ...seed,
      tiles: {
        ...seed.tiles,
        [generateKey(axialPos)]: {
          resource: isBlank ? null : tileOrder.pop(),
          meta: null,
        },
      },
    }),
    {
      tiles: {},
      radius,
      isRandom,
      isBlank,
    }
  );
  console.log(JSON.stringify(seed));
  return seed;
}
