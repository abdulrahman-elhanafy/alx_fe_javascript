// Initial quotes array
let quotes = [
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

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const filterBtn = document.getElementById("filterBtn");

// Show random quote
function showRandomQuote(filteredQuotes = quotes) {
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes found!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// Add new quote dynamically
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text === "" || category === "") {
    alert("Both fields are required!");
    return;
  }

  quotes.push({ text, category });
  textInput.value = "";
  categoryInput.value = "";
  alert("Quote added successfully!");
  showRandomQuote();
}

// Filter quotes by category
function filterQuotes() {
  const filterInput = document.getElementById("filterCategory");
  const category = filterInput.value.trim().toLowerCase();

  if (category === "") {
    showRandomQuote(); // Show any quote if filter empty
    return;
  }

  const filtered = quotes.filter((q) => q.category.toLowerCase() === category);
  showRandomQuote(filtered);
}

// Event listeners
newQuoteBtn.addEventListener("click", () => showRandomQuote());
addQuoteBtn.addEventListener("click", addQuote);
filterBtn.addEventListener("click", filterQuotes);

// Optional: Show a random quote on page load
showRandomQuote();
