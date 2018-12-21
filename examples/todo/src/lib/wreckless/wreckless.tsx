import uuid from "uuid/v4";
import { ElementOrganizer } from "./ElementOrganizer";
import { ElementSearch } from './ElementSearch';
import { defaultPredicate } from './ComparePredicate';
import { ElementMaster } from './ElementMaster';



export class LayoutMaster {

  constructor(protected organizer: ElementOrganizer, protected searcher:ElementSearch) {}

  private _width: number;
  private _height: number;
  private _x: number;
  private _y: number;

  private _layers: LayerMaster[] = [];

  //#region properties
  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
  //#endregion

  moveLayerUp(layer: LayerMaster) {
    this._layers = this.organizer.moveElementUp(this._layers, layer);
  }

  moveLayerDown(layer: LayerMaster) {
    this._layers = this.organizer.moveElementDown(this._layers, layer);
  }

  protected getAllLayers(){
      return this._layers;
  }


  protected getAllElements(){
      return this.getAllLayers().map((layer)=>{
        return layer.elements
      })
  }


  getAllSizing(){
    this.getAllElements().map(layers=>{
      return layers.map(element=>{
          const sizingInformation = {
            contentWidth:element.getContentWidth(),
            contentHeight:element.getContentHeight(),
            width:element.width,
            height:element.height
          }

          return sizingInformation;
      })
    })
  }

  hasElement(element,predicate=defaultPredicate){
    return this.searcher.find(this.getAllElements(),element,predicate)
  }


  addLayer(layer:LayerMaster){
      let newLayer = this.organizer.addElement(this._layers,layer)
      return this._layers = newLayer;
  }


  removeLayer(layer:LayerMaster){
      let newLayer = this.organizer.removeElement(this._layers,layer)
      let result  = !(newLayer===this._layers)
      this._layers = newLayer;
      return result;
  }
}






export class LayerMaster {
  private _id = uuid();
  private _elements:ElementMaster[] = []
  get id() {
      return this._id;
    }
    
  get elements(){
      return this._elements
  }


  addElement(element:ElementMaster){
      this._elements.push(element)
  }
}


