// ==========================================
// BIRTHDAY WEBSITE RARA
// TESTING: TIMER 1 MENIT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENT
    // ==========================================

    const passwordScreen = document.getElementById("passwordScreen");
    const website = document.getElementById("website");

    const passwordInput = document.getElementById("passwordInput");
    const passwordButton = document.getElementById("passwordButton");
    const wrongPassword = document.getElementById("wrongPassword");

    const giftBox = document.getElementById("giftBox");
    const giftStatus = document.getElementById("giftStatus");
    const giftInstruction = document.getElementById("giftInstruction");

    const birthdayReveal = document.getElementById("birthdayReveal");
    const messageButton = document.getElementById("messageButton");
    const messageSection = document.getElementById("messageSection");

    const confettiContainer = document.getElementById("confettiContainer");

    const music = document.getElementById("birthdayMusic");
    const musicButton = document.getElementById("musicButton");

    // ==========================================
    // PENGATURAN
    // ==========================================

    const TEST_MINUTES = 1;
    const PASSWORD = "2504";

    // Timer pertama = 1 menit
    const websiteUnlockDate = new Date(
        Date.now() + TEST_MINUTES * 60 * 1000
    );

    // Timer kedua BELUM dimulai
    let birthdayDate = null;

    let lockTimer = null;
    let birthdayTimer = null;

    let giftOpened = false;
    let musicStarted = false;

    // ==========================================
    // FORMAT ANGKA
    // ==========================================

    function pad(number) {
        return String(Math.max(0, number)).padStart(2, "0");
    }

    // ==========================================
    // COUNTDOWN
    // ==========================================

    function setCountdown(targetDate, ids) {

        if (!targetDate) return false;

        const difference =
            targetDate.getTime() - Date.now();

        const daysEl =
            document.getElementById(ids.days);

        const hoursEl =
            document.getElementById(ids.hours);

        const minutesEl =
            document.getElementById(ids.minutes);

        const secondsEl =
            document.getElementById(ids.seconds);

        if (difference <= 0) {

            if (daysEl) daysEl.textContent = "00";
            if (hoursEl) hoursEl.textContent = "00";
            if (minutesEl) minutesEl.textContent = "00";
            if (secondsEl) secondsEl.textContent = "00";

            return true;
        }

        const totalSeconds =
            Math.floor(difference / 1000);

        const days =
            Math.floor(totalSeconds / 86400);

        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );

        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const seconds =
            totalSeconds % 60;

        if (daysEl)
            daysEl.textContent = pad(days);

        if (hoursEl)
            hoursEl.textContent = pad(hours);

        if (minutesEl)
            minutesEl.textContent = pad(minutes);

        if (secondsEl)
            secondsEl.textContent = pad(seconds);

        return false;
    }

    // ==========================================
    // COMING SOON
    // ==========================================

    function createComingSoon() {

        if (
            document.getElementById(
                "comingSoonScreen"
            )
        ) return;

        const comingSoon =
            document.createElement("div");

        comingSoon.id =
            "comingSoonScreen";

        comingSoon.innerHTML = `

            <div class="coming-soon-box">

                <div class="coming-lock">
                    🔒
                </div>

                <h1>
                    COMING SOON
                </h1>

                <h2>
                    Rara's Sweet Seventeen 🎂
                </h2>

                <p>
                    Website spesial ini akan
                    dibuka dalam
                </p>

                <div class="coming-date">
                    1 MENIT LAGI 💗
                </div>

                <div class="coming-countdown">

                    <div class="time-box">
                        <span id="lockDays">
                            00
                        </span>
                        <small>HARI</small>
                    </div>

                    <div class="time-box">
                        <span id="lockHours">
                            00
                        </span>
                        <small>JAM</small>
                    </div>

                    <div class="time-box">
                        <span id="lockMinutes">
                            00
                        </span>
                        <small>MENIT</small>
                    </div>

                    <div class="time-box">
                        <span id="lockSeconds">
                            00
                        </span>
                        <small>DETIK</small>
                    </div>

                </div>

                <p class="coming-wait">
                    Tunggu sampai waktunya tiba
                    💗✨
                </p>

            </div>
        `;

        document.body.appendChild(
            comingSoon
        );
    }

    // ==========================================
    // TIMER PERTAMA
    // ==========================================

    function updateLockCountdown() {

        const finished =
            setCountdown(
                websiteUnlockDate,
                {
                    days: "lockDays",
                    hours: "lockHours",
                    minutes: "lockMinutes",
                    seconds: "lockSeconds"
                }
            );

        if (finished) {

            clearInterval(lockTimer);

            unlockWebsite();
        }
    }

    // ==========================================
    // BUKA PASSWORD SCREEN
    // ==========================================

    function unlockWebsite() {

        const comingSoon =
            document.getElementById(
                "comingSoonScreen"
            );

        if (comingSoon) {
            comingSoon.remove();
        }

        if (passwordScreen) {

            passwordScreen.style.display =
                "flex";
        }

        if (website) {

            website.style.display =
                "none";
        }

        if (passwordInput) {

            setTimeout(() => {

                passwordInput.focus();

            }, 150);
        }
    }

    // ==========================================
    // MULAI TIMER PERTAMA
    // ==========================================

    if (
        Date.now() <
        websiteUnlockDate.getTime()
    ) {

        if (passwordScreen)
            passwordScreen.style.display =
                "none";

        if (website)
            website.style.display =
                "none";

        createComingSoon();

        updateLockCountdown();

        lockTimer =
            setInterval(
                updateLockCountdown,
                1000
            );

    } else {

        unlockWebsite();
    }

    // ==========================================
    // PASSWORD
    // ==========================================

    function checkPassword() {

        if (
            Date.now() <
            websiteUnlockDate.getTime()
        ) {
            return;
        }

        const password =
            passwordInput
                ? passwordInput.value.trim()
                : "";

        if (password === PASSWORD) {

            openWebsite();

        } else {

            if (wrongPassword) {

                wrongPassword.style.display =
                    "block";
            }

            if (passwordInput) {

                passwordInput.value = "";

                passwordInput.focus();
            }

            setTimeout(() => {

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
            (event) => {

                if (event.key === "Enter") {

                    checkPassword();
                }

            }
        );
    }

    // ==========================================
    // BUKA WEBSITE
    // TIMER KEDUA DIMULAI DI SINI
    // ==========================================

    function openWebsite() {

        if (
            Date.now() <
            websiteUnlockDate.getTime()
        ) {
            return;
        }

        if (passwordScreen) {

            passwordScreen.style.display =
                "none";
        }

        if (website) {

            website.style.display =
                "block";
        }

        // ======================================
        // TIMER KEDUA = 1 MENIT
        // ======================================

        birthdayDate =
            new Date(
                Date.now() +
                TEST_MINUTES * 60 * 1000
            );

        giftOpened = false;

        resetGift();

        updateBirthdayCountdown();

        updateGiftStatus();

        clearInterval(
            birthdayTimer
        );

        birthdayTimer =
            setInterval(
                updateBirthdayCountdown,
                1000
            );

        // Emoji mulai berjatuhan
        startFallingEmojis();

        // Coba mulai musik
        tryStartMusic();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // ==========================================
    // TIMER KEDUA
    // ==========================================

    function updateBirthdayCountdown() {

        if (!birthdayDate) return;

        const finished =
            setCountdown(
                birthdayDate,
                {
                    days: "days",
                    hours: "hours",
                    minutes: "minutes",
                    seconds: "seconds"
                }
            );

        if (finished) {

            clearInterval(
                birthdayTimer
            );

            birthdayTimer = null;

            // KADO OTOMATIS TERBUKA
            openGiftAutomatically();
        }
    }

    // ==========================================
    // STATUS KADO
    // ==========================================

    function updateGiftStatus() {

        if (
            !giftBox ||
            !birthdayDate
        ) return;

        if (
            Date.now() >=
            birthdayDate.getTime()
        ) {

            giftBox.classList.remove(
                "locked"
            );

            if (giftStatus) {

                giftStatus.textContent =
                    "🎉 Surprise sedang dibuka!";
            }

            if (giftInstruction) {

                giftInstruction.textContent =
                    "Tunggu... ada kejutan untuk Rara 💗";
            }

        } else {

            giftBox.classList.add(
                "locked"
            );

            if (giftStatus) {

                giftStatus.textContent =
                    "🔒 Tunggu countdown sampai selesai";
            }

            if (giftInstruction) {

                giftInstruction.textContent =
                    "Setelah waktunya habis, kado akan terbuka sendiri 💗";
            }
        }
    }

    // ==========================================
    // RESET KADO
    // ==========================================

    function resetGift() {

        if (!giftBox) return;

        giftBox.classList.remove(
            "opened"
        );

        giftBox.classList.add(
            "locked"
        );

        if (birthdayReveal) {

            birthdayReveal.classList.remove(
                "show"
            );

            birthdayReveal.style.display =
                "none";
        }

        if (messageSection) {

            messageSection.classList.remove(
                "show"
            );

            messageSection.style.display =
                "none";
        }
    }

    // ==========================================
    // KADO OTOMATIS TERBUKA
    // ==========================================

    function openGiftAutomatically() {

        if (
            giftOpened ||
            !giftBox
        ) return;

        giftOpened = true;

        giftBox.classList.remove(
            "locked"
        );

        if (giftStatus) {

            giftStatus.textContent =
                "🎉 SURPRISE TERBUKA! 🎉";
        }

        if (giftInstruction) {

            giftInstruction.textContent =
                "Happy Sweet Seventeen, Rara! 💗✨";
        }

        // Efek kado membesar
        giftBox.animate(
            [
                {
                    transform:
                        "scale(1)"
                },
                {
                    transform:
                        "scale(1.15)"
                },
                {
                    transform:
                        "scale(1)"
                }
            ],
            {
                duration: 600,
                easing: "ease-out"
            }
        );

        // Tunggu sedikit lalu buka tutup
        setTimeout(() => {

            giftBox.classList.add(
                "opened"
            );

            // Confetti
            createConfetti(100);

            // Emoji besar-besaran
            createEmojiBurst(40);

            // Tampilkan birthday
            setTimeout(() => {

                showBirthdayReveal();

            }, 1200);

        }, 500);
    }

    // ==========================================
    // KADO JIKA DIKLIK
    // ==========================================

    if (giftBox) {

        giftBox.addEventListener(
            "click",
            () => {

                if (!birthdayDate)
                    return;

                if (
                    Date.now() >=
                    birthdayDate.getTime()
                ) {

                    openGiftAutomatically();

                } else {

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
                            "🔒 Sabar ya... countdown belum selesai 💗";
                    }
                }

            }
        );
    }

    // ==========================================
    // BIRTHDAY REVEAL
    // ==========================================

    function showBirthdayReveal() {

        if (!birthdayReveal)
            return;

        birthdayReveal.style.display =
            "block";

        birthdayReveal.classList.add(
            "show"
        );

        birthdayReveal.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        // Pesan muncul perlahan
        setTimeout(() => {

            showMessage();

        }, 2200);
    }

    // ==========================================
    // PESAN
    // ==========================================

    function showMessage() {

        if (!messageSection)
            return;

        messageSection.style.display =
            "block";

        requestAnimationFrame(() => {

            messageSection.classList.add(
                "show"
            );
        });

        setTimeout(() => {

            messageSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 400);
    }

    if (messageButton) {

        messageButton.addEventListener(
            "click",
            showMessage
        );
    }

    // ==========================================
    // CONFETTI
    // ==========================================

    function createConfetti(
        amount = 80
    ) {

        if (!confettiContainer)
            return;

        const symbols = [
            "💗",
            "✨",
            "💕",
            "🎀",
            "🌸",
            "⭐"
        ];

        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const confetti =
                document.createElement(
                    "div"
                );

            confetti.className =
                "confetti";

            confetti.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

            confetti.style.left =
                Math.random() *
                100 +
                "vw";

            confetti.style.fontSize =
                10 +
                Math.random() * 14 +
                "px";

            confetti.style.animationDelay =
                Math.random() *
                1.5 +
                "s";

            confettiContainer.appendChild(
                confetti
            );

            setTimeout(() => {

                confetti.remove();

            }, 5500);
        }
    }

    // ==========================================
    // EMOJI JATUH
    // ==========================================

    const fallingEmojis = [
        "💗",
        "💕",
        "💖",
        "💓",
        "✨",
        "🎀",
        "🌸",
        "⭐",
        "🥳",
        "🎂"
    ];

    let emojiInterval = null;

    function createFallingEmoji() {

        if (
            !website ||
            website.style.display === "none"
        ) return;

        const emoji =
            document.createElement(
                "div"
            );

        emoji.className =
            "falling-emoji";

        emoji.textContent =
            fallingEmojis[
                Math.floor(
                    Math.random() *
                    fallingEmojis.length
                )
            ];

        emoji.style.left =
            Math.random() *
            100 +
            "vw";

        emoji.style.fontSize =
            14 +
            Math.random() * 22 +
            "px";

        const duration =
            5 +
            Math.random() * 4;

        emoji.style.animationDuration =
            duration + "s";

        emoji.style.animationDelay =
            Math.random() * .5 +
            "s";

        document.body.appendChild(
            emoji
        );

        setTimeout(() => {

            emoji.remove();

        }, (duration + 1) * 1000);
    }

    function startFallingEmojis() {

        if (emojiInterval)
            return;

        // Emoji langsung muncul
        for (
            let i = 0;
            i < 8;
            i++
        ) {

            setTimeout(
                createFallingEmoji,
                i * 180
            );
        }

        // Emoji terus jatuh
        emojiInterval =
            setInterval(
                createFallingEmoji,
                700
            );
    }

    function createEmojiBurst(
        amount = 30
    ) {

        for (
            let i = 0;
            i < amount;
            i++
        ) {

            setTimeout(
                createFallingEmoji,
                i * 80
            );
        }
    }

    // ==========================================
    // MUSIK
    // ==========================================

    function updateMusicButton() {

        if (!musicButton)
            return;

        if (
            music &&
            !music.paused
        ) {

            musicButton.textContent =
                "🔊";

            musicButton.classList.add(
                "playing"
            );

        } else {

            musicButton.textContent =
                "🎵";

            musicButton.classList.remove(
                "playing"
            );
        }
    }

    async function tryStartMusic() {

        if (
            !music ||
            musicStarted
        ) return;

        try {

            await music.play();

            musicStarted = true;

            updateMusicButton();

        } catch (error) {

            // Browser bisa memblokir autoplay
            updateMusicButton();
        }
    }

    if (
        musicButton &&
        music
    ) {

        musicButton.addEventListener(
            "click",
            async () => {

                try {

                    if (music.paused) {

                        await music.play();

                    } else {

                        music.pause();
                    }

                    musicStarted =
                        !music.paused;

                    updateMusicButton();

                } catch (error) {

                    updateMusicButton();
                }
            }
        );

        music.addEventListener(
            "play",
            updateMusicButton
        );

        music.addEventListener(
            "pause",
            updateMusicButton
        );

        music.addEventListener(
            "ended",
            updateMusicButton
        );
    }

    // ==========================================
    // FALLBACK AUTOPLAY
    // ==========================================

    function firstInteractionMusic() {

        if (
            !music ||
            musicStarted
        ) return;

        tryStartMusic();
    }

    document.addEventListener(
        "click",
        firstInteractionMusic,
        { once: true }
    );

    document.addEventListener(
        "touchstart",
        firstInteractionMusic,
        { once: true }
    );

    // ==========================================
    // INITIAL
    // ==========================================

    if (birthdayReveal) {

        birthdayReveal.style.display =
            "none";
    }

    if (messageSection) {

        messageSection.style.display =
            "none";
    }

});
