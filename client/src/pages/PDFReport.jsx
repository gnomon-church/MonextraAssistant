import React from 'react';

import PrintTable from '../components/PrintTable'

export default function PDFReport() {
    let tableData = JSON.parse(localStorage.getItem('dataToReport'));
    let tableHeaders = JSON.parse(localStorage.getItem('dataHeaders'))

    return (
        <div>
            <div id='to-print'>
                <PrintTable data={tableData} headers={tableHeaders} />
            </div>
        </div>
    )
}