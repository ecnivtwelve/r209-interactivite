import "./Layer.css";

function Layer({ src, start = [0, 0], end = [1, 1], z = 0 }) {
  const top = start[1] * 100 + "%";
  const left = start[0] * 100 + "%";
  const height = end[1] * 100 + "%";
  const width = end[0] * 100 + "%";

  return (
    <div className="image-container" style={{ left, top, height, width, zIndex: z }}>
      <img src={src} alt="" />
    </div>
  )
}

export default Layer;