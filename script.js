const getPrice = () =>
  fetch("https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      document.getElementById("avgPrice").innerText = parseFloat(
        data.price
      ).toFixed(2);
    });

const setHeadsAndTails = () => {
  var heads = localStorage.getItem("heads") ? localStorage.getItem("heads") : 0;
  var tails = localStorage.getItem("tails") ? localStorage.getItem("tails") : 0;

  document.getElementById("heads").innerText = heads;
  document.getElementById("tails").innerText = tails;
};

const reset = () => {
  localStorage.clear();

  showToast("Reset");
  setHeadsAndTails();
};

const flip = () => {
  document.getElementById("flip").disabled = true;
  let random = Math.random();

  const coin = document.getElementById("coin");
  coin.classList.add("coin");

  if (random <= 0.5) {
    let headsCount = parseInt(localStorage.getItem("heads"));
    // console.log("headsCount ", headsCount++);

    if (headsCount) {
      localStorage.setItem("heads", headsCount + 1);
    } else {
      localStorage.setItem("heads", 1);
    }

    showToast("heads");
  } else {
    let tailsCount = parseInt(localStorage.getItem("tails"));
    // console.log("tailsCount ", tailsCount++);

    if (tailsCount) {
      localStorage.setItem("tails", tailsCount + 1);
    } else {
      localStorage.setItem("tails", 1);
    }

    showToast("tails");
  }

  setInterval(() => {
    document.getElementById("flip").disabled = false;
    coin.classList.remove("coin");
  }, 1000);

  setHeadsAndTails();
};

const showToast = (msg) => {
  Toastify({
    text: msg.toUpperCase(),
    duration: 1500,
    gravity: "bottom",
    position: "center",
    style: {
      background: "linear-gradient(to right, #28313B, #485461)",
    },
  }).showToast();
};

getPrice();
setHeadsAndTails();

document.getElementById("flip").addEventListener("click", flip);
document.getElementById("reset").addEventListener("click", reset);

setInterval(() => {
  getPrice();
}, 1000);
