(function() {
	'use strict';

	angular
		.module('nFileUploader')
		.directive('nFileUploader', nFileUploader);

	/* @ngInject */
	function nFileUploader($rootScope) {
		/**
		 * @ngdoc directive
		 * @name nFileUploader
		 * @description
		 * # nFileUploader
		 */
		var directive = {
			link: link,
			restrict: 'A'
		};

		return directive;

		function link(scope, element, attrs){

			element.bind("change", function (changeEvent) {
				scope.$apply(function () {
					var file = changeEvent.target.files[0];
					//Set it as rootScope, and use it on create of observation
					if(file != undefined && file.size < 10000000) {
						$rootScope.file = file;
					} else {
						console.log("Filesize is too big")
					}
				});
			});

		};
	};
})();
