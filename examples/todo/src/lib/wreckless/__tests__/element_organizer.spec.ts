import { ElementOrganizer } from '../ElementOrganizer';



    describe("Organizer",()=>{

        let organizer:ElementOrganizer;


        beforeAll(()=>{
            organizer = new ElementOrganizer;
        })


        test("move element up",()=>{

            let result = organizer.moveElementUp([1,2,3],2)
            expect(result).toEqual([1,3,2])
            
            
            result = organizer.moveElementUp([1,2,3],1)
            expect(result).toEqual([2,1,3])
            
            
            result = organizer.moveElementUp([1,2,3],3)
            expect(result).toEqual([1,2,3])

        })


        test("move element down",()=>{

            let result = organizer.moveElementDown([1,2,3],2)
            expect(result).toEqual([2,1,3])
            
            
            result = organizer.moveElementDown([1,2,3],1)
            expect(result).toEqual([1,2,3])
            
            
            
            result = organizer.moveElementDown([1,2,3],3)
            expect(result).toEqual([1,3,2])



            result = organizer.moveElementDown([1],1)
            expect(result).toEqual([1])
        })

    })