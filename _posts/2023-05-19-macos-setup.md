---
layout: post
archived: true
title: "Підготовка macOS до роботи"
introimg: "new-macbook-alt.jpg"
ogimage: "ogimage.jpg"
plyr: true
---

Нещодавно оновив собі робочий MacBook. За моїм попереднім ноутбуком 2017 року було вже важко працювати через слабку батарею та западаючі клавіші.

Я люблю налаштовувати нову техніку з чистого аркушу. Це чудовий привід щось зробити по-іншому та навчитися чомусь новому. Цього разу я записував свої налаштування — хочу поділитися деякими з них.

<!-- more -->

У мене англійська версія macOS, тож назви всіх параметрів будуть англійською.

## Системні налаштування

При початкових налаштуваннях, які пропонує система при першому запуску компʼютера, вимикаю Siri і вмикаю FileVault. FileVault постійно шифрує всі дані на диску, і без пароля у жодної особи не буде до них доступу. Це дуже важлива фіча, особливо коли у вас ноутбук.

Далі йду у System Settings:

### Desktop & Dock
- **Вмикнув автоматичне приховування доку:** Automatically show and hide dock.
- **Вимкнув автоматичне відображення зайвих програм:** Show recent applications in Dock.
- **Налаштував активні кути** (вікно Hot corners):
	<figure class="figure--compact">
	  <img src="/i/blog/macos-setup/corners@2x.png" alt="Налаштування">
	</figure>
	
  Активні кути — одна з моїх найулюбленіших можливостей macOS ще з часів знайомства з цією системою. Постійно користуюся і дуже ціную зручність, яку надає ця фіча.
  
### Lock Screen
- **Налаштував блокування екрану після старту заставки:** Require password after screen saver begins or display is turned off › After 5 seconds.
  
  Коли я збираюся відійти від компʼютера, завжди тягну курсор у лівий верхній кут екрану, щоб увімкнути заставку. Через 5 секунд після цього ноутбук буде заблоковано, і сторонні люди не зможуть його розблокувати. Вважаю цю опцію дуже важливою.

### Keyboard
- Ставлю максимальні значення **Key repeat rate** і **Delay until repeat** (Fast і Short відповідно). Це корисні опції для того, щоб видаляти фрагменти тексту клавіатурою та рухатися по ньому клавішами-стрілочками без неприємної затримки.
- **Налаштовую швидкий доступ до емодзі:** Press <img src="/i/blog/macos-setup/globe.png" class="globe-icon"> key to › Show Emoji & Symbols. Експериментую, поки норм. До цього використовував стандартний шорткат `⌘⌃Пробіл`. 

#### Input sources
- **Налаштовую перемикання розкладки по Caps Lock:** Use the Caps Lock key to switch to and from ABC. Зручна фіча, щоб перемикати мову однією клавішею. На жаль, іноді не спрацьовує і трохи глючить.
- Вимикаю **Correct spelling automatically** і **Capitalise words automatically.**

### Trackpad
- **Вмикаю Tap to Click.** Дивно, що ця опція була вимкнена за замовчуванням.
- **Налаштовую Tracking speed на свій смак.** Поставив ближче до середини.
- **Вмикаю перетягування трьома пальцями.** Тачпад може перетягувати вікна та все інше, що перетягується (наприклад, Google Maps) дотиком трьома пальцями. Звучить складно, але на практиці дуже зручно. Щоб увімкнути, треба піти в Accessibility › Pointer Control › Trackpad options › Use trackpad for dragging › Three-finger drag.

<!-- ### Sharing: - Set Local hostname -->

## Dock
- **Видалив із доку більшість стандартних застосунків.** Залишив Finder, Safari і Календар.
- **Переніс у док папку Desktop** і помістив її поруч із Downloads. Задав налаштування у контекстному меню: Sort by › Date added та View content as › Fan. Це такі ж самі налаштування, які система використовує для папки Downloads — для того, щоб при розкритті папки свіжі файли були поруч з курсором.
- Відкриваю термінал і роблю так, щоб док приховувався і зʼявлявся швидше та без затримки:
  
  ```bash
  defaults write com.apple.dock autohide-delay -int 0
  defaults write com.apple.dock autohide-time-modifier -float 0.4
  killall Dock
  ```

## Finder
Роблю собі красиво і функціонально:

<figure>
  <img src="/i/blog/macos-setup/finder-alt.png" alt="Finder">
</figure>

- View › As Columns: `⌘3`.
- View › Show Status bar: `⌘/`.
- Settings › General › New Finder windows show: 🏠 Home folder.
- Settings › Tags — вимкнув усе.
- Sidebar: увімкнув 🏠 Home folder, щоб відображалася у списку.

## Safari
- View › Show Status bar: `⌘/`.
- Убезпечую себе від загублення відкритих табів: Settings › General › Safari opens with › All non-private windows from last session.

## Встановлення програм

### App Store

