// checkout.js

document.addEventListener("DOMContentLoaded", function () {

    const cart = getCart();
    let total = getTotal();
    let discount = 0;

    function updateTotal() {
        const final = Math.max(0, total - discount);

        document.getElementById("total-price").innerText = final + " VND";
    }

    // voucher
    window.applyVoucherRadio = function(el) {
        if (el.value === "UEH20K") {
            discount = 20000;
        } else if (el.value === "UEH10P") {
            discount = total * 0.1;
        }

        updateTotal();
    };

    // tạo mã đơn
    function generateOrderId() {
        return "ORD-" + Date.now();
    }

    // submit
    document.querySelector(".checkout-f__payment")
        .addEventListener("submit", function(e) {

        e.preventDefault();

        const payment = document.querySelector('input[name="payment"]:checked');
        const terms = document.getElementById("term-and-condition").checked;

        if (!payment) {
            alert("Chọn phương thức thanh toán!");
            return;
        }

        if (!terms) {
            alert("Đồng ý điều khoản!");
            return;
        }

        const order = {
            orderId: generateOrderId(),
            total: Math.max(0, total - discount),
            cart: cart
        };

        console.log(order);

        alert("Đặt vé thành công 🎉\nMã đơn: " + order.orderId);

        localStorage.removeItem("cart");
    });

    updateTotal();
});