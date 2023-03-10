import {
  ArcRotateCamera,
  CannonJSPlugin,
  Color3,
  Engine,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import * as CANNON from 'cannon';

import { MainLight } from './main-light';
import { MainCamera } from './main-camera';

/** Main scene of the app. */
export class MainScene {
  private readonly engine = new Engine(this.canvas);

  private readonly scene = new Scene(this.engine);

  public constructor(private readonly canvas: HTMLCanvasElement) {
    MainCamera.create(this.scene);
    MainLight.create(this.scene);
    // this.createSphere();


    // create car body
    const carBody = MeshBuilder.CreateBox(
      'carBody',
      { height: 1, width: 5, depth: 10 },
      this.scene
    );
    carBody.position = new Vector3(0, 1, 0);

    // enable physics for car body
    const physicsPlugin = new CannonJSPlugin(true, 100, CANNON);
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), physicsPlugin);
    carBody.physicsImpostor = new PhysicsImpostor(
      carBody,
      PhysicsImpostor.BoxImpostor,
      { mass: 2, friction: 0.1, restitution: 0.3 },
      this.scene
    );
    this.createGround();



    // create script to handle car movement
    const carScript = () => {
      const keyboard = this.engine.getInputElement();
      const forwardForce = new Vector3(0, 0, 10);
      const leftForce = new Vector3(-9, 0, 0);
      const rightForce = new Vector3(10, 0, 0);
      if (keyboard !== null) {
        keyboard.onkeydown = (event) => {
          if (event.key === 'w') {
            carBody.applyImpulse(forwardForce, carBody.getAbsolutePosition());
          }
          if (event.key === 's') {
            carBody.applyImpulse(forwardForce.scale(-1), carBody.getAbsolutePosition());
          }
          if (event.key === 'a') {
            carBody.applyImpulse(leftForce, carBody.getAbsolutePosition());
          }
          if (event.key === 'd') {
            carBody.applyImpulse(rightForce, carBody.getAbsolutePosition());
          }
        };
      }
    };

    // run script when this.scene is ready
    this.scene.onReadyObservable.addOnce(() => {
      carScript();
    });
    this.engine.runRenderLoop(() => {
      this.scene.render();
      const physicsEngine = this.scene.getPhysicsEngine();
      if (physicsEngine!== null) {
        physicsEngine._step(1 / 60);
      }
    });

  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  // Dumb ground. Just to show something at scene
  private createGround(): void {
    const ground = MeshBuilder.CreateBox('ground', {
      width: 100,
      height: 1,
      depth: 100,
    }, this.scene);
    ground.position.y = -5.0;
    const material = new StandardMaterial('groundMaterial');
    material.diffuseColor = Color3.Random();
    ground.material = material;
    // enable physics for ground
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, friction: 0.1, restitution: 0.7 },
      this.scene
    );
  }
}
