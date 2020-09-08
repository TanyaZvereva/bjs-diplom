"use strict"
const userForm = new UserForm();
userForm.loginFormCallback = data => {
    console.log(data);
    ApiConnector.login(data, response => {
        console.log(response)
        if (response.success) {
            location.reload();
        } else {
            alert(JSON.stringify(response.data));
        }
    });
};
userForm.registerFormCallback = data => {
    console.log(data);
    ApiConnector.register(data, response => {
        console.log(response)
        if (response.success) {
            location.reload();
        } else {
            alert(JSON.stringify(response.data));
        }
    });
};