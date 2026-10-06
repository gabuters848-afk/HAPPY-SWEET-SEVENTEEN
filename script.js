/* =====================================================
   KONFIGURASI
===================================================== */

const PASSWORD = "2504";

/*
   Untuk testing:
   1 menit setelah website dibuka
*/
const TEST_MINUTES = 1;


/* =====================================================
   ELEMENT
===================================================== */

const passwordScreen =
    document.getElementById("passwordScreen");

const website =
    document.getElementById("website");

const passwordInput =
    document.getElementById("passwordInput");

const passwordButton =
    document.getElementById("passwordButton");

const wrongPassword =
    document.getElementById("wrongPassword");

const giftBox =
    document.getElementById("giftBox");

const giftInstruction =
    document.getElementById("giftInstruction");

const typedMessage =
    document.getElementById("typedMessage");

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

const fallingEmojis =
    document.getElementById("fallingEmojis");

const confetti =
    document.getElementById("confetti");


/* =====================================================
   PESAN
===================================================== */

const birthdayMessage = `Happy Sweet Seventeen, Rara! 🎂💗

Selamat ulang tahun yang ke-17! Semoga di umur yang baru ini, semua hal baik datang ke kamu, impianmu satu per satu tercapai, dan selalu ada alasan untuk tersenyum.

Semoga hari-harimu ke depan dipenuhi kebahagiaan, orang-orang baik, dan banyak momen yang bisa kamu kenang. Jangan lupa untuk selalu menikmati setiap proses dan tetap jadi diri kamu sendiri.

Nikmati hari spesialmu, Rara! Semoga 17 menjadi awal dari banyak cerita indah yang baru. ✨

Happy 17th Birthday! 🥳💐`;


/* =====================================================
   TIMER
===================================================== */

let countdownDate =
    new Date(
        Date.now() +
        TEST_MINUTES * 60 * 1000
    );


function updateCountdown() {

    const now = new Date();

    const difference =
        countdownDate - now;


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        openGift();

        return;
    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (difference %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (difference %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


setInterval(updateCountdown, 1000);

updateCountdown();


/* =====================================================
   PASSWORD
===================================================== */

passwordButton.addEventListener(
    "click",
    checkPassword
);


passwordInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            checkPassword();
        }

    }
);


function checkPassword() {

    if (
        passwordInput.value.trim() ===
        PASSWORD
    ) {

        passwordScreen.classList.add("hidden");

        website.classList.remove("hidden");

        /*
           Timer dimulai ulang setelah password benar
        */
        countdownDate =
            new Date(
                Date.now() +
                TEST_MINUTES * 60 * 1000
            );

        startMusic();

        startFallingEmojis();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        wrongPassword.textContent =
            "Password salah 💔";

        passwordInput.value = "";

        passwordInput.focus();

    }
}


/* =====================================================
   BUKA KOTAK
===================================================== */

let giftOpened = false;


function openGift() {

    if (giftOpened) return;

    giftOpened = true;


    giftBox.classList.add("opened");


    giftInstruction.textContent =
        "Kejutannya terbuka! 💗✨";


    /*
       Ledakan emoji
    */
    createConfetti();


    /*
       Tunggu isi kotak muncul
       lalu mulai efek mengetik
    */
    setTimeout(
        startTyping,
        1700
    );


    /*
       Scroll sedikit supaya isi kotak
       terlihat setelah terbuka
    */
    setTimeout(
        function() {

            giftBox.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        },
        1200
    );
}


/* =====================================================
   EFEK MENGETIK
===================================================== */

let typingStarted = false;


function startTyping() {

    if (typingStarted) return;

    typingStarted = true;

    typedMessage.textContent = "";

    let index = 0;


    function typeCharacter() {

        if (
            index <
            birthdayMessage.length
        ) {

            typedMessage.textContent +=
                birthdayMessage.charAt(index);

            index++;

            /*
               Kecepatan mengetik
            */
            setTimeout(
                typeCharacter,
                32
            );

        }

    }


    typeCharacter();
}


/* =====================================================
   EMOJI BERJATUHAN
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
    "⭐"
];


let emojiInterval = null;


function startFallingEmojis() {

    /*
       Langsung buat beberapa emoji
    */
    for (
        let i = 0;
        i < 15;
        i++
    ) {

        setTimeout(
            createFallingEmoji,
            i * 250
        );

    }


    /*
       Setelah itu terus membuat emoji
    */
    if (!emojiInterval) {

        emojiInterval =
            setInterval(
                createFallingEmoji,
                500
            );

    }
}


function createFallingEmoji() {

    const emoji =
        document.createElement("div");

    emoji.className =
        "falling-emoji";


    emoji.textContent =
        emojiList[
            Math.floor(
                Math.random() *
                emojiList.length
            )
        ];


    /*
       Posisi horizontal random
    */
    emoji.style.left =
        Math.random() * 100 + "%";


    /*
       Ukuran random
    */
    const size =
        18 +
        Math.random() * 25;

    emoji.style.fontSize =
        size + "px";


    /*
       Kecepatan random
    */
    const duration =
        4 +
        Math.random() * 6;

    emoji.style.animationDuration =
        duration + "s";


    /*
       Delay sedikit random
    */
    emoji.style.animationDelay =
        Math.random() * 1 + "s";


    fallingEmojis.appendChild(
        emoji
    );


    /*
       Hapus setelah selesai
    */
    setTimeout(
        function() {

            emoji.remove();

        },
        (duration + 2) * 1000
    );
}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const pieces = [
        "💗",
        "💕",
        "✨",
        "🎀",
        "💖",
        "🌸"
    ];


    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti";


        piece.textContent =
            pieces[
                Math.floor(
                    Math.random() *
                    pieces.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.fontSize =
            15 +
            Math.random() * 20 +
            "px";


        piece.style.animationDuration =
            2 +
            Math.random() * 3 +
            "s";


        piece.style.animationDelay =
            Math.random() * .8 +
            "s";


        confetti.appendChild(
            piece
        );


        setTimeout(
            function() {
                piece.remove();
            },
            5000
        );
    }
}


/* =====================================================
   MUSIC
===================================================== */

async function startMusic() {

    try {

        await music.play();

        musicButton.textContent =
            "🔊 Musik ON";

    } catch (error) {

        /*
           Browser mungkin memblokir autoplay.
           Musik akan dimainkan setelah user
           melakukan klik.
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
                    "Musik tidak dapat diputar."
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
            website &&
            !website.classList.contains("hidden") &&
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

    },
    {
        once: true
    }
);
