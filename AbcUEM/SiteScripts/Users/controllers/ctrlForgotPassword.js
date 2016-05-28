(function () {

    var ctrlForgotPassword = function ($scope, UserFactory) {

        $scope.errorSuccessInfo = {
            ForgotPassError: $scope.ForgotPassError,
            ForgotPassSuccess: $scope.ForgotPassSuccess
        };

        $scope.errorSuccessInfo.ForgotPassSuccess = false;
        $scope.errorSuccessInfo.ForgotPassError = false;

        //FORGOT USER
        $scope.ForgotUserEmail = function () {
            UserFactory.ForgotPassword($scope.emailUser).then(function (data) {
                if (data == true) {
                    $scope.emailUser = "";

                    $scope.errorSuccessInfo.ForgotPassSuccess = true;
                    $scope.errorSuccessInfo.ForgotPassError = false;
                    $scope.$apply();
                }
                else {
                    $scope.emailUser = "";

                    $scope.errorSuccessInfo.ForgotPassError = true;
                    $scope.errorSuccessInfo.ForgotPassSuccess = false;
                    $scope.$apply();
                }
            });
        }

        //On close modal
        $('#modalForgotPassword').on('hide.bs.modal', function (e) {
            $scope.errorSuccessInfo.ForgotPassError = false;
            $scope.errorSuccessInfo.ForgotPassSuccess = false;
            $scope.$apply();
        });
    }
    ctrlForgotPassword.$inject = ['$scope', 'UserFactory'];

    angular.module('AbcUEM').controller('ctrlForgotPassword', ctrlForgotPassword);
}());