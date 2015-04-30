(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name nFileUploader
	 * @description
	 * # nFileUploader
	 */
	angular
		.module('nFileUploader')
		.factory('nFileUploader', nFileUploader);

	/* @ngInject */
	function nFileUploader($q) {

		var service = {
			post: post
		};

		return service;

		function post(files, data, options) {
			return {
				to: function(uploadUrl)
				{

					var deferred = $q.defer();

					if(!angular.isArray(files)) {
						files = [files];
					}

					if (!files || !files.length) {
						deferred.reject("No files to upload");
						return;
					}

					var xhr = new XMLHttpRequest();

					xhr.upload.onprogress = function(e) {
						var percentCompleted;
						if (e.lengthComputable) {
							percentCompleted = Math.round(e.loaded / e.total * 100);
							deferred.notify(percentCompleted);
						}
					};

					xhr.onload = function(e) {
						var ret = {
							files: files,
							data: angular.fromJson(xhr.responseText)
						};
						deferred.resolve(ret);
					};

					xhr.upload.onerror = function(e) {
						var msg = xhr.responseText ? xhr.responseText : "An unknown error occurred posting to '" + uploadUrl + "'";
						deferred.reject(msg);
					};

					var formData = new FormData();

					if (data) {
						Object.keys(data).forEach(function(key) {
							//formData.append(key, JSON.stringify(data[key])); //Can be useful if you need to stringify it
							formData.append(key, data[key]);
						});
					}

					for (var idx = 0; idx < files.length; idx++) {
						var fName;

						if(options.useFileName) {
							formData.append(options.useFileName, files[idx].name);
						}

						if(options.name) {
							fName = options.name;
						} else {
							fName = files[idx].name.substr((Math.max(0, files[idx].name.lastIndexOf(".")) || Infinity) + 1);
						}

						formData.append(fName, files[idx]);
					}

					xhr.open("POST", uploadUrl);
					xhr.setRequestHeader('Authorization', 'Insert token here');
					xhr.send(formData);

					return deferred.promise;
				}
			};
		}
	};

})();
