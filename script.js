// غيّر رقم الواتساب هنا إلى رقمك الدولي بدون + أو مسافات، مثال مصر: 2010XXXXXXX
const WHATSAPP_NUMBER = "201000000000";
const cart = [];
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", () => {
    cart.push({name: button.dataset.name, price: Number(button.dataset.price)});
    cartCount.textContent = cart.length;
    showToast(`تمت إضافة ${button.dataset.name} للسلة التجريبية`);
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const old = document.getElementById("cartSummary");
    if (old) old.remove();
    const summary = document.createElement("div");
    summary.id = "cartSummary";
    summary.className = "cart-summary";
    summary.style.cssText = "position:fixed;bottom:70px;left:22px;z-index:25;background:#111;border:1px solid #d9aa55;color:#f2d18b;padding:12px 16px;max-width:280px;box-shadow:0 5px 25px #0009;font-size:12px";
    summary.innerHTML = `<strong>سلتك (${cart.length})</strong><br>${cart.map(x => x.name).join("، ")}<br>الإجمالي التجريبي: ${total} جنيه<br><button id="checkoutBtn" style="margin-top:8px;background:#d9aa55;border:0;padding:7px 12px;cursor:pointer">اطلب عبر واتساب</button> <button id="clearCartBtn" style="margin-top:8px;background:transparent;color:#d9aa55;border:1px solid #705126;padding:6px 10px;cursor:pointer">إفراغ</button>`;
    document.body.appendChild(summary);
    document.getElementById("checkoutBtn").addEventListener("click", checkout);
    document.getElementById("clearCartBtn").addEventListener("click", () => {
      cart.length = 0; cartCount.textContent = "0"; summary.remove(); showToast("تم إفراغ السلة");
    });
  });
});

function checkout() {
  if (!cart.length) return showToast("السلة فارغة");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const message = `مرحبًا، أريد طلب المنتجات التالية من ملك العطور:\n${cart.map(x => `- ${x.name}: ${x.price} جنيه`).join("\n")}\nالإجمالي: ${total} جنيه\nمن فضلكم أكدوا التوفر والتوصيل.`;
  if (WHATSAPP_NUMBER === "201000000000") {
    showToast("قبل استقبال الطلبات، عدّل رقم واتساب في ملف script.js");
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const message = document.getElementById("customerMessage").value.trim();
  if (WHATSAPP_NUMBER === "201000000000") {
    showToast("عدّل رقم واتساب في ملف script.js قبل استقبال الرسائل");
    return;
  }
  const text = `مرحبًا، أنا ${name}\nرقم التواصل: ${phone}\nالرسالة: ${message || "أرغب في الاستفسار عن العطور"}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => document.getElementById("nav").classList.remove("open")));
