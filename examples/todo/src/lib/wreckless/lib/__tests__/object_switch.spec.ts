import { ObjectSwitch } from '../ObjectSwitch/ObjectSwitch';




describe("object switch",()=>{



    test("find the right key",()=>{

        let test = {
            isNumber(value){
                return typeof value==="number"
            },
            IsString(value){
                return typeof value==="string"
            }
        }

        switch(ObjectSwitch(test,1)){
            case "isNumber":
            break;
            default:
               fail("should not reach the default")
        }

    })

    test("find the wrong key",()=>{

        let test = {
            isNumber(value){
                return typeof value==="number"
            },
            IsString(value){
                return typeof value==="string"
            }
        }

        
        switch(ObjectSwitch(test,1)){
            case "IsString":
                fail("should reach the default")
            break;
            default:
        }
        


       
    })




})