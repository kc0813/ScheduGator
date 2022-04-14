import {TimeSlot} from "../../UF";
import {TableCell} from "@material-ui/core";
import {GenerateCell} from "./GenerateCell";
import {TableRow} from "@material-ui/core";

//Generate each row of the schedule
export function GenerateRow(
    props: {
        timeSlot: TimeSlot, 
        schedule: Map<string, string[]>, 
        colorMap: Map<string, string>,
        height: number
    }
) {
    let cellArr: JSX.Element[] = []
    let relHeight: string = props.height.toString() + "vh"
        
    //First column displays period number and time range.
    cellArr.push(        
        <TableCell 
            scope="row" 
            style={{width: "12%", fontSize: "1.75vh"}}>
            <b>{props.timeSlot.period + ": "}</b>
                
            {props.timeSlot.time}
        </TableCell>
    )
        
    props.schedule.forEach((value: string[], key: string) => { 
        if(key != "ONLINE") {
            let index: number
            if(props.timeSlot.period[0] == "E"){
                index = parseInt(props.timeSlot.period[1]) + 10//E1 -> 11, E2 -> 12, E3 -> 13
            }
            else{
                index = parseInt(props.timeSlot.period)-1 //indicies[0-10] for sections [1-11]
            }
            cellArr.push(<GenerateCell courseID={value[index]} colorMap={props.colorMap}/>)
        }  
    });
        
    return <TableRow style={{height: relHeight}}>{cellArr}</TableRow>;
};

export default GenerateRow;