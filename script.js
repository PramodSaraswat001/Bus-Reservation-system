const buses = [
  { id: 1, name: "Express Travels", source: "Delhi", destination: "Jaipur", time: "10:00 AM" },
  { id: 2, name: "Rajdhani Bus", source: "Delhi", destination: "Jaipur", time: "1:00 PM" },
  { id: 3, name: "Super Deluxe", source: "Mumbai", destination: "Pune", time: "5:00 PM" },
];

let selectedBus = null;
let selectedSeats = [];

function searchBus() {
  const src = document.getElementById("source").value.trim().toLowerCase();
  const dest = document.getElementById("destination").value.trim().toLowerCase();
  const busListDiv = document.getElementById("bus-list");
  busListDiv.innerHTML = "";

  const matchedBuses = buses.filter(
    bus => bus.source.toLowerCase() === src && bus.destination.toLowerCase() === dest
  );

  if (matchedBuses.length === 0) {
    busListDiv.innerHTML = "<p>No buses found.</p>";
    return;
  }

  matchedBuses.forEach(bus => {
    const div = document.createElement("div");
    div.className = "bus-item";
    div.textContent = `${bus.name} - ${bus.time}`;
    div.onclick = () => showSeatSelection(bus);
    busListDiv.appendChild(div);
  });
}

function showSeatSelection(bus) {
  selectedBus = bus;
  selectedSeats = [];

  const seatSection = document.getElementById("seat-selection");
  const seatsDiv = document.getElementById("seats");
  seatsDiv.innerHTML = "";

  for (let i = 1; i <= 25; i++) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.textContent = i;
    seat.onclick = () => toggleSeat(seat, i);
    seatsDiv.appendChild(seat);
  }

  seatSection.classList.remove("hidden");
}

function toggleSeat(seatElement, seatNumber) {
  if (seatElement.classList.contains("booked")) return;

  seatElement.classList.toggle("selected");

  if (selectedSeats.includes(seatNumber)) {
    selectedSeats = selectedSeats.filter(num => num !== seatNumber);
  } else {
    selectedSeats.push(seatNumber);
  }
}

function confirmBooking() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  const seatsText = selectedSeats.join(", ");
  const info = `✅ Booking Confirmed!\nBus: ${selectedBus.name}\nSeats: ${seatsText}`;
  document.getElementById("booking-info").textContent = info;

  // Mark seats as booked
  const seatElements = document.querySelectorAll(".seat");
  seatElements.forEach((seat, idx) => {
    if (selectedSeats.includes(idx + 1)) {
      seat.classList.add("booked");
      seat.classList.remove("selected");
    }
  });

  selectedSeats = [];
}
