import {Table, TableBody, TableRow, TableCell} from "@material-ui/core";
import {TableContainer, TableHead} from "@material-ui/core";
import {Typography, Paper} from "@material-ui/core";
import { Schedule } from "../Course";
import {days, periods} from "../UF";

// Make sample schedule for testing rn - delete later
let sample = new Map<string, string[]>();
sample.set("M", ["", "", "", "", "CIS4301", "", "", "", "", "", "", "", "", ""]);
sample.set("T", ["", "", "", "", "", "", "", "", "COP4600", "COP4600", "", "", "", ""]);
sample.set("W", ["", "", "", "", "CIS4301", "", "", "", "", "", "", "COP4600", "", ""]);
sample.set("R", ["", "", "", "", "", "", "", "", "", "COP4600", "", "", "", ""]);
sample.set("F", ["", "", "", "", "CIS4301", "", "", "", "", "", "", "", "", ""]);
sample.set("S", ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]);

function Calendar(
    // Reference for schedule calendar:
    // https://github.com/Luc-Olsthoorn/Registr/blob/master/server/src/client/Calendar.js

    props: {
        //schedule: Schedule
    }) {

    //Generate an individual cell in a row
    const GenerateTableCell = (day:any, period:any) => {
        return (
            <TableCell
              align="center"
              padding="none"
              scope="row" 
              style={{width: "12%", fontSize: 12, background: "black"}}>
              <Typography style={{ color: "white" }}>
                  Course ID
              </Typography>
            </TableCell>
          )
    };

    //Generate each row of the schedule
    const GenerateRow = (row: any) => {
        let calendar = sample;
        let cellArr: JSX.Element[] = []

        //First column displays period number and time range.
        cellArr.push(        
            <TableCell 
                scope="row" 
                style={{width: "12%", fontSize: 12}}>
                {row.period}
                {row.time}
            </TableCell>
        )

        calendar.forEach((value: string[], key: string) => {
            if (key != "ONLINE") {
                cellArr.push(<GenerateTableCell day={key} period={row.period}/>)
            }
        });
        
        return <TableRow>{cellArr}</TableRow>;
    };

    //Generate the top row displaying the days
    const GenerateDays = () => {
        return (
            <TableRow style={{height:"5vh"}}>
                <TableCell style={{padding:0}}></TableCell>
                    {days.map((day, key) =>
                        <TableCell key={key} style={{padding:0}} align="center" >{day}</TableCell>
                    )}
            </TableRow>
        )
    };

    //Return a single sample schedule
    return(
        <TableContainer component={Paper}>
        <Table size="small">

            <TableHead>
                <GenerateDays/>
            </TableHead>

            <TableBody>
                {periods.map((row) => (
                    <GenerateRow row={row}></GenerateRow>
                ))}

                <TableRow style={{height: "5vh"}}>
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