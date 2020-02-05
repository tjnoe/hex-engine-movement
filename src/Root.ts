import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Physics,
  Vector
} from "@hex-engine/2d";
import Box from "./Box";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen({ pixelZoom: 1 });

  useNewComponent(() =>
    Physics.Engine({
      gravity: new Vector(0, 0)
    })
  );

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2
  );

  useChild(() => Box(canvasCenter));
}
