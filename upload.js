// https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
// https://developer.mozilla.org/en-US/docs/Web/API/File/File
// https://firebase.google.com/docs/storage/web/upload-files?authuser=0
console.log('## upload.js ##');

function writeScoreData(name, score) {
	if (name === undefined || name === '') {
		console.log('forgot to put name');
		return;
	}
	
	let data = {"score": score};

	var OldScorePromise = firebase.database().ref().child('players/' + name + '/score').once('value').then(function(snapshot) {
		return snapshot.val();
	});

	OldScorePromise.then(function(result) {
		// update only after recieving the old score
		if (result < data.score) {
			firebase.database().ref('players/' + name).set(data);
			console.log('new highscore for ' + name);
		} else {
			console.log('not a new highscore for ' + name);
		}
	});
}

function uploadToFirebase(file, contentType) {
	
	var metadata = {
  		contentType: contentType
	};

	var storage = firebase.storage();
	var storageRef = storage.ref();

	// Upload file and metadata to the object 'scores/_'s-score.json'
	var uploadTask = storageRef.child('scores/' + file.name).put(file, metadata);
	//var uploadTask = storageRef.child().put(file, metadata);
	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  	function(snapshot) {
    		// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    		console.log('Upload is ' + progress + '% done');
    		switch (snapshot.state) {
      			case firebase.storage.TaskState.PAUSED: // or 'paused'
        			console.log('Upload is paused');
        			break;
      			case firebase.storage.TaskState.RUNNING: // or 'running'
        			console.log('Upload is running');
        			break;
    		}
  	}, function(error) {
  		// A full list of error codes is available at
  		// https://firebase.google.com/docs/storage/web/handle-errors
  		switch (error.code) {
    			case 'storage/unauthorized':
      				// User doesn't have permission to access the object
				console.log('no permission');
      				break;

    			case 'storage/canceled':
      				// User canceled the upload
				console.log('canceled upload');
      				break;
    			case 'storage/unknown':
      				// Unknown error occurred, inspect error.serverResponse
				console.log('unknown error');
      				break;
  			}
		}, function() {
  			// Upload completed successfully, now we can get the download URL
  			var downloadURL = uploadTask.snapshot.downloadURL;
			console.log(downloadURL);
		}
	);
}

function downloadURL(url, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}