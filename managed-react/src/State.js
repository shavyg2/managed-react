"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logic_1 = require("./Logic");
var State = /** @class */ (function () {
    //protected services!: Services;
    function State(base, services) {
        this.base = base;
        this.services = services;
    }
    State.prototype.use = function (services) {
        this.services = services;
        var state = new State(this.base, services);
        state.services = services;
        return state;
    };
    State.prototype.logic = function (api) {
        return new Logic_1.Logic(this.base, this.services, api);
    };
    return State;
}());
exports.State = State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxpQ0FBZ0M7QUFHaEM7SUFDSSxnQ0FBZ0M7SUFDaEMsZUFBc0IsSUFBVSxFQUFXLFFBQWlCO1FBQXRDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVyxhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQzVELENBQUM7SUFDRCxtQkFBRyxHQUFILFVBQXNELFFBQVc7UUFDN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFlLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQVUsSUFBSSxDQUFDLElBQUksRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUMxQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0QscUJBQUssR0FBTCxVQUFnSixHQUFNO1FBRWxKLE9BQU8sSUFBSSxhQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSxzQkFBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV4dHJhY3QgfSBmcm9tICcuL2luZGV4JztcclxuaW1wb3J0IHsgRGlzdHJpYnV0b3IgfSBmcm9tIFwiLi9EaXN0cmlidXRvclwiO1xyXG5pbXBvcnQgeyBMb2dpYyB9IGZyb20gXCIuL0xvZ2ljXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YXRlPEJhc2UgZXh0ZW5kcyB7W2tleTogc3RyaW5nXTogYW55fSwgU2VydmljZXMgZXh0ZW5kcyB7W2tleTogc3RyaW5nXTogRGlzdHJpYnV0b3I8YW55LCBhbnk+fT4ge1xyXG4gICAgLy9wcm90ZWN0ZWQgc2VydmljZXMhOiBTZXJ2aWNlcztcclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBiYXNlOiBCYXNlLHByb3RlY3RlZCBzZXJ2aWNlczpTZXJ2aWNlcykge1xyXG4gICAgfVxyXG4gICAgdXNlPFQgZXh0ZW5kcyB7W2tleTogc3RyaW5nXTogRGlzdHJpYnV0b3I8YW55LCBhbnk+fT4oc2VydmljZXM6IFQpIHtcclxuICAgICAgICB0aGlzLnNlcnZpY2VzID0gc2VydmljZXMgYXMgYW55O1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IG5ldyBTdGF0ZTxCYXNlLCBUPih0aGlzLmJhc2Usc2VydmljZXMpO1xyXG4gICAgICAgIHN0YXRlLnNlcnZpY2VzID0gc2VydmljZXM7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG4gICAgbG9naWM8VCBleHRlbmRzIChiYXNlOiBCYXNlLCBkaXNwYXRjaDogKHVwZGF0ZTogKGJhc2U6IEJhc2UpID0+IHZvaWQpID0+IHZvaWQsIHNlcnZpY2VzOiB7W1AgaW4ga2V5b2YgU2VydmljZXNdOiBFeHRyYWN0PFNlcnZpY2VzW1BdPn0pID0+IGFueT4oYXBpOiBUKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgTG9naWModGhpcy5iYXNlLCB0aGlzLnNlcnZpY2VzLCBhcGkpO1xyXG4gICAgfVxyXG59Il19