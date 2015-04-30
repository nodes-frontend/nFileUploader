# Nodes Galactic Image Preloader

Yello!

This is a simple image preloader

## How to



## Service
```javascript
	var file = $rootScope.file;
	
	nFileUploader.post(file, dataTransform, options).to(url).then(function(response) {
		deferred.resolve(response);
	}, function(error) {
		deferred.reject([error]);
	}, function(progress) {
		deferred.notify();
	});
```


## Uploading it

```javascript
	//Listen if there is new file uploaded
	$rootScope.$watch('file', function(data) {
		if(data != undefined) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$scope.$apply(function() {
					scope.file = reader.result;
				});
			};
			reader.readAsDataURL(data);
		}
	});
```

```html
	<label class="file-label">
	
		<input type="file" title="" accept=".jpg, .jpeg, .png" n-file-uploader/>
	
	</label> 
	
	{{file}}
```

### Parameters

Set token in factory under xhr.setRequestHeader
File is put into $rootScope, remember to delete it after its not in any use more


