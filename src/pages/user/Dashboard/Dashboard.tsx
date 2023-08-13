import { BsFillLightningFill } from "react-icons/bs";
import { FaFan } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import "./dashboard.css";

import CameraFeeds from "../../../components/CameraFeeds/CameraFeeds";
import Header from "../../../components/Header/Header";
import MobileConnection from "../../../components/MobileConnection/MobileConnection";

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
          <MobileConnection name="John's S62 Pro" status battery={70} />
        </div>
      </div>
    </div>
  );
}
