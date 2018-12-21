

interface isKind{
    getKind():string
}

interface isValue{
    getValue():number;
}






interface isWidth {
    isWidth():true
}


export class BaseWidth implements isWidth{
    isWidth(): true {
        return true;
    }
}

export class WidthKind extends BaseWidth implements isKind{
    private kind:string;

    setKind(kind:"auto"|"fit"){
        this.kind = kind;
    }
    getKind(): string {
       return this.kind
    }

}


export class WidthValue extends BaseWidth implements isValue{

    private value:number;

    setValue(value:number){
        this.value=value;
    }

    getValue(): number {
        return this.value;
    }

}

interface isHeight {
    isHeight():true
}


export class BaseHeight implements isHeight{
    isHeight(): true {
        return true;
    }
}

export class HeightKind extends BaseHeight implements isKind{
    private kind:string;

    setKind(kind:"auto"|"fit"){
        this.kind = kind;
    }
    getKind(): string {
       return this.kind
    }

}


export class HeightValue extends BaseHeight implements isValue{

    private value:number;

    setValue(value:number){
        this.value=value;
    }

    getValue(): number {
        return this.value;
    }

}



interface isX {
    isX():true
}


export class BaseX implements isX{
    isX(): true {
        return true;
    }
}

export class XKind extends BaseX implements isKind{
    private kind:string;

    setKind(kind:"auto"|"fit"){
        this.kind = kind;
    }
    getKind(): string {
       return this.kind
    }

}


export class XValue extends BaseX implements isValue{

    private value:number;

    setValue(value:number){
        this.value=value;
    }

    getValue(): number {
        return this.value;
    }

}





interface isY {
    isY():true
}


export class BaseY implements isY{
    isY(): true {
        return true;
    }
}

export class YKind extends BaseY implements isKind{
    private kind:string;

    setKind(kind:"auto"|"fit"){
        this.kind = kind;
    }
    getKind(): string {
       return this.kind
    }

}


export class YValue extends BaseY implements isValue{

    private value:number;

    setValue(value:number){
        this.value=value;
    }

    getValue(): number {
        return this.value;
    }

}