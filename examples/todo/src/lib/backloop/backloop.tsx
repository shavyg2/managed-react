import React, { useRef, useMemo, useState, useEffect } from "react";
import immer from "immer";
export function Backloop<T extends (props, ref) => any>(
  loop: T,
  reference = 2,
  placement = 1
  ) {
    return props => {
          
    let tracker = new WeakMap();
          
    let root = React.createElement(React.Fragment,props)

    let [state, dispatch] = useState(null);

    let newProps = immer(props, props => {
      return loop(props, state);
    });
    
    let placementChild = DepthSearch(root, placement);
    let referenceChild = DepthSearch(root, reference);
    

    let updatedPlacementChild = ReactCreateClone(
      placementChild,
      Object.assign({}, placementChild.props, newProps)
    ,tracker);
    let updatedReferenceChild = ReactCreateClone(
      referenceChild,
      Object.assign({}, referenceChild.props, { ref: ref => ref!==state? dispatch(ref): void 0 })
    ,tracker);



        

    let container = containsChild(root,placementChild,tracker)
    
    root = replaceChild(
      root,
      placementChild,
      updatedPlacementChild
    ,tracker);
    root = replaceChild(root, referenceChild, updatedReferenceChild,tracker);
    return root;
  };
}

function DepthSearch(children, depth) {
  if (depth <= 0) {
    return React.Children.only(children);
  } else {
    return DepthSearch(React.Children.only(children.props.children), depth - 1);
  }
}

function hasChild(parent, child,tracker:WeakMap<any,any>) {
  if (parent && parent.props && parent.props.children) {
    return child._self!== null && parent.props.children._self === child._self;
  }
}

function containsChild(parent, child,tracker) {
  if (hasChild(parent, child,tracker)) {
    return true;
  }

  if (parent && parent.props && parent.props.children) {
    
      return containsChild(parent.props.children, child,tracker);
  }
}

function parentOf(parent, child,tracker) {
  if (hasChild(parent, child,tracker)) {
    return parent;
  }

  if (containsChild(parent, child,tracker)) {
    return React.Children.toArray(parent.props.children).find(parent => {
      return parentOf(parent, child,tracker);
    });
  } else {
    return null;
  }
}

function replaceChild(root, child, newChild,tracker) {
    
  if (hasChild(root, child,tracker)) {
    return ReactCreateClone(
      root,
      Object.assign({}, root.props, { children: newChild })
    ,tracker);
  } else if (containsChild(root, child,tracker)) {
      
    try{
        root.props.children = replaceChild(root.props.children,child,newChild,tracker);

    }catch(e){
        return ReactCreateClone(root,{
            ...root.props,
            children:replaceChild(root.prop.children,child,newChild,tracker)
        },tracker)
    }
  }else{
      return root;
  }
}

let original= Symbol();

function ReactCreateClone(element,props,tracker){
    if(element._self===null){
        element._self=Symbol()
    }
    let newElement = React.cloneElement(element,{
        ...props,
        ref:element.ref
    });

    tracker.set(element,newElement);
    tracker.set(newElement,element)
    return newElement;
}