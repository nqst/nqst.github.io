---
layout: project
permalink: /projects/tram-map/
title: Официальная схема трамвайных маршрутов Днепропетровска
description:
  year: 2013

hero:
  style: 'background-color: #f4f4f4;'
  image: hero.png
  figure:
    shadow: true
    rounded-corners: true

class: 'page-project'
extrahead: '<link rel="stylesheet" href="/css/posts/trams.css">'
---

Новая официальная схема заменила старую — в ней нельзя было разобраться и содержалось множество ошибок:

<figure>
  <img src="/i/projects/tram-map/old-map.jpg" alt="Старая схема трамвайных маршрутов">
</figure>

Благодаря сознательному отказу от строгой географической привязки, на новой схеме намного легче проложить любой маршрут поездки на трамвае. Каждый маршрут имеет свой цвет, линии выпрямлены, названия легко читаются.

Схему можно рассмотреть поближе [на большой картинке](/i/trams/trams-hi-res.png) или прямо здесь:

<script src="/js/draggable_background.js"></script>
<script>
  $(document).ready(function(){
    $('.trams-preview').backgroundDraggable();
  });
</script>

<div class="trams-preview"></div>

* * *

Проект был воплощен в жизнь в 2013 году, однако выполнен некачественно со стороны трамвайного управления: схемы не были расклеены во всех трамваях, а в некоторых трамваях схемы расклеили неаккуратно. О деталях создания схемы есть [большая заметка в блоге](/blog/map-story/).
