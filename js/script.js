$(document).ready(function () {
    /* меню ***********************************/

    $(".mob_btn").click(function () {
        $(this).toggleClass("active");
        $(".menu").toggleClass("active");
    });

    $(".menu_mob_close").click(function () {
        $(".menu_wrap").toggleClass("active");
    });

    $('.banner_slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                }
            },
        ]
    });

    $(window).scroll(function() {

        var header = $('.header').offset().top;
        if(header > 100){
            $('header').addClass('fixed');
        } else{
            $('header').removeClass('fixed');
        }

    });

    $(".banner_wrapper").each(function () {
        // Select the elements
        const video = document.getElementById("video");
        const videoThumbnail = document.getElementById("video-thumbnail");
        const playpause = document.getElementById("play-pause");
        const volume = document.getElementById("volume");
        const mutebtn = document.getElementById("mute");
        const videoContainer = document.querySelector(".video_container");
        const controls = document.querySelector(".controls");
        const progressBar = document.querySelector(".progress-bar");
        const playbackline = document.querySelector(".playback-line");
        const currentTimeRef = document.getElementById("current-time");
        const maxDuration = document.getElementById("max-duration");

        const timeFormatter = (timeInput) => {
            let minute = Math.floor(timeInput / 60);
            minute = minute < 10 ? "0" + minute : minute;
            let second = Math.floor(timeInput % 60);
            second = second < 10 ? "0" + second : second;
            return `${minute}:${second}`;
        };

        // Play-Pause
        playpause.addEventListener("click", function () {
            if (video.paused) {
                videoThumbnail.style.display = "none";
                video.play();
                playpause.innerHTML = '<span class="play"></span>';
            } else {
                video.pause();
                playpause.innerHTML = '<span class="pause"></span>';
            }
        });

        let isPlaying = false;

        // Function to toggle play/pause
        function togglePlayPause() {
            if (isPlaying) {
                video.pause();
                playpause.innerHTML = '<span class="play"></span>';
            } else {
                videoThumbnail.style.display = "none";
                video.play();
                playpause.innerHTML = '<span class="pause"></span>';
            }
            isPlaying = !isPlaying;
        }

        document.addEventListener("keydown", function (event) {
            if (event.key === 32 || event.key === " ") {
                event.preventDefault();

                // Prevent scrolling the page down
                togglePlayPause();
            }
        });

        // Event listener for the video to
        // update the isPlaying flag
        video.addEventListener("play", function () {
            isPlaying = true;
        });

        video.addEventListener("pause", function () {
            isPlaying = false;
        });

        video.addEventListener("ended", function () {
            playpause.innerHTML = '<span class="play"></span>';
        });

        // Mute or Unmute
        mutebtn.addEventListener("click", function () {
            if (video.muted) {
                video.muted = false;
                mutebtn.innerHTML = '<span class="volume_on"></span>';
                volume.value = video.volume;
            } else {
                video.muted = true;
                mutebtn.innerHTML = '<span class="volume_off"></span>';
                volume.value = 0;
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "M" || event.key === "m") {
                event.preventDefault();
                if (video.muted) {
                    video.muted = false;
                    mutebtn.innerHTML = '<span class="volume_off"></span>';
                    volume.value = video.volume;
                } else {
                    video.muted = true;
                    mutebtn.innerHTML = '<span class="volume_on"></span>';
                    volume.value = 0;
                }
            }
        });

        volume.addEventListener("input", function () {
            video.volume = volume.value;
            if (video.volume === 0) {
                mutebtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            } else {
                mutebtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        });

        // Hide or unhide controllers div
        videoContainer.addEventListener("mouseenter", () => {
            controls.style.opacity = 1;
        });

        videoContainer.addEventListener("mouseleave", () => {
            controls.style.opacity = 0;
        });

        // Update the playback line as the video plays
        video.addEventListener("timeupdate", () => {
            const currentTime = video.currentTime;
            const duration = video.duration;
            const percentage = (currentTime / duration) * 100;
            progressBar.style.width = percentage + "%";
        });

        function showThumbnail() {
            videoThumbnail.style.display = "block";
        }

        // Reseting the playback line when the video ends
        video.addEventListener("ended", () => {
            progressBar.style.width = "0%";
            showThumbnail();
        });

        setInterval(() => {
            currentTimeRef.innerHTML = timeFormatter(video.currentTime);
            maxDuration.innerText = timeFormatter(video.duration);
        }, 1);

        playbackline.addEventListener("click", (e) => {
            let timelineWidth = playbackline.clientWidth;
            video.currentTime = (e.offsetX / timelineWidth) * video.duration;
        });
    });
})

$(".about_wrapper").each(function (i, e) {
    $('.about_block', e).click(function(evet) {
        $('.about_block').removeClass('active');
        $(this).addClass('active');
    });
});


if ($(window).width() < 1280) {
    $('.clients_wrapper').slick({
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 761,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
}

if ($(window).width() < 991) {
    $('.advantages_wrapper').slick({
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 761,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
}


$(".history_content").each(function () {
    $('.history_wrap').hover(function(evet) {
        $(this).toggleClass('show');
    });
});