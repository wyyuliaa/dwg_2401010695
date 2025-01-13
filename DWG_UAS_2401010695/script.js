$(document).ready(function () {
    const apiBaseURL = "https://apimhstiki.ptov.my.id/";
    const nim = "2401010695"; 
  
    // Fungsi untuk memuat slideshow
    function loadSlides() {
      const slides = [
        { img: "https://via.placeholder.com/800x300", caption: "Selamat Datang di Toko Kami" },
        { img: "https://via.placeholder.com/800x300", caption: "Produk Berkualitas Terbaik" },
        { img: "https://via.placeholder.com/800x300", caption: "Belanja Aman dan Nyaman" }
      ];
  
      slides.forEach((slide, index) => {
        const isActive = index === 0 ? "active" : "";
        $("#carouselSlides").append(`
          <div class="carousel-item ${isActive}">
            <img src="${slide.img}" class="d-block w-100" alt="Slide ${index + 1}">
            <div class="carousel-caption d-none d-md-block">
              <h5>${slide.caption}</h5>
            </div>
          </div>
        `);
      });
    }
  
    // Fungsi untuk memuat produk
    function loadProducts() {
      $.ajax({
        url: `${apiBaseURL}products/${nim}`,
        method: "GET",
        success: function (response) {
          response.forEach((product) => {
            $("#productGrid").append(`
              <div class="col-md-4">
                <div class="card">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Harga:</strong> Rp ${product.price}</p>
                    <button class="btn btn-primary">Beli Sekarang</button>
                  </div>
                </div>
              </div>
            `);
          });
        },
        error: function () {
          $("#productGrid").html("<p>Gagal memuat produk. Coba lagi nanti.</p>");
        }
      });
    }
  
    // Fungsi untuk memuat testimoni
    function loadTestimonials() {
      $.ajax({
        url: `${apiBaseURL}testimonials/${nim}`,
        method: "GET",
        success: function (response) {
          response.forEach((testimonial) => {
            $("#testimonialSlider").append(`
              <div class="col-md-4">
                <div class="p-3">
                  <p>"${testimonial.comment}"</p>
                  <h5>- ${testimonial.name}</h5>
                </div>
              </div>
            `);
          });
        },
        error: function () {
          $("#testimonialSlider").html("<p>Gagal memuat testimoni. Coba lagi nanti.</p>");
        }
      });
    }
  
    // Panggil fungsi untuk memuat data
    loadSlides();
    loadProducts();
    loadTestimonials();
  });
  