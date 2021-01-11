import React from 'react';

import PrintTable from '../components/PrintTable'

export default function PDFReport() {
    let tableData = JSON.parse(localStorage.getItem('dataToReport'));

    return (
        <div>
            {/* <h1>hello</h1> */}
            <PrintTable data={tableData} />
        </div>
    )
}