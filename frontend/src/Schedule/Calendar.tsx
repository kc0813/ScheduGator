import {Table, TableBody} from "@material-ui/core";
import {TableContainer, TableHead} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import {Schedule} from "../Course";
import {periods} from "../UF";
import {GenerateDays} from "./GenerateSample/GenerateDays"
import {GenerateRow} from "./GenerateSample/GenerateRow"
import {GenerateOnline} from "./GenerateSample/GenerateOnline"

// Make sample schedule for testing rn - delete later
function Calendar(
    // Reference for schedule calendar:
    // https://github.com/Luc-Olsthoorn/Registr/blob/master/server/src/client/Calendar.js
    props: {
        schedule: Schedule, 
        colorMap: Map<string, string>
    }
) {

   
    //Return a single sample schedule
    return(
        <TableContainer component={Paper}>
        <Table size="small">

            <TableHead>
                <GenerateDays/>
            </TableHead>

            <TableBody>
                {periods.map((row) => (
                    <GenerateRow 
                        timeSlot={row} 
                        schedule={props.schedule.template} 
                        colorMap={props.colorMap}
                    />
                ))}

                {props.schedule.template.get("ONLINE")!.map((courseID =>(
                        <GenerateOnline 
                            courseID={courseID} 
                            colorMap={props.colorMap}
                        />
                        ))
                    )
                }
                
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default Calendar