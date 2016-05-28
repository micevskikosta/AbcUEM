(function () {
    angular.module('AbcUEM')
         .factory('UserFactory', function ($http, RootFactory) {

             var fac = {};

             fac.InsertFirstUser = function (username, name, lastName, email, password, confirmPassword) {
                 return $.ajax({
                     url: RootFactory.RootUrl() + 'Account/FirstRegister',
                     method: 'POST',
                     data: JSON.stringify({ Username: username, Name: name, LastName: lastName, Email: email, Password: password, ConfirmPassword: confirmPassword }),
                     headers: { 'content-type': 'application/json' }
                 });
             };

             fac.InsertUser = function () {
                 if ($('#registerUser').valid()) {
                     var formData = new FormData($('#registerUser')[0]);
                     return $.ajax({
                         url: RootFactory.RootUrl() + 'Account/Register',
                         type: "POST",
                         data: formData,
                         cache: false,
                         contentType: false,
                         processData: false
                     });
                 }
             };

             fac.UpdateUser = function () {
                 if ($('#registerUser').valid()) {
                     var formData = new FormData($('#registerUser')[0]);
                     return $.ajax({
                         url: RootFactory.RootUrl() + 'Account/UpdateUser',
                         type: "POST",
                         data: formData,
                         cache: false,
                         contentType: false,
                         processData: false
                     });
                 }
             };

             fac.UpdateActiveUser = function (id, active) {
                 return $.ajax({
                     url: RootFactory.RootUrl() + 'Account/ToggleUpdateActiveUser',
                     method: 'POST',
                     data: JSON.stringify({ Id: id, Active: active }),
                     headers: { 'content-type': 'application/json' }
                 });
             }

              fac.AddUserRole = function (id, role) {
                  return $.ajax({
                      url: RootFactory.RootUrl() + 'Account/AddUserRole',
                      method: 'POST',
                      data: JSON.stringify({ Id: id, Role : role }),
                      headers: { 'content-type': 'application/json' }
                  });
              }


              fac.RemoveUserRole = function (id, role) {
                  return $.ajax({
                      url: RootFactory.RootUrl() + 'Account/RemoveUserRole',
                      method: 'POST',
                      data: JSON.stringify({ Id: id, Role: role }),
                      headers: { 'content-type': 'application/json' }
                  });
              }

              fac.ForgotPassword = function (email) {
                  return $.ajax({
                      url: RootFactory.RootUrl() + 'Account/ForgotPassword',
                      method: 'POST',
                      data: JSON.stringify({ Email : email }),
                      headers: { 'content-type': 'application/json' }
                  });
              }

             fac.GetUsers = function () {
                 return $.ajax({
                     url: RootFactory.RootUrl() + 'Account/GetUsers',
                     method: 'GET',
                     headers: { 'content-type': 'application/json' }
                 });
             }

             fac.GetUser = function (id) {
                 return $.ajax({
                     url: RootFactory.RootUrl() +'Account/GetUser',
                     method: 'POST',
                     data: JSON.stringify({ Id: id }),
                     headers: { 'content-type': 'application/json' }
                 });
             }

             fac.GetRoles = function () {
                 return $.ajax({
                     url: RootFactory.RootUrl() + 'Account/Roles',
                     method: 'GET',
                     headers: { 'content-type': 'application/json' }
                 });
             }

             fac.GetUserRoles = function (id) {
                 return $.ajax({
                     url: RootFactory.RootUrl() + 'Account/GetUserRoles',
                     method: 'POST',
                     data: JSON.stringify({ Id:id }),
                     headers: { 'content-type': 'application/json' }
                 });
             }

             fac.GetPagingUsers = function (pageIndex, itemsPerPage, search) {
                 return $.ajax({
                     url: RootFactory.RootUrl() +'Account/GetPagingUsers',
                     method: 'POST',
                     data: JSON.stringify({ PageIndex: pageIndex, ItemsPerPage: itemsPerPage, Search: search }),
                     headers: { 'content-type': 'application/json' }
                 })
             }

             fac.GetUsersTotal = function (search) {
                 return $.ajax({
                     url: RootFactory.RootUrl() + 'Account/GetUsersTotal',
                     method: 'POST',
                     data: JSON.stringify({ Search: search }),
                     headers: { 'content-type': 'application/json' }
                 })
             }

             return fac;
         });
})();