import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { MouseEventHandler } from "react";
import { useState } from "react";

const days = ["M", "T", "W", "R", "F", "S"];

const periods = [
    {
        period: "1",
        time: "7:25 - 8:15"
    }, {
        period: "2",
        time: "8:30 - 9:20"
    }, {
        period: "3",
        time: "9:35 - 10:25"
    }, {
        period: "4",
        time: "10:40 - 11:30"
    }, {
        period: "5",
        time: "11:45 - 12:35"
    }, {
        period: "6",
        time: "12:50 - 1:40"
    }, {
        period: "7",
        time: "1:55 - 2:45"
    }, {
        period: "8",
        time: "3:00 - 3:50"
    }, {
        period: "9",
        time: "4:05 - 4:55"
    }, {
        period: "10",
        time: "5:10 - 6:00"
    }, {
        period: "11",
        time: "6:15 - 7:05"
    }, {
        period: "E1",
        time: "7:20 - 8:10"
    }, {
        period: "E2",
        time: "8:20 - 9:10"
    }, {
        period: "E3",
        time: "9:20 - 10:10"
    }, {
        period: "Online",
        time: ""
    }
];

function FilterCalendar() {

    // Reference for filtered time slots calendar:
    // https://github.com/Luc-Olsthoorn/Registr/blob/master/server/src/client/CalendarFilter.js

    const [isFiltered, setIsFiltered] = useState(false)

    const handleCellClick = (event: any) => {
        // TODO: store the filtered time slot in an appropriate data structure

        if (!isFiltered)
            event.target.style.background = "gray";
        else
            event.target.style.background = "white";
        setIsFiltered(!isFiltered)
        alert("you filtered: day-" + event.target.cellIndex + ",period-" + event.target.parentElement.rowIndex);
    }

    return (
        <div id="filterCalender">
            <small>Filter Time Slots</small>
            <TableContainer component={Paper}>
                <Table size="small">

                    <TableHead>
                        <TableRow style={{ height: "20px" }}>
                            <TableCell align="center" style={{ padding: 0, background: "lightcyan", width: 12 }}></TableCell>
                            {days.map((day, key) =>
                                <TableCell key={key} style={{ padding: 0, color: "black", background: "lightcyan", fontSize: 11 }} align="center" >{day}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {periods.map((row) => (
                            <TableRow
                                key={row.period}
                                style={{ height: "20px" }}>
                                <TableCell
                                    align="center"
                                    style={{ padding: 0, background: "lightcyan", fontSize: 11 }}>
                                    {row.period}
                                </TableCell>
                                <TableCell onClick={handleCellClick} style={{ padding: 0 }}></TableCell>
                                <TableCell onClick={handleCellClick} style={{ padding: 0 }}></TableCell>
                                <TableCell onClick={handleCellClick} style={{ padding: 0 }}></TableCell>
                                <TableCell onClick={handleCellClick} style={{ padding: 0 }}></TableCell>
                                <TableCell onClick={handleCellClick} style={{ padding: 0 }}></TableCell>
                                <TableCell onClick={handleCellClick} style={{ padding: 0 }}></TableCell>
                                <TableCell onClick={handleCellClick} style={{ padding: 0 }}></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    );
}

export default FilterCalendar