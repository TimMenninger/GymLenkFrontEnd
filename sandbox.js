var gmb_api_version = 'https://mybusinessaccountmanagement.googleapis.com/v1';
function onGoogleSignIn(googleUser) {
    var access_token = googleUser.getAuthResponse().access_token;
    console.log(googleUser.getAuthResponse());

    // Using the sign in data to make a Google My Business API call
    var req = gmb_api_version + '/accounts';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', req);
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);

    //Displaying the API response
    xhr.onload = function () {
        document.body.appendChild(document.createTextNode(xhr.responseText));
        console.log(xhr.responseText)
    }
    xhr.send();
}
