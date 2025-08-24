// ====== Quotes Array ======
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    category: "Motivation",
  },
  {
    text: "Don’t let yesterday take up too much of today.",
    category: "Inspiration",
  },
  {
    text: "You learn more from failure than from success.",
    category: "Learning",
  },
];

// ====== DOM Elements ======
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const filterSelect = document.getElementById("categoryFilter");

// ====== Local Storage Save ======
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ====== Task 0: Display Random Quote ======
function displayRandomQuote(filteredQuotes = quotes) {
  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes found!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote)); // optional session storage
}

// ====== Task 0: Add New Quote ======
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Both fields are required!");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  textInput.value = "";
  categoryInput.value = "";
  displayRandomQuote();
}

// ====== Task 2: Populate Categories (appendChild) ======
function populateCategories() {
  const categories = ["all", ...new Set(quotes.map((q) => q.category))];
  filterSelect.innerHTML = ""; // clear old options

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.toLowerCase();
    option.textContent = cat;
    filterSelect.appendChild(option);
  });

  const lastFilter = localStorage.getItem("lastFilter") || "all";
  filterSelect.value = lastFilter;
}

// ====== Task 2: Filter Quotes by Category ======
function filterQuotes() {
  const selectedCategory = filterSelect.value;
  localStorage.setItem("lastFilter", selectedCategory);

  if (selectedCategory === "all") {
    displayRandomQuote();
  } else {
    const filtered = quotes.filter(
      (q) => q.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    displayRandomQuote(filtered);
  }
}

// ====== JSON Export ======
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ====== JSON Import ======
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      displayRandomQuote();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Invalid JSON file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// ====== Task 3: Fetch Quotes from Server ======
async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverData = await response.json();

    const serverQuotes = serverData.slice(0, 3).map((post) => ({
      text: post.title,
      category: "Server",
    }));

    const mergedQuotes = [...quotes];
    serverQuotes.forEach((sq) => {
      const exists = mergedQuotes.find((q) => q.text === sq.text);
      if (!exists) mergedQuotes.push(sq);
    });

    quotes = mergedQuotes;
    saveQuotes();
    populateCategories();
    displayRandomQuote();
    console.log("Quotes synced with server!");
  } catch (err) {
    console.error("Error fetching quotes from server:", err);
  }
}

// ====== Event Listeners ======
newQuoteBtn.addEventListener("click", () => displayRandomQuote());
addQuoteBtn.addEventListener("click", addQuote);
filterSelect.addEventListener("change", filterQuotes);
document
  .getElementById("exportBtn")
  ?.addEventListener("click", exportToJsonFile);
document
  .getElementById("importFile")
  ?.addEventListener("change", importFromJsonFile);

// ====== Initial Setup ======
populateCategories();
const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
  quoteDisplay.innerHTML = `"${lastQuote.text}" — <strong>${lastQuote.category}</strong>`;
} else {
  displayRandomQuote();
}

// Optional: Periodic server sync every 30s
setInterval(fetchQuotesFromServer, 30000);
