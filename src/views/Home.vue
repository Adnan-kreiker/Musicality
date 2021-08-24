<template>
  <main>
    <!-- Introduction -->
    <section id="main-section" style="background: black">
      <div class=" grid-cont">
        <div class="text-white main-text place-self-center">
          <p class=" main-par font-bold mb-5">{{ $t('home.listen') }}</p>
          <p class=" txt-desc text-3xl">{{ $t('home.description') }}</p>
          <router-link :to="{ path: '/', hash: '#songs' }">
            <button class="animate__animated animate__slideInDown break-words">
              {{ $t('home.button') }}
            </button>
          </router-link>
        </div>
        <img
          class="main-pic block place-self-center row-span-1"
          src="assets/img/phone.png"
          alt=""
        />
      </div>
    </section>
    <!-- Main Content -->
    <section id="songs">
      <div class=" songs-div  relative text-white flex flex-col">
        <div class=" song-icon">
          <span class="card-title text-2xl">{{ $t('home.songs') }}</span>
          <span
            class="px-6 pt-6 pb-5 font-bold text-2xl inline headset-icon"
            v-icon-secondary="{ icon: 'headphones-alt', right: true }"
          ></span>
        </div>

        <!-- <p  class="card-title">{{ $t('home.songs')}}</p> -->
        <!-- </span> -->
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item
            v-for="song in songs"
            :key="song.docID"
            :song="song"
            class="  animate__animated animate__slideInLeft animate__slow"
          />
        </ol>
        <!-- .. end of Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { songsCollection } from '@/includes/firebase';
// eslint-disable-next-line import/no-extraneous-dependencies
import AppSongItem from '@/components/SongItem.vue';
import IconSecondary from '../directives/icon-secondary';

export default {
  name: 'Home',
  components: {
    AppSongItem,
  },
  directives: {
    'icon-secondary': IconSecondary,
  },
  data() {
    return {
      songs: [],
      maxPerPage: 10,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      let snapshot;

      if (this.songs.length) {
        const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docID).get();
        snapshot = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshot = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
      }
      snapshot.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });
      this.pendingRequest = false;
    },
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
  },
};
</script>

<style scoped>
.grid-cont {
  display: grid;
  justify-content: center;
  grid-template-columns: 55% 40%;
}
.main-pic {
  height: 500px;
  /* height: 30vw; */
  /* padding-right: 80px; */
  /* padding-top: 40px; */
}
.main-text {
  margin-top: 40px;
  padding-left: 50px;
  font-size: 4rem;
  align-self: stretch !important;
}
.txt-desc {
  margin-bottom: 15px;
}
.songs-div {
  background: #161616;
}
#playlist {
  padding-left: 40px;
  padding-right: 40px;
}
.card-title {
  color: #20d862 !important;
}
.headset-icon {
  margin-right: 40px !important;
}
#main-section {
  background-image: linear-gradient(to right, #00b09b, #96c93d) !important;
  min-height: 88vh;
}
button,
button::after {
  width: 25vw;
  /* margin-left: 10px; */
  height: 6vw;
  font-size: clamp(1rem, 2vw, 2rem);
  background: linear-gradient(45deg, transparent 5%, #6b2b4a 5%);
  border: 0;
  color: #fff;
  padding-bottom: 0px;
  letter-spacing: 3px;
  box-shadow: 6px 0px 0px #6b2b4a;
  outline: transparent;
}

button::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);

  content: 'AVAILABLE NOW';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00e6f6 3%, #00e6f6 5%, #ff013c 5%);
  text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
  clip-path: var(--slice-0);
}

button:hover::after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}
.song-icon {
  margin: 20px 40px !important;
}
@media screen and (max-width: 870px) {
  button,
  button::after {
  }
}
@media screen and (max-width: 811px) {
  .main-text {
    font-size: 3rem;
  }
}
@media screen and (max-width: 768px) {
  .main-pic {
    display: none;
  }
  .grid-cont {
    grid-template-columns: 1fr;
  }
  button,
  button::after {
    width: 30vw !important;
    height: 8vw !important;
    font-size: 0.8rem;
    line-height: 22px;
  }
  .main-text {
    font-size: 3.5rem;
    margin-right: 40px;
    margin-top: 60px;
  }
  .txt-desc {
    font-size: 1.5rem;
    line-height: 1.3;
  }
  button {
    margin-left: 13px !important;
  }
}
@media screen and (max-width: 589px) {
  .main-text {
    font-size: 2.5rem;
  }
  .txt-desc {
    font-size: 1.5rem;
  }
  button {
    margin-bottom: 30px;
    font-size: 0.8rem;
    width: 40vw !important;
    height: 6vh !important;
  }
}
@media screen and (max-width: 432px) {
  .main-text {
    font-size: 1.6rem !important;
    margin-right: 40px;
  }
  .txt-desc {
    font-size: 1rem;
    line-height: 1.3;
  }
  button {
    margin-bottom: 30px;
    font-size: 0.7rem;
    width: 40vw !important;
    height: 6vh !important;
  }
}
</style>
