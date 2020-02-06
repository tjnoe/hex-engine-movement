import {
  useType,
  useCanvasSize,
  useEntity,
  useUpdate,
  Geometry,
  Physics,
  Vector
} from "@hex-engine/2d";

export default function AutoMovement(geometry: ReturnType<typeof Geometry>) {
  useType(AutoMovement);

  const physics = useEntity().getComponent(Physics.Body);

  const movementSpeed = 3;
  const movementVector = new Vector(0, 0);
  const zeroPoint = new Vector(0, 0);
  const { canvasSize } = useCanvasSize();
  let xBoundary = canvasSize.x;
  let yBoundary = canvasSize.y;

  let xDirection = Math.random() >= 0.5 ? 1 : -1;
  let yDirection = Math.random() >= 0.5 ? 1 : -1;
  let startingX = Math.random();
  let startingY = Math.random();

  useUpdate(delta => {
    if (physics) {
      if (
        geometry.position.x + movementSpeed >= xBoundary ||
        geometry.position.x + movementSpeed <= 12.5
      ) {
        xDirection *= -1;
      }
      if (
        geometry.position.y + movementSpeed >= yBoundary ||
        geometry.position.y + movementSpeed <= 12.5
      ) {
        yDirection *= -1;
      }
      const xDistance = startingX * movementSpeed * xDirection;
      const yDistance = startingY * movementSpeed * yDirection;
      const x = xDistance;
      const y = yDistance;

      movementVector.mutateInto({ x, y });

      const force = movementVector.clone();
      force.magnitude = 0.1 * movementSpeed * delta;
      physics.setVelocity(force);

      physics.setAngle(0);
      physics.setAngularVelocity(0);
    }
  });
}
