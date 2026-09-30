# MBA English — сайт Людмилы Попковой

Сайт: https://aperevedencev-glitch.github.io/business_english/

Статический сайт преподавателя делового английского Л. В. Попковой, автора книги
«Английский язык. Практикум общения в бизнесе» (серия «Полный курс MBA», Эксмо).
Не требует сборки: чистые HTML, CSS и JavaScript, готов к публикации на GitHub Pages.

## Страницы

| Файл | Раздел |
|---|---|
| `index.html` | Главная: о методике, книга, отзывы, об авторе |
| `kniga.html` | Книга: аннотация, содержание, жанры |
| `obuchenie.html` | Обучение: программы, этапы, вопросы, форма записи (`#apply`) |
| `uroki.html` | Бесплатные уроки: рассказы-тесты, шаблоны писем и конспектов, фразы для переговоров |
| `kompanii.html` | Для компаний: форматы, чек-лист для HR, форма заявки (`#request`) |
| `404.html` | Страница «не найдено» |

```
css/style.css   — все стили
js/main.js      — меню, рассказы-тесты, копирование шаблонов, формы
img/            — обложка, картинка для соцсетей, иконки
```

## Публикация на GitHub Pages

1. Создайте на GitHub новый публичный репозиторий, например `business_english`.
2. Загрузите в него **содержимое** этой папки (чтобы `index.html` лежал в корне репозитория):
   на странице репозитория нажмите **Add file → Upload files** и перетащите файлы и папки.
   Или через терминал:
   ```bash
   cd popkova-site
   git init
   git add .
   git commit -m "Сайт MBA English"
   git branch -M main
   git remote add origin https://github.com/aperevedencev-glitch/business_english.git
   git push -u origin main
   ```
3. В репозитории откройте **Settings → Pages**. В блоке **Build and deployment** выберите
   **Source: Deploy from a branch**, ветку **main** и папку **/ (root)**, нажмите **Save**.
4. Через 1–2 минуты сайт будет доступен по адресу
   `https://aperevedencev-glitch.github.io/business_english/`.

Файл `.nojekyll` отключает обработку Jekyll — сайт публикуется как есть.

## Что заполнить перед запуском

- **Контакты.** В `obuchenie.html` и `kompanii.html` найдите `[@username — укажите]`
  и `[адрес — укажите]` и вставьте Telegram и e-mail.
- **Отзывы.** В `index.html` замените три заготовки в блоке «Что говорят выпускники».
- **Цифры и программы.** Проверьте «100+ выпускников», названия и описания программ.
- **Адрес сайта.** В `sitemap.xml` и `robots.txt` замените `aperevedencev-glitch` и `business_english`
  на реальные. Для красивого превью ссылок в соцсетях замените в `<head>` каждой страницы
  `content="img/og-image.jpg"` на полный адрес:
  `https://aperevedencev-glitch.github.io/business_english/img/og-image.jpg`.

## Как подключить формы заявок

GitHub Pages не обрабатывает формы сам, поэтому по умолчанию формы работают в демо-режиме
(показывают сообщение, но ничего не отправляют). Чтобы заявки приходили на почту:

1. Зарегистрируйтесь на [formspree.io](https://formspree.io) (есть бесплатный тариф)
   и создайте форму — вы получите адрес вида `https://formspree.io/f/abcdwxyz`.
2. В `obuchenie.html` и `kompanii.html` найдите `data-endpoint=""` и вставьте адрес:
   `data-endpoint="https://formspree.io/f/abcdwxyz"`.

Подойдёт любой сервис, принимающий POST-запрос с данными формы
(Getform, Basin, собственный Telegram-бот через веб-хук).

## Как добавить рассказ-тест

Скопируйте блок `<div class="test" data-test …>` в `uroki.html`. У каждого пропуска:

```html
<select aria-label="Пропуск 1" data-answer="called" data-tip="Подсказка при ошибке">
  <option value="">…</option><option>called</option><option>has called</option>
</select>
```

`data-answer` — правильный вариант (текст должен совпадать с `<option>`),
`data-tip` — объяснение, которое увидит ученик при ошибке. Скрипт подхватит тест сам.

## Цвета

Палитра взята с обложки книги и задана переменными в начале `css/style.css`:
жёлтый `--paper`, красный `--red`, синий `--blue`.

## Лид-магнит: PDF-шпаргалка

Файл `files/popkova-shpargalka.pdf` (5 страниц, RU/EN) выдаётся в обмен на контакт:
блок «Шпаргалка по деловому английскому» стоит на главной и на странице «Уроки» (`#shpargalka`).

- После отправки формы появляется кнопка «Скачать PDF».
- Пока `data-endpoint=""`, контакты никуда не уходят (демо-режим), но файл уже выдаётся.
  Чтобы собирать контакты, укажите адрес Formspree в `data-endpoint` у форм `lm-index` и `lm-uroki`
  — так же, как для форм записи.
- В PDF на последней странице заполните Telegram, e-mail и адрес сайта (сейчас там заготовки
  в квадратных скобках) и замените файл в папке `files/`.
