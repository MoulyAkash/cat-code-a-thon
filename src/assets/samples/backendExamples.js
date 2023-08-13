let products = [
  {
    name: "productName1", // string
    versions: [
      // array of objects
      {
        name: "v1", // string
        scans: [
          // array of objects
          {
            type: "nessus", // string
            timeStamp: "2020-03-19", // string
            name: "reportName", // string
            locked: true, // boolean
            report: [], // array of objects
          },
        ],
      },
    ],
    allotedUserIDs: [], // array of Schema.Types.ObjectId, manual reference to users collection
    allotedGroupID: "group1", // Schema.Types.ObjectId, manual reference to groups collection
  },
];

let users = [
  {
    _id: "", // Schema.Types.ObjectId
    userName: "", // string
    passwordHash: "", // string
  },
];

let groups = [
  {
    _id: "", // Schema.Types.ObjectId
    name: "", //
    users: [], // array of Schema.Types.ObjectId, manual reference to users collection
  },
];
