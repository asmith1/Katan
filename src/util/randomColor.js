import { Color } from 'three';

export default function randomColor() {
  const color = new Color(0xffffff);
  color.setHex(Math.random() * 0xffffff);
  return color;
}
