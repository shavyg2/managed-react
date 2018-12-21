import uuid from "uuid/v4";
import { not_ok } from "./util/not_ok";
import { HTML } from "./Types";
import { ObjectSwitch } from "./lib/ObjectSwitch/ObjectSwitch";
import { SizeType } from "./SizeType";

export class ElementReferenceMaster {
  private _ref: HTML;

  get ref() {
    return this._ref;
  }

  setNode(refElement: HTML) {
    not_ok(this._ref, "Element already contains a reference");
    this._ref = refElement;
  }

  getContentWidth() {
    return this._ref.offsetWidth;
  }

  getContentHeight() {
    return this._ref.offsetHeight;
  }
}

export class ElementMaster {

  private _ref:ElementReferenceMaster;

  private _id = uuid();
  
  private _width: number;
  private _height: number;

  setReference(reference:ElementReferenceMaster){
    this._ref= reference;
  }
  
  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  

  private validValue(value) {
    switch (ObjectSwitch(SizeType, value)) {
      case "isAuto":
      case "isFitContent":
      case "isMaxContent":
      case "isMinContent":
      case "isNumber":
      case "isPercentage":
        break;
      default:
        not_ok(true, "width value is not a known type");
    }
  }

  setWidth(value) {
    this.validValue(value);
    this._width = value;
  }

  setHeight(value) {
    this.validValue(value);
    this._height = value;
  }

  getContentWidth() {
    return this._ref.ref.offsetWidth;
  }

  getContentHeight() {
    return this._ref.ref.offsetHeight;
  }

  reset() {
    let el = new ElementMaster();
    el._id = this._id;
    el._ref = this._ref;
    return el;
  }
}