Встановлюю всього 4 програми:
- **[Things](https://culturedcode.com/things/)** — для ведення справ. 
- **[iA Writer](https://ia.net/writer)** — улюблений текстовий редактор.
- **[Reeder 5](https://reederapp.com)** — для читання RSS.
- **[Tomato 2](https://tomato2.app)** — таймер для усвідомленої роботи.

Якщо щось можна поставити без App Store, я завжди віддам перевагу такому варіанту. Менше багів і більш доступні Release Notes.

### Поза App Store

Момент, якого я завжди чекаю при налаштуванні нового компʼютера, — встановлення програм через Homebrew Cask. Цей інструмент дозволяє ввести назви потрібних програм у комадному рядку, і він усе встановить. Це економить неймовірну кількість часу і енергії.

Ось, наприклад, як Cask встановлює 1Password і Skype. Порівняйте це зі стандартною процедурою: скачуванням DMG з сайту, перетягуванням програми в Applications, і подальшим прибиранням сміття.

<figure>
	<video class="js-player" data-plyr-config= '{"controls": ["play-large", "play", "progress", "current-time"]}' loop autoplay controls>
	  <source src="/i/blog/macos-setup/cask.mp4" type="video/mp4" />
	</video>
	<figcaption>30 секунд на все</figcaption>
</figure>

Щоб це працювало, потрібно не боятися командного рядка і спочатку встановити [Homebrew](https://brew.sh).

Цього разу мій «стартовий пакет» програм встановлених через Cask виглядає так:

```bash
brew install raycast google-chrome firefox github iterm2 visual-studio-code sketch spotify telegram slack zoom bartender numi imageoptim
```

Одна команда встановлює всі програми, і вони готові до використання. Магія ✨

Хочеться відзначити декілька програм з цього списку:
- **[Raycast](https://www.raycast.com)** — найкраща заміна Spotlight. Красивий, швидкий і гнучкий інструмент, який має дуже багато корисних фіч. Ось, наприклад, словник:
	<figure>
		<video class="js-player" data-plyr-config= '{"controls": ["play-large", "play", "progress", "current-time"]}' autoplay controls loop>
		  <source src="/i/blog/macos-setup/dictionary.mp4" type="video/mp4" />
		</video>
	</figure>
- **[Numi](https://numi.app)** — мій улюблений десктопний калькулятор.
- **[Bartender](https://www.macbartender.com)** — прибирає зайві іконки з меню-бару.
- **[GitHub Desktop](https://desktop.github.com)** — часом користуватися гітом зручніше через графічний інтерфейс.

<div class="serious-thing" markdown="1">
#### Geeky stuff
(якщо ви не пишете код, це можна пропустити)

- Встановлюю консольні програми:

  ```bash
  brew install git git-lfs nodejs corepack svgo
  ```

- Встановлюю [Oh My Zsh](https://ohmyz.sh), щоб прокачати термінал.
- Встановлюю Xcode з [developer.apple.com](https://developer.apple.com/download/all/?q=xcode). Не рекомендую використовувати App Store-версію.
- Генерую SSH-ключ. Користувався [документацією GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), можу її рекомендувати. Дізнався, що зараз рекомендують алгоритм шифрування Ed25519, до цього я завжди використовував RSA.
- Налаштовую Visual Studio Code. Це біль. Якщо більшість налаштувань у цьому пості — це поліпшення того, що і так непогано працює, то з VS Code доводиться фіксити те, що із коробки працює криво, як-от [перемикання табів](https://stackoverflow.com/a/38978993). Поточний VS Code нагадує мені часи, коли продукти Microsoft були горезвісні своєю хаотичністю. Але, на жаль, зараз я не бачу нормальної альтернативи цьому редактору.
- Налаштовую iTerm:
	- **Обираю тему.** Цього разу сподобалась [Dracula theme](https://draculatheme.com/iterm), але трохи підтюнив кольори на свій смак.
	- **Налаштовую швидкий виклик консолі клавіатурою:** Preferences › Keys › Hotkey › `` ⌃` ``.
	- **Роблю так, щоб консоль випадала зверху екрана:** Profiles › Window › Style › Full-width Top of Screen.
      <figure class="figure--screenshot figure--compact">
	      <img src="/i/blog/macos-setup/full-width-console.jpg" alt="">
      </figure>
    
	- **Обираю більш зрозумілий курсор:** Profiles › Text › Cursor › Vertical bar + Blinking cursor.
	- **Прибираю iTerm із Доку:** Appearance › General › Exclude from Dock and ⌘-Tab Application Switcher.
	- **Ремонтую [непрацюючу навігацію ⌥/⌘ + стрілками](https://apple.stackexchange.com/q/136928):** Profiles › Keys › Key Mappings › Presets... › Natural Text Editing
</div>

Далі встановлюю ще дві програми з офіціальних сайтів:

- **[CleanShot X](https://cleanshot.com)** — найкращий на мою думку інструмент для знімків екрану. Платний ($29), але вартий того.
- **[HandMirror](https://handmirror.app)** — безкоштовна утіліта для того, щоб у один клік подивитись на себе у дзеркало перед дзвінком. Це зручніше, ніж відкривати Photo Booth.

<figure class="figure--compact">
 <img src="/i/blog/macos-setup/handmirror-alt.jpg" alt="">
</figure>

* * *
    
Здається, це усі основні налаштування. Залишилось зробити альтернативну клавіатурну розкладку: у стандартній українській розкладці мені не вистачає більш зручного доступу до лапок `«»`, тире `—`, слешу `/` та деяких інших символів. Але це вже окрема історія.
