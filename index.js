document.addEventListener("DOMContentLoaded", function () {
  const carsTemplate = document.querySelector(".carsTemplate");
  const allCars = document.querySelector(".allCars");
  const colorsTemplate = document.querySelector(".colorsTemplate");
  const color = document.querySelector(".colors");
  const makeTemplate = document.querySelector(".makeTemplate");
  const make = document.querySelector(".makes");
  const formTemplate = document.querySelector(".formTemplate");
  const form = document.querySelector(".form");
  const filterTemplate = document.querySelector(".filterTemplate");
  const filterData = document.querySelector(".filterData");

  function cars() {
    const template = Handlebars.compile(carsTemplate.innerHTML);
    axios.get("http://api-tutor.herokuapp.com/v1/cars").then((results) => {
      let data = results.data;
      allCars.innerHTML = template({
        cars: data,
      });
    });
  }
  function colors() {
    const template = Handlebars.compile(colorsTemplate.innerHTML);
    axios.get("http://api-tutor.herokuapp.com/v1/colors").then((results) => {
      let data = results.data;
      color.innerHTML = template({
        colors: data,
      });
    });
  }
  function makes() {
    const template = Handlebars.compile(makeTemplate.innerHTML);
    axios.get("https://api-tutor.herokuapp.com/v1/makes").then((results) => {
      let data = results.data;
      make.innerHTML = template({
        makes: data,
      });
    });
  }
  function loadFormContent() {
    let template = Handlebars.compile(formTemplate.innerHTML);
    let colors = [];
    let makes = [];
    axios.get("http://api-tutor.herokuapp.com/v1/cars").then((results) => {
      let data = results.data;
      data.forEach((item) => {
        if (makes.indexOf(item.make) < 0) {
          makes.push(item.make);
        }
        if (colors.indexOf(item.color) < 0) {
          colors.push(item.color);
        }
      });
      console.log(colors);
      console.log(makes);
      form.innerHTML = template({
        color: colors,
        make: makes,
      });
      filterCars();
    });
  }
  function filterCars() {
    const colorSelect = document.querySelector(".colorSelect");
    const makeSelect = document.querySelector(".makeSelect");
    const filterBtn = document.querySelector(".btn");
    let template = Handlebars.compile(filterTemplate.innerHTML);
    filterBtn.addEventListener("click", function () {
      if (
        colorSelect.value !== "Select color" &&
        colorSelect.value !== "" &&
        makeSelect.value === "Select make"
      ) {
        axios
          .get(
            `https://api-tutor.herokuapp.com/v1/cars/color/${colorSelect.value}`
          )
          .then((results) => {
            let data = results.data;
            filterData.innerHTML = template({
              cars: data,
            });
          });
      }
      if (
        makeSelect.value !== "Select make" &&
        makeSelect.value !== "" &&
        colorSelect.value === "Select color"
      ) {
        axios
          .get(
            `https://api-tutor.herokuapp.com/v1/cars/make/${makeSelect.value}`
          )
          .then((results) => {
            let data = results.data;
            filterData.innerHTML = "";
            filterData.innerHTML = template({
              cars: data,
            });
          });
      }
      ///v1/cars/make/:make/color/:car_color
      if (
        makeSelect.value !== "Select make" &&
        makeSelect.value !== "" &&
        colorSelect.value !== "Select color" &&
        colorSelect.value !== ""
      ) {
        axios
          .get(
            `https://api-tutor.herokuapp.com/v1/cars/make/${makeSelect.value}/color/${colorSelect.value}`
          )
          .then((results) => {
            let data = results.data;
            filterData.innerHTML = "";
            filterData.innerHTML = template({
              cars: data,
            });
          });
      }
    });
  }
  cars();
  colors();
  makes();
  loadFormContent();
  // filterCars();
});
