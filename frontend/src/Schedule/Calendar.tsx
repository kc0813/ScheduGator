import {Table, TableBody} from "@material-ui/core";
import {TableContainer, TableHead} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import {Schedule} from "../Course";
import {periodList} from "../UF";
import {GenerateHeader} from "../GenerateTable/GenerateHeader"
import {GenerateRow} from "../GenerateTable/GenerateRow"
import {GenerateOnline} from "../GenerateTable/GenerateOnline"

//TODO: Resize rows depending on number of online classes
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
                <GenerateHeader headerType={"schedule"}/>
            </TableHead>

            <TableBody>
                {periodList.map((row) => (
                    <GenerateRow 
                        periodSlot={row} 
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