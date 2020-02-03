import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw,
  useUpdate
} from "@hex-engine/2d";
import Draggable from "./Draggable";

export default function Box(position: Vector) {
  useType(Box);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(new Vector(25, 25)),
      position: position.clone()
    })
  );

  const movementSpeed = 1;
  const movementVector = new Vector(0, 0);
  const zeroPoint = new Vector(0, 0);
  const xBoundary = position.x * 2 - 12.5;
  const yBoundary = position.y * 2 - 12.5;
  let xDirection = 1;
  let yDirection = 1;

  const physics = useNewComponent(() => Physics.Body(geometry));

  useUpdate(delta => {
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
    const xDistance = movementSpeed * xDirection;
    const yDistance = movementSpeed * yDirection;
    const x = xDistance;
    const y = yDistance;

    movementVector.mutateInto({ x, y });

    const force = movementVector.clone();
    if (force.magnitude > movementSpeed) {
      force.magnitude = 0.1 * movementSpeed * delta;
      physics.setVelocity(force);
    } else {
      physics.setVelocity(zeroPoint);
    }

    physics.setAngle(0);
    physics.setAngularVelocity(0);
  });

  useDraw(context => {
    context.fillStyle = "red";
    geometry.shape.draw(context, "fill");
  });
}
