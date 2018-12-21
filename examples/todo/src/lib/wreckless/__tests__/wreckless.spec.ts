import { LayerMaster, LayoutMaster } from '../wreckless';
import { ElementOrganizer } from '../ElementOrganizer';
import { ElementSearch } from '../ElementSearch';
import { ElementMaster, ElementReferenceMaster } from '../ElementMaster';
import td from "testdouble";




describe("wreckless",()=>{
    
    let organizer = new ElementOrganizer()
    let searcher =  new ElementSearch()
    let master = new LayoutMaster(organizer,searcher);

    beforeEach(()=>{

        organizer = new ElementOrganizer();
        searcher =  new ElementSearch();
        master = new LayoutMaster(organizer,searcher);

    })


    test("Getting Properties",()=>{
        let layer = new LayerMaster();
        const menu = new ElementMaster();
        const menuRef = td.object(new ElementReferenceMaster())
        menu.setReference(menuRef)
        
        const content = new ElementMaster();
        const contentRef = td.object(new ElementReferenceMaster())
        content.setReference(contentRef);
        

        master.addLayer(layer);
        layer.addElement(menu);

    })
})