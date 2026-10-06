// ==========================================
// BIRTHDAY WEBSITE RARA
// MODE TESTING: 1 MENIT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // WAKTU WEBSITE DIBUKA
    // 1 MENIT DARI SAAT HALAMAN DIBUKA
    // ==========================================

    const unlockDate = new Date(Date.now() + 1 * 60 * 1000);


    // ==========================================
    // ELEMENT WEBSITE
    // ==========================================

    const passwordScreen =
        document.getElementById("passwordScreen");

    const website =
        document.getElementById("website");


    // ==========================================
    // CEK WAKTU WEBSITE
    // ==========================================

    function isWebsiteUnlocked() {
        return new Date() >= unlockDate;
    }


    // ==========================================
    // BUAT HALAMAN COMING SOON
    // ==========================================

    function createComingSoon() {

        const comingSoon =
            document.createElement("div");

        comingSoon.id = "comingSoonScreen";

        comingSoon.innerHTML = `
            <div class="coming-soon-box">

                <div class="coming-lock">
                    🔒
                </div>

                <h1>COMING SOON</h1>

                <h2>
                    Rara's Sweet Seventeen 🎂
                </h2>

                <p>
                    Website spesial ini akan dibuka dalam
                </p>

                <div class="coming-date">
                    1 MENIT LAGI 💗
                </div>

                <div class="coming-countdown">

                    <div class="time-box">
                        <span id="lockDays">00</span>
                        <small>HARI</small>
                    </div>

                    <div class="time-box">
                        <span id="lockHours">00</span>
                        <small>JAM</small>
                    </div>

                    <div class="time-box">
                        <span id="lockMinutes">00</span>
                        <small>MENIT</small>
                    </div>

                    <div class="time-box">
                        <span id="lockSeconds">00</span>
                        <small>DETIK</small>
                    </div>

                </div>

                <p class="coming-wait">
                    Tunggu sampai waktunya tiba 💗✨
                </p>

            </div>
        `;

        document.body.appendChild(comingSoon);
    }


    // ==========================================
    // UPDATE COUNTDOWN LOCK
    // ==========================================

    function updateLockCountdown() {

        const comingSoon =
            document.getElementById("comingSoonScreen");

        if (!comingSoon) return;

        const now = new Date();

        const difference =
            unlockDate - now;


        // Sudah waktunya
        if (difference <= 0) {

            unlockWebsite();

            return;
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (difference /
                    (1000 * 60 * 60)) % 24
            );

        const minutes =
            Math.floor(
                (difference /
                    (1000 * 60)) % 60
            );

        const seconds =
            Math.floor(
                (difference / 1000) % 60
            );


        const daysElement =
            document.getElementById("lockDays");

        const hoursElement =
            document.getElementById("lockHours");

        const minutesElement =
            document.getElementById("lockMinutes");

        const secondsElement =
            document.getElementById("lockSeconds");


        if (daysElement) {
            daysElement.textContent =
                String(days).padStart(2, "0");
        }

        if (hoursElement) {
            hoursElement.textContent =
                String(hours).padStart(2, "0");
        }

        if (minutesElement) {
            minutesElement.textContent =
                String(minutes).padStart(2, "0");
        }

        if (secondsElement) {
            secondsElement.textContent =
                String(seconds).padStart(2, "0");
        }
    }


    // ==========================================
    // BUKA WEBSITE SETELAH 1 MENIT
    // ==========================================

    function unlockWebsite() {

        const comingSoon =
            document.getElementById("comingSoonScreen");

        if (comingSoon) {
            comingSoon.remove();
        }


        if (passwordScreen) {
            passwordScreen.style.display = "flex";
        }


        if (website) {
            website.style.display = "none";
        }


        updateCountdown();
        updateGiftStatus();
    }


    // ==========================================
    // KUNCI WEBSITE
    // ==========================================

    if (!isWebsiteUnlocked()) {

        // Sembunyikan website asli
        if (passwordScreen) {
            passwordScreen.style.display = "none";
        }

        if (website) {
            website.style.display = "none";
        }


        // Tampilkan Coming Soon
        createComingSoon();

        updateLockCountdown();

        setInterval(function () {

            updateLockCountdown();

        }, 1000);

    } else {

        unlockWebsite();

    }


    // ==========================================
    // PASSWORD
    // ==========================================

    const passwordInput =
        document.getElementById("passwordInput");

    const passwordButton =
        document.getElementById("passwordButton");

    const wrongPassword =
        document.getElementById("wrongPassword");


    function openWebsite() {

        if (!isWebsiteUnlocked()) {
            return;
        }

        if (passwordScreen) {
            passwordScreen.style.display = "none";
        }

        if (website) {
            website.style.display = "block";
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function checkPassword() {

        // Jangan izinkan password sebelum waktunya
        if (!isWebsiteUnlocked()) {
            return;
        }


        const password =
            passwordInput.value.trim();


        if (password === "2504") {

            openWebsite();

        } else {

            if (wrongPassword) {

                wrongPassword.style.display =
                    "block";
            }

            passwordInput.value = "";

            setTimeout(function () {

                if (wrongPassword) {

                    wrongPassword.style.display =
                        "none";
                }

            }, 2000);
        }
    }


    if (passwordButton) {

        passwordButton.addEventListener(
            "click",
            checkPassword
        );
    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    checkPassword();

                }

            }
        );
    }


    // ==========================================
    // COUNTDOWN WEBSITE
    // 1 MENIT DARI SAAT WEBSITE TERBUKA
    // ==========================================

    const birthdayDate =
        new Date(Date.now() + 1 * 60 * 1000);


    function getBirthdayDate() {

        return birthdayDate;

    }


    function updateCountdown() {

        const now = new Date();

        const birthday =
            getBirthdayDate();


        const difference =
            birthday - now;


        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if (!days) return;


        let d = 0;
        let h = 0;
        let m = 0;
        let s = 0;


        if (difference > 0) {

            d =
                Math.floor(
                    difference /
                    (1000 * 60 * 60 * 24)
                );

            h =
                Math.floor(
                    (difference /
                        (1000 * 60 * 60)) % 24
                );

            m =
                Math.floor(
                    (difference /
                        (1000 * 60)) % 60
                );

            s =
                Math.floor(
                    (difference / 1000) % 60
                );
        }


        days.textContent =
            String(d).padStart(2, "0");

        hours.textContent =
            String(h).padStart(2, "0");

        minutes.textContent =
            String(m).padStart(2, "0");

        seconds.textContent =
            String(s).padStart(2, "0");
    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    // ==========================================
    // CEK WAKTU KADO
    // 1 MENIT SETELAH WEBSITE TERBUKA
    // ==========================================

    function isBirthdayUnlocked() {

        return new Date() >= birthdayDate;

    }


    // ==========================================
    // GIFT / KADO
    // ==========================================

    const giftBox =
        document.getElementById("giftBox");

    const giftStatus =
        document.getElementById("giftStatus");

    const giftInstruction =
        document.getElementById(
            "giftInstruction"
        );

    const birthdayReveal =
        document.getElementById(
            "birthdayReveal"
        );


    function updateGiftStatus() {

        if (!giftBox) return;


        if (isBirthdayUnlocked()) {

            giftBox.classList.remove(
                "locked"
            );


            if (giftStatus) {

                giftStatus.textContent =
                    "🎉 Surprise sudah bisa dibuka!";

            }


            if (giftInstruction) {

                giftInstruction.textContent =
                    "Klik kado untuk membukanya 💗";

            }

        } else {

            giftBox.classList.add(
                "locked"
            );


            if (giftStatus) {

                giftStatus.textContent =
                    "🔒 Kado akan terbuka setelah countdown selesai";

            }


            if (giftInstruction) {

                giftInstruction.textContent =
                    "Tunggu sampai waktunya tiba untuk membukanya 💗";

            }
        }
    }


    updateGiftStatus();


    if (giftBox) {

        giftBox.addEventListener(
            "click",
            function () {


                // Belum waktunya
                if (!isBirthdayUnlocked()) {

                    giftBox.animate(
                        [
                            {
                                transform:
                                    "translateX(0)"
                            },

                            {
                                transform:
                                    "translateX(-8px)"
                            },

                            {
                                transform:
                                    "translateX(8px)"
                            },

                            {
                                transform:
                                    "translateX(-8px)"
                            },

                            {
                                transform:
                                    "translateX(0)"
                            }
                        ],
                        {
                            duration: 400
                        }
                    );


                    if (giftStatus) {

                        giftStatus.textContent =
                            "🔒 Sabar ya... tunggu countdown selesai 💗";

                    }

                    return;
                }


                // KADO TERBUKA
                giftBox.classList.add(
                    "opened"
                );


                if (giftStatus) {

                    giftStatus.textContent =
                        "🎉 Surprise terbuka! 🎉";

                }


                if (giftInstruction) {

                    giftInstruction.textContent =
                        "Happy Sweet Seventeen, Rara! 💗";

                }


                setTimeout(
                    function () {

                        if (birthdayReveal) {

                            birthdayReveal.style.display =
                                "block";


                            birthdayReveal.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }


                        createConfetti();

                    },
                    700
                );

            }
        );
    }


    // ==========================================
    // TOMBOL PESAN
    // ==========================================

    const messageButton =
        document.getElementById(
            "messageButton"
        );

    const messageSection =
        document.getElementById(
            "messageSection"
        );


    if (messageButton) {

        messageButton.addEventListener(
            "click",
            function () {

                if (messageSection) {

                    messageSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );
    }


    // ==========================================
    // CONFETTI
    // ==========================================

    function createConfetti() {

        const container =
            document.getElementById(
                "confettiContainer"
            );


        if (!container) return;


        for (let i = 0; i < 80; i++) {

            const confetti =
                document.createElement(
                    "div"
                );


            confetti.className =
                "confetti";


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
                ][
                    Math.floor(
                        Math.random() * 4
                    )
                ];


            container.appendChild(
                confetti
            );


            setTimeout(
                function () {

                    confetti.remove();

                },
                6000
            );
        }
    }


    // ==========================================
    // MUSIK
    // ==========================================

    const music =
        document.getElementById(
            "birthdayMusic"
        );

    const musicButton =
        document.getElementById(
            "musicButton"
        );


    if (musicButton && music) {

        musicButton.addEventListener(
            "click",
            function () {

                if (music.paused) {

                    music.play();

                    musicButton.textContent =
                        "🔊";

                } else {

                    music.pause();

                    musicButton.textContent =
                        "🔇";
                }

            }
        );
    }


    // ==========================================
    // FLOATING HEART
    // ==========================================

    function createHeart() {

        // Hanya setelah website terbuka
        if (
            !passwordScreen ||
            passwordScreen.style.display !== "none"
        ) {
            return;
        }


        if (
            !website ||
            website.style.display === "none"
        ) {
            return;
        }


        const heart =
            document.createElement(
                "div"
            );


        heart.textContent =
            "💗";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 + "vw";


        heart.style.bottom =
            "-30px";


        heart.style.fontSize =
            (12 + Math.random() * 18) +
            "px";


        heart.style.pointerEvents =
            "none";


        heart.style.zIndex =
            "1";


        heart.animate(
            [
                {
                    transform:
                        "translateY(0)",
                    opacity: 0
                },

                {
                    transform:
                        "translateY(-50vh)",
                    opacity: 1
                },

                {
                    transform:
                        "translateY(-110vh)",
                    opacity: 0
                }
            ],
            {
                duration: 5000,
                easing: "linear"
            }
        );


        document.body.appendChild(
            heart
        );


        setTimeout(
            function () {

                heart.remove();

            },
            5000
        );
    }


    setInterval(
        createHeart,
        1200
    );

});
