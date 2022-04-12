import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Course } from "../Course";
import Typography from "@material-ui/core/Typography";
import {days, periods} from "../UF";

function Calendar(
    // Reference for schedule calendar:
    // https://github.com/Luc-Olsthoorn/Registr/blob/master/server/src/client/Calendar.js

    props: {
        courseList: Course[]
    }) {

    const GenerateTableCell = () => {
        return (
            <TableCell
              align="center"
              padding="none"
              style={{width: "12%"}}>
              <Typography style={{ color: "white" }}>
                  Course ID
              </Typography>
            </TableCell>
          )
    };

    const GeneratePeriods = () => {

    };

    const GenerateDays = () => {
        return (
            <TableRow style={{height:"5.3vh"}}>
                <TableCell style={{padding:0}}></TableCell>
                    {days.map((day, key) =>
                        <TableCell key={key} style={{padding:0}} align="center" >{day}</TableCell>
                    )}
            </TableRow>
        )
    };

    return(
        <TableContainer component={Paper}>
        <Table size="small">

            <TableHead>
                <GenerateDays/>
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
                        <GenerateTableCell/>
                        <GenerateTableCell/>
                        <GenerateTableCell/>
                        <GenerateTableCell/>
                        <GenerateTableCell/>
                        <GenerateTableCell/>
                    </TableRow>
                ))}
                <TableRow style={{height: "5.3vh"}}>
                    <TableCell
                        style={{width: "12%", fontSize: 12}}>
                        Online
                    </TableCell>
                    <TableCell colSpan={6}/>
                </TableRow>
            </TableBody>

        </Table>
        </TableContainer>
    );
}

export default Calendar