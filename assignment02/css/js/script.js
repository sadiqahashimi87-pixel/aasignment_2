document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim(); 
            const dob = document.getElementById("dob").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const terms = document.getElementById("terms").checked;
            const message = document.getElementById("registerMessage");

            // Store all errors in an array
            const errors = [];

            // Validate full name
            if (fullName.length < 2) {
                errors.push("Please enter your full name (at least 2 characters).");
            }

            // Validate email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                errors.push("Please enter a valid email address.");
            }

            // Validate date of birth
            if (!dob) {
                errors.push("Please enter your date of birth.");
            } else if (new Date(dob) > new Date()) {
                errors.push("Date of birth cannot be in the future.");
            }

            // Validate password length
            if (password.length < 8) {
                errors.push("Password must contain at least 8 characters.");
            }

            // Validate password match
            if (password !== confirmPassword) {
                errors.push("Passwords do not match.");
            }

            // Validate terms and conditions
            if (!terms) {
                errors.push("Please agree to the terms and conditions.");
            }

            // Display all errors together
            if (errors.length > 0) {
                message.innerHTML = errors
                    .map(function (error) {
                        return "<p>" + error + "</p>";
                    })
                    .join("");

                message.style.color = "red";
                return;
            }

            // Display success message
            message.textContent = "Registration form validated successfully!";
            message.style.color = "green";

        });

    }

});
// BOOKING FORM FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.getElementById("bookingForm");

    // Run only on the booking page
    if (bookingForm) {

        const movie = document.getElementById("movie");
        const ticketQuantity = document.getElementById("ticketQuantity");
        const totalPrice = document.getElementById("totalPrice");
        const bookingDate = document.getElementById("bookingDate");
        const session = document.getElementById("session");
        const customerName = document.getElementById("customerName");
        const customerEmail = document.getElementById("customerEmail");
        const paymentMethod = document.getElementById("paymentMethod");
        const message = document.getElementById("bookingMessage");

        const ticketPrice = 22;

        // Set the minimum booking date to today
        const today = new Date();
        const localDate = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        bookingDate.min = localDate;

        // Calculate the total ticket price
        function updateTotalPrice() {

            let quantity = Number(ticketQuantity.value);

            if (!Number.isFinite(quantity) || quantity < 1) {
                quantity = 1;
            }

            totalPrice.textContent =
                "$" + (ticketPrice * quantity).toFixed(2) + " AUD";
        }

        // Update price when ticket quantity changes
        ticketQuantity.addEventListener("input", updateTotalPrice);

        // Validate booking form
        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const errors = [];

            if (!movie.value) {
                errors.push("Please select a movie.");
            }

            if (!bookingDate.value) {
                errors.push("Please select a booking date.");
            } else if (bookingDate.value < localDate) {
                errors.push("Booking date cannot be in the past.");
            }

            if (!session.value) {
                errors.push("Please select a session.");
            }

            const quantity = Number(ticketQuantity.value);

            if (
                !Number.isInteger(quantity) ||
                quantity < 1 ||
                quantity > 10
            ) {
                errors.push("Please select between 1 and 10 tickets.");
            }

            if (customerName.value.trim().length < 2) {
                errors.push("Please enter your full name.");
            }

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    customerEmail.value.trim()
                )
            ) {
                errors.push("Please enter a valid email address.");
            }

            if (!paymentMethod.value) {
                errors.push("Please select a payment method.");
            }

            // Display all errors together
            if (errors.length > 0) {

                message.replaceChildren();

                const errorList = document.createElement("ul");

                errors.forEach(function (error) {

                    const item = document.createElement("li");
                    item.textContent = error;
                    errorList.appendChild(item);

                });

                message.appendChild(errorList);
                message.style.color = "red";

                return;
            }

            // Show booking confirmation
               message.textContent =
               "Booking confirmed successfully! " +
               "Total: $" + (ticketPrice * quantity).toFixed(2) + " AUD. " +
              "This is a demonstration only; no payment has been processed.";

               message.style.color = "green";
               message.style.fontWeight = "bold";
               message.scrollIntoView({ behavior: "smooth", block: "center" });
        });

        // Set the initial total price
        updateTotalPrice();

    }

});

// MOVIE RECOMMENDATION FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {

    const recommendationForm = document.getElementById("recommendationForm");

    // Run only on the recommendations page
    if (recommendationForm) {

        const genre = document.getElementById("genre");
        const mood = document.getElementById("mood");
        const results = document.getElementById("recommendationResults");

        // Movie data for recommendations
        const movies = [
            {
                title: "Saiyaara",
                genres: ["romance", "drama"],
                moods: ["emotional"],
                description: "A romantic drama about love and emotions."
            },
            {
                title: "3 Idiots",
                genres: ["comedy", "drama"],
                moods: ["fun", "emotional"],
                description: "A funny and meaningful story about friendship and education."
            },
            {
                title: "Harry Potter and the Philosopher's Stone",
                genres: ["fantasy", "adventure"],
                moods: ["magical", "exciting"],
                description: "Discover a magical world full of adventure."
            },
            {
                title: "Aashiqui 2",
                genres: ["romance", "musical", "drama"],
                moods: ["emotional"],
                description: "A musical love story filled with emotion."
            },
            {
                title: "How to Train Your Dragon",
                genres: ["animation", "adventure"],
                moods: ["fun", "exciting"],
                description: "An adventurous story about a boy and his dragon."
            },
            {
                title: "Spider-Man: Brand New Day",
                genres: ["action", "adventure"],
                moods: ["exciting"],
                description: "A superhero adventure full of action."
            }
        ];

        // Handle recommendation form submission
        recommendationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const selectedGenre = genre.value;
            const selectedMood = mood.value;

            // Find movies matching BOTH the selected genre and mood
            const matchingMovies = movies.filter(function (movie) {

                return movie.genres.includes(selectedGenre) &&
                       movie.moods.includes(selectedMood);

            });

            // Clear previous results
            results.replaceChildren();

            const heading = document.createElement("h2");
            heading.textContent = "Your Recommendations";
            results.appendChild(heading);

            if (matchingMovies.length === 0) {

                const message = document.createElement("p");
                message.textContent =
                    "No exact matches found. Try a different genre or mood.";

                results.appendChild(message);
                return;
            }

            // Display matching movies
            matchingMovies.forEach(function (movie) {

                const card = document.createElement("article");
                card.className = "movie-card";

                const title = document.createElement("h3");
                title.textContent = movie.title;

                const description = document.createElement("p");
                description.textContent = movie.description;

                const bookingLink = document.createElement("a");
                bookingLink.href = "booking.html";
                bookingLink.className = "btn";
                bookingLink.textContent = "Book Tickets";

                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(bookingLink);

                results.appendChild(card);

            });

        });

    }

});