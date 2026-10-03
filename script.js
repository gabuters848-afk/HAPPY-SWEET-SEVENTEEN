// ==========================================
// BIRTHDAY WEBSITE RARA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // PASSWORD
    // ==========================================

    const passwordInput = document.getElementById("passwordInput");
    const passwordButton = document.getElementById("passwordButton");
    const passwordScreen = document.getElementById("passwordScreen");
    const website = document.getElementById("website");
    const wrongPassword = document.getElementById("wrongPassword");

    function openWebsite() {
        passwordScreen.style.display = "none";
        website.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function checkPassword() {
        const password = passwordInput.value.trim();

        if (password === "2504") {
            openWebsite();
        } else {
            wrongPassword.style.display = "block";
            passwordInput.value = "";

            setTimeout(function () {
                wrongPassword.style.display = "none";
            }, 2000);
        }
    }

    passwordButton.addEventListener("click", checkPassword);

    passwordInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkPassword();
        }
    });


    // ==========================================
    // COUNTDOWN 22 OKTOBER
    // ==========================================

    function getBirthdayDate() {

        const now = new Date();

        let year = now.getFullYear();

        let birthday = new Date(
            year,
            9,
            22,
            0,
            0,
            0
        );

        // Kalau 22 Oktober tahun ini sudah lewat,
        // hitung ke 22 Oktober tahun berikutnya.
        if (now >= birthday) {
            birthday = new Date(
                year + 1,
                9,
                22,
                0,
                0,
                0
            );
        }

        return birthday;
    }


    function updateCountdown() {

        const now = new Date();
        const birthday = getBirthdayDate();

        const difference = birthday - now;

        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");

        if (!days) return;

        const d = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const h = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const m = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const s = Math.floor(
            (difference / 1000) % 60
        );

        days.textContent = String(d).padStart(2, "0");
        hours.textContent = String(h).padStart(2, "0");
        minutes.textContent = String(m).padStart(2, "0");
        seconds.textContent = String(s).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // ==========================================
    // CEK APAKAH SUDAH 22 OKTOBER
    // ==========================================

    function isBirthdayUnlocked() {

        const now = new Date();

        const birthday = new Date(
            now.getFullYear(),
            9,
            22,
            0,
            0,
            0
        );

        return now >= birthday;
    }


    // ==========================================
    // GIFT / KADO
    // ==========================================

    const giftBox = document.getElementById("giftBox");
    const giftStatus = document.getElementById("giftStatus");
    const giftInstruction = document.getElementById("giftInstruction");

    const birthdayReveal =
        document.getElementById("birthdayReveal");


    function updateGiftStatus() {

        if (!giftBox) return;

        if (isBirthdayUnlocked()) {

            giftBox.classList.remove("locked");

            giftStatus.textContent =
                "🎉 Surprise sudah bisa dibuka!";

            giftInstruction.textContent =
                "Klik kado untuk membukanya 💗";

        } else {

            giftBox.classList.add("locked");

            giftStatus.textContent =
                "🔒 Kado akan terbuka pada 22 Oktober";

            giftInstruction.textContent =
                "Tunggu sampai tanggal ulang tahun untuk membukanya 💗";
        }
    }


    updateGiftStatus();


    giftBox.addEventListener("click", function () {

        // Belum waktunya
        if (!isBirthdayUnlocked()) {

            giftBox.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-8px)" },
                    { transform: "translateX(8px)" },
                    { transform: "translateX(-8px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400
                }
            );

            giftStatus.textContent =
                "🔒 Sabar ya... buka pada 22 Oktober 💗";

            return;
        }


        // ======================================
        // KADO TERBUKA
        // ======================================

        giftBox.classList.add("opened");

        giftStatus.textContent =
            "🎉 Surprise terbuka! 🎉";

        giftInstruction.textContent =
            "Happy Sweet Seventeen, Rara! 💗";


        // Tampilkan birthday reveal
        setTimeout(function () {

            birthdayReveal.style.display = "block";

            birthdayReveal.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            createConfetti();

        }, 700);

    });


    // ==========================================
    // TOMBOL PESAN
    // ==========================================

    const messageButton =
        document.getElementById("messageButton");

    const messageSection =
        document.getElementById("messageSection");


    messageButton.addEventListener("click", function () {

        messageSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


    // ==========================================
    // CONFETTI
    // ==========================================

    function createConfetti() {

        const container =
            document.getElementById("confettiContainer");

        if (!container) return;

        for (let i = 0; i < 80; i++) {

            const confetti =
                document.createElement("div");

            confetti.className = "confetti";

            confetti.style.left =
                Math.random() * 100 + "vw";

            confetti.style.animationDelay =
                Math.random() * 2 + "s";

            confetti.style.background =
                [
                    "#ff4fa3",
                    "#ff9aca",
                    "#ffffff",
                    "#ffd166"
                ][Math.floor(Math.random() * 4)];

            container.appendChild(confetti);

            setTimeout(function () {
                confetti.remove();
            }, 6000);
        }
    }


    // ==========================================
    // MUSIK
    // ==========================================

    const music =
        document.getElementById("birthdayMusic");

    const musicButton =
        document.getElementById("musicButton");


    musicButton.addEventListener("click", function () {

        if (music.paused) {

            music.play();

            musicButton.textContent = "🔊";

        } else {

            music.pause();

            musicButton.textContent = "🔇";

        }

    });


    // ==========================================
    // FLOATING HEART
    // ==========================================

    function createHeart() {

        // Hanya setelah website terbuka
        if (passwordScreen.style.display !== "none") {
            return;
        }

        const heart =
            document.createElement("div");

        heart.textContent = "💗";

        heart.style.position = "fixed";
        heart.style.left =
            Math.random() * 100 + "vw";
        heart.style.bottom = "-30px";
        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "1";

        heart.animate(
            [
                {
                    transform: "translateY(0)",
                    opacity: 0
                },
                {
                    transform: "translateY(-50vh)",
                    opacity: 1
                },
                {
                    transform: "translateY(-110vh)",
                    opacity: 0
                }
            ],
            {
                duration: 5000,
                easing: "linear"
            }
        );

        document.body.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 1200);

});