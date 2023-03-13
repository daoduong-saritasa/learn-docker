import {
  ArcRotateCamera,
  CannonJSPlugin,
  Color3,
  Engine,
  Mesh,
  MeshBuilder,
  PhysicsImpostor,
  Scene,
  StandardMaterial,
  Vector3,
} from '@babylonjs/core';
import * as CANNON from 'cannon';

import { MainLight } from './main-light';
import { MainCamera } from './main-camera';

import { assertNonNullWithReturn } from '../../../utils/assert-non-null';

/** Main scene of the app. */
export class MainScene {
  private readonly engine = new Engine(this.canvas);

  private readonly scene = new Scene(this.engine);
  private destination: Vector3 | null = Vector3.Zero();
  private carSpeed = 0;
  private carAcceleration = 0;
  public constructor(private readonly canvas: HTMLCanvasElement) {
    MainCamera.create(this.scene);
    MainLight.create(this.scene);

    // enable physics
    const physicsPlugin = new CannonJSPlugin(true, 100, CANNON);
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), physicsPlugin);
    this.createGround();
    const carBody = this.createCar();
    const sphere = this.createSphere();
    this.canvas.addEventListener('click', (event) => {
      const pickResult = this.scene.pick(
        event.offsetX,
        event.offsetY,
        (mesh) => mesh.name === 'ground'
      );
      this.destination = assertNonNullWithReturn(pickResult.pickedPoint);
      const direction = this.destination.subtract(carBody.position);
      direction.y = 0;
      const distance = Vector3.Distance(this.destination, carBody.position);
      this.carAcceleration = distance / 100;
    });

    carBody.physicsImpostor?.registerOnPhysicsCollide(
      sphere.physicsImpostor!,
      (main, collided) => {
        if (main.object === carBody) {
          this.carSpeed = 0;
          this.carAcceleration = 0;
          this.destination = null;
        }
      }
    )

    this.engine.runRenderLoop(() => {
      if (this.destination) {
        const direction = this.destination.subtract(carBody.position);
        direction.y = 0;
        const distance = Vector3.Distance(this.destination, carBody.position);
        const maxSpeed = 10;
        this.carAcceleration = Math.min(this.carAcceleration, maxSpeed / distance);
        this.carSpeed += this.carAcceleration;
        this.carSpeed = Math.min(this.carSpeed, maxSpeed);
        console.log(distance, this.carSpeed)
        if (distance <= this.carSpeed) {
          this.destination = null;
          this.carSpeed = 0;
          this.carAcceleration = 0;
        } else {
          // Update the car's position as usual
          carBody.moveWithCollisions(direction.normalize().scale(this.carSpeed));
        }
      }
      this.scene.render();
    });
  }

  /** Erase 3D related resources. */
  public erase(): void {
    this.scene.dispose();
    this.engine.dispose();
  }

  private createGround(): void {
    const ground = MeshBuilder.CreateBox(
      'ground',
      {
        width: 500,
        height: 1,
        depth: 500,
      },
      this.scene
    );
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

  private createCar(): Mesh {


    const carBody = MeshBuilder.CreateBox(
      'carBody',
      { height: 9, width: 5, depth: 10 },
      this.scene
    );
    carBody.position = new Vector3(0, 0, 0);
    carBody.physicsImpostor = new PhysicsImpostor(
      carBody,
      PhysicsImpostor.BoxImpostor,
      { mass: 2, friction: 0.1, restitution: 0.5 },
      this.scene
    );
    return carBody;
  }

  private createSphere(): Mesh {
    const sphere = MeshBuilder.CreateSphere(
      'sphere',
      { diameter: 5 },
      this.scene
    );
    sphere.position = new Vector3(10, 10, 0);
    const material = new StandardMaterial('sphereMaterial');
    material.diffuseColor = Color3.Random();
    sphere.material = material;
    sphere.physicsImpostor = new PhysicsImpostor(
      sphere,
      PhysicsImpostor.SphereImpostor,
      { mass: 1, friction: 0.1, restitution: 0.3 },
      this.scene
    );
    return sphere;
  }
}
