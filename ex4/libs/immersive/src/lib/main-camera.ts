import { ArcRotateCamera, Scene, UniversalCamera, Vector3 } from '@babylonjs/core';

/** Main camera of the scene. */
export class MainCamera {

  public static create(scene: Scene): void {
    const camera = new ArcRotateCamera('mainCamera', -Math.PI/2, 1, 100, Vector3.Zero(), scene);
    camera.attachControl();
  }
}
