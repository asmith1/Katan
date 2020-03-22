# Katan

Stuck inside because of global pandemics?
Can't visit your friends to play board games?
Tired of playing board games online that lack the _fun_ of physical pieces?

Introducing... another shitty online katan (plz don't sue me)!

![Game screenshot](README_assets/demo_feb22.png 'Gameboard Screenshot')

## Getting Started

### install

```bash
git clone git@github.com:JacobJaffe/Katan.git katan
cd katan
npm install
```

### Running

From the project root:

```bash
npm start
```

## Controls

- click and drag pieces & cards. While a piece is selected, you can rotate it with `q` and `e`.
- rotate camera with `a` and `d`.
- Sorry Dvoark users (@mgreenw), no key mapping yet. That would be a good feature actually.

## Todo

- [ ] Control-Z functionality for unmoving a piece?
- [ ] Dev Card assets
- [x] Fix tile assets from being skewed
- [x] Board initialization given a config / layout
- [ ] Tile numbers
- [ ] Cities
- [ ] Robber
- [ ] Show if someone else is moving a piece?
- [ ] Add player hand near avatar
- [ ] Flipping dev cards?
- [x] Harry's Sheep
- [ ] Server (LOL that's like half the work) streaming location updates via socket
- [ ] Add player avatar at camera location, looking in direction of mouse (requires server)
