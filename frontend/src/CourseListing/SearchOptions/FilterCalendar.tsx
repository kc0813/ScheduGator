import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import {days, periods} from "../../UF";

function FilterCalendar() {

    // Reference for filtered time slots calendar:
    // https://github.com/Luc-Olsthoorn/Registr/blob/master/server/src/client/CalendarFilter.js

    const [isFiltered, setIsFiltered] = useState(false)

    const handleCellClick = (event: any) => {
        // TODO: store the filtered time slot in an appropriate data structure

        //console.log(event.target.style.background)
        if (event.target.style.background.charAt(0) == "g")
            event.target.style.background = "white";
        else
            event.target.style.background = "gray";

        setIsFiltered(!isFiltered)

        console.log("Period filtered: day-" + event.target.cellIndex + ",period-" + event.target.parentElement.rowIndex);
    }

    const GenerateDays = () => {
        return (
            <TableRow style={{ height: "3vh" }}>
                <TableCell align="center" style={{ padding: 0, background: "lightcyan", width: "12%" }}></TableCell>
                {days.map((day, key) =>
                    <TableCell key={key} style={{ padding: 0, color: "black", background: "lightcyan", fontSize: 11 }} align="center" >{day}</TableCell>
                )}
            </TableRow>
        )
    };

    return (
        <div id="filterCalender">
            <small>Filter Time Slots</small>
            <TableContainer component={Paper}>
                <Table size="small">

                    <TableHead>
                        <GenerateDays/>
                    </TableHead>

                    <TableBody>
                        {periods.map((row) => (
                            <TableRow
                                key={row.period}
                                style={{ height: "3.5vh" }}>
                                <TableCell
                                    align="center"
                                    style={{ padding: 0, background: "lightcyan", fontSize: 11 }}>
                                    {row.period}
                                </TableCell>
                                <TableCell onClick={handleCellClick} style={{ width: "12%", padding: 0 }}/>
                                <TableCell onClick={handleCellClick} style={{ width: "12%", padding: 0 }}/>
                                <TableCell onClick={handleCellClick} style={{ width: "12%", padding: 0 }}/>
                                <TableCell onClick={handleCellClick} style={{ width: "12%", padding: 0 }}/>
                                <TableCell onClick={handleCellClick} style={{ width: "12%", padding: 0 }}/>
                                <TableCell onClick={handleCellClick} style={{ width: "12%", padding: 0 }}/>
                               
                            </TableRow>
                        ))}
                        <TableRow style={{ height: "3.5vh" }}>
                            <TableCell
                                align="center"
                                style={{ padding: 0, background: "lightcyan", fontSize: 11 }}>
                                Online
                            </TableCell>
                            <TableCell onClick={handleCellClick} colSpan={6}/>
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    );
}

export default FilterCalendar