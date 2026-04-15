/* ===== Mobile Navigation Toggle ===== */
document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".menu-toggle");
    var navLinks = document.querySelector(".nav-links");

    if (toggle && navLinks) {
        toggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });
    }

    /* ===== Application Form Handling ===== */
    var form = document.getElementById("application-form");
    if (!form) return;

    var fields = [
        { id: "first-name", message: "First name is required." },
        { id: "last-name", message: "Last name is required." },
        { id: "email", message: "A valid email address is required.", validate: validateEmail },
        { id: "phone", message: "Phone number is required." },
        { id: "dob", message: "Date of birth is required." },
        { id: "programme", message: "Please select a programme." },
        { id: "start-term", message: "Please select a start term." },
        { id: "high-school", message: "Institution name is required." },
        { id: "gpa", message: "GPA must be between 0 and 4.", validate: validateGPA }
    ];

    /* Live validation: clear errors on input */
    fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        if (input) {
            input.addEventListener("input", function () {
                clearError(field.id);
            });
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var isValid = true;

        fields.forEach(function (field) {
            var input = document.getElementById(field.id);
            if (!input) return;
            clearError(field.id);

            var value = input.value.trim();

            if (!value) {
                showError(field.id, field.message);
                isValid = false;
            } else if (field.validate && !field.validate(value)) {
                showError(field.id, field.message);
                isValid = false;
            }
        });

        /* Terms checkbox */
        var terms = document.getElementById("terms");
        var termsError = document.getElementById("terms-error");
        if (terms && !terms.checked) {
            if (termsError) termsError.textContent = "You must agree to the terms and conditions.";
            isValid = false;
        } else if (termsError) {
            termsError.textContent = "";
        }

        if (!isValid) return;

        /* Show confirmation */
        var programmeSelect = document.getElementById("programme");
        var programmeName = programmeSelect.options[programmeSelect.selectedIndex].text;

        document.getElementById("confirm-name").textContent =
            document.getElementById("first-name").value.trim() + " " +
            document.getElementById("last-name").value.trim();
        document.getElementById("confirm-programme").textContent = programmeName;
        document.getElementById("confirm-email").textContent =
            document.getElementById("email").value.trim();

        form.classList.add("hidden");
        document.getElementById("confirmation").classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    function showError(fieldId, message) {
        var errorSpan = document.getElementById(fieldId + "-error");
        var input = document.getElementById(fieldId);
        if (errorSpan) errorSpan.textContent = message;
        if (input) input.classList.add("invalid");
    }

    function clearError(fieldId) {
        var errorSpan = document.getElementById(fieldId + "-error");
        var input = document.getElementById(fieldId);
        if (errorSpan) errorSpan.textContent = "";
        if (input) input.classList.remove("invalid");
    }

    function validateEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateGPA(value) {
        var gpa = parseFloat(value);
        return !isNaN(gpa) && gpa >= 0 && gpa <= 4;
    }
});
