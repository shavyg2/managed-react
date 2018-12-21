
import React from "react";



export function Warp<WarpFunc extends (props,index:number[])=>any>(warp:WarpFunc){

    return function(props):any{
        const RenderPropComponent = React.Children.only(props.children)
        const ReactElementChildren = RenderPropComponent.props.children;


        const Catcher = (props)=>{
            try{
                let child = React.Children.only(ReactElementChildren)
                let newProps = warp(props,[0]);
                return React.cloneElement(child,newProps);
            }catch(e){
                let child = React.Children.map(ReactElementChildren,(child,i)=>{
                    let newProps = warp(props,[i]);
                    return React.cloneElement(child,newProps);
                })
                return child;
            }
        }


        let newRenderPropsProps = Object.assign({},props,{
            children:Catcher
        })

        
        return React.cloneElement(RenderPropComponent,newRenderPropsProps);
    }
}