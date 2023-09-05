import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import config from "../../config";
import Table from "../Table/Table";
import { enqueueSnackbar } from "notistack";

export default function Admin() {
  const [apiData, setApiData] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const fetchData = async () => {
    try {
      let response = await axios.get(`${config.backendEndpoint}`);
      setApiData(response.data);
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="admin-container">
      <SearchBar
        handleInputChange={handleInputChange}
        searchInput={searchInput}
      />
      <Table
        searchInput={searchInput}
        apiData={apiData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
}
