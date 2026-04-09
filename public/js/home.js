// 🛒 1. Ambil Data Produk dari API
async function loadProducts() {
    try {
        const res = await fetch("/api/catalog/all");
        const products = await res.json();
        const container = document.getElementById("product-list");

        if (products.length === 0) {
            container.innerHTML = "<p>Produk lagi habis, Bang!</p>";
            return;
        }

        container.innerHTML = products.map(p => `
            <div class="product-card">
                <div class="image-wrapper">
                    <img src="https://picsum.photos/seed/${p.id}/400/300" alt="${p.name}">
                </div>
                <div class="product-info">
                    <div class="card-top">
                        <span class="category-tag">Premium</span>
                        <span class="rating">⭐ 4.9</span>
                    </div>
                    <h3>${p.name}</h3>
                    <p>${p.description || "Resep rahasia keluarga Crafty Crusts."}</p>
                    <div class="card-bottom">
                        <span class="price">Rp ${Number(p.price).toLocaleString('id-ID')}</span>
                        <button class="add-to-cart" onclick="alert('Masuk keranjang!')">
                            <span class="material-symbols-outlined">shopping_cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join("");
    } catch (err) {
        console.error("Gagal muat produk:", err);
        document.getElementById("product-list").innerHTML = "<p>Waduh, database lagi pusing!</p>";
    }
}

// 🍕 2. Logic Slider Banner
let currentSlide = 0;
function initSlider() {
    const track = document.getElementById('hero-slider');
    const slides = document.querySelectorAll('.slide');
    if (!track || slides.length === 0) return;

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 5000);
}

// Jalankan semua fungsi pas halaman siap
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    initSlider();
});