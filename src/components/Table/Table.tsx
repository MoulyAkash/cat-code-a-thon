import React, { useState, useEffect, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { MdEdit, MdMoreHoriz } from "react-icons/md";
import {
  BiChevronLeft,
  BiChevronRight,
  BiFilter,
  BiSearch,
  BiRightArrowAlt,
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import { BsXCircleFill } from "react-icons/bs";
import _ from "lodash";
import "./table.css";

import {
  toUpper,
  FilterProps,
  generateFilterOptions,
  initializeFilters,
  generateColumnFilterOptions,
  initializeColumnFilters,
  parseExcelData,
} from "../../utils/utils";
import Modal from "../Modal/Modal";
import Filter from "../Filter/Filter";
import TextInput from "../TextInput/TextInput";
import APIService from "../../api/Service";

interface TableProps {
  masterData: any[];
  setMasterData: React.Dispatch<React.SetStateAction<any>>;
  renderHead: (
    filterOptions: any,
    filters: any,
    setFilters: React.Dispatch<React.SetStateAction<any>>,
    columnFilters: any
  ) => React.ReactNode;
  renderBody: (
    item: any,
    index: number,
    onClick: () => any,
    ActionButtons: React.ReactNode,
    columnFilters: any,
    Checkbox?: React.ReactNode
  ) => React.ReactNode;
  // filterKeys: string[];
  initialColumnFilters?: string[];
  searchKey?: string;
  maxRowsShown: number;
  title: string;
  description: string;
  modalTitle: string;
  modalDescription: string;
  renderModalContent: (
    modalData: any,
    setModalData: React.Dispatch<React.SetStateAction<any>>,
    modalEditEnabled: boolean
  ) => React.ReactNode;
  handleUpload?: (
    e: any,
    uploadReportName: string,
    setUploadReportName: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  canAddItems?: boolean;
  canDeleteItems?: boolean;
}

const Table: React.FC<TableProps> = ({
  masterData,
  setMasterData,
  renderHead,
  renderBody,
  searchKey,
  initialColumnFilters,
  maxRowsShown,
  title,
  description,
  modalTitle,
  modalDescription,
  renderModalContent,
  canAddItems,
  canDeleteItems,
}) => {
  const [data, setData] = useState(masterData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / maxRowsShown)
  );
  const [startIndex, setStartIndex] = useState(
    (currentPage - 1) * maxRowsShown
  );
  const [endIndex, setEndIndex] = useState(startIndex + maxRowsShown);
  const [currentData, setCurrentData] = useState(
    data?.slice(startIndex, endIndex)
  );

  // search State
  const [searchString, setSearchString] = useState("");

  // filter state
  const [filterOptions, setFilterOptions] = useState<FilterProps>(
    generateFilterOptions(data, Object.keys(masterData[0]))
  );
  const [filters, setFilters] = useState<FilterProps>(
    initializeFilters(filterOptions)
  );

  // column filter state
  const [columnFilterOptions, setColumnFilterOptions] = useState<FilterProps>(
    generateColumnFilterOptions(Object.keys(masterData[0]))
  );
  const [columnFilters, setColumnFilters] = useState<FilterProps>(
    initializeColumnFilters(initialColumnFilters)
  );

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(data && data[0]);
  const [modalDataIndex, setModalDataIndex] = useState(0);
  const [modalMode, setModalMode] = useState("view");

  // Functions to comply with changes in the calling component
  useEffect(() => {
    setData(masterData);
    setFilterOptions(
      generateFilterOptions(masterData, Object.keys(masterData[0]))
    );
    setFilters(
      initializeFilters(
        generateFilterOptions(masterData, Object.keys(masterData[0]))
      )
    );
    setColumnFilterOptions(
      generateColumnFilterOptions(Object.keys(masterData[0]))
    );
  }, [masterData]);

  const updateValues = (data: any) => {
    setTotalPages(Math.ceil(data?.length / maxRowsShown));
    setStartIndex((currentPage - 1) * maxRowsShown);
    setEndIndex(startIndex + maxRowsShown);
    setCurrentData(data?.slice(startIndex, endIndex));
    setCurrentPage(1);
  };

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    setCurrentData(data?.slice((page - 1) * maxRowsShown, page * maxRowsShown));
  };

  const getFilteredData = (
    data: any,
    filters: FilterProps,
    searchString: string
  ) =>
    data?.filter((item: any) => {
      if (canDeleteItems && item.selected) return true;
      if (!searchKey || searchKey === "" || !item[searchKey]) {
        let isSearchStringPresentInItem = false;
        for (let key of Object.keys(filterOptions))
          if (
            item[key].toLowerCase().includes(searchString.toLocaleLowerCase())
          ) {
            isSearchStringPresentInItem = true;
            break;
          }
        if (!isSearchStringPresentInItem) return false;
        for (let key of Object.keys(filterOptions))
          if (filters[key]?.length !== 0 && !filters[key]?.includes(item[key]))
            return false;
        return true;
      } else if (item[searchKey].toLowerCase().includes(searchString)) {
        for (let key of Object.keys(filterOptions))
          if (filters[key]?.length !== 0 && !filters[key]?.includes(item[key]))
            return false;
        return true;
      }
      return false;
    });

  // To update currentData using Filters and Search
  useEffect(() => {
    updateValues(getFilteredData(data, filters, searchString));
  }, [data, filters, searchString]);

  const areItemsSelected = () => {
    for (let item of data) if (item.selected) return true;
    return false;
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onModalClose={() => setModalMode("view")}
        title={modalTitle}
        description={modalDescription}
        modalFooter={
          <>
            <div className="left"></div>
            <div className="right">
              {modalMode !== "view" && (
                <>
                  <div
                    className="cancel button"
                    onClick={() => {
                      setModalMode("view");
                      setIsModalOpen(false);
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className="save-changes button"
                    onClick={() => {
                      setMasterData((oldData: any) => {
                        let data: any = [];
                        if (modalMode === "edit") {
                          data = [...oldData];
                          data[modalDataIndex] = {
                            ...modalData,
                            Modified: new Date().toJSON(),
                          };
                        } else if (modalMode === "add")
                          data = [...oldData, modalData];
                        return [...data];
                      });
                      setModalMode("view");
                      setIsModalOpen(false);
                    }}
                  >
                    {modalMode === "edit" ? "Save Changes" : "Add Entry"}
                  </div>
                </>
              )}
            </div>
          </>
        }
      >
        {renderModalContent(modalData, setModalData, modalMode !== "view")}
      </Modal>
      <div className="table-container">
        <div className="table-header">
          <div className="top-container">
            <div className="left">
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <div className="button-container"></div>
          </div>
          <div className="filter-search-container">
            <div className="left">
              {Object.keys(filters).map((key: string) =>
                filters[key].map(
                  (value: string | number | boolean, index: number) => (
                    <div key={String(value)} className="filter-tag noselect">
                      <p>
                        <p
                          onClick={() =>
                            setFilters((oldFilters) => {
                              oldFilters[key][index] === value &&
                                oldFilters[key].splice(index, 1);
                              return { ...oldFilters };
                            })
                          }
                        >
                          <BsXCircleFill size="1.2em" />
                        </p>
                        {toUpper(key)}
                        <BiRightArrowAlt size="1.2em" />
                        {typeof value === "boolean"
                          ? value
                            ? "Yes"
                            : "No"
                          : toUpper(String(value))}
                      </p>
                    </div>
                  )
                )
              )}
            </div>
            <div className="right">
              {canAddItems && (
                <div
                  className="upload-button noselect"
                  onClick={() => {
                    let newData = { ...data[0] };
                    Object.keys(newData).map(
                      (key: string) => (newData[key] = "")
                    );

                    setModalData({
                      ...newData,
                    });
                    setModalMode("add");
                    setIsModalOpen(true);
                  }}
                >
                  <FiPlus />
                  <p>Add Entry</p>
                </div>
              )}
              <Filter
                options={columnFilterOptions}
                selectedOptions={columnFilters}
                setSelectedOptions={setColumnFilters}
              >
                <div className="filter-button noselect">
                  <BiFilter />
                  <p>Column Filters</p>
                </div>
              </Filter>
              <div className="search-bar noselect">
                <BiSearch />
                <input
                  type="text"
                  value={searchString}
                  placeholder="Search"
                  onChange={(e) => setSearchString(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table" cellSpacing={0}>
            <thead>
              {data && (
                <tr>
                  {canDeleteItems && (
                    <th>
                      <input
                        type="checkbox"
                        className="header-checkbox"
                        onChange={(e) =>
                          setData((old: any) =>
                            old.map((item: any, _: number) => ({
                              ...item,
                              selected: e.target.checked,
                            }))
                          )
                        }
                      />
                    </th>
                  )}
                  {renderHead(
                    filterOptions,
                    filters,
                    setFilters,
                    columnFilters
                  )}
                  <th className="align-right noselect">Actions</th>
                </tr>
              )}
            </thead>
            {data && (
              <tbody>
                {currentData?.map((item: any, index: number) =>
                  renderBody(
                    item,
                    index,
                    () => {
                      for (let i = 0; i < data?.length; i++)
                        if (_.isEqual(data[i], item)) {
                          setModalData({ ...masterData[i] });
                          setModalDataIndex(i);
                        }
                      setIsModalOpen(true);
                    },
                    <td className="align-right">
                      <div className="action-btn-container noselect">
                        <div className="action-btn">
                          <MdEdit />
                        </div>
                        <div className="action-btn">
                          <MdMoreHoriz />
                        </div>
                      </div>
                    </td>,
                    columnFilters,
                    <td>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={(e) => {
                          setData((old: any) => {
                            for (let i = 0; i < old.length; i++)
                              if (_.isEqual(old[i], item))
                                old[i] = {
                                  ...item,
                                  selected: e.target.checked,
                                };
                            return [...old];
                          });
                        }}
                      />
                    </td>
                  )
                )}
              </tbody>
            )}
          </table>
        </div>
        <div className="table-footer noselect">
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => updateCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <BiChevronLeft />
                <p>Prev</p>
              </button>
              {[...Array(totalPages).keys()].map(
                (item: number, index: number) => (
                  <div
                    className={`page ${
                      currentPage === item + 1 ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => updateCurrentPage(item + 1)}
                  >
                    {item + 1}
                  </div>
                )
              )}
              <button
                onClick={() => updateCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <p>Next</p>
                <BiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
