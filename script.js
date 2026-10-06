/* =====================================================
   PENGATURAN
===================================================== */

const PASSWORD = "2504";

/*
   Untuk testing sekarang:
   1 menit setelah password benar.

   Nanti kalau website sudah selesai,
   bagian ini bisa diganti dengan tanggal ulang tahun asli.
*/
const TEST_TIME = 60;


/* =====================================================
   ELEMENT
===================================================== */

const passwordPage =
    document.getElementById("password-page");

const mainPage =
    document.getElementById("main-page");

const passwordInput =
    document.getElementById("password");

const unlockButton =
    document.getElementById("unlock-button");

const passwordError =
    document.getElementById("password-error");

const surpriseBox =
    document.getElementById("surprise-box");

const countdownText =
    document.getElementById("countdown-text");

const typingText =
    document.getElementById("typing-text");

const fallingEmojis =
    document.getElementById("falling-emojis");

const confetti =
    document.getElementById("confetti");

const music =
    document.getElementById("birthday-music");

const musicButton =
    document.getElementById("music-button");


/* =====================================================
   PESAN UCAPAN
===================================================== */

const message = `Happy Sweet Seventeen, Rara! 🎂💗

Selamat ulang tahun yang ke-17! Semoga di umur yang baru ini, semua hal baik datang ke kamu, impianmu satu per satu tercapai, dan selalu ada alasan untuk tersenyum.

Semoga hari-harimu ke depan dipenuhi kebahagiaan, orang-orang baik, dan banyak momen yang bisa kamu kenang.

Jangan lupa untuk selalu menikmati setiap proses dan tetap jadi diri kamu sendiri.

Nikmati hari spesialmu, Rara! Semoga 17 menjadi awal dari banyak cerita indah yang baru. ✨

Happy 17th Birthday! 🥳💐`;


/* =====================================================
   PASSWORD
===================================================== */

unlockButton.addEventListener(
    "click",
    unlockWebsite
);


passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            unlockWebsite();
        }

    }
);


function unlockWebsite() {

    const enteredPassword =
        passwordInput.value.trim();


    if (enteredPassword !== PASSWORD) {

        passwordError.textContent =
            "Password salah 💔";

        passwordInput.value = "";

        passwordInput.focus();

        return;
    }


    /* buka website */

    passwordPage.classList.add("hidden");

    mainPage.classList.remove("hidden");


    /* mulai emoji */

    startFallingEmojis();


    /* mulai countdown */

    startCountdown();


    /* coba musik */

    playMusic();

}


/* =====================================================
   COUNTDOWN
===================================================== */

let endTime = null;

let countdownInterval = null;

let boxAlreadyOpened = false;


function startCountdown() {

    /*
       60 detik dari saat password benar
    */

    endTime =
        Date.now() +
        TEST_TIME * 1000;


    updateCountdown();


    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );
}


function updateCountdown() {

    const remaining =
        endTime - Date.now();


    if (remaining <= 0) {

        clearInterval(
            countdownInterval
        );


        document.getElementById("days")
            .textContent = "00";

        document.getElementById("hours")
            .textContent = "00";

        document.getElementById("minutes")
            .textContent = "00";

        document.getElementById("seconds")
            .textContent = "00";


        openSurprise();

        return;
    }


    const days =
        Math.floor(
            remaining /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                remaining %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                remaining %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                remaining %
                (1000 * 60)
            ) /
            1000
        );


    document.getElementById("days")
        .textContent =
        String(days)
            .padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours)
            .padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes)
            .padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds)
            .padStart(2, "0");
}


/* =====================================================
   BUKA KOTAK
===================================================== */

