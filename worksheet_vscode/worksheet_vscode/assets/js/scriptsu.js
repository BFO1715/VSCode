function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (name === "" || email === "" || password === "") {
        errorMessage.textContent = "Please fill in all fields.";
        return false;
    } else {
        errorMessage.textContent = "";
        alert("Form submitted successfully!");
        return true;
    }
}