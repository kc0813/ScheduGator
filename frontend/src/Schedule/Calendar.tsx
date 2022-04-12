import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Course } from "../Course";

const days = ["M", "T", "W", "R", "F", "S"];

const periods = [
    {
        period: "1",
        time: " 7:25 - 8:15"
    },{
        period: "2",
        time: " 8:30 - 9:20"
    },{
        period: "3",
        time: " 9:35 - 10:25"
    },{
        period: "4",
        time: " 10:40 - 11:30"
    },{
        period: "5",
        time: " 11:45 - 12:35"
    },{
        period: "6",
        time: " 12:50 - 1:40"
    },{
        period: "7",
        time: " 1:55 - 2:45"
    },{
        period: "8",
        time: " 3:00 - 3:50"
    },{
        period: "9",
        time: " 4:05 - 4:55"
    },{
        period: "10",
        time: " 5:10 - 6:00"
    },{
        period: "11",
        time: " 6:15 - 7:05"
    },{
        period: "E1",
        time: " 7:20 - 8:10"
    },{
        period: "E2",
        time: " 8:20 - 9:10"
    },{
        period: "E3",
        time: " 9:20 - 10:10"
    },{
        period: "Online",
        time: ""
    }
];

function Calendar(
    // Reference for schedule calendar:
    // https://github.com/Luc-Olsthoorn/Registr/blob/master/server/src/client/Calendar.js

    props: {
        courseList: Course[]
    }) {

    const generateTableCell = () => {
        
    };

    return(
        <TableContainer component={Paper}>
        <Table size="small">

            <TableHead>
                <TableRow style={{height:"5.3vh"}}>
                <TableCell style={{padding:0}}></TableCell>
                    {days.map((day, key) =>
                        <TableCell key={key} style={{padding:0}} align="center" >{day}</TableCell>
                    )}
                </TableRow>
            </TableHead>

            <TableBody>
                {periods.map((row) => (
                    <TableRow 
                        key={row.period}
                        style={{height: "5.3vh"}}>
                        <TableCell 
                            scope="row" 
                            style={{width: "12%", fontSize: 12}}>
                            {row.period}
                            {row.time}
                        </TableCell>
                        <TableCell style={{width: "12%"}}></TableCell>
                        <TableCell style={{width: "12%"}}></TableCell>
                        <TableCell style={{width: "12%"}}></TableCell>
                        <TableCell style={{width: "12%"}}></TableCell>
                        <TableCell style={{width: "12%"}}></TableCell>
                        <TableCell style={{width: "12%"}}></TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
        </TableContainer>
    );
}

export default Calendar