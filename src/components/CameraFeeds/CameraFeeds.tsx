import { useState, useRef, useCallback, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import Webcam from "react-webcam";
import "./camerafeeds.css";

import Dropdown from "../Dropdown/Dropdown";

const videoConstraints = {
  facingMode: "user",
};

export default function CameraFeeds() {
  const webcamRef = useRef<Webcam>(null);

  const captureImage = useCallback(() => {
    const image = webcamRef?.current?.getScreenshot();
    const formData = new FormData();
    formData.append("image", image);
    fetch("http://6081-14-139-190-106.ngrok.io/", {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": true,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, [webcamRef]);

  const [selectedDevice, setSelectedDevice] = useState<any>({});
  const [devices, setDevices] = useState<any>([]);

  const handleDevices = useCallback(
    (mediaDevices: any) => {
      const videoDevices = mediaDevices.filter(
        ({ kind }: { kind: string }) => kind === "videoinput"
      );
      setDevices(videoDevices);
      setSelectedDevice(videoDevices[0]);
    },
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    console.log(devices);
  }, [devices]);

  useEffect(() => {
    const interval = setInterval(() => {
      captureImage();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="camera-feeds-container">
      <Dropdown
        dropDownLabel="Cameras"
        options={devices.map((device: any) => device.label)}
        selectedOption={selectedDevice.label}
        setSelectedOption={(option: string) => {
          setSelectedDevice(
            devices.find((device: any) => device.label === option)
          );
        }}
      >
        <button className="dropdown-button">
          {selectedDevice.label}
          <BiChevronDown />
        </button>
      </Dropdown>
      <div className="camera-feeds">
        <div
          // key={index}
          data-visible={selectedDevice.label === selectedDevice.label}
          className="camera-feed"
        >
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={{
              ...videoConstraints,
              deviceId: selectedDevice.deviceId,
            }}
            screenshotFormat="image/jpeg"
          />
        </div>
        {/* {devices.map((device: any, index: number) => (
          <div
            key={index}
            data-visible={device.label === selectedDevice.label}
            className="camera-feed"
          >
            <Webcam
              ref={webcamRef}
              audio={false}
              videoConstraints={{
                ...videoConstraints,
                deviceId: device.deviceId,
              }}
              screenshotFormat="image/jpeg"
            />
          </div>
        ))} */}
      </div>
    </div>
  );
}
