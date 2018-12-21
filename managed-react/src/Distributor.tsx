export class Distributor<Provider, Context, AsComponent = any> {
    constructor(public Provider: Provider, public Context: Context, public AsComponent: AsComponent) {
    }
}