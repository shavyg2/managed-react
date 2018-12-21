import { ObjectSwitch } from "./lib/ObjectSwitch/ObjectSwitch";
import { SizeType, zIndexType, TranslateType, NumberType } from './SizeType';
import { not_ok } from "./util/not_ok";

interface Coordinates {
  x: number | string;
  y: number | string;
}

interface Align {
  h: string;
  v: string;
}

interface SizingInformation {
  /**
   * This is the width of an element on the page.
   * This is the natural width that the element would take up.
   */
  contentWidth: number;

  /**
   * This is the height of an element on the page.
   * This is the natural height that the element would take up.
   */
  contentHeight: number;

  /**
   * This is the suggested width that an element would like to take up.
   * The page won't necessarily use this width but it is what the user would want
   * For the most part this will be used, except perhaps in impossible situations
   */
  width?: number | string;

  /**
   * This is the suggested width that an element would like to take up.
   * The page won't necessarily use this width but it is what the user would want
   * For the most part this will be used, except perhaps in impossible situations
   */
  height?: number | string;

  /**
   * This is the area you wish to move an element while keeping the layout the same.
   * This is used mainly for animations and other small details without affecting the
   * page.
   */
  translate?: Coordinates;

  /**
   * This is the level at which an element is on a page.
   * Please note that things cannot really move between layers.
   * The programmer would need to change the actual layer an element
   * is rendered to.
   */
  zIndex?: number | string;

  /*
        This value is not used as of yet and for the most part can be left alone.
        Its here for completion reasons
    */
  origin?: Coordinates;

  /*
        This is the location of the element on the screen.
    */
  position?: Coordinates;

  align?: Partial<Align>;
}

export function CalculateMasterLayout(
  sizingInformation: SizingInformation[][]
) {
  return sizingInformation.map(CalculateLayer);
}

export function CalculateLayer(sizingInformation: SizingInformation[]) {
  let normalized = sizingInformation.map(NormalizeInformation);

  const adjusted = normalized.slice(0);

  for (let i = 0; i < normalized.length; i++) {
    switch (i) {
      case 0:
        CalculateFirst(adjusted[0]);
        break;
      default:
        CalculateRest(adjusted[i - 1], adjusted[i]);
    }
  }
}

export function NormalizeInformation(sizing: SizingInformation) {
  let {
    width,
    height,

    contentWidth,
    contentHeight,

    zIndex,

    align,
    origin,
    position,
    translate
  } = sizing;

  let normalized = {
    width: width || "auto",
    height: height || "auto",

    zIndex: zIndex || 0,
    contentWidth: contentWidth || 0,
    contentHeight: contentHeight || 0,

    align: {
      v: align.v || "auto",
      h: align.h || "auto"
    },

    origin: {
      x: origin.x || "auto",
      y: origin.y || "auto"
    },

    position: {
      x: position.x || "auto",
      y: position.y || "auto"
    },

    translate: {
      x: translate.x || "auto",
      y: translate.y || "auto"
    }
  };

  return normalized;
}

export function CalculateFirst(info: SizingInformation) {
  //Handle Width Property
  switch (ObjectSwitch(SizeType, info.width)) {
    case "isAuto":
      info.width = "auto";
      break;
    case "isMaxContent":
      info.width = "max-content";
      break;
    case "isMinContent":
      info.width = "min-content";
      break;
    case "isFitContent":
      info.width = "fit-content";
      break;
    case "isNumber":
    case "isPercentage":
      break;
    default:
      not_ok(
        true,
        `Layout engine doesn't know how to calculate width ${info.width}`
      );
  }

  //handle height
  switch (ObjectSwitch(SizeType, info.height)) {
    case "isAuto":
      info.height = "auto";
      break;
    case "isMaxContent":
      info.height = "max-content";
      break;
    case "isMinContent":
      info.height = "min-content";
      break;
    case "isFitContent":
      info.height = "fit-content";
      break;
    case "isNumber":
    case "isPercentage":
      break;
    default:
      not_ok(
        true,
        `Layout engine doesn't know how to calculate width ${info.height}`
      );
  }

  switch(ObjectSwitch(TranslateType,info.translate.x)){
      case "isNumber":
      break;
      default:
        info.translate.x = 0
  }


  switch(ObjectSwitch(TranslateType,info.translate.y)){
      case "isNumber":
      break;
      default:
        info.translate.y = 0;
  }


  switch(ObjectSwitch(NumberType,info.position.x)){
      case "isNumber":
      case "isPercentage":
        info.position.x = info.position.x || 0;
        break;
  }

  
  switch(ObjectSwitch(NumberType,info.position.y)){
      case "isNumber":
      case "isPercentage":
        info.position.x = info.position.y || 0;
        break;
  }
}

export function CalculateRest(
  previous: SizingInformation,
  current: SizingInformation
) {
    CalculateFirst(current);

}


