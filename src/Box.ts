import {
  useType,
  useNewComponent,
  useCanvasSize,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw,
  useUpdate
} from "@hex-engine/2d";
import AutoMovement from "./AutoMovement";

export default function Box(position: Vector) {
  useType(Box);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(new Vector(25, 25)),
      position: position.clone()
    })
  );
  useNewComponent(() => Physics.Body(geometry));
  useNewComponent(() => AutoMovement(geometry));

  const fillStyles = ["red", "blue", "green"];
  let currFillStyle = 0;

  useDraw(context => {
    context.fillStyle = fillStyles[currFillStyle];
    geometry.shape.draw(context, "fill");
  });
}
