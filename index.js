const seats = document.querySelectorAll('#seats button');
const seatCount = document.getElementById('seat-count');
const bookedSeat = document.getElementById('booked-seats');
const totalPrice = document.getElementById('total-price');
const grandTotalPrice = document.getElementById('grand-total-price');
const couponField = document.getElementById('coupon-field');
const coupon = document.getElementById('coupon');
const applyBtn = document.getElementById('apply-btn');
const seatLeft = document.getElementById('seat-left');
const name = document.getElementById('name');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const nextBtn = document.getElementById('next-btn');
const errorText = document.getElementById('error-text');
const modal = document.getElementById('my-modal');
const form = document.getElementById('form');

let selectedSeats = [];

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        const seatNumber = seat.textContent;
        if (selectedSeats.includes(seatNumber)) {
            // Deselect the seat
            seat.style.backgroundColor = ''; // Remove background color
            selectedSeats = selectedSeats.filter(s => s !== seatNumber); // Remove from selectedSeats array
        } else {
            // Select the seat
            selectedSeats.push(seatNumber);
            seat.style.backgroundColor = '#1dd100';
        }

        if (selectedSeats.length === 4) {
            couponField.classList.remove('hidden');
            couponField.classList.add('flex');
            // Disable unselected seat buttons
            seats.forEach(s => {
                if (!selectedSeats.includes(s.textContent)) {
                    s.disabled = true;
                }
            });
        } else {
            seats.forEach(s => {
                s.disabled = false;
            });
        }

        seatCount.innerText = selectedSeats.length;
        seatCount.style.backgroundColor = '#1dd100';
        seatCount.style.padding = '3px';
        seatCount.style.borderRadius = '10px';
        seatCount.style.color = 'white';
        
        const seatInfo = `
        <tr class="bg-transparent">
            <td>${seat.textContent}</td>
            <td>Economy Class</td>
            <td>550</td>
        </tr>
    `;
        bookedSeat.innerHTML += seatInfo;

        const totalSeatLeft = parseInt(seatLeft.innerText) - 1;
        seatLeft.innerText = totalSeatLeft;

        const totalPriceValue = selectedSeats.length * 550;
        totalPrice.innerText = totalPriceValue;
        grandTotalPrice.innerText = totalPriceValue;
    });
});


applyBtn.addEventListener('click', () => {

    const couponValue = coupon.value;
    
    if (couponValue === '') {
        return;
    } else if (couponValue === 'NEW15') {
        grandTotalPrice.innerText = parseInt(totalPrice.innerText) - (parseInt(totalPrice.innerText) * 0.15);        
    } else if (couponValue === 'Couple20') {
        grandTotalPrice.innerText = parseInt(totalPrice.innerText) - (parseInt(totalPrice.innerText) * 0.2);        
    }
})

nextBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if (name.value === '' || email.value === '' || mobile.value === '') {
        errorText.classList.remove('hidden');
        // errorText.classList.add('hidden');
        return;
    } else {
        form.reset();
        modal.showModal();
    }
})

