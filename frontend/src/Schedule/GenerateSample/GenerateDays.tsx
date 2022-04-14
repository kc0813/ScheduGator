import {TableRow, TableCell} from "@material-ui/core";
import {days} from "../../UF";
  
//Generate the top row displaying the days
export function GenerateDays(){
    return (
        <TableRow style={{height:"5vh"}}>
            <TableCell style={{padding:0}}></TableCell>
                {days.map((day:string, key:number) =>
                    <TableCell key={key} style={{padding:0}} align="center" >{day}</TableCell>
                )}
        </TableRow>
    )
};

export default GenerateDays;