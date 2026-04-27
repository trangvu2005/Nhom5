document.addEventListener('DOMContentLoaded', function () {

    let price = 15000;
    let quantity = 1;
    let discount = 0;

    // ===== UPDATE TOTAL =====
    function updateTotal() {
        const total = (price * quantity) - discount;

        document.querySelector(".o-summary__table tbody").innerHTML = `
            <tr>
                <td>GIÁ VÉ</td>
                <td>${price * quantity} VND</td>
            </tr>
            <tr>
                <td>KHUYẾN MÃI</td>
                <td>${discount} VND</td>
            </tr>
            <tr>
                <td>TỔNG CỘNG</td>
                <td>${total} VND</td>
            </tr>
        `;
    }

    // ===== VOUCHER =====
    window.applyVoucherRadio = function (el) {
        if (el.value === "UEH20K") {
            discount = 20000;
        } else if (el.value === "UEH10P") {
            discount = price * quantity * 0.1;
        }
        updateTotal();
    };

    // ===== QUANTITY =====
    const plus = document.querySelector(".input-counter__plus");
    const minus = document.querySelector(".input-counter__minus");
    const input = document.querySelector(".input-counter__text");

    if (plus && minus && input) {
        plus.addEventListener("click", () => {
            quantity++;
            input.value = quantity;
            updateTotal();
        });

        minus.addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                input.value = quantity;
                updateTotal();
            }
        });
    }

    // ===== PAYMENT VALIDATION =====
    const paymentForm = document.querySelector(".checkout-f__payment");

    if (paymentForm) {
        paymentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const payment = document.querySelector('input[name="payment"]:checked');
            const terms = document.getElementById("term-and-condition").checked;

            if (!payment) {
                alert("Vui lòng chọn phương thức thanh toán!");
                return;
            }

            if (!terms) {
                alert("Bạn cần đồng ý điều khoản!");
                return;
            }

            alert("Thanh toán thành công 🎉");
        });
    }

});