import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
import {days, periodList, PeriodSlot, TimeSlot} from "../../UF";
import {GenerateHeader} from "../../GenerateTable/GenerateHeader";
import {FilterRow} from "../../GenerateTable/GenerateRow";

function FilterCalendar(
    props: {
        filteredTimes: TimeSlot[],
        setFilteredTimes: (filteredTimes: TimeSlot[]) => void,
    }
) {

    // Reference for filtered time slots calendar:
    // https://github.com/Luc-Olsthoorn/Registr/blob/master/server/src/client/CalendarFilter.js

    //TODO DELETE FILTER ON UNTOGGLE
    const handleCellClick = (event: any) => {
        if (event.target.style.background.charAt(0) == "g")
            event.target.style.background = "white";

        else
            event.target.style.background = "gray";

        console.log("Period filtered: day-" + event.target.cellIndex + ",period-" + event.target.parentElement.rowIndex);

        // Format day correctly to send to backend
        var day: string;
        switch(event.target.cellIndex) {
            case 1: {day = "M"; break;}
            case 2: {day = "T"; break;}
            case 3: {day = "W"; break;}
            case 4: {day = "R"; break;}
            case 5: {day = "F"; break;}
            default: {day = "S"; break;}
        }
        if (event.target.parentElement.rowIndex == 15) {
            day = "ONLINE";
        }

        // Format period correctly to send to backend
        var period: number = event.target.parentElement.rowIndex - 1;
        let timeSlot = {
            day: day,
            period: period,
        }
        props.filteredTimes.push(timeSlot);
        props.setFilteredTimes(props.filteredTimes)

    }

    let onlineBackground = "white"
    props.filteredTimes.forEach((ts:TimeSlot)=>{
        if(ts.day == "ONLINE"){
            onlineBackground = "gray"
        }
    })
    return (
        <div id="filterCalender">
            <small>Filter Time Slots</small>
            <TableContainer component={Paper}>
                <Table size="small">

                    <TableHead>
                        <GenerateHeader headerType={"filter"}/>
                    </TableHead>
                    <TableBody>
                        {periodList.map((row) => {                            
                            return(
                                <FilterRow filteredTimes={props.filteredTimes} period={row.period} handleCellClick={handleCellClick}/>
                            );
                        })}

                        <TableRow style={{ height: "3.5vh" }}>
                            <TableCell
                                align="center"
                                style={{ padding: 0, background: "lightcyan", fontSize: 11 }}>
                                Online
                            </TableCell>
                            <TableCell onClick={handleCellClick} colSpan={6} style={{background: onlineBackground}}/>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default FilterCalendar