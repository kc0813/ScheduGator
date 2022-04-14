import {Table, TableBody, TableRow, TableCell} from "@material-ui/core";
import {TableContainer, TableHead} from "@material-ui/core";
import {Typography, Paper} from "@material-ui/core";
import { Schedule, Course } from "../Course";
import {days, periods, TimeSlot} from "../UF";

// Make sample schedule for testing rn - delete later
let sample = new Map<string, string[]>();
sample.set("M", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "", "", ""]);
sample.set("T", ["", "", "", "", "", "", "", "COP4600", "COP4600", "", "", "", "", ""]);
sample.set("W", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "COP4600", "", ""]);
sample.set("R", ["", "", "", "", "", "", "", "", "COP4600", "", "", "", "", ""]);
sample.set("F", ["", "", "", "CIS4301", "", "", "", "", "", "", "", "", "", ""]);
sample.set("S", ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
sample.set("ONLINE", ["EEL3872", "CAP3027"])

function Calendar(
    // Reference for schedule calendar:
    // https://github.com/Luc-Olsthoorn/Registr/blob/master/server/src/client/Calendar.js

    props: {
        //schedule: Schedule
    }) {

    //TODO: Clean this up and move into seperate files per component
    let colors = ["Blue", "Chocolate", "Crimson", "DarkGreen", "SteelBlue", "MediumVioletRed", "Gold", "MediumSpringGreen"]
    let colorMap = new Map<string, string>()
    let i = 0;
    let size = colors.length
    //Generate an individual cell in a row
    const GenerateTableCell = (props: {courseID: string}) => {
        let color: string | undefined = "white"
        if (props.courseID != ""){
            if(!colorMap.has(props.courseID)){
                colorMap.set(props.courseID, colors[i%size])
                i++;
            }
            color = colorMap.get(props.courseID)
        }   

        return (
            <TableCell
              align="center"
              padding="none"
              scope="row" 
              style={{width: "12%", fontSize: 12, background: color}}>
              <Typography style={{ color: "white" }}>
                  {props.courseID}
              </Typography>
            </TableCell>
          )
    };

    //Generate each row of the schedule
    const GenerateRow = (props: {timeSlot: TimeSlot}) => {
        let calendar = sample;
        let cellArr: JSX.Element[] = []
        
        //First column displays period number and time range.
        cellArr.push(        
            <TableCell 
                scope="row" 
                style={{width: "12%", fontSize: 12}}>
                <b>{props.timeSlot.period + ": "}</b>
                
                {props.timeSlot.time}
            </TableCell>
        )
        
        calendar.forEach((value: string[], key: string) => { 
            if (key != "ONLINE") {
                let index: number
                if(props.timeSlot.period[0] == "E"){
                    index = parseInt(props.timeSlot.period[1]) + 10//E1 -> 11, E2 -> 12, E3 -> 13
                }
                else{
                    index = parseInt(props.timeSlot.period)-1 //indicies[0-10] for sections [1-11]
                }
                cellArr.push(<GenerateTableCell courseID={value[index]}/>)
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
    const GenerateOnline = (props: {courseID: string}) =>{
        let color: string | undefined
        if(!colorMap.has(props.courseID)){
            colorMap.set(props.courseID, colors[i%size])
            i++;
        }
        color = colorMap.get(props.courseID)
            
        return(
            <TableRow style={{height: "5vh"}}>
                <TableCell
                    style={{width: "12%", fontSize: 12}}>
                    <b>Online</b>
                </TableCell>

                <TableCell
                    align="center"
                    padding="none"
                    scope="row" 
                    style={{width: "12%", fontSize: 12, background: color}}
                    colSpan={6}>
                    <Typography style={{ color: "white" }}>
                        {props.courseID}
                    </Typography>
                    
                </TableCell>
               


            </TableRow>)

    }

    //Return a single sample schedule
    return(
        <TableContainer component={Paper}>
        <Table size="small">

            <TableHead>
                <GenerateDays/>
            </TableHead>

            <TableBody>
                {periods.map((row) => (
                    <GenerateRow timeSlot={row}/>
                ))}

                {
                    (sample.get("ONLINE")!).map((courseID =>(
                        <GenerateOnline courseID={courseID}/>
                    )))
                }
                

            </TableBody>

        </Table>
        </TableContainer>
    );
}

export default Calendar