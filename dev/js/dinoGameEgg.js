let Bt = document.getElementById("Bt");
Bt.addEventListener('click', function (e) {
    document.getElementById("Bt").classList.add("remove");
    document.getElementById("Egg").classList.add("egg-animation");

    document.getElementById("egg-1").classList.add("click");
    document.getElementById("egg-1").classList.add("egg-1-move");

    document.getElementById("egg-2").classList.add("click");
    document.getElementById("egg-2").classList.add("egg-2-move");

    document.getElementById("egg-3").classList.add("click");
    document.getElementById("egg-3").classList.add("egg-3-move");
  })