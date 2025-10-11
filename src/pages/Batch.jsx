import React, { useEffect, useState } from "react";
import InvoiceTableHeader from "../features/invoice/InvoiceTableHeader";
import { fetchInvoices, updateInvoice } from "../api/invoiceApi";
import {
  Divider,
  InputBase,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getBatches } from "../api/batchApi";
import BatchTableHeader from "../features/batch/BatchTableHeader";
import BatchTable from "../features/batch/BatchTable";

function Batch() {
  const [batchData, setBatchData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "isUrgent", order: "desc" });
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getBatches(sort.field, sort.order).then((res) => {
      setBatchData(res.data);
    });
  }, [search, sort]);
  return (
    <BatchTable batchData={batchData.content} sort={sort} setSort={setSort} />
  );
}

export default Batch;
