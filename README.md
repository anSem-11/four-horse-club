# Клуб четырёх коней / Four Knights Club

Лендинг шахматного клуба «Клуб четырёх коней» по мотивам романа Ильи Ильфа и Евгения Петрова «Двенадцать стульев».

A landing page for the "Four Knights Chess Club" based on Ilya Ilf and Yevgeny Petrov's novel "The Twelve Chairs".

---

## RU

### Стек

- HTML5
- CSS3 (методология BEM)
- Vanilla JavaScript (ES6+)

### Требования

Для локального запуска достаточно любого из следующих инструментов:

- Браузер (открыть напрямую) — базовый вариант
- [VS Code](https://code.visualstudio.com/) с расширением [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [Node.js](https://nodejs.org/) (для запуска через `npx`)
- Python 3 (встроен в macOS/Linux)

### Установка и запуск

**1. Клонировать репозиторий**

```bash
git clone <url-репозитория>
cd crowd-test
```

**2. Запустить локальный сервер**

Выберите любой удобный способ:

*Через VS Code Live Server:*
Откройте папку в VS Code, кликните правой кнопкой на `index.html` → «Open with Live Server».

*Через Node.js (npx):*
```bash
npx serve .
```
Откройте в браузере: `http://localhost:3000`

*Через Python:*
```bash
python3 -m http.server 8080
```
Откройте в браузере: `http://localhost:8080`

*Без сервера (открыть напрямую):*
```bash
open index.html   # macOS
start index.html  # Windows
```
> Некоторые браузерные функции могут быть ограничены при открытии через `file://`.

### Структура проекта

```
crowd-test/
├── index.html        # Основной HTML-файл
├── css/
│   └── style.css     # Все стили (BEM)
├── js/
│   └── main.js       # JavaScript
└── images/           # Изображения и иконки
```

---

## EN

### Stack

- HTML5
- CSS3 (BEM methodology)
- Vanilla JavaScript (ES6+)

### Requirements

You only need one of the following to run the project locally:

- A browser (open directly) — simplest option
- [VS Code](https://code.visualstudio.com/) with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
- [Node.js](https://nodejs.org/) (to run via `npx`)
- Python 3 (built into macOS/Linux)

### Installation & Running

**1. Clone the repository**

```bash
git clone <repository-url>
cd crowd-test
```

**2. Start a local server**

Pick any option below:

*Via VS Code Live Server:*
Open the folder in VS Code, right-click `index.html` → "Open with Live Server".

*Via Node.js (npx):*
```bash
npx serve .
```
Open in browser: `http://localhost:3000`

*Via Python:*
```bash
python3 -m http.server 8080
```
Open in browser: `http://localhost:8080`

*Without a server (open directly):*
```bash
open index.html   # macOS
start index.html  # Windows
```
> Some browser features may be restricted when opening via `file://`.

### Project Structure

```
crowd-test/
├── index.html        # Main HTML file
├── css/
│   └── style.css     # All styles (BEM)
├── js/
│   └── main.js       # JavaScript
└── images/           # Images and icons
```
