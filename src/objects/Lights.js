import {
  Group,
  SpotLight,
  PointLight,
  AmbientLight,
  HemisphereLight,
} from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const candleLight = new PointLight(0xffaa33, 1, 5, 2);
    candleLight.position.set(0, 3, 0);
    candleLight.castShadow = true;

    const candleLight2 = new PointLight(0xffaa33, 1, 10, 2);
    candleLight2.position.set(0, 4, 0);
    candleLight2.castShadow = true;

    const point = new PointLight(0x909090, 4, 10, 1);

    const dir = new SpotLight(0xffffff, 0.8, 7, 0.8, 1, 1);
    const ambi = new AmbientLight(0xc0c0c0, 0.8);
    const hemi = new HemisphereLight(0xeeeeee, 0x080820, 0.8);

    dir.position.set(0, 4, 0);
    dir.target.position.set(0, 0, 0);

    point.position.set(0, 8, 0);

    this.candleLight = candleLight;
    this.candleLight2 = candleLight2;

    this.add(
      // ambi,
      hemi,
      // dir,
      point
      // candleLight,
      // candleLight2
    );
  }

  // update(time) {
  //   this.candleLight2.position.x = Math.sin(time * Math.PI) * 0.25;
  //   this.candleLight2.position.z = Math.cos(time * Math.PI * 0.75) * 0.25;
  //   this.candleLight2.intensity =
  //     2 + Math.sin(time * Math.PI * 2) * Math.cos(time * Math.PI * 1.5) * 0.25;
  // }
}
