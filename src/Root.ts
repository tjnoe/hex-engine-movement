import {
  useType,
  useNewComponent,
  useChild,
  useWindowSize,
  Canvas,
  Physics,
  Vector
} from "@hex-engine/2d";
import Box from "./Box";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));

  const { windowSize, onWindowResize } = useWindowSize();

  function resize() {
    let realWidth = 10;
    let realHeight = 10;
    if (windowSize.x >= windowSize.y) {
      realWidth = windowSize.y;
      realHeight = windowSize.y;
    } else {
      realWidth = windowSize.x;
      realHeight = windowSize.x;
    }

    canvas.resize({
      realWidth,
      realHeight,
      pixelWidth: 640,
      pixelHeight: 640
    });
  }

  onWindowResize(resize);
  resize();

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
