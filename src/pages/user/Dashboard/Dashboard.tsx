import { BsFillLightningFill } from "react-icons/bs";
import { FaFan } from "react-icons/fa";
import { FaTemperatureQuarter } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { AiFillHeart } from "react-icons/ai";
import { IoWater } from "react-icons/io5";
import "./dashboard.css";

import CameraFeeds from "../../../components/CameraFeeds/CameraFeeds";
import Header from "../../../components/Header/Header";
import MobileConnection from "../../../components/MobileConnection/MobileConnection";
import Map from "../../../assets/map.png";

interface CardProps {
  Icon: any;
  title: string;
  description: string;
  fillColor: string;
}

const cardItems: CardProps[] = [
  {
    Icon: BsFillLightningFill,
    title: "70%",
    description: "Battery Remaining",
    fillColor: "var(--green)",
  },
  {
    Icon: FaFan,
    title: "20°C",
    description: "A/C Temperature",
    fillColor: "var(--lightBlue)",
  },
  {
    Icon: GiPathDistance,
    title: "39.456km",
    description: "Has been covered",
    fillColor: "var(--brown)",
  },
];

const cardItems2: CardProps[] = [
  {
    Icon: AiFillHeart,
    title: "72bpm",
    description: "Heart Rate",
    fillColor: "var(--red)",
  },
  {
    Icon: IoWater,
    title: "95%",
    description: "SPo2 Level",
    fillColor: "var(--lightBlue)",
  },
  {
    Icon: FaTemperatureQuarter,
    title: "37°C",
    description: "Body Temperature",
    fillColor: "var(--green)",
  },
];

const Card = ({ Icon, title, description, fillColor }: CardProps) => {
  return (
    <div className="card">
      <div className="icon" style={{ backgroundColor: fillColor }}>
        <Icon />
      </div>
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="section">
        <div className="left">
          <section>
            <p>Overview</p>
            <h2>GMC Hummer EV</h2>
          </section>
          <div className="card-container">
            {cardItems.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </div>
        <div className="right">
          <CameraFeeds />
        </div>
      </div>
      <div className="section">
        <div className="left">
          <img src={Map} />
        </div>
        <div className="right">
          <MobileConnection name="John's S62 Pro" status battery={70} />
          <div className="card-container">
            {cardItems2.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
