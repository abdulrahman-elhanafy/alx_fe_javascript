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
    text: "It’s not whether you get knocked down, it’s whether you get up.",
    category: "Resilience",
  },
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// ✅ عرض اقتباس عشوائي
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><small>Category: ${quote.category}</small>`;
}

// ✅ إضافة اقتباس جديد
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text && category) {
    quotes.push({ text, category });
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please enter both text and category!");
  }
}

newQuoteBtn.addEventListener("click", showRandomQuote);

// عرض اقتباس أول ما الصفحة تفتح
showRandomQuote();
