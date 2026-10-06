const PASSWORD = "2504";

// Tanggal dan waktu website mulai bisa dibuka
// 22 Oktober 2026, pukul 00:00 WITA
const TARGET_DATE = new Date("2026-10-22T00:00:00+08:00");

const passwordPage = document.getElementById("password-page");
const mainPage = document.getElementById("main-page");
const passwordInput = document.getElementById("password");
const unlockButton = document.getElementById("unlock-button");
const passwordError = document.getElementById("password-error");

const surpriseBox = document.getElementById("surprise-box");
const countdownText = document.getElementById("countdown-text");

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const typingText = document.getElementById("typing-text");

const music = document.getElementById("birthday-music");
const musicButton = document.getElementById("music-button");

const fallingEmojis = document.getElementById("falling-emojis");
const confetti = document.getElementById("confetti");


/* =========================
   PASSWORD
========================= */

unlockButton.addEventListener("click", function () {

    const password = passwordInput.value.trim();

    if (password === PASSWORD) {

        passwordError.textContent = "";

        passwordPage.style.display = "none";
        mainPage.classList.remove("hidden");

        startFallingEmojis();
        startCountdown();

        try {
            music.play();
            musicButton.textContent = "🔊 Musik ON";
        } catch (e) {
            console.log("Autoplay diblokir browser.");
        }

    } else {

        passwordError.textContent = "❌ Password salah!";

        passwordInput.value = "";
        passwordInput.focus();
    }
});


passwordInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        unlockButton.click();
    }

});


/* =========================
   COUNTDOWN MENUJU 22 OKTOBER
========================= */

let countdownTimer;

function startCountdown() {

    function calculateCountdown() {

        const now = new Date();

        const difference =
            TARGET_DATE.getTime() - now.getTime();


        // Kalau sudah tanggal 22 Oktober
        if (difference <= 0) {

            clearInterval(countdownTimer);

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            countdownText.textContent =
                "🎉 KEJUTANNYA SUDAH BISA DIBUKA! 🎉";

            return;
        }


        // Hitung sisa waktu
        const totalSeconds =
            Math.floor(difference / 1000);


        const d =
            Math.floor(totalSeconds / 86400);

        const h =
            Math.floor((totalSeconds % 86400) / 3600);

        const m =
            Math.floor((totalSeconds % 3600) / 60);

        const s =
            totalSeconds % 60;


        // Tampilkan countdown
        days.textContent =
            String(d).padStart(2, "0");

        hours.textContent =
            String(h).padStart(2, "0");

        minutes.textContent =
            String(m).padStart(2, "0");

        seconds.textContent =
            String(s).padStart(2, "0");
    }


    // Jalankan langsung
    calculateCountdown();


    // Update setiap 1 detik
    countdownTimer =
        setInterval(calculateCountdown, 1000);
}


/* =========================
   BUKA KOTAK
========================= */

function openSurprise() {

    countdownText.textContent =
        "🎉 KEJUTANNYA TERBUKA! 🎉";

    surpriseBox.classList.add("opened");

    createConfetti();

    setTimeout(function () {
        typeMessage();
    }, 1500);
}


/* =========================
   UCAPAN
========================= */

const message = `Happy Sweet Seventeen, Rara! 🎂💗

Selamat ulang tahun yang ke-17! Semoga di umur yang baru ini, semua hal baik datang ke kamu, impianmu satu per satu tercapai, dan selalu ada alasan untuk tersenyum.

Semoga hari-harimu ke depan dipenuhi kebahagiaan, orang-orang baik, dan banyak momen yang bisa kamu kenang.

Jangan lupa untuk selalu menikmati setiap proses dan tetap jadi diri kamu sendiri.

Nikmati hari spesialmu, Rara! Semoga 17 menjadi awal dari banyak cerita indah yang baru. ✨

Happy 17th Birthday! 🥳💐`;

let typingIndex = 0;

function typeMessage() {

    if (typingIndex < message.length) {

        typingText.textContent +=
            message.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeMessage, 35);
    }
}


/* =========================
   EMOJI JATUH
========================= */

const emojis = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "✨",
    "🎀",
    "🌸",
    "💐",
    "⭐",
    "🥳"
];

function startFallingEmojis() {

    setInterval(function () {

        const emoji =
            document.createElement("div");

        emoji.className = "falling-emoji";

        emoji.textContent =
            emojis[
                Math.floor(
                    Math.random() * emojis.length
                )
            ];

        emoji.style.left =
            Math.random() * 100 + "%";

        emoji.style.fontSize =
            (18 + Math.random() * 20) + "px";

        emoji.style.animationDuration =
            (4 + Math.random() * 4) + "s";

        fallingEmojis.appendChild(emoji);

        setTimeout(function () {
            emoji.remove();
        }, 9000);

    }, 500);
}


/* =========================
   CONFETTI
========================= */

function createConfetti() {

    for (let i = 0; i < 60; i++) {

        const item =
            document.createElement("div");

        item.className =
            "confetti-piece";

        item.textContent =
            emojis[
                Math.floor(
                    Math.random() * emojis.length
                )
            ];

        item.style.left =
            Math.random() * 100 + "%";

        item.style.fontSize =
            (15 + Math.random() * 20) + "px";

        item.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        confetti.appendChild(item);

        setTimeout(function () {
            item.remove();
        }, 6000);
    }
}


/* =========================
   MUSIK
========================= */

musicButton.addEventListener("click", function () {

    if (music.paused) {

        music.play();

        musicButton.textContent =
            "🔊 Musik ON";

    } else {

        music.pause();

        musicButton.textContent =
            "🔇 Musik OFF";
    }
});
