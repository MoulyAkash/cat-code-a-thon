import { useEffect, useState } from "react";

import Filter from "../../components/Filter/Filter";
import Table from "../../components/Table/Table";
import TextInput from "../../components/TextInput/TextInput";
import APIService from "../../api/Service";

export default function Test() {
  const [data, setData] = useState([
    {
      age: "32",
      first_name: "user",
      id: "1",
      last_name: "1",
      spo2: "95",
    },
    {
      age: "32",
      first_name: "user",
      id: "1",
      last_name: "1",
      spo2: "95",
    },
    {
      age: "32",
      first_name: "user",
      id: "1",
      last_name: "1",
      spo2: "95",
    },
    {
      age: "32",
      first_name: "user",
      id: "1",
      last_name: "1",
      spo2: "95",
    },
    {
      age: "32",
      first_name: "user",
      id: "1",
      last_name: "1",
      spo2: "95",
    },
  ]);

  useEffect(() => {
    APIService.PostData({}, "select")
      .then((response: any) => {
        setData(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Table
        masterData={data}
        setMasterData={setData}
        title="Test Table"
        description="This is a test table."
        modalTitle="Details"
        modalDescription="View and edit item details."
        renderHead={(filterOptions, filters, setFilters, columnFilters) => (
          <>
            {Object.keys(data && data[0])?.map(
              (key) =>
                (columnFilters["Columns"].length === 0 ||
                  columnFilters["Columns"].includes(key)) && (
                  <th key={key}>
                    <Filter
                      filterLabel={key}
                      options={filterOptions}
                      selectedOptions={filters}
                      setSelectedOptions={setFilters}
                    >
                      {key}
                    </Filter>
                  </th>
                )
            )}
          </>
        )}
        renderBody={(
          item: any,
          index: number,
          onClick: any,
          // Checkbox: React.ReactNode,
          ActionButtons: React.ReactNode,
          columnFilters
        ) => (
          <tr key={index}>
            {Object.keys(item)?.map(
              (key) =>
                (columnFilters["Columns"].length === 0 ||
                  columnFilters["Columns"].includes(key)) && (
                  <td onClick={onClick} key={key}>
                    <p>{item[key]}</p>
                  </td>
                )
            )}
            {ActionButtons}
          </tr>
        )}
        renderModalContent={(modalData, setModalData, modalEditEnabled) =>
          modalData && (
            <>
              {Object.keys(data && data[0])?.map(
                (item: string, index: number) => (
                  <div key={index} className="padded-content">
                    <TextInput
                      title={item}
                      type="text"
                      placeholder={item}
                      value={modalData[item] || ""}
                      onChange={(value: string) => {
                        setModalData((oldData: any) => {
                          oldData[item] = value;
                          return { ...oldData };
                        });
                      }}
                      errorText={`Invalid ${item}`}
                      validateWith={(val) => (val === "" ? false : true)}
                      readOnly={!modalEditEnabled}
                    />
                  </div>
                )
              )}
            </>
          )
        }
        maxRowsShown={10}
      />
    </div>
  );
}
