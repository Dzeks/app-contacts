System.register(["aurelia-event-aggregator", "./web-api", "./app", "./messages", "./toast"], function (_export) {
  var EventAggregator, WebAPI, App, ContactUpdated, ContactViewed, Toastr, _createClass, _classCallCheck, ContactDetail;

  return {
    setters: [function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_webApi) {
      WebAPI = _webApi.WebAPI;
    }, function (_app) {
      App = _app.App;
    }, function (_messages) {
      ContactUpdated = _messages.ContactUpdated;
      ContactViewed = _messages.ContactViewed;
    }, function (_toast) {
      Toastr = _toast.Toastr;
    }],
    execute: function () {
      "use strict";

      _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      ContactDetail = _export("ContactDetail", (function () {
        function ContactDetail(app, api, ea, toastr) {
          _classCallCheck(this, ContactDetail);

          this.app = app;
          this.api = api;
          this.ea = ea;
          this.toastr = toastr;
        }

        _createClass(ContactDetail, {
          activate: {
            value: function activate(params, qs, config) {
              var _this = this;

              return this.api[params.id === "new" ? "getNewContact" : "getContactDetails"](params.id).then(function (contact) {
                _this.contact = contact;
                config.navModel.title = contact.firstName;
                _this.originalJSON = JSON.stringify(contact);
                _this.ea.publish(new ContactViewed(contact));
                return contact;
              });
            }
          },
          canSave: {
            get: function () {
              return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
            }
          },
          save: {
            value: function save() {
              var _this = this;

              this.api.saveContact(this.contact).then(function (contact) {
                _this.contact = contact;
                _this.originalJSON = JSON.stringify(_this.contact);
                _this.ea.publish(new ContactUpdated(_this.contact));
                return contact;
              }).then(function (contact) {
                console.log(contact);
                _this.toastr.put(contact.firstName + " updated");
              });
            }
          },
          canDeactivate: {
            value: function canDeactivate() {
              if (this.originalJSON != JSON.stringify(this.contact)) {
                var result = confirm("You have unsaved changes. Are you sure you wish to leave?");

                if (!result) {
                  this.ea.publish(new ContactViewed(this.contact));
                }

                return result;
              }

              return true;
            }
          }
        }, {
          inject: {
            value: function inject() {
              return [App, WebAPI, EventAggregator, Toastr];
            }
          }
        });

        return ContactDetail;
      })());
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QtZGV0YWlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7TUFBUSxlQUFlLEVBQ2YsTUFBTSxFQUNOLEdBQUcsRUFDSCxjQUFjLEVBQUMsYUFBYSxFQUM1QixNQUFNLGlDQUVELGFBQWE7Ozs7QUFObEIscUJBQWUsMkJBQWYsZUFBZTs7QUFDZixZQUFNLFdBQU4sTUFBTTs7QUFDTixTQUFHLFFBQUgsR0FBRzs7QUFDSCxvQkFBYyxhQUFkLGNBQWM7QUFBQyxtQkFBYSxhQUFiLGFBQWE7O0FBQzVCLFlBQU0sVUFBTixNQUFNOzs7Ozs7Ozs7QUFFRCxtQkFBYTtBQUViLGlCQUZBLGFBQWEsQ0FFWixHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUM7Z0NBRnBCLGFBQWE7O0FBR3RCLGNBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2YsY0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixjQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNiLGNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1NBQ3RCOztxQkFQVSxhQUFhO0FBU3hCLGtCQUFRO21CQUFBLGtCQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFDOzs7QUFDMUIscUJBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEtBQUssR0FBRyxlQUFlLEdBQUcsbUJBQW1CLENBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxFQUFJO0FBQ3ZHLHNCQUFLLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdkIsc0JBQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDMUMsc0JBQUssWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUMsc0JBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzVDLHVCQUFPLE9BQU8sQ0FBQztlQUNoQixDQUFDLENBQUM7YUFDSjs7QUFFRyxpQkFBTztpQkFBQSxZQUFFO0FBQ1gscUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQzthQUNsRjs7QUFFRCxjQUFJO21CQUFBLGdCQUFFOzs7QUFDSixrQkFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sRUFBSTtBQUNqRCxzQkFBSyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQ3ZCLHNCQUFLLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQUssT0FBTyxDQUFDLENBQUM7QUFDakQsc0JBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxNQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEQsdUJBQU8sT0FBTyxDQUFDO2VBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPLEVBQUk7QUFDakIsdUJBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckIsc0JBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDO2VBQ2pELENBQUMsQ0FBQzthQUNKOztBQUVELHVCQUFhO21CQUFBLHlCQUFFO0FBQ2Isa0JBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQztBQUNuRCxvQkFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7O0FBRWxGLG9CQUFHLENBQUMsTUFBTSxFQUFDO0FBQ1Qsc0JBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNsRDs7QUFFRCx1QkFBTyxNQUFNLENBQUM7ZUFDZjs7QUFFRCxxQkFBTyxJQUFJLENBQUM7YUFDYjs7O0FBOUNNLGdCQUFNO21CQUFBLGtCQUFHO0FBQUUscUJBQU8sQ0FBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxNQUFNLENBQUMsQ0FBQzthQUFFOzs7O2VBRHBELGFBQWEiLCJmaWxlIjoiY29udGFjdC1kZXRhaWwuanMiLCJzb3VyY2VSb290IjoiL3NyYy8ifQ==