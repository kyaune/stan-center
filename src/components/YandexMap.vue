<template>
  <div id="yamap" class="yamap"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

let mapInstance: any = null

onMounted(() => {
  // проверяем доступность API
  if (!window.ymaps) {
    console.error("Yandex Maps API не загружен")
    return
  }

  window.ymaps.ready(initMap)
})

onBeforeUnmount(() => {
  // уничтожаем карту, чтобы избежать утечек памяти
  if (mapInstance) {
    mapInstance.destroy()
    mapInstance = null
  }
})

function initMap() {
  mapInstance = new window.ymaps.Map("yamap", {
    center: [54.717551, 20.509842], // координаты Стан-Центра
    zoom: 15,
    controls: ["zoomControl"],
  })

  const placemark = new window.ymaps.Placemark(
    [54.717551, 20.509842],
    {
      balloonContent: "АНО «Стан-Центр», Минская 25",
      hintContent: "Стан-Центр",
    },
    {
      preset: "islands#redIcon",
    }
  )

  mapInstance.geoObjects.add(placemark)
}
</script>

<style scoped>
.yamap {
  width: 100%;
  height: 400px;
  border-radius: 12px;
}
</style>
