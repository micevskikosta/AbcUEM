(function () {

    var ctrlRegisterUser = function ($scope, UserFactory) {

        //PROPERTIES
        $scope.name = "";
        $scope.middleName = "";
        $scope.lastName = "";
        $scope.username = "";
        $scope.email = "";
        $scope.password = "";
        $scope.confirmPassword = "";

        $scope.editUser = true;
        $scope.editDepAndRoles = false;

        $scope.ForgotPassError = false;
        $scope.ForgotPassSuccess = false;

        $scope.showRegisterRoles = true;
        $scope.showEditRoles = false;

        $scope.departmentList = [];
        $scope.rolesList = [];
        $scope.userRolesList = [];
        $scope.checkedDepRolesList = [];
        $scope.usersList = [];

        //-------------PAGING--------------//

        $scope.currentPage = 1;
        $scope.pageSize = 5;
        $scope.Search = "";

        $scope.from = 1;
        $scope.to = $scope.pageSize;

        function resetPagging() {
            $scope.currentPage = 1;
            $scope.pageSize = 5;
            $scope.from = 1;
            $scope.to = $scope.pageSize;
        }

        $scope.Previous = function () {
            if ($scope.from > 1) {         
                var calculateTo = ($scope.to - $scope.from) + 1;

                if ($scope.to == $scope.total) {
                    $scope.from = $scope.from - $scope.pageSize > 0 ? $scope.from - $scope.pageSize : 1;
                    $scope.to = $scope.to + $scope.pageSize > $scope.pageSize ? $scope.to - calculateTo : $scope.pageSize;
                }
                else {
                    $scope.from = $scope.from - $scope.pageSize > 0 ? $scope.from - $scope.pageSize : 1;
                    $scope.to = $scope.to + $scope.pageSize > $scope.pageSize ? $scope.to - $scope.pageSize : $scope.pageSize;
                }

                $scope.currentPage -= 1;
                $scope.initUsers($scope.currentPage, $scope.pageSize, $scope.Search);
            }
        }

        $scope.Next = function () {
            if ($scope.to < $scope.total) {
                $scope.from += $scope.pageSize;
                $scope.to = $scope.to + $scope.pageSize > $scope.total ? $scope.total : $scope.to + $scope.pageSize;
                $scope.currentPage += 1;
                $scope.initUsers($scope.currentPage, $scope.pageSize, $scope.Search);
            }
        }

        //-------------END--------------//


        //-------------SEARCH--------------//

        $scope.search = function () {
                resetPagging();
                var search = $scope.Search == undefined ? null : $scope.Search;
                $scope.initUsers($scope.currentPage, $scope.pageSize, search);
                $scope.initUsersTotal(search);
        }

        $scope.initUsers = function (index, perPage, search) {
            UserFactory.GetPagingUsers(index, perPage, search).then(function (data) {
                $scope.usersList = data;
                $scope.$apply();
            });
        }

        $scope.initUsersTotal = function (search) {
            UserFactory.GetUsersTotal(search).then(function (data) {
                $scope.total = data[0];
                if ($scope.pageSize > $scope.total) {
                    $scope.to = $scope.total;
                } else {
                    $scope.to = $scope.to + $scope.pageSize > $scope.pageSize ?  $scope.to : $scope.pageSize;
                }
                $scope.$apply();
            });
        }

        //-------------END--------------//

        //CLEAR FORM
        $scope.ClearForm = function () {

            //clear list for checked departments and roles
            $scope.checkedDepRolesList = [];

            //clear properties
            $scope.name = "";
            $scope.middleName = "";
            $scope.lastName = "";
            $scope.username = "";
            $scope.email = "";
            $scope.password = "";
            $scope.confirmPassword = "";

            //set ng-show attributes 
            $scope.showRegisterRoles = true;
            $scope.showEditRoles = false;

            $scope.infoRegisterUserError = false;
            $scope.infoRegisterUserSuccess = false;

            $scope.infoEditedUserError = false;
            $scope.infoEditedUserSuccess = false;

            //clear error div for password match
            $("#divCheckPasswordMatch").html("");

            //clear error for validation password
            $("#passInfo").html("");

            //reset height od modal
            //$('.register-modal').css('min-height', '516px');

            //clear checked roles and departments of register user modal
            $('[name="checkboxRoles"]').prop('checked', false);
            $('[name="checkboxDepartments"]').prop('checked', false);
        }

        //INSERT USER
        $scope.insertFirstUser = function () {
            UserFactory.InsertFirstUser($scope.username, $scope.name, $scope.lastName, $scope.email, $scope.password, $scope.confirmPassword).then(function (data) {

            });
        }

        $scope.insertUser = function () {
            UserFactory.InsertUser().then(function (data) {
                if (data == true) {
                        
                        $scope.initUsers($scope.currentPage, $scope.pageSize, null);

                        $scope.infoRegisterUserError = false;
                        $scope.infoRegisterUserSuccess = true;

                        //$('.register-modal').css('min-height', '600px');

                        $scope.$apply();

                        $scope.initUsersTotal(null);

                        setTimeout(function () {
                            $scope.ClearForm();
                            $('#updateModal').modal('hide')
                        }, 3000);
                    }
                else {
                    //$('.register-modal').css('min-height', '640px');
                    $scope.infoRegisterUserError = true;
                    $scope.infoRegisterUserSuccess = false;

                    $scope.$apply();
                }
            });
        }
    
        $scope.getRoles = function () {
            UserFactory.GetRoles().then(function (data) {
                for (var i = 0; i < data.length; i++) {

                    if (data[i].Order == 1) {
                        $scope.rolesList.push(data[i]);
                        $scope.$apply();
                    }

                    if (data[i].Order == 2) {
                        $scope.departmentList.push(data[i]);
                        $scope.$apply();
                    }
                }
             
            }, function (error) {
                toastr.error("Грешка..");
            });
      };

        $scope.addCheckedDepRoles = function ($event,name) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');

            if (action === 'add') {
                $scope.checkedDepRolesList.push(name);
            }
            if (action === 'remove') {
                var index = $scope.rolesList.indexOf(name)
                $scope.checkedDepRolesList.splice(index, 1);

                var index2 = $scope.departmentList.indexOf(name)
                $scope.checkedDepRolesList.splice(index2, 1);
            }
         }

      //  $scope.removeCheckedDepRoles = function (item) {    
      //        var index = $scope.rolesList.indexOf(item)
      //        $scope.checkedDepRolesList.splice(index, 1);

      //        var index2 = $scope.departmentList.indexOf(item)
      //        $scope.checkedDepRolesList.splice(index2, 1);     
      //}

        $scope.getCheckedDepRoles = function () {
          $scope.checkedDepRolesList;
        }

        $('#updateModal').on('hide.bs.modal', function (e) {         
            $scope.ClearForm();
        });

        //checkPasswordMatch
        $scope.$watch(function checkPasswordMatch() {
            $scope.divCheckPasswordMatch = false;
                if ($scope.password != $scope.confirmPassword && $scope.confirmPassword != "") {
                    $scope.divCheckPasswordMatch = true;
                    //$('.register-modal').css('min-height', '640px');
                    $("#divCheckPasswordMatch").html("Лозинките треба да се идентични!");
                    $("#saveNewUser").prop('disabled', true);
                    $("#saveEditUser").prop('disabled', true);
                }
                else {
                    $("#saveNewUser").prop('disabled', false);
                    $("#saveEditUser").prop('disabled', false);
                }
        });

        //check password validation
        $("#password").keypress(function () {
            if (this.value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+.]{7,19}$/)) {
                $("#passInfo").html("");
            } else {
                //$('.register-modal').css('min-height', '640px');
                $("#passInfo").html("(*Лозинката треба да содржи минимум 8 карактери од кои 1 голема и мала буква, 1 број и 1 специјален знак !@#$%^&*()_+. )");
            }
        });

        //EDIT USER
        $scope.getUserRoles = function (id) {
            UserFactory.GetUserRoles(id).then(function (data) {
                $scope.userRolesList = data;
                $scope.$apply();
            });
        }

        $scope.isChecked = function (id) {
            var isChecked = false;
            for (var i = 0; i < $scope.userRolesList.length; i++) {
                if ($scope.userRolesList[i].RoleID === id) {
                    isChecked = true;
                }
            }

            return isChecked;
        }

        $scope.getUser = function (id) {
            UserFactory.GetUser(id).then(function (data) {
                $scope.showRegisterRoles = false;
                $scope.showEditRoles = true;

                $scope.id = data.Id;
                $scope.name = data.Name;
                $scope.email = data.Email;
                $scope.lastName = data.LastName;
                $scope.username = data.UserName;
                $scope.active = data.Active;

                $scope.$apply();
            });
        };

        $scope.updateUser = function () {
            UserFactory.UpdateUser().then(function (data) {
                if (data) {
                    $scope.initUsers($scope.currentPage, $scope.pageSize, null);

                    $scope.infoEditedUserError = false;
                    $scope.infoEditedUserSuccess = true;

                    //$('.register-modal').css('min-height', '600px');
                    $scope.$apply();

                    setTimeout(function () {
                        $('#updateModal').modal('hide')
                    }, 3000);                   
                } else {
                    $scope.infoEditedUserError = true;
                    $scope.infoEditedUserSuccess = false;

                    //$('.register-modal').css('min-height', '640px');
                    $scope.$apply();
                }
            });
        }

        //EDIT USER ROLES
        $scope.updateRolesSelection = function ($event, name) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');

            if (action === 'add') {
                $scope.addUserRole(name);
            }
            if (action === 'remove') {
                $scope.removeUserRole(name);
            }
        };

        $scope.updateDepartmentSelection = function ($event, name) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');

            if (action === 'add') {
                $scope.addUserRole(name);
            }
            if (action === 'remove') {
                $scope.removeUserRole(name);
            }
        };

        $scope.addUserRole = function (name) {
             UserFactory.AddUserRole($scope.id, name).then(function (data) {

             });
        }

        $scope.removeUserRole = function (name) {
            UserFactory.RemoveUserRole($scope.id, name).then(function (data) {

            });
        }
 
        $scope.updateActiveUser = function ($event,id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');

            if (action === 'add') {
                UserFactory.UpdateActiveUser(id, true).then(function (data) {

                })
            }
            if (action === 'remove') {
                UserFactory.UpdateActiveUser(id, false).then(function (data) {

                })
            }
        }

        //FORGOT USER
        $scope.ForgotUserEmail = function () {
            UserFactory.ForgotPassword($scope.emailUser).then(function (data) {
                if (data == true)
                {
                    $scope.emailUser = "";

                    $scope.ForgotPassSuccess = true;
                    $scope.ForgotPassError = false;
                    $scope.$apply();
                }
                else
                {
                    $scope.emailUser = "";

                    $scope.ForgotPassError = true;
                    $scope.ForgotPassSuccess = false;
                    $scope.$apply();
                }
            });
        }
 
        $('#modalForgotPassword').on('hide.bs.modal', function (e) {         
            $scope.ForgotPassError = false;
            $scope.ForgotPassSuccess = false;
            $scope.$apply();
        });
       
        //INIT FUNCTIONS
        $scope.initUsers($scope.currentPage, $scope.pageSize, null);
        $scope.initUsersTotal(null);
        $scope.getRoles();
    }

    ctrlRegisterUser.$inject = ['$scope', 'UserFactory'];

    angular.module('AbcUEM').controller('ctrlRegisterUser', ctrlRegisterUser);
}());