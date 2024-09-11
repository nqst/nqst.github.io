---
layout: post
title: "SVG, тригонометрія і стрілки крутого повороту"
medium_width: true
---

Вперше в житті мені стала в пригоді тригонометрія. Чекав цього ще з часів школи :)

Зараз працюю над новими дорожніми знаками ([деталі тут](https://roadsigns.in.ua/posts/idea-and-motivation/)), і коли йшла робота над знаками напрямку повороту, хотілося подивитись, як вони будуть виглядати з різним кутом шевронної стрілки.

<!-- more -->

<style>
  svg {
    max-width: 100%;
    height: auto;
  }

  .chevrons-fun {
    max-width: 340px;
    margin: 0 auto;
    padding: 3em 0 4em;
  }

  .slider-container input {
    width: 100%;
    margin-bottom: 14px;
  }

  .slider-label {
    margin-right: 10px;
    font-weight: 500;
    font-size: 0.85rem;
  }

  .svg-container {
    padding-top: 10px;
    text-align: center;
  }

  .value-label {
    /* margin-left: 10px; */
  }

  .svg-container svg {
    max-width: 100%;
    height: auto;
    border-radius: 7px;
    border: 3px solid #da0000;
    box-shadow: inset 0 0 0 1px #da0000;
  }
</style>

<div class="serious-thing serious-thing--nomargin">
  <div class="chevrons-fun">
    <div class="slider-container">
      <label for="angle-slider" id="angle-value" class="slider-label">90°</label>
      <input type="range" id="angle-slider" min="85" max="130" value="90" />
    </div>
    <div class="svg-container">
      <svg width="1115" height="230" viewBox="0 0 1115 230" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#mask)">
          <rect width="1115" height="230" fill="#DA0000" />
          <path id="path-1" d="M120 0L235 115L120 230" stroke="white" stroke-width="77" stroke-linecap="square" />
          <path id="path-2" d="M394 0L509 115L394 230" stroke="white" stroke-width="77" stroke-linecap="square" />
          <path id="path-3" d="M668 0L783 115L668 230" stroke="white" stroke-width="77" stroke-linecap="square" />
          <path id="path-4" d="M942 0L1057 115L942 230" stroke="white" stroke-width="77" stroke-linecap="square" />
        </g>
        <defs>
          <clipPath id="mask">
            <rect width="1115" height="230" fill="white" />
          </clipPath>
        </defs>
      </svg>

    </div>
  </div>
</div>

<script>
  const angleSlider = document.getElementById('angle-slider');
  // const strokeWidthSlider = document.getElementById('stroke-width-slider');
  // const strokeWidthValue = document.getElementById('stroke-width-value');
  const angleValue = document.getElementById('angle-value');
  const chevronPaths = [
    document.getElementById('path-1'),
    document.getElementById('path-2'),
    document.getElementById('path-3'),
    document.getElementById('path-4')
  ];

  const defaultPositions = [
    { x: 120 },
    { x: 394 },
    { x: 668 },
    { x: 942 }
  ];

  const height = 230;

  angleSlider.addEventListener('input', function () {
    angleValue.textContent = this.value + '°';
    const angle = parseInt(this.value);
    const radians = angle * Math.PI / 180;
    const deltaX = height / (2 * Math.tan(radians / 2));

    chevronPaths.forEach((path, index) => {
      const { x } = defaultPositions[index];
      const middleX = x + deltaX;

      // ...і передаємо їх в SVG
      path.setAttribute('d', `M${x} 0L${middleX} 115L${x} 230`);
    });
  });

  // Set default value for angle
  angleSlider.value = 90;
  angleSlider.dispatchEvent(new Event('input'));
</script>

На вході у нас зображення знаку у форматі SVG:

<div style="max-width: 500px; margin-inline: auto; padding: 2em 0 3em;">
  <svg width="1115" height="230" viewBox="0 0 1115 230" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#mask)">
      <rect width="1115" height="230" fill="#DA0000"/>
      <path id="path-1" d="M120 0L235 115L120 230" stroke="white" stroke-width="77" stroke-linecap="square"/>
      <path id="path-2" d="M394 0L509 115L394 230" stroke="white" stroke-width="77" stroke-linecap="square"/>
      <path id="path-3" d="M668 0L783 115L668 230" stroke="white" stroke-width="77" stroke-linecap="square"/>
      <path id="path-4" d="M942 0L1057 115L942 230" stroke="white" stroke-width="77" stroke-linecap="square"/>
    </g>
    <defs>
      <clipPath id="mask">
        <rect width="1115" height="230" fill="white"/>
      </clipPath>
    </defs>
  </svg>
</div>

За цим зображенням стоїть такий код:

```xml
<svg width="1115" height="230" viewBox="0 0 1115 230" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#mask)">
    <rect width="1115" height="230" fill="#DA0000" />
    <path id="path-1" d="M120 0L235 115L120 230" stroke="white" stroke-width="77" stroke-linecap="square" />
    <path id="path-2" d="M394 0L509 115L394 230" stroke="white" stroke-width="77" stroke-linecap="square" />
    <path id="path-3" d="M668 0L783 115L668 230" stroke="white" stroke-width="77" stroke-linecap="square" />
    <path id="path-4" d="M942 0L1057 115L942 230" stroke="white" stroke-width="77" stroke-linecap="square" />
  </g>
  <defs>
    <clipPath id="mask">
      <rect width="1115" height="230" fill="white" />
    </clipPath>
  </defs>
</svg>
```

Цей код можна пояснити так:
- маємо полотно розміром 1115×230 пікселів,
- на цьому полотні є червоний прямокутник на всю ширину і висоту,
- і чотири білих стрілки товщиною 77 пікселів,
- є також маска, щоб не дати контурам стрілок вийти за межі прямокутника, але про це зараз можна не думати.

Складно виглядає це `M120 0L235 115L120 230`, але насправді все не так страшно. `M` означає _Move to_ — це команда йти в точку `(120,0)`. Далі `L` _(Line to)_ — малюй лінію з попередньої точки в точку `(235,115)`, а потім продовжуй лінію в точку `(120,230)`.

<figure class="figure--center">
  <img src="/i/blog/trigonometry/coords.png" width="354" alt="">
</figure>

Ми можемо змінювати координати точок, керуючи SVG-кодом за допомогою JavaScript. Але спочатку треба зрозуміти, як саме це зробити.

* * *

Отже, ми хочемо задати певний кут у градусах і визначити відстань, на яку потрібно змістити центральну точку по горизонталі, щоб величина кута була саме такою, яку ми задамо.

<figure class="figure--center">
  <img src="/i/blog/trigonometry/points.gif" width="304" alt="">
</figure>

Намалюємо трикутник `ABC`. Розділимо його навпіл лінією `Δx` — саме цю довжину нам треба буде шукати. Позначимо кут `θ`, який буде завжди дорівнювати половині заданого кута. Тепер можемо працювати з прямокутним трикутником `ABD`:

<figure class="figure--center">
  <img src="/i/blog/trigonometry/triangle.png" srcset="/i/blog/trigonometry/triangle@2x.png 2x" alt="">
</figure>

Відстань `AC` — постійна (230 пікселів на нашій картинці). `AD` дорівнює половині `AC`. <!--Також ми завжди будемо мати значення кута `θ`. Треба знайти довжину катета, прилеглого до нашого кута, знаючи довжину протилежного катета.-->

Знаючи величину кута `θ` і довжину однієї сторони, ми можемо знайти довжину іншої сторони. З цим допоможе тангенс кута `θ`: він показує відношення протилежної сторони `AD` до прилеглої сторони `Δx`:

<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

$$ \tan\theta = \frac{AD}{\Delta x} $$

Знайдемо звідси `Δx`:

$$ {\Delta x} = \frac{AD}{\tan\theta} $$

Підставимо у формулу відомі нам значення (`AD` = `AC ÷ 2`; `β` — заданий кут):

$$ \boxed{\Delta x = \frac{AC}{2\cdot\tan(\frac{\beta}{2})}} $$

В JavaScript це буде виглядати так:

```js
const height = 230; // Висота `AC`

angleSlider.addEventListener('input', function () {
  const angle = parseInt(this.value);
  const radians = angle * Math.PI / 180; // JS потребує значення кута в радіанах
  const deltaX = height / (2 * Math.tan(radians / 2));

  // Працюємо з координатами для кожної стрілки
  chevronPaths.forEach((path, index) => {
    const { x } = defaultPositions[index];
    const middleX = x + deltaX;

    // ...і передаємо їх в SVG
    path.setAttribute('d', `M${x} 0L${middleX} 115L${x} 230`);
  });
});
```

Працює! Можна тестувати. І хоч зрештою ми залишили на стрілках кут 90°, як на поточних знаках, поекспериментувати було дуже цікаво.

Ви можете подивитись на те, що у нас вийшло з шевронними знаками [у блозі «Попереду нові дорожні знаки»](https://roadsigns.in.ua/posts/chevrons/).

<div class="serious-thing serious-thing--nomargin">
  <div class="chevrons-fun">
    <div class="slider-container">
      <label for="stroke-width-slider-1" class="slider-label">
        Товщина стрілки:
        <span id="stroke-width-value-1" class="value-label">77</span>
      </label>
      <input type="range" id="stroke-width-slider-1" min="10" max="115" value="77" />
    </div>
    <div class="slider-container">
      <label for="angle-slider-1" class="slider-label">
        Кут:
        <span id="angle-value-1" class="value-label">90°</span>
      </label>
      <input type="range" id="angle-slider-1" min="70" max="140" value="90" />
    </div>
    <div class="svg-container">
      <svg width="1115" height="230" viewBox="0 0 1115 230" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect width="1115" height="230" fill="#DA0000" />
        <mask id="chevron-mask-1" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
          width="1115" height="230">
          <rect width="1115" height="230" fill="#D9D9D9" />
        </mask>
        <g mask="url(#chevron-mask-1)">
          <path id="chevron-path-1" d="M70 -50L235 115L70 280" stroke="#F8F8F8" stroke-width="77" />
          <path id="chevron-path-2" d="M344 -50L509 115L344 280" stroke="#F8F8F8" stroke-width="77" />
          <path id="chevron-path-3" d="M618 -50L783 115L618 280" stroke="#F8F8F8" stroke-width="77" />
          <path id="chevron-path-4" d="M892 -50L1057 115L892 280" stroke="#F8F8F8" stroke-width="77" />
        </g>
      </svg>
    </div>
  </div>
</div>

#### Бонус: що я дізнався, поки працював над цим знаком

- Щоб отримати прямий кут, достатньо змістити центральну точку рівно на половину висоти стрілки.
- В JavaScript є тангенс, але немає котангенсу. Щоправда, котангенс було б легко розрахувати, розділивши одиницю на тангенс.
<!-- - Якщо початковий кут — 180°, то в нашій формулі отримали б ділення на нуль. Проте ваш компʼютер не вибухне, і навіть не намагатиметься ділити на нуль. При переведенні кута з градусів в радіани береться приблизне значення числа Пі, і тангенс кута буде дуже близьким до нуля, але  -->
- А ще я нагадав собі, як приємно працювати над дизайном і кодом, взагалі не думаючи про конверсії і бізнес-показники 💆‍♂️. Відкалібрував свій компас.

<script>
  const strokeWidthSlider = document.getElementById('stroke-width-slider-1');
  const angleSliderAlt = document.getElementById('angle-slider-1');
  const strokeWidthValue = document.getElementById('stroke-width-value-1');
  const angleValueAlt = document.getElementById('angle-value-1');
  const chevronPathsAlt = [
    document.getElementById('chevron-path-1'),
    document.getElementById('chevron-path-2'),
    document.getElementById('chevron-path-3'),
    document.getElementById('chevron-path-4')
  ];

  const defaultPositionsAlt = [
    { x: 70 },
    { x: 344 },
    { x: 618 },
    { x: 892 }
  ];

  strokeWidthSlider.addEventListener('input', function () {
    strokeWidthValue.textContent = this.value;
    chevronPathsAlt.forEach(path => {
      path.setAttribute('stroke-width', this.value);
    });
  });

  angleSliderAlt.addEventListener('input', function () {
    angleValueAlt.textContent = this.value + '°';
    const angle = parseInt(this.value);
    const radians = angle * Math.PI / 180;
    const length = 165;

    chevronPathsAlt.forEach((path, index) => {
      const { x } = defaultPositionsAlt[index];
      const newX2 = x + length / Math.tan(radians / 2);

      path.setAttribute('d', `M${x} -50L${newX2} 115L${x} 280`);
      // console.log(Math.tan(radians / 2))
      // console.log(newX2)
    });
  });

  // Set default value for angle
  angleSliderAlt.value = 90;
  angleSliderAlt.dispatchEvent(new Event('input'));
</script>
