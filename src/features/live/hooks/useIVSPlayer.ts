import type Player from 'video.js/dist/types/player';

import { registerIVSTech } from 'amazon-ivs-player';
import 'video.js/dist/video-js.css';
import { useEffect, useRef } from 'react';
import videojs from 'video.js';

registerIVSTech(videojs, {
  wasmBinary: 'https://player.live-video.net/1.27.0/amazon-ivs-wasm.min.wasm',
  wasmWorker:
    'https://player.live-video.net/1.27.0/amazon-ivs-wasmworker.min.js',
});

type UseIVSPlayerProps = {
  playbackUrl: string;
};

export const useIVSPlayer = ({ playbackUrl }: UseIVSPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<null | Player>(null);
  const PLAYER_CLASSES = ['vjs-big-play-centered', 'vjs-fluid'];

  useEffect(() => {
    if (!containerRef.current) return;

    const videoElement = document.createElement('video-js');
    videoElement.classList.add(...PLAYER_CLASSES);

    containerRef.current.appendChild(videoElement);

    const videoJsOptions = {
      autoplay: true,
      controls: true,
      fluid: true,
      responsive: true,
      sources: [
        {
          src: playbackUrl,
          type: 'application/x-mpegURL',
        },
      ],
    };

    const player = videojs(videoElement, videoJsOptions, () => {
      console.log('Player is ready');
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [playbackUrl]);

  return { containerRef };
};
