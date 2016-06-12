(function () {
    var ctrlEditUser = function ($scope, UserFactory) {

        $scope.password = "";
        $scope.confirmPassword = "";

        //Show edited user
        $scope.getUser = function () {
            var id = null;
            UserFactory.GetUser(id).then(function (data) {
                $scope.name = data.Name;
                $scope.email = data.Email;
                $scope.lastName = data.LastName;
                $scope.username = data.UserName;
                $scope.active = data.Active;

                $scope.$apply();
            });
        };

        //checkPasswordMatch
        $scope.$watch(function checkPasswordMatch() {
            $scope.divCheckPasswordMatch = false;
            if ($scope.password != $scope.confirmPassword && $scope.confirmPassword != "") {
                $scope.divCheckPasswordMatch = true;
                $("#divCheckPasswordMatch").html("Лозинките треба да се идентични!");
                $("#saveEditUser").prop('disabled', true);
            }
            else {
                $("#saveEditUser").prop('disabled', false);
            }
        });

        //check password validation
        $("#password").keypress(function () {
            if (this.value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+.])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+.]{7,19}$/)) {
                $("#passInfo").html("");
            } else {
                $("#passInfo").html("(*Лозинката треба да содржи минимум 8 карактери од кои 1 голема и мала буква, 1 број и 1 специјален знак !@#$%^&*()_+. )");
            }
        });

        //Update user
        $scope.updateUser = function () {
            UserFactory.UpdateUser().then(function (data) {
                if (data) {
                    $scope.infoEditedUserError = false;
                    $scope.infoEditedUserSuccess = true;

                    $scope.$apply();
                } else {
                    $scope.infoEditedUserError = true;
                    $scope.infoEditedUserSuccess = false;

                    $scope.$apply();
                }
            });
        }

        //Init functions
        $scope.getUser();
    }

    ctrlEditUser.$inject = ['$scope', 'UserFactory'];

    angular.module('AbcUEM').controller('ctrlEditUser', ctrlEditUser);
}());