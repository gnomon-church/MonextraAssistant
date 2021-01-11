import React from 'react';

export default function PrintTable(props) {
    function getKeys() {
        return Object.keys(props.data[0]);
    }

    function getHeader() {
        let keys = getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        });
    }

    function getRowData() {
        let items = props.data;
        let keys = getKeys();
        return items.map((row, index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
        })
    }

    const RenderRow = (props) => {
        return props.keys.map((key, index) => {
            return <td key={props.data[key]}>{props.data[key]}</td>
        });
    }

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>{getHeader()}</tr>
                    </thead>
                    <tbody>
                        {getRowData()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}