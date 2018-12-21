import { LocalDatabase } from '../service/database/localDatabase';
import { DatabaseService } from '../service/database/DatabaseService';




export function DatabaseProvider(props){


    return (
        <LocalDatabase.Provider>
            <DatabaseService.Provider>
                {props.children}
            </DatabaseService.Provider>
        </LocalDatabase.Provider>
    )
}