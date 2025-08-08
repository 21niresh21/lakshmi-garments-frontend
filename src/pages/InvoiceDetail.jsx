import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Divider } from "@mui/material";
import InvoiceDetails from "../features/invoice-detail/InvoiceDetails";
import TransportDetails from "../features/invoice-detail/TransportDetails";
import LRBaleDetails from "../features/invoice-detail/LRBaleDetails";
import { Link, useParams } from "react-router";
import { fetchCompleteInvoice } from "../api/invoiceApi";
import WestIcon from "@mui/icons-material/West";

function InvoiceDetail() {
  const { id } = useParams();

  const [completeInvoice, setCompleteInvoice] = useState();

  useEffect(() => {
    fetchCompleteInvoice(id).then((res) => {
      setCompleteInvoice(res.data);
    });
  }, [id]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 5 }}>
        <Breadcrumbs sx={{ mb: -3, ml: 1 }}>
          <Link
            // underline="hover"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "black",
              opacity: 0.8
            }}
            to="/invoice"
          >
            <WestIcon sx={{ mr: 1 }} fontSize="inherit" />
            INVOICES
          </Link>
        </Breadcrumbs>
        {completeInvoice && (
          <>
            <InvoiceDetails invoice={completeInvoice} />
            <TransportDetails
              name={completeInvoice.transportName}
              isPaid={completeInvoice.isTransportPaid}
              charge={completeInvoice.transportCost}
            />
            <LRBaleDetails invoice={completeInvoice} />
          </>
        )}
      </Box>
    </>
  );
}

export default InvoiceDetail;
