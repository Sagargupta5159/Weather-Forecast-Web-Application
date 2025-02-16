const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);
function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}
function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}
function dateBuilder(d) {
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
var t1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#one",
        start: "center center",
        end: "80% center",
        pin: true,
        duration: 4,
        scrub: 3
    }
});
t1.to("#photu", {
    top: "50%",
    //  left:"90%",
    ease: Circ.easeOut,
    rotate: "720deg"
});
t1.to("#photus", {
    left: "60%",
    ease: Power0.easeOut,
});
t1.to("#photu", {
    left: "-70%",
    ease: Power0.easeOut,
}, "a");
t1.to("#photus", {
    left: "-80%",
    ease: Power0.easeOut,
}, "a");
document.querySelectorAll("#imgtxt h2").forEach(function (elem) {
    elem.addEventListener("mouseover", function (dets) {
        gsap.to("#img #img1", {
            x: dets.target.dataset.index * -100 + "%"
        });
    });
});
ScrollTrigger.create({
    onUpdate: function (dets) {
        gsap.to("#progress", {
            width: Math.floor(dets.progress * 100) + `%`
        });
    }
});
