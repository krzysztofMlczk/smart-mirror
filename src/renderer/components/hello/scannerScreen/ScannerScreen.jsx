import React, { useRef, useEffect } from 'react';

import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';

import { drawMesh } from './ScannerUtilities';

const ScannerScreen = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Canvas context
  let ctx;

  // Used for face mesh double buffering
  let faceBuffer = {};

  // Interval between detections in milliseconds
  const detectDeltaTime = 100;
  // Delta frame interval in milliseconds
  const deltaFrame = 16; // 16 for desired approximately 60 fps

  // Function for running face detection
  const detect = async (net) => {
    // Check if webcam is connected and running
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const { video } = webcamRef.current;
      const { videoWidth } = webcamRef.current.video;
      const { videoHeight } = webcamRef.current.video;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces({ input: video });
      faceBuffer = face;

      // Get canvas context
      if (!ctx) {
        ctx = canvasRef.current.getContext('2d');
      }
    }
  };

  // Load posenet
  const runFacemesh = async () => {
    // Load facemesh package
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    // Schedule detection algorithm
    setInterval(() => {
      detect(net);
    }, detectDeltaTime);
    // Schedule mesh rendering
    setInterval(() => {
      requestAnimationFrame(() => {
        drawMesh(faceBuffer, ctx);
      });
    }, deltaFrame);
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  // ----------------------------
  // Attention:
  // This part of code is for debug puropses only.
  // It is needed to choose the proper camera device
  // and won't be included in the original software!
  //

  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  // ----------------------------

  return (
    <div className="Scanner">
      {devices && typeof devices[1] !== 'undefined' && (
        <Webcam
          ref={webcamRef}
          videoConstraints={{
            deviceId: devices[1].deviceId,
          }}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
    </div>
  );
};

export default ScannerScreen;
