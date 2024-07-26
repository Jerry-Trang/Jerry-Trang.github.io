const container = document.getElementById("container");
// Create and append h1 element
const h1 = document.createElement("h1");
h1.textContent = "Currency Converter";
container.appendChild(h1);

// Function to create and append currency container
const createCurrencyContainer = (className, selectId, inputId, flagId, options, readonly) => {
  const currencyContainer = document.createElement("div");
  currencyContainer.classList.add("currency-container", className);
  container.appendChild(currencyContainer);

  const selectEl = document.createElement("select");
  selectEl.id = selectId;
  currencyContainer.appendChild(selectEl);

  const inputEl = document.createElement("input");
  inputEl.type = "number";
  inputEl.id = inputId;
  inputEl.value = "1";
  inputEl.min = "0";
  inputEl.readOnly = readonly
  currencyContainer.appendChild(inputEl);

  const flagEl = document.createElement("span");
  flagEl.id = flagId;
  flagEl.className = "flag-icon";
  currencyContainer.appendChild(flagEl);

  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.text;
    opt.dataset.flag = option.flag;
    if (option.selected) {
      opt.selected = true;
    }
    selectEl.appendChild(opt);
  });
};

// Create first currency container
const optionsFirst = [
  { value: "AUD", text: "AUD", flag: "au" },
  { value: "CAD", text: "CAD", flag: "ca" },
  { value: "EUR", text: "EUR", flag: "eu" },
  { value: "GBP", text: "GBP", flag: "gb" },
  { value: "INR", text: "INR", flag: "in " },
  { value: "JPY", text: "JPY", flag: "jp" },
  { value: "VND", text: "VND", flag: "vn" },
  { value: "KRW", text: "KRW", flag: "kr" },
  { value: "USD", text: "USD", flag: "us", selected: true }
];
createCurrencyContainer("first", "currency-first", "worth-first", "flag-first", optionsFirst, false);

// Create second currency container
const optionsSecond = [
  { value: "AUD", text: "AUD", flag: "au" },
  { value: "CAD", text: "CAD", flag: "ca" },
  { value: "EUR", text: "EUR", flag: "eu" },
  { value: "GBP", text: "GBP", flag: "gb" },
  { value: "INR", text: "INR", flag: "in" , selected: true },
  { value: "JPY", text: "JPY", flag: "jp" },
  { value: "VND", text: "VND", flag: "vn" },
  { value: "KRW", text: "KRW", flag: "kr" },
  { value: "USD", text: "USD", flag: "us" }
];
createCurrencyContainer("second", "currency-second", "worth-second", "flag-second", optionsSecond,true);

const optionsThird = [
  { value: "AUD", text: "AUD", flag: "au" },
  { value: "CAD", text: "CAD", flag: "ca" },
  { value: "EUR", text: "EUR", flag: "eu" },
  { value: "GBP", text: "GBP", flag: "gb" },
  { value: "INR", text: "INR", flag: "in"  },
  { value: "JPY", text: "JPY", flag: "jp" },
  { value: "VND", text: "VND", flag: "vn", selected: true },
  { value: "KRW", text: "KRW", flag: "kr" },
  { value: "USD", text: "USD", flag: "us" }
];
createCurrencyContainer("third", "currency-third", "worth-third", "flag-third", optionsThird,true);

// Create and append exchange rate paragraph
const exchangeRate = document.createElement("p");
exchangeRate.classList.add("exchange-rate");
exchangeRate.id = "exchange-rate";
exchangeRate.textContent = "1 USD = 138.5802 JPY";
container.appendChild(exchangeRate);

const exchangeRate3 = document.createElement("p");
exchangeRate3.classList.add("exchange-rate");
exchangeRate3.id = "exchange-rate3";
exchangeRate3.textContent = "1 USD = 138.5802 JPY";
container.appendChild(exchangeRate3);

// Update flag icons
const updateFlagIcons = () => {
  const currencyFirst = document.getElementById("currency-first");
  const currencySecond = document.getElementById("currency-second");
  const currencyThird = document.getElementById("currency-third");
  const flagFirst = document.getElementById("flag-first");
  const flagSecond = document.getElementById("flag-second");
  const flagThird = document.getElementById("flag-third");
  console.log(currencyFirst.options[currencyFirst.selectedIndex].dataset.flag)
  flagFirst.className =`flag-icon flag-icon-${currencyFirst.options[currencyFirst.selectedIndex].dataset.flag}`
  flagSecond.className =`flag-icon flag-icon-${currencySecond.options[currencySecond.selectedIndex].dataset.flag}`
  flagThird.className =`flag-icon flag-icon-${currencyThird.options[currencyThird.selectedIndex].dataset.flag}`
};

// Update exchange rate
const updateRate = async () => {
  const currencyFirst = document.getElementById("currency-first").value;
  const currencySecond = document.getElementById("currency-second").value;
  const currencyThird = document.getElementById("currency-third").value;
  const worthFirst = document.getElementById("worth-first").value;
  if(currencyFirst === currencySecond || currencySecond === currencyThird || currencyFirst === currencyThird){
    alert("Please select different currencies for conversion.")
    location.reload();
  }
  fetch(`https://v6.exchangerate-api.com/v6/0138fe8ac24b514c7951e94a/latest/${currencyFirst}`)
    .then((response) => response.json())
    .then((data) => {
      const rate2 = data.conversion_rates[currencySecond];
      document.getElementById("worth-second").value = (worthFirst * rate2).toFixed(2);
      document.getElementById("exchange-rate").textContent = `${worthFirst} ${currencyFirst} = ${(worthFirst * rate2).toFixed(6)} ${currencySecond}`;

      const rate3 = data.conversion_rates[currencyThird];
      document.getElementById("worth-third").value = (worthFirst * rate3).toFixed(2);
      document.getElementById("exchange-rate3").textContent = `${worthFirst} ${currencyFirst} = ${(worthFirst * rate3).toFixed(6)} ${currencyThird}`;
    
    })
    .catch((error) => {
      console.error(error);
    });
};
// Event listeners
document.getElementById("currency-first").addEventListener("change", updateFlagIcons);
document.getElementById("currency-second").addEventListener("change", updateFlagIcons);
document.getElementById("currency-third").addEventListener("change", updateFlagIcons);
document.getElementById("worth-first").addEventListener("input", updateRate);
document.getElementById("currency-first").addEventListener("change", updateRate);
document.getElementById("currency-second").addEventListener("change", updateRate);
document.getElementById("currency-third").addEventListener("change", updateRate);

// Initial update
updateFlagIcons();
updateRate();
