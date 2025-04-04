// ========================= Nav ====================================

// Lấy phần tử navbar
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 150) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
// =======================================Phần main===========================================
// swiper xe nổi bật
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 10, // Giảm khoảng cách giữa các slide xuống 10px
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1024: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    350: { slidesPerView: 1 },
  },
});

document.querySelectorAll(".btn").forEach((btn, index) => {
  btn.addEventListener("click", function () {
    const card = btn.closest(".car-card");

    const title = card.querySelector("h3").textContent;
    const image = card.querySelector("img").src;
    const price = card.querySelector(".price").textContent;
    const hp = card.querySelectorAll("p")[1].textContent;
    const description = card.querySelectorAll("p")[2].textContent;

    // Gán dữ liệu vào modal
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalImage").src = image;
    document.getElementById("modalPrice").textContent = price;
    document.getElementById("modalHP").textContent = hp;
    document.getElementById("modalDescription").textContent = description;

    // Hiện modal
    document.getElementById("carModal").style.display = "block";
  });
});

// Đóng modal
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("carModal").style.display = "none";
});

// Đóng modal khi click ra ngoài
window.addEventListener("click", function (e) {
  const modal = document.getElementById("carModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
// ============================================== Phần bán xe của bạn ================================
// Lưu trữ danh sách xe tạm thời trong mảng
let cars = [];

document.getElementById("sellCarForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Lấy dữ liệu từ form
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const contact = document.getElementById("contact").value;
  const images = document.getElementById("images").files;

  // Tạo đối tượng xe
  const car = {
    brand,
    model,
    year,
    price,
    description,
    contact,
    images:
      images.length > 0
        ? Array.from(images).map((file) => URL.createObjectURL(file))
        : [],
  };
  cos;
  // Thêm xe vào mảng
  cars.push(car);

  // Hiển thị xe
  displayCars();

  // Reset form
  this.reset();
});

function displayCars() {
  const carsContainer = document.getElementById("cars");
  carsContainer.innerHTML = "";

  cars.forEach((car) => {
    const card = `
               <div class="col-12 col-md-6 col-lg-4 car-card">
                   <div class="card">
                       ${
                         car.images.length > 0
                           ? `<img src="${car.images[0]}" class="card-img-top" alt="${car.brand} ${car.model}" style="height: 200px; object-fit: cover;">`
                           : ""
                       }
                       <div class="card-body">
                           <h5 class="card-title">${car.brand} ${car.model} (${
      car.year
    })</h5>
                           <p class="card-text">Giá: ${car.price} VNĐ</p>
                           <p class="card-text">Liên hệ: ${car.contact}</p>
                           <p class="card-text">${car.description}</p>
                           <a href="#" class="btn btn-primary">Xem chi tiết</a>
                       </div>
                   </div>
               </div>
           `;
    carsContainer.innerHTML += card;
  });
}
