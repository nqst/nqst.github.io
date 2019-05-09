---
layout: post
title: "Редизайн посадочного талона на поезд"
introimg: intro.jpg
cover: true
cover_light: true
custom-css: true
medium_width: true
---

На некоторые поезда в Украине можно распечатать посадочный талон у себя на принтере и идти с ним в поезд. Талон выглядит так:

<figure>
  <img src="/i/blog/uz-boarding-pass/pass-current.png">
</figure>

Пассажиру приходится пробираться сквозь дебри технической информации в поисках самого важного. Даты и время, станции отправления и прибытия, номер поезда, вагон — всё это смешано с <code>2210700</code>, <code>КБ ФIРМ НШ</code> и прочими <code>П/Б ПРИДН</code>.

Есть и другие проблемы. Опишем их и набросаем быстрые решения.

<!-- more -->

- Главная информация должна быть максимально заметной. Нужно отделить ее от всех остальных данных:
    <figure>
      <img src="/i/blog/uz-boarding-pass/pass-current-main.png" alt="">
    </figure>
- Сейчас всё смешано в кашу. Хорошо бы разделить данные на смысловые блоки:
    <figure>
      <img src="/i/blog/uz-boarding-pass/pass-grid.png" alt="">
    </figure>
- Избыточная повторяемость. Нет никакой нужды писать много раз «Посадочний документ» и «Цей посадочний документ є підставою для проїзду».
- Информацию для пассажира нужно написать по-человечески. Например, нельзя писать так о страховке: <em>#СТР.ВІД Н/В 6000НЕОП.МІН. ПрАТ СК"РАРИТЕТ"...</em>
- Талон сильно громоздкий. Хочется уменьшить его по высоте, а размеры приблизить к привычным пропорциям авиа- и железнодорожных билетов.
- Нужно поработать над эстетикой. Сейчас слишком много ненужных рамок, четыре разных шрифта:
    <figure>
      <img src="/i/blog/uz-boarding-pass/pass-current-fonts.png" alt="">
    </figure>

---

Попробуем исправить эти проблемы и сверстать талон хорошо:

<div class="new-pass-wrapper">
  <figure>
    <img class="js-new-pass new-pass" data-vp-add-class="new-pass-animate" src="/i/blog/uz-boarding-pass/pass-redesign.png">
  </figure>
</div>

Было-стало:

<figure>
  <img src="/i/blog/uz-boarding-pass/before-after.jpg" alt="">
</figure>

Эволюция нового дизайна:

<figure class="js-slide-wrapper">
  <img class="js-slide js-slide-initial" src="/i/blog/uz-boarding-pass/evolution/1.png" style="display: block; border-radius: 0; box-shadow: 0 1px 2px #bbb;">
</figure>

<div>
  <input class="js-range" type="range" min="1" max="8" value="1" step="1">
  <div class="range-comment js-range-comment"></div>
</div>

<script src="/js/jquery.viewportchecker.min.js"></script>
<script src="/js/misc/rangeslider.js"></script>
<script>
  $(function(){
    $('.js-new-pass').viewportChecker({
      offset: 250,
      callbackFunction: function(elem, action){
        setTimeout(function(){}, 1500);
      }
    });

    $('.js-range').rangeslider({
      polyfill: false,
    });

    var comments = [
      'Первый подход — «метание». Попытка решить задачу сразу.', // 1
      'Группирую пункты отправления и прибытия с датами и временем, чтобы избавиться от лишних надписей. Время ставлю перед датой — оно важнее. Экспериментирую с рамками.', // 2
      'Отказываюсь от несистемных шрифтов, чтобы снизить время загрузки. Избавляюсь от лишних рамок. Привожу в порядок служебную информацию.', // 3
      'Значительно уменьшаю заголовок, такой большой никому не нужен.', // 4
      'Пробую добавить чуть больше воздуха. Отказываюсь от жирного начертания в главном блоке в пользу увеличения кегля — так аккуратнее и лучше.', // 5
      'Делаю всё чуть компактнее, добавляю напоминание предъявлять паспорт или права.', // 6
      'Уплотняю информацию еще сильнее и привожу в порядок верхнюю линию.', // 7
      'Осветляю рамки, правлю еще пару мелочей. Готово.', // 8
    ];

    $('.js-range-comment').text(comments[0]);
    

    $('.js-slide').load(function(){

      if ($(this).hasClass('js-slide-initial') ) {
        var height = $('.js-slide-initial').height();
        $('.js-slide-wrapper').css('height', height);
      }

      $('.js-slide-initial').removeClass('js-slide-initial');
    });

    //console.log(height);

    $('.js-range').on('input', function(){
      var val = $(this).val();
      var commentIndex = parseInt(val) - 1;

      $('.js-slide').attr('src', '/i/blog/uz-boarding-pass/evolution/' + val + '.png');
      $('.js-range-comment').text(comments[commentIndex]);
    });


    $.fn.preload = function() {
        this.each(function(){
            $('<img/>')[0].src = this;
        });
    }

    var imagesToPreload = [
      '/i/blog/uz-boarding-pass/evolution/2.png',
      '/i/blog/uz-boarding-pass/evolution/3.png',
      '/i/blog/uz-boarding-pass/evolution/4.png',
      '/i/blog/uz-boarding-pass/evolution/5.png',
      '/i/blog/uz-boarding-pass/evolution/6.png',
      '/i/blog/uz-boarding-pass/evolution/7.png',
      '/i/blog/uz-boarding-pass/evolution/8.png'
    ];
    $(imagesToPreload).preload();
  });
</script>
