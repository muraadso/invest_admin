import React, {useEffect, useState} from 'react';
import Layout from "../components/layout";
import {getFirestore, collection, query, onSnapshot} from "firebase/firestore";
import Loading from "../components/loading";
import CreateTransaction from "../components/transactions/create";
import TransactionsTable from "../components/transactions/datatable";

const Reports = () => {

  return (
    <Layout props={{title: 'Reports', icon: 'bxs-report'}}>

    </Layout>
  );
};

export default Reports;
