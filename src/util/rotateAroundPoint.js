/**
 *
 * @param {Object3D} obj your object (THREE.Object3D or derived)
 * @param {Vector3} point point of rotation (THREE.Vector3)
 * @param {Normalized Vector3} axis axis of rotation (normalized THREE.Vector3)
 * @param {number} theta radian value of rotation
 * @param {boolean} pointIsWorld indicating the point is in world coordinates (default = false)
 */
export default function rotateAboutPoint(
  obj,
  point,
  axis,
  theta,
  pointIsWorld
) {
  pointIsWorld = pointIsWorld === undefined ? false : pointIsWorld;

  if (pointIsWorld) {
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if (pointIsWorld) {
    obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }

  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}
