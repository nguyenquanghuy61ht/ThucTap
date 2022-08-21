import { useEffect} from "react";
import { observer } from "mobx-react";
import { useStore } from "app/stores";
import { useState } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ArticleIcon from "@mui/icons-material/Article";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

import FormAdd from "./FormAdd";
import FormUpdate from "./FormEdit";
import FormDelete from "./FormDelete";
import FormDetail from "./FormDetail";


const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default observer(function CountryIndex() {
  //test mobx
  const { countryStore } = useStore();
  const { countryList, totalPage } = countryStore;
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [idEdit, SetidEdit] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const [iddetail, SetidDetail] = useState();

  const [idDelete, SetidDelete] = useState("");
  const [filters, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
    keyword: "",
  });
  useEffect(() => {
    countryStore.getData(filters);
  }, [filters, countryStore]);

  const [page, setPage] = useState(10);
  const handleChange = (event) => {
    setPage(event.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      pageSize: event.target.value,
    }));
  };

  
  function handelShowDitail(id) {
    setShowDetail(!showDetail);
    SetidDetail(id);
  }
  function handleShowAdd() {
    setShowAdd(!showAdd);
  }
  function handelShowEdit(id) {
    setShowEdit(!showEdit);
    SetidEdit(id);
    
  }
  function handelShowDelete(id) {
    setShowDelete(!showDelete);
    SetidDelete(id);
  }
  function handlePagination(e, page) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      pageIndex: page,
    }));
  }

  function handleSearch(value) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      keyword: value,
    }));
  }

  return (
    <>
      {showDetail && <FormDetail exit={setShowDetail} iddetail={iddetail} />}
      {showAdd && <FormAdd exit={setShowAdd} filters={filters} />}
      {showDelete && (
        <FormDelete
          idDelete={idDelete}
          setShowDelete={setShowDelete}
          filters={filters}
        />
      )}
      {showEdit && (
        <FormUpdate exit={setShowEdit} id={idEdit} filters={filters} />
      )}
      <div
        className="search"
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <input
          placeholder="Nhập từ khóa"
          style={{
            borderTop: "2px solid #E4E4E4",
            borderLeft: "2px solid #E4E4E4",
            borderBottom: "2px solid #E4E4E4",
            borderRight: "none ",
            outline: "none",
            padding: "6px",
            width: "280px",
            borderBottomLeftRadius: "4px",
            borderTopLeftRadius: "4px",
          }}
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <span
          style={{
            color: "#fff",
            backgroundColor: "#01C0C8",
            width: "30px",
            textAlign: "center",
            borderBottomRightRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          <SearchIcon sx={{ mt: "4px" }} />
        </span>
      </div>

      <TableContainer
        component={Paper}
        sx={{ mx: "auto", maxWidth: 650, mt: "30px", mb: "30px" }}
      >
        <Button
          onClick={handleShowAdd}
          variant="contained"
          color="success"
          sx={{ mb: "20px", ml: "5px", mt: "5px" }}
        >
          Thêm
        </Button>
        <Table aria-label="simple table" sx={{ mb: "20px" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: "info.main" }}>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Code</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Detail</StyledTableCell>
              <StyledTableCell align="left">Edit</StyledTableCell>
              <StyledTableCell align="left">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryList.map((row, id) => (
              <StyledTableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell align="center">{id}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.code}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <ArticleIcon
                    color="secondary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handelShowDitail(row.id);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <ModeEditOutlineOutlinedIcon
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handelShowEdit(row.id);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <DeleteIcon
                    color="error"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handelShowDelete(row.id);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Số hàng mỗi trang</p>
          <FormControl sx={{ m: 1 }} variant="standard">
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={page}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            count={totalPage}
            color="primary"
            onChange={handlePagination}
            showFirstButton
            showLastButton
          />
        </div>
      </TableContainer>
    </>
  );
});
