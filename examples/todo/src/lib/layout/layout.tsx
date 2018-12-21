import React, { useContext, useEffect } from "react";
import ManagedReact from 'managed-react';
import styled from "styled-components"
type HTML = HTMLDivElement


export const Layout = ManagedReact.create({
    ref: null as HTML,
    updated:false
})
.logic((state,dispatch)=>{



    const api = {
        ...state,
        getWidth(){
            if(!state.ref){
                return 0;
            }else{
                return state.ref.offsetWidth
            }

        },
        getHeight(){
            if(!state.ref){
                return 0;
            }else{
                return state.ref.offsetHeight
            }
        },
        setRef(ref){
            if(ref && state.ref!==ref){
                debugger;
                dispatch(state=>{
                    state.ref=ref;
                    state.updated=true
                })
            }
        }
    }

    return api;
}).build()
.AsComponent(({ref,getHeight,getWidth,setRef,children,...props})=>{

    return (
        <div {...props}>
            {Date.now()}
            <div ref={setRef}>
                {children}
            </div>
        </div>
    )
})