import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
// import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table'

import './ReportView.css'

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    row: {
        flexDirection: 'row',
    },
    store_name: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Times-Bold'
    },
    details_header: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'Times-Bold'
    },
    details_label: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'Times-Roman'
    },
    details_content: {
        fontSize: 12,
        position: 'absolute',
        left: 130,
        fontFamily: 'Times-Italic'
    }
});


export default class ReportView extends Component {
    state = JSON.parse(localStorage.getItem('state'))

    Navigation = (props) => {
        return (
            <Navbar bg='danger' className='justify-content-between'>
                <Button variant='dark' href='/eodform'>Back</Button>
            </Navbar>
        )
    }

    totalFormatter(props) {
        let val = '$' + props

        return(val)
    }

    diffFormatter(props) {
        let val = '$' + props
        
        if (props > 0) {
            val = '+' + val
        } else if (props < 0) {
            val = val.slice(0, 1) + val.slice(2);
            val = '-' + val
        }

        return(val)
    }

    dayFetcher(props) {
        let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        let dateString = props;
        let dateParts = dateString.split("/");
        let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        let day = weekDays[dateObject.getDay() - 1];

        return(day)
    }

    render() {
        return (
            <div>
                {/* <div className='fixed-top'>
                    <this.Navigation />
                </div> */}
                <div className='viewer-div'>
                    <PDFViewer className='viewer-window'>
                        <Document>
                            <Page size="A4" style={styles.page}>
                                <Text style={styles.store_name}>{this.state.store}</Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Day: </Text>
                                    <Text style={styles.details_content}>{this.dayFetcher(this.state.date)}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Date: </Text>
                                    <Text style={styles.details_content}>{this.state.date}</Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Staff: </Text>
                                    <Text style={styles.details_content}>{this.state.staff}</Text>
                                </View>

                                <Text style={styles.details_header}>Cash: </Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Actual: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.cashActual)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Register: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.cashRegister)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Difference: </Text>
                                    <Text style={styles.details_content}>{this.diffFormatter(this.state.cashDiff)}</Text>
                                </View>

                                <Text style={styles.details_header}>Eftpos: </Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Actual: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.eftposActual)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Register: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.eftposRegister)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Difference: </Text>
                                    <Text style={styles.details_content}>{this.diffFormatter(this.state.eftposDiff)}</Text>
                                </View>

                                <Text style={styles.details_header}>ePay: </Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Difference: </Text>
                                    <Text style={styles.details_content}>{this.diffFormatter(this.state.epayDiff)}</Text>
                                </View>

                                <Text style={styles.details_header}>Lotto: </Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Terminal Report: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.lottoActual)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Register: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.lottoRegister)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Difference: </Text>
                                    <Text style={styles.details_content}>{this.diffFormatter(this.state.lottoDiff)}</Text>
                                </View>

                                <Text style={styles.details_header}>Lotto Payouts: </Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Terminal Report: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.lottoPayActual)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Register: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.lottoPayRegister)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Difference: </Text>
                                    <Text style={styles.details_content}>{this.diffFormatter(this.state.lottoPayDiff)}</Text>
                                </View>

                                <Text style={styles.details_header}>Instants Payouts: </Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Terminal Report: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.isiPayActual)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Register: </Text>
                                    <Text style={styles.details_content}>{this.totalFormatter(this.state.isiPayRegister)}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Difference: </Text>
                                    <Text style={styles.details_content}>{this.diffFormatter(this.state.isiPayDiff)}</Text>
                                </View>

                                <Text style={styles.details_header}>Instants: </Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Difference: </Text>
                                    <Text style={styles.details_content}>{this.diffFormatter(this.state.isiDiff)}</Text>
                                </View>

                                <Text style={styles.details_header}>Total Difference: </Text>
                                <View style={styles.row}>
                                    <Text style={styles.details_label}>Difference: </Text>
                                    <Text style={styles.details_content}>{this.diffFormatter(this.state.totalDiff)}</Text>
                                </View>
                            </Page>
                        </Document>
                    </PDFViewer>
                </div>
            </div>

        )

    }
}