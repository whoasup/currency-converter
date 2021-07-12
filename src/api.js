// Получаем писок валют с курсом на сегодня

export const loadCurrencies = () => {
  return fetch("https://www.cbr-xml-daily.ru/daily_json.js").then((r) =>
    r.json()
  );
};
