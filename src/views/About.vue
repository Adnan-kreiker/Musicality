<template>
<div class="main-section grid grid-cols-2">
  <div class="about h-screen  text-white">
    <p class=" text-white text-base">What is Musicality?</p> <br>
    <p class=" text-4xl font-bold">Musicality is a music sharing platform
      bringing people together through unique
      experience and amazing experience</p>
  </div>
  <div class=" relative overflow-hidden">
    <img class=" block absolute -right-80 animate__animated
     animate__slideInRight" src="/assets/img/songs.png">
  </div>
</div>

</template>

<style scoped>
img{
  height: 500px;
  right: -100px;

}
.about{
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
</style>
