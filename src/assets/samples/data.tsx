import {
  PieChartDataInterface,
  StatsData,
  NotificationData,
} from "../../utils/utils";

export const chartData: PieChartDataInterface[] = [
  {
    title: "Severity",
    series: [30, 20, 40, 10],
    labels: ["Critical", "High", "Medium", "Low"],
  },
  {
    title: "Resolved",
    series: [70, 30],
    labels: ["Resolved", "Unresolved"],
  },
  {
    title: "Vulnerability Type",
    series: [40, 70],
    labels: ["OS", "Other"],
  },
  {
    title: "New Vulnerabilities",
    series: [10, 20, 5],
    labels: ["V1", "V1.1", "V2"],
  },
];

export const statsData: StatsData[] = [
  {
    series: [
      {
        data: [12, 21, 43, 54, 45],
        name: "Product1",
      },
      {
        data: [22, 11, 33, 64, 25],
        name: "Product2",
      },
    ],
  },
];

export const msgData: NotificationData[] = [
  {
    id: 1,
    message:
      "You've been assigned with a new vulnerability to resolve by the administrator",
    message_header: "New Task",
  },
  {
    id: 2,
    message:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document. ",
    message_header: "Vulnerability detected",
  },
  {
    id: 3,
    message:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.",
    message_header: "Vulnerability detected",
  },
  {
    id: 4,
    message:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.",
    message_header: "Vulnerability detected",
  },
  {
    id: 5,
    message:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.",
    message_header: "Vulnerability detected",
  },
  {
    id: 6,
    message:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.",
    message_header: "Vulnerability detected",
  },
  {
    id: 7,
    message:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.",
    message_header: "Vulnerability detected",
  },
  {
    id: 8,
    message:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.",
    message_header: "Vulnerability detected",
  },
  {
    id: 9,
    message:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.",
    message_header: "Vulnerability detected",
  },
];
