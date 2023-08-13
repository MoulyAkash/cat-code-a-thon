import { useState } from "react";
import "./mobileConnection.css";
import MobileImage2 from "./cat_620.png";
import { BiSolidBatteryCharging } from "react-icons/bi";
import MusicImage1 from "./sop.jpg";
import MusicImage2 from "./dfu.jpg";
import { AiFillBackward } from "react-icons/ai";
import { AiFillForward } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";
import { AiFillPauseCircle } from "react-icons/ai";
import SeaOfProblems from "../../assets/GLICHERY - SEA OF PROBLEMS (PHONK).mp3";
import DieForYou from "../../assets/Die For You ft. Grabbitz -- Official Music Video -- VALORANT Champions 2021.mp3";

interface MobileConnectionProps {
  name: string;
  status: boolean;
  battery: number;
}

function MobileConnection({ name, status, battery }: MobileConnectionProps) {
  const [next, setNext] = useState(false);
  const [player, setPlayer] = useState(false);
  const [song1, setSong1] = useState(new Audio(SeaOfProblems));
  const [song2, setSong2] = useState(new Audio(DieForYou));

  return (
    <div className="mobileContainer">
      <div className="left">
        <div className="title">Connected Devices</div>
        <div className="phoneStatus">
          <div className="name">{name}</div>
          <div className="status">
            {status ? (
              <p style={{ color: "lightgreen" }}>Connected</p>
            ) : (
              <p style={{ color: "red" }}>Disconnected</p>
            )}
          </div>
          <div className="batteryStatus">
            <BiSolidBatteryCharging size={15} />
            {battery + "%"}
          </div>
        </div>
        <div
          className="musicPlayer"
          style={{
            backgroundColor: next ? "rgb(255, 26, 0)" : "rgb(5, 213, 250)",
          }}
        >
          <div className="musicImage">
            <img src={!next ? MusicImage1 : MusicImage2} />
          </div>
          <div className="musicInfo">
            <span>
              <div className="title">
                {!next ? "Sea of Problems (PHONK)" : "Die For You - Remix"}
              </div>
              <div className="author">
                {!next ? "Glichery" : "VALORANT, Grabbitz"}
              </div>
            </span>
            <div className="player">
              <button
                onClick={() => {
                  setNext(false);
                }}
              >
                <AiFillBackward size={25} />
              </button>
              <button
                onClick={() => {
                  console.log(!player);
                  !next
                    ? !player
                      ? song1.play()
                      : song1.pause()
                    : !player
                    ? song2.play()
                    : song2.pause();
                  setPlayer(!player);
                }}
              >
                {player ? (
                  <AiFillPauseCircle size={25} />
                ) : (
                  <AiFillPlayCircle size={25} />
                )}
              </button>
              <button
                onClick={() => {
                  setNext(true);
                }}
              >
                <AiFillForward size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <img src={MobileImage2} />
      </div>
    </div>
  );
}

export default MobileConnection;
