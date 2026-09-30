/* MBA English — общий скрипт сайта */
(function () {
  "use strict";

  /* Мобильное меню */
  var burger = document.querySelector(".burger");
  var menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Рассказы-тесты: у каждого <select> есть data-answer и data-tip */
  document.querySelectorAll("[data-test]").forEach(function (test) {
    var selects = test.querySelectorAll("select[data-answer]");
    var result = test.querySelector(".result");
    var hint = test.querySelector(".hint");
    var check = test.querySelector(".js-check");
    var reset = test.querySelector(".js-reset");
    var next = test.getAttribute("data-next") || "";

    if (check) check.addEventListener("click", function () {
      var score = 0, tips = [];
      selects.forEach(function (s) {
        s.classList.remove("ok", "bad");
        if (s.value === s.getAttribute("data-answer")) { score++; s.classList.add("ok"); }
        else { s.classList.add("bad"); tips.push(s.getAttribute("data-tip")); }
      });
      result.textContent = "Верно: " + score + " из " + selects.length;
      hint.textContent = "";
      var head = document.createElement("b");
      if (tips.length) {
        head.textContent = "Подсказки:";
        hint.appendChild(head);
        tips.forEach(function (t) { hint.appendChild(document.createElement("br")); hint.appendChild(document.createTextNode(t)); });
      } else {
        head.textContent = "Отлично! ";
        hint.appendChild(head);
        hint.appendChild(document.createTextNode(next || "Всё верно."));
      }
      hint.hidden = false;
    });

    if (reset) reset.addEventListener("click", function () {
      selects.forEach(function (s) { s.value = ""; s.classList.remove("ok", "bad"); });
      result.textContent = "";
      hint.hidden = true;
    });
  });

  /* Кнопки «Скопировать шаблон» */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = document.getElementById(btn.getAttribute("data-copy"));
      if (!src) return;
      var text = src.innerText;
      var done = function () { var old = btn.textContent; btn.textContent = "Скопировано"; setTimeout(function () { btn.textContent = old; }, 1600); };
      var fallback = function () {
        var r = document.createRange(); r.selectNodeContents(src);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
        btn.textContent = "Выделено — нажмите Ctrl+C";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
    });
  });

  /* Формы заявок.
     Чтобы заявки приходили на почту, укажите адрес обработчика в атрибуте
     data-endpoint у формы (например, https://formspree.io/f/XXXXXXX).
     Пока атрибут пустой, форма работает в демо-режиме. */
  document.querySelectorAll("form.lead-form").forEach(function (form) {
    var msg = form.querySelector(".form-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("[name=name]");
      var contact = form.querySelector("[name=contact]");
      var show = function (text, isErr) { msg.textContent = text; msg.classList.toggle("err", !!isErr); msg.hidden = false; };
      if (!name.value.trim() || !contact.value.trim()) { show("Заполните имя и способ связи, чтобы мы могли ответить.", true); return; }
      var endpoint = form.getAttribute("data-endpoint");
      /* Лид-магнит: у формы есть data-reward — id блока со ссылкой на файл */
      var reward = form.getAttribute("data-reward");
      var unlock = function () {
        if (!reward) return;
        var box = document.getElementById(reward);
        if (box) { box.hidden = false; var a = box.querySelector("a"); if (a) a.focus(); }
      };
      if (!endpoint) {
        if (reward) {
          show("Спасибо, " + name.value.trim() + "! Шпаргалка готова к скачиванию. (Демо-режим: контакт пока никуда не отправлен.)");
          unlock();
          return;
        }
        show("Спасибо, " + name.value.trim() + "! Форма пока работает в демо-режиме, заявка не отправлена. Напишите, пожалуйста, напрямую в Telegram или на почту.");
        return;
      }
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true;
      fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          if (reward) { show("Спасибо! Шпаргалка готова к скачиванию."); unlock(); }
          else show("Спасибо! Заявка отправлена. Людмила Васильевна свяжется с вами в течение рабочего дня.");
        })
        .catch(function () { show("Не удалось отправить заявку. Проверьте интернет и попробуйте ещё раз или напишите в Telegram.", true); })
        .then(function () { btn.disabled = false; });
    });
  });
})();
