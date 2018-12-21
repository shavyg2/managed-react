export class ComponentDistributor<Provider, Context, View> {
    constructor(public Provider: Provider, public Context: Context, public View: View) {
    }
}