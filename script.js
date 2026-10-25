// Request Native Browser Notification Permission
if ("Notification" in window) {
  Notification.requestPermission();
}

// 5 Static Motivational Quotes
const motivationalQuotes = [
  "“The secret of getting ahead is getting started.” — Mark Twain",
  "“Success is the sum of small efforts repeated day in and day out.” — Robert Collier",
  "“Don't watch the clock; do what it does. Keep going.” — Sam Levenson",
  "“You don't have to be great to start, but you have to start to be great.” — Zig Ziglar",
  "“Action is the foundational key to all success.” — Pablo Picasso"
];

let quoteIndex = 0;
let taskColorCounter = 0; // Rotates pastel color classes 0 to 3

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskTime = document.getElementById("taskTime");

  const title = taskInput.value.trim();
  const dateVal = taskDate.value;
  const timeVal = taskTime.value;

  if (title === "" || dateVal === "" || timeVal === "") {
    alert("Please fill in the task name, date, and target time!");
    return;
  }

  // Calculate delay in milliseconds
  const targetDateTime = new Date(`${dateVal}T${timeVal}`);
  const now = new Date();
  const timeDifference = targetDateTime.getTime() - now.getTime();

  const taskItem = document.createElement("li");
  
  // Assign rotating pastel color class (color-0 to color-3)
  const colorClass = `color-${taskColorCounter % 4}`;
  taskColorCounter++;

  taskItem.className = `task-card ${colorClass}`;

  taskItem.innerHTML = `
    <div class="task-info">
      <span class="task-title">${title}</span>
      <span class="task-time">📅 ${dateVal} | ⏰ ${timeVal}</span>
    </div>
    <div class="actions">
      <button class="complete-btn" onclick="completeTask(this)">✔</button>
      <button class="delete-btn" onclick="deleteTask(this)">✖</button>
    </div>
  `;

  document.getElementById("pendingList").appendChild(taskItem);

  // Trigger Notification at target time
  if (timeDifference > 0) {
    setTimeout(() => {
      triggerNotification(title);
    }, timeDifference);
  }

  // Clear Form Inputs
  taskInput.value = "";
  taskDate.value = "";
  taskTime.value = "";
}

// Browser Notification Handler
function triggerNotification(taskTitle) {
  if (Notification.permission === "granted") {
    new Notification("⏰ Task Reminder!", {
      body: `It's time for: "${taskTitle}"`,
      icon: "https://cdn-icons-png.flaticon.com/512/1827/1827504.png"
    });
  } else {
    alert(`⏰ Reminder: It's time for "${taskTitle}"!`);
  }
}

// Complete Task Handler
function completeTask(button) {
  const taskCard = button.closest(".task-card");
  
  // Remove action buttons
  taskCard.querySelector(".actions").remove();

  // Move element to Pinned Completed Section
  document.getElementById("completedList").appendChild(taskCard);

  // Trigger Pastel Confetti Burst
  triggerPureCSSConfetti();

  // Show Motivational Modal
  showQuoteModal();
}

function deleteTask(button) {
  const taskCard = button.closest(".task-card");
  taskCard.remove();
}

// Show Motivational Popup with Rotating Quotes
function showQuoteModal() {
  const modal = document.getElementById("quoteModal");
  const quoteText = document.getElementById("quoteText");

  quoteText.textContent = motivationalQuotes[quoteIndex];
  quoteIndex = (quoteIndex + 1) % motivationalQuotes.length;

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("quoteModal").style.display = "none";
}

// Pastel Palette Confetti Burst Effect
function triggerPureCSSConfetti() {
  const container = document.getElementById("confettiContainer");
  const pastelColors = ["#b5cbd3", "#cddcbe", "#d8b4b4", "#d5b2c5"];

  for (let i = 0; i < 35; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti-piece";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    
    container.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 2800);
  }
}