function openSurprise() {

    if (boxAlreadyOpened) {
        return;
    }

    boxAlreadyOpened = true;


    countdownText.textContent =
        "🎉 KEJUTANNYA TERBUKA! 🎉";


    /*
       buka tutup kotak
    */

    surpriseBox.classList.add("opened");


    /*
       ledakan confetti
    */

    createConfetti();


    /*
       mulai tulisan setelah
       isi kotak muncul
    */

    setTimeout(
        function() {

            typeMessage();

        },
        1800
    );


    /*
       scroll ke kotak
    */

    setTimeout(
        function() {

            surpriseBox.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        1000
    );
}


/* =====================================================
   EFEK MENGETIK
===================================================== */

let typingStarted = false;


function typeMessage() {

    if (typingStarted) {
        return;
    }


    typingStarted = true;

    typingText.textContent = "";


    let position = 0;


    function writeNext() {

        if (position >= message.length) {

            /*
               Setelah selesai mengetik,
               cursor tetap berkedip.
            */

            return;
        }


        typingText.textContent +=
            message[position];


        position++;


        /*
           Kecepatan mengetik.
           35ms = cukup terlihat seperti mengetik.
        */

        setTimeout(
            writeNext,
            35
        );
    }


    writeNext();
}


/* =====================================================
   EMOJI JATUH
===================================================== */

const emojiList = [

    "❤️",
    "💕",
    "💗",
    "💖",
    "💘",
    "💝",
    "✨",
    "🌸",
    "🎀",
    "🥳",
    "💐",
    "⭐",
    "🩷"

];


let emojiTimer = null;


function startFallingEmojis() {

    /*
       langsung buat beberapa
       supaya tidak kosong
    */

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        setTimeout(
            createEmoji,
            i * 150
        );
    }


    /*
       kemudian terus menerus
    */

    emojiTimer =
        setInterval(
            createEmoji,
            450
        );
}


function createEmoji() {

    const element =
        document.createElement("div");


    element.className =
        "falling-emoji";


    element.textContent =
        emojiList[
            Math.floor(
                Math.random() *
                emojiList.length
            )
        ];


    /*
       posisi horizontal
    */

    element.style.left =
        Math.random() * 100 + "%";


    /*
       ukuran
    */

    element.style.fontSize =
        (
            18 +
            Math.random() * 24
        ) + "px";


    /*
       durasi jatuh
    */

    const duration =
        4 +
        Math.random() * 5;


    element.style.animationDuration =
        duration + "s";


    /*
       sedikit variasi
    */

    element.style.animationDelay =
        (
            Math.random() * .8
        ) + "s";


    fallingEmojis.appendChild(
        element
    );


    /*
       hapus agar website
       tidak semakin berat
    */

    setTimeout(
        function() {

            element.remove();

        },
        (duration + 2) * 1000
    );
}


/* =====================================================
   CONFETTI SAAT KOTAK TERBUKA
===================================================== */

const confettiItems = [
    "💗",
    "💕",
    "💖",
    "✨",
    "🎀",
    "🌸",
    "⭐"
];


function createConfetti() {

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const element =
            document.createElement("div");


        element.className =
            "confetti-piece";


        element.textContent =
            confettiItems[
                Math.floor(
                    Math.random() *
                    confettiItems.length
                )
            ];


        element.style.left =
            Math.random() * 100 + "%";


        element.style.fontSize =
            (
                15 +
                Math.random() * 20
            ) + "px";


        const duration =
            2 +
            Math.random() * 3;


        element.style.animationDuration =
            duration + "s";


        element.style.animationDelay =
            Math.random() + "s";


        confetti.appendChild(
            element
        );


        setTimeout(
            function() {

                element.remove();

            },
            5500
        );
    }
}


/* =====================================================
   MUSIK
===================================================== */

async function playMusic() {

    try {

        await music.play();

        musicButton.textContent =
            "🔊 Musik ON";

    } catch (error) {

        /*
           Browser bisa memblokir autoplay.
           Tombol musik tetap bisa digunakan.
        */

        musicButton.textContent =
            "🎵 Putar Musik";
    }
}


musicButton.addEventListener(
    "click",
    async function() {

        if (music.paused) {

            try {

                await music.play();

                musicButton.textContent =
                    "🔊 Musik ON";

            } catch (error) {

                console.log(
                    "Musik belum dapat diputar."
                );
            }

        } else {

            music.pause();

            musicButton.textContent =
                "🔇 Musik OFF";
        }
    }
);


/* =====================================================
   FALLBACK AUTOPLAY
===================================================== */

document.addEventListener(
    "click",
    function() {

        if (
            !mainPage.classList.contains("hidden") &&
            music.paused
        ) {

            music.play()
                .then(
                    function() {

                        musicButton.textContent =
                            "🔊 Musik ON";

                    }
                )
                .catch(
                    function() {}
                );
        }

    }
);
