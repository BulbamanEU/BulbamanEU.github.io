document.addEventListener("DOMContentLoaded", function () {
    function submitForm(event) {
        const form = document.getElementById("contactForm");
        const output = document.getElementById("output");
        const resultDiv = document.getElementById("result");
        const formData = {};
        let totalScore = 0;
        let questionCount = 0;
        let errors = [];

        // Išvalyti ankstesnius rezultatus
        output.innerHTML = "";
        resultDiv.innerHTML = "";

        // Surinkti formos duomenis ir patikrinti laukus
        for (let element of form.elements) {
            if (element.name) {
                formData[element.name] = element.value;

                // Rodyti kiekvieną lauką output div
                const paragraph = document.createElement("p");
                paragraph.textContent = `${element.labels[0]?.textContent || element.name}: ${element.value}`;
                output.appendChild(paragraph);

                // Jei tai klausimo laukas, apskaičiuoti vidurkį
                if (element.name.startsWith("question")) {
                    totalScore += parseInt(element.value) || 0;
                    questionCount++;
                }
            }
        }

        // Atlikti laukų patikrą
        if (!validateEmail(formData.email)) {
            errors.push("Įveskite tinkamą el. pašto adresą!");
        }

        if (!validatePhone(formData.phone)) {
            errors.push("Įveskite tinkamą telefono numerį! Jis turi būti sudarytas tik iš skaitmenų.");
        }

        if (!formData.address || formData.address.trim() === "") {
            errors.push("Adresas negali būti tuščias!");
        }

        // Jei yra klaidų, parodyti jas viename pranešime
        if (errors.length > 0) {
            alert("Klaidos:\n" + errors.join("\n"));
            output.innerHTML = "<p style='color: red;'>Prašome ištaisyti klaidas formoje.</p>";
            return; // Stabdyti formos pateikimą
        }

        // Apskaičiuoti vidurkį
        const averageScore = questionCount > 0 ? (totalScore / questionCount).toFixed(2) : "N/A";

        // Rodyti vardą, el. paštą ir vidurkį rezultatų div
        const resultText = `${formData.firstName} ${formData.lastName} (${formData.email}): ${averageScore}`;
        const resultParagraph = document.createElement("p");
        resultParagraph.textContent = resultText;

        // Nustatyti vidurkio spalvą
        if (averageScore >= 0 && averageScore < 4) {
            resultParagraph.style.color = "red";
        } else if (averageScore >= 4 && averageScore < 7) {
            resultParagraph.style.color = "orange";
        } else if (averageScore >= 7) {
            resultParagraph.style.color = "green";
        }

        resultDiv.appendChild(resultParagraph);

        // Log duomenis į konsolę
        console.log("Formos duomenys:", formData);

        // Informuoti vartotoją
        alert("Forma pateikta! Duomenys rodomi puslapyje ir konsolėje.");
    }

    // El. pašto patikra
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Telefono numerio patikra
    function validatePhone(phone) {
        const phoneRegex = /^[0-9]+[+]?$|^\+[0-9]+$/;
        return phoneRegex.test(phone);
    }

    // Priskirti funkciją mygtukui
    document.querySelector('button[type="button"]').onclick = submitForm;
});
