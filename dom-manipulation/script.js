// Array of quotes
let quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    category: "Motivation",
  },
  {
    text: "Don’t let yesterday take up too much of today.",
    category: "Inspiration",
  },
];

// Function to show a quote by index
function showQuote(index) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `"${quotes[index].text}" - (${quotes[index].category})`;
}

// Function to add a new quote
function addQuote() {
  const quoteInput = document.getElementById("quoteInput").value.trim();
  const categoryInput = document.getElementById("categoryInput").value.trim();

  if (quoteInput !== "" && categoryInput !== "") {
    quotes.push({ text: quoteInput, category: categoryInput });
    showQuote(quotes.length - 1); // يعرض آخر اقتباس مضاف
    document.getElementById("quoteInput").value = "";
    document.getElementById("categoryInput").value = "";
  }
}

// Event listener for "Show New Quote" button
document.getElementById("newQuoteBtn").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  showQuote(randomIndex);
});

// Show the first quote on load
showQuote(0);
