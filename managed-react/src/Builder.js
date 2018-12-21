"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var immer_1 = tslib_1.__importDefault(require("immer"));
var Distributor_1 = require("./Distributor");
var ComponentDistributor_1 = require("./ComponentDistributor");
var Builder = /** @class */ (function () {
    function Builder(base, services, api) {
        this.base = base;
        this.services = services;
        this.api = api;
    }
    Builder.prototype.build = function () {
        var self = this;
        var InternalPipe = react_1.default.createContext(self.base);
        var Context = react_1.default.createContext(this.base);
        function Provider(props) {
            var _a = react_1.useState(self.base), state = _a[0], originalDispatch = _a[1];
            function dispatch(update) {
                var newState = immer_1.default(state, update);
                originalDispatch(newState);
            }
            var services;
            try {
                services = Object.entries(self.services).reduce(function (acc, _a) {
                    var key = _a[0], value = _a[1];
                    var _b;
                    return tslib_1.__assign({}, acc, (_b = {}, _b[key] = react_1.useContext(value.Context), _b));
                }, {});
            }
            catch (e) {
                if (self.services && Object.keys(self.services).length > 0) {
                    throw e;
                }
                else {
                    services = {};
                }
            }
            var api = self.api(state, dispatch, services);
            Object.entries(api).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (typeof value === "function") {
                    try {
                        api[key] = value.bind(api);
                    }
                    catch (e) {
                    }
                }
            });
            return (react_1.default.createElement(InternalPipe.Provider, { value: state },
                react_1.default.createElement(Context.Provider, tslib_1.__assign({}, props, { value: api }))));
        }
        function AsComponent(CustomView) {
            function View(props) {
                return (react_1.default.createElement(Provider, null,
                    react_1.default.createElement(InternalPipe.Consumer, null, function (state) { return (react_1.default.createElement(Context.Consumer, null, function (api) {
                        return (react_1.default.createElement(CustomView, tslib_1.__assign({}, tslib_1.__assign({}, props, api || {}, state || {}))));
                    })); })));
            }
            return new ComponentDistributor_1.ComponentDistributor(Provider, Context, View);
        }
        return new Distributor_1.Distributor(Provider, Context, AsComponent);
    };
    return Builder;
}());
exports.Builder = Builder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJ1aWxkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFvRDtBQUNwRCx3REFBMEI7QUFFMUIsNkNBQTRDO0FBQzVDLCtEQUE4RDtBQUc5RDtJQU9JLGlCQUFzQixJQUFVLEVBQVksUUFBa0IsRUFBWSxHQUFRO1FBQTVELFNBQUksR0FBSixJQUFJLENBQU07UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVksUUFBRyxHQUFILEdBQUcsQ0FBSztJQUNsRixDQUFDO0lBQ0QsdUJBQUssR0FBTDtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFNLFlBQVksR0FBRyxlQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLE9BQU8sR0FBRyxlQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUF1QixDQUFDLENBQUM7UUFHaEUsU0FBUyxRQUFRLENBQUMsS0FBSztZQUNiLElBQUEsZ0NBQStDLEVBQTlDLGFBQUssRUFBRSx3QkFBdUMsQ0FBQztZQUN0RCxTQUFTLFFBQVEsQ0FBQyxNQUFNO2dCQUNwQixJQUFJLFFBQVEsR0FBRyxlQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBQ0QsSUFBSSxRQUFRLENBQUM7WUFDYixJQUFJO2dCQUNBLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsRUFBWTt3QkFBWCxXQUFHLEVBQUUsYUFBSzs7b0JBQzdELDRCQUFZLEdBQUcsZUFBRyxHQUFHLElBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQUc7Z0JBQ3hELENBQUMsRUFBRSxFQUFTLENBQUMsQ0FBQzthQUNqQjtZQUNELE9BQU8sQ0FBQyxFQUFFO2dCQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN4RCxNQUFNLENBQUMsQ0FBQztpQkFDWDtxQkFDSTtvQkFDRCxRQUFRLEdBQUcsRUFBRSxDQUFDO2lCQUNqQjthQUNKO1lBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsRUFBWTtvQkFBWCxXQUFHLEVBQUUsYUFBSztnQkFDcEMsSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7b0JBQzdCLElBQUk7d0JBQ0EsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzlCO29CQUNELE9BQU0sQ0FBQyxFQUFFO3FCQUNSO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUE7WUFHRixPQUFPLENBQ0gsOEJBQUMsWUFBWSxDQUFDLFFBQVEsSUFBQyxLQUFLLEVBQUUsS0FBSztnQkFDL0IsOEJBQUMsT0FBTyxDQUFDLFFBQVEsdUJBQUssS0FBSyxJQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FDdkIsQ0FDM0IsQ0FBQztRQUNOLENBQUM7UUFHRCxTQUFTLFdBQVcsQ0FBeUUsVUFBYTtZQUN0RyxTQUFTLElBQUksQ0FBQyxLQUFLO2dCQUVmLE9BQU8sQ0FBQyw4QkFBQyxRQUFRO29CQUNiLDhCQUFDLFlBQVksQ0FBQyxRQUFRLFFBQ2pCLFVBQUEsS0FBSyxJQUFFLE9BQUEsQ0FDSiw4QkFBQyxPQUFPLENBQUMsUUFBUSxRQUNaLFVBQUMsR0FBRzt3QkFDRCxPQUFPLENBQUMsOEJBQUMsVUFBVSw0Q0FBVSxLQUFLLEVBQUssR0FBRyxJQUFJLEVBQVMsRUFBSyxLQUFLLElBQUksRUFBUyxHQUFNLENBQUMsQ0FBQztvQkFDMUYsQ0FBQyxDQUNjLENBQ3RCLEVBTk8sQ0FNUCxDQUNtQixDQUNqQixDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELE9BQU8sSUFBSSwyQ0FBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCxPQUFPLElBQUkseUJBQVcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQTVFRCxJQTRFQztBQTVFWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgaW1tZXIgZnJvbSBcImltbWVyXCI7XHJcbmltcG9ydCB7IEV4dHJhY3QgfSBmcm9tICcuL2luZGV4JztcclxuaW1wb3J0IHsgRGlzdHJpYnV0b3IgfSBmcm9tIFwiLi9EaXN0cmlidXRvclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnREaXN0cmlidXRvciB9IGZyb20gXCIuL0NvbXBvbmVudERpc3RyaWJ1dG9yXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEJ1aWxkZXI8QmFzZSBleHRlbmRzIHtcclxuICAgIFtrZXk6IHN0cmluZ106IGFueTtcclxufSwgU2VydmljZXMgZXh0ZW5kcyB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBEaXN0cmlidXRvcjxhbnksIFJlYWN0LkNvbnRleHQ8YW55Pj47XHJcbn0sIEFwaSBleHRlbmRzIChiYXNlOiBCYXNlLCBkaXNwYXRjaDogKHVwZGF0ZTogKGJhc2U6IEJhc2UpID0+IHZvaWQpID0+IHZvaWQsIHNlcnZpY2VzOiB7XHJcbiAgICBbUCBpbiBrZXlvZiBTZXJ2aWNlc106IEV4dHJhY3Q8U2VydmljZXNbUF0+O1xyXG59KSA9PiBhbnk+IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBiYXNlOiBCYXNlLCBwcm90ZWN0ZWQgc2VydmljZXM6IFNlcnZpY2VzLCBwcm90ZWN0ZWQgYXBpOiBBcGkpIHtcclxuICAgIH1cclxuICAgIGJ1aWxkKCkge1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IEludGVybmFsUGlwZSA9IFJlYWN0LmNyZWF0ZUNvbnRleHQoc2VsZi5iYXNlKTtcclxuICAgICAgICBsZXQgQ29udGV4dCA9IFJlYWN0LmNyZWF0ZUNvbnRleHQodGhpcy5iYXNlIGFzIFJldHVyblR5cGU8QXBpPik7XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBQcm92aWRlcihwcm9wcykge1xyXG4gICAgICAgICAgICBjb25zdCBbc3RhdGUsIG9yaWdpbmFsRGlzcGF0Y2hdID0gdXNlU3RhdGUoc2VsZi5iYXNlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZGlzcGF0Y2godXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSBpbW1lcihzdGF0ZSwgdXBkYXRlKTtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRGlzcGF0Y2gobmV3U3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzZXJ2aWNlcztcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2VzID0gT2JqZWN0LmVudHJpZXMoc2VsZi5zZXJ2aWNlcykucmVkdWNlKChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLmFjYywgW2tleV06IHVzZUNvbnRleHQodmFsdWUuQ29udGV4dCkgfTtcclxuICAgICAgICAgICAgICAgIH0sIHt9IGFzIGFueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNlcnZpY2VzICYmIE9iamVjdC5rZXlzKHNlbGYuc2VydmljZXMpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmljZXMgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYXBpID0gc2VsZi5hcGkoc3RhdGUsIGRpc3BhdGNoLCBzZXJ2aWNlcyk7XHJcblxyXG5cclxuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoYXBpKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaVtrZXldID0gdmFsdWUuYmluZChhcGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8SW50ZXJuYWxQaXBlLlByb3ZpZGVyIHZhbHVlPXtzdGF0ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbnRleHQuUHJvdmlkZXIgey4uLnByb3BzfSB2YWx1ZT17YXBpfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9JbnRlcm5hbFBpcGUuUHJvdmlkZXI+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gQXNDb21wb25lbnQ8VCBleHRlbmRzIChwcm9wczogQmFzZSAmIFJldHVyblR5cGU8QXBpPiAmIFJlY29yZDxzdHJpbmcsIGFueT4pID0+IGFueT4oQ3VzdG9tVmlldzogVCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBWaWV3KHByb3BzKSB7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8UHJvdmlkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEludGVybmFsUGlwZS5Db25zdW1lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3N0YXRlPT4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGV4dC5Db25zdW1lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7KGFwaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxDdXN0b21WaWV3IHsuLi57IC4uLnByb3BzLCAuLi5hcGkgfHwge30gYXMgYW55LCAuLi5zdGF0ZSB8fCB7fSBhcyBhbnkgfX0gLz4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvbnRleHQuQ29uc3VtZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9JbnRlcm5hbFBpcGUuQ29uc3VtZXI+XHJcbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb21wb25lbnREaXN0cmlidXRvcihQcm92aWRlciwgQ29udGV4dCwgVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgRGlzdHJpYnV0b3IoUHJvdmlkZXIsIENvbnRleHQsIEFzQ29tcG9uZW50KTtcclxuICAgIH1cclxufSJdfQ==