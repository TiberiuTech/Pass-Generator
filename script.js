function generatePassword() {
    const passwordLength = parseInt(document.getElementById("passwordLength").value);
    const passSettings = document.getElementsByName("passSettings[]");
    let allowedChars = "";
    let errorMessage = document.getElementById("error-message");

    if (!errorMessage) {
        errorMessage = document.createElement("p");
        errorMessage.style.color = "red";
        errorMessage.setAttribute("id", "error-message");
        document.getElementById("password").parentNode.insertBefore(errorMessage, document.getElementById("password").nextSibling);
    }

    errorMessage.textContent = "";

    if (passwordLength < 3 || passwordLength > 20) {
        errorMessage.textContent = "Character number is invalid.";
        return;
    }

    let usedChars = new Set();
    let password = "";

    for (let i = 0; i < passSettings.length; i++) {
        if (passSettings[i].checked) {
            switch (passSettings[i].value) {
                case "a-z":
                    allowedChars += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "0-9":
                    allowedChars += "0123456789";
                    break;
                case "A-Z":
                    allowedChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "!-$^+":
                    allowedChars += "!$^+";
                    break;
                case "includeSpaces":
                    allowedChars += " ";
                    break;
            }
        }
    }

    for (let i = 0; i < passwordLength; i++) {
        let randomChar = allowedChars[Math.floor(Math.random() * allowedChars.length)];
        if (document.getElementById("excludeDuplicate").checked) {
            if (!usedChars.has(randomChar)) {
                usedChars.add(randomChar);
                password += randomChar;
            } else {
                i--;
            }
        } else {
            password += randomChar;
        }
    }

    document.getElementById("password").innerText = `Password: ${password}`;
}
