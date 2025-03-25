// ========================= Nav ====================================

// Lấy phần tử navbar
const navbar = document.querySelector(".navbar");

// Lắng nghe sự kiện cuộn
window.addEventListener("scroll", function () {
  if (window.scrollY > 250) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
// =======================================Phần main===========================================
// swiper
const swiper = new Swiper(".hot-cars-slider", {
  // Số slide hiển thị trên mỗi view
  slidesPerView: 1,
  spaceBetween: 20,
  // Tự động phát
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  // Nút điều hướng
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Thanh phân trang
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Responsive breakpoints
  breakpoints: {
    // Khi màn hình >= 576px (mobile lớn)
    576: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // Khi màn hình >= 768px (tablet)
    768: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // Khi màn hình >= 992px (desktop)
    992: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
  },
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
