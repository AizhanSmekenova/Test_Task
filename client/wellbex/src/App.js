import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Table from './table/Table';
import Loader from './loader/Loader';
import Paginator from "../src/paginator/Paginator";
import SearchForm from './search/searchForm';
const baseUrl = "/api"

function App() {
  // хуки
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSortedByAsc, setIsSortedByAsc] = useState(false)
  const [totalCountRows, setTotalCountRows] = useState(0);
  const [totalCountPages, setTotalCountPages] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(null);
  const [btnPrevDisabled, setBtnPrevDisabled] = useState("");
  const [btnNextDisabled, setBtnNextDisabled] = useState("");
  const [curPageActive, setCurPageActive] = useState(1);
  const [searchText, setSearchText] = useState("");


  // получение данных с сервера

  useEffect(() => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(response => {
        setData(response)
        setIsLoaded(true)
      })
      ;
  }, [])

  // сортировка данных

  const sortData = (field) => {
    const copiedData = filteredData.concat()
    const sortedData = copiedData.sort((a, b) => {
      if (!isSortedByAsc) {
        setIsSortedByAsc(true);
        return a[field] > b[field] ? 1 : -1
      }
      else {
        setIsSortedByAsc(false);
        return a[field] < b[field] ? 1 : -1
      }
    })

    setData(sortedData);
  }

  const sortNumData = (field) => {
    const copiedData = filteredData.concat()
    const sortedData = copiedData.sort((a, b) => {
      if (!isSortedByAsc) {
        setIsSortedByAsc(true);
        return Number(a[field]) > Number(b[field]) ? 1 : -1
      }
      else {
        setIsSortedByAsc(false);
        return Number(a[field]) < Number(b[field]) ? 1 : -1
      }
    })

    setData(sortedData);
  }

  // фильтр данных

  const onSearch = (text) => {
    setSearchText(text);
    getFilteredData(searchText);
  }
  const getFilteredData = () => {
    if (!searchText) {
      return data
    }
    console.log(searchText);
    return data.filter(el => { return el['name'].toLowerCase().includes(searchText.toLowerCase()) }
    )
  }

  const filteredData = getFilteredData();


  const limitCountRows = 5
  const lastPageRow = currentPageNum * limitCountRows
  const firstPageRow = lastPageRow - limitCountRows
  const currentPageRows =
    currentPageNum ? filteredData.slice(firstPageRow, lastPageRow) : filteredData.slice(0, 5)


  const currentPage = (p) => {
    setCurrentPageNum(p)
    setBtnNextDisabled("")
    setBtnPrevDisabled("")
    setCurPageActive("active")
  }

  const onNextPage = () => {
    if (currentPageNum > totalCountPages) {
      setBtnNextDisabled("disabled");
      return
    }
    setCurrentPageNum(currentPageNum + 1)
  }

  const onPrevPage = () => {
    if (currentPageNum < 2) {
      setBtnPrevDisabled("disabled")
      console.log(btnPrevDisabled)
      return
    }
    setCurrentPageNum(currentPageNum - 1)

  }

  useEffect(() => {
    if (!isLoaded) {
      return
    }
    setTotalCountRows(filteredData.length)
    const getTotalCountPage = totalCountRows / limitCountRows
    setTotalCountPages(getTotalCountPage)
    currentPage()

  }, [isLoaded, setTotalCountRows, filteredData.length, setTotalCountPages, totalCountRows])
  console.log(currentPageNum);
  let pages = [];

  for (let i = 1; i <= totalCountPages + 1; i++) {
    pages.push(i);
  }



  return (
    <div className="container">
      <h1>WellBeX</h1>
      <SearchForm onSearch={onSearch} />

      {isLoaded ? <Table data={currentPageRows} sortData={sortData} sortNumData={sortNumData}
        isSortedByAsc={isSortedByAsc} onSearch={onSearch}
      /> : <Loader />}
      < Paginator pages={pages} currentPage={currentPage} onNextPage={onNextPage} onPrevPage={onPrevPage}
        btnNextDisabled={btnNextDisabled} btnPrevDisabled={btnPrevDisabled} curPageActive={curPageActive}
        currentPageNum={currentPageNum}
      />
    </div>
  );
}

export default App;
