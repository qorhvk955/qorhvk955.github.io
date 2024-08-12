import React, { forwardRef } from "react";
import video from "../../assets/videos/project_video.mp4";

const VideoPlayer = forwardRef((props, ref) => {
  return (
    <video ref={ref} width="100%" height="100%" controls muted autoPlay>
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

export default VideoPlayer;
