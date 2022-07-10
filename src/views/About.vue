<template>
  <div class="main-section grid grid-cols-2">
    <div class="about h-screen  text-white">
      <p class=" what-is text-white text-base">
        {{ $t('home.whatIs') }}
      </p>
      <br>
      <p class=" txt-desc text-4xl font-bold">
        {{ $t('home.homeDesc') }}
      </p>
    </div>
    <div class=" relative overflow-hidden">
      <img
        class=" block absolute -right-80 animate__animated
     animate__slideInRight"
        src="/assets/img/songs.png"
      >
    </div>
  </div>
</template>

<style scoped>
img {
  height: 500px;
  min-width: 500px;
  right: -150px;
}
.about {
  margin-top: 40px;
  margin-left: 100px;
}

.main-section {
  background: linear-gradient(-45deg, #000000, #15a8a1, #12b362, #010503);
  background-size: 100% 100%;
  /* animation: gradient 3s ease infinite; */
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@media (max-width: 780px) {
  img {
    display: none;
  }
  .about {
    grid-column-end: span 2;
    margin-left: 0;
  }
  .what-is {
    font-size: 1.5rem;
    text-align: left !important;
  }
  .txt-desc {
    line-height: 1.3;
    text-shadow: 1px 1px 0px #000000;
  }
  .main-section {
    padding-top: 40px;
    height: 70vh;
    padding-left: 40px;
  }
}
@media (max-width: 780px) {
  .txt-desc {
    font-size: 1.5em;
  }
}
</style>
