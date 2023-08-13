import { useState, useRef, useCallback, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import Webcam from "react-webcam";
import "./camerafeeds.css";

import Dropdown from "../Dropdown/Dropdown";
import ModalComp from "../ModalComp/ModalComp";

const videoConstraints = {
  facingMode: "user",
};

export default function CameraFeeds() {
  const webcamRef = useRef<Webcam>(null);

  const modalCompRef = useRef<any>(null);

  const captureImage = useCallback(() => {
    const image = webcamRef?.current?.getScreenshot({
      width: 1280,
      height: 720,
    });
    fetch("http://192.168.168.204:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ image: image }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.result > 0) {
          modalCompRef?.current?.openModal();
        }
      })
      .catch((error) => {
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
    <>
      <ModalComp ref={modalCompRef} />
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
          {/* <div
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
          </div> */}
          {devices.map((device: any, index: number) => (
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
          ))}
        </div>
      </div>
    </>
  );
}
