import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import EditModal from "../EditModal/EditModal";
import Pagination from "../Pagination/Pagination";
import "./Table.css";

export default function Table({
  searchInput,
  apiData,
  currentPage,
  setCurrentPage,
  startIndex,
  endIndex,
  itemsPerPage,
}) {
  const [tableData, setTableData] = useState([]);
  const [selectedRowEntry, setSelectedRowEntry] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotoalPages] = useState(
    Math.ceil(tableData.length / itemsPerPage)
  );

  let isAllSelected = selectedRowEntry.length === itemsPerPage;

  let displayData = searchInputValue(tableData, searchInput);

  function searchInputValue(tableData, searchInput) {
    let updatedData = [...tableData];
    let inputValue = searchInput.toLowerCase();
    if (searchInput) {
      updatedData = updatedData.filter(
        (item) =>
          item.name.toLowerCase().includes(inputValue) ||
          item.email.toLowerCase().includes(inputValue) ||
          item.role.toLowerCase().includes(inputValue)
      );
    }
    return updatedData;
  }

  useEffect(() => {
    setTableData(apiData);
  }, [apiData]);

  useEffect(() => {
    setTotoalPages(Math.ceil(displayData.length / itemsPerPage));
  }, [displayData]);

  const handleSelectedRow = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRowEntry((prevState) => [...prevState, event.target.value]);
    } else {
      setSelectedRowEntry((prevState) =>
        prevState.filter((item) => item !== event.target.value)
      );
    }
  };

  const handleDeleteIcon = (id) => {
    let updatedData = tableData.filter((item) => item.id !== id);
    let updatedDataLength = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > updatedDataLength) {
      setCurrentPage(updatedDataLength);
    }
    setTableData(updatedData);
  };

  const handleCheckBoxAll = (event, tableData) => {
    let isAllChecked = event.target.checked;
    if (isAllChecked) {
      let rows = [];
      for (let i = startIndex; i < endIndex; i++) {
        if (i < tableData.length) {
          rows.push(tableData[i].id);
        } else {
          rows.push(Math.random());
        }
      }
      setSelectedRowEntry(rows);
    } else {
      setSelectedRowEntry([]);
    }
  };

  const handleEdit = (record) => {
    setEditData(record);
    setIsModalOpen(true);
  };

  const handleSave = (editData) => {
    let updatedData = [...tableData];
    let itemToBeEdited = updatedData.findIndex(
      (item) => item.id === editData.id
    );
    if (itemToBeEdited !== -1) {
      updatedData[itemToBeEdited] = editData;
      setTableData(updatedData);
    }
    setEditData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleDeleteSelected = () => {
    if (selectedRowEntry.length === 0) return;
    const updatedData = tableData.filter(
      (item) => !selectedRowEntry.includes(item.id)
    );
    const newEntriesLength = Math.ceil(updatedData.length / itemsPerPage);
    if (currentPage > newEntriesLength) {
      setCurrentPage(newEntriesLength);
    }
    setTableData(updatedData);
    setSelectedRowEntry([]);
  };

  return (
    <div className="main-container">
      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckBoxAll(event, tableData)}
                  checked={isAllSelected}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayData.slice(startIndex, endIndex).map((entries, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: selectedRowEntry.includes(entries.id)
                    ? "lightgray"
                    : "inherit",
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    value={entries.id}
                    onChange={handleSelectedRow}
                    checked={selectedRowEntry.includes(entries.id)}
                  />
                </td>
                <td>{entries.name}</td>
                <td>{entries.email}</td>
                <td>{entries.role}</td>
                <td className="action-btn">
                  <FiEdit onClick={() => handleEdit(entries)} />
                  <AiFillDelete
                    onClick={() => handleDeleteIcon(entries.id)}
                    className="delete-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <div className="delete-selected">
            <button onClick={handleDeleteSelected}>Delete Selected</button>
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSelectedRowEntry={setSelectedRowEntry}
          />
        </div>
      </div>
      {isModalOpen && (
        <EditModal
          item={editData}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
