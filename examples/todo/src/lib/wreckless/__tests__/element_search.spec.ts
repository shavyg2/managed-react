import { ElementSearch } from "../ElementSearch";




describe("Element Searching",()=>{


    test("Searching elements",()=>{

        const Searcher = new ElementSearch

        const elements = [
            [],
            [], 
            [
                [1]
            ]
        ]


        let result = Searcher.find(elements,1)
        expect(result).toEqual([2,0,0])
        
    })


    test("Searching elements with out value",()=>{

        const Searcher = new ElementSearch

        const elements = [
            [],
            [], 
            [
                [1]
            ]
        ]


        let result = Searcher.find(elements,2)
        expect(result).toEqual(false)
    })
})