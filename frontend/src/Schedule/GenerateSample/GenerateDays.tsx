import {TableRow, TableCell} from "@material-ui/core";
import {days} from "../../UF";
  
//Generate the top row displaying the days
export function GenerateDays(
    props: {
        height: number
    }
){
    let relHeight: string = props.height.toString() + "vh"
    return (
        <TableRow style={{height: relHeight}}>
            <TableCell style={{padding:0}} align="center"></TableCell>
                {days.map((day:string, key:number) =>
                    <TableCell key={key} style={{padding:0}} align="center" >{day}</TableCell>
                )}
        </TableRow>
    )
};

export default GenerateDays;