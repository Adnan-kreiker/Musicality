<template>
  <main>
    <!-- Introduction -->
    <section id="main-section" class=" h-screen"
    style="background: black">
    <div class=" flex">
        <div class="text-white main-text flex-auto">
          <p class="  text-7xl font-bold ml-3 mb-5">{{ $t('home.listen') }}</p>
          <p class=" text-lg md:w-8/12 ml-3">{{ $t('home.description')}}
          </p>
        </div>
      <div class=" flex-none">
        <img class="main-pic" src="assets/img/phone.png" alt="">
      </div>
    </div>
     <a href="#songs">
           <button class="animate__animated animate__slideInDown">VIEW SONGS</button>
     </a>
    </section>
    <!-- Main Content -->
    <section id="songs">
      <div class=" songs-div  relative text-white flex flex-col">
        <div
          class="px-6 pt-6 pb-5 font-bold text-2xl headset-icon"
          v-icon-secondary="{ icon: 'headphones-alt', right: true}"
        >
          <span  class="card-title">Songs</span>
        </div>
        <!-- Playlist -->
        <ol id="playlist" >
          <app-song-item
            v-for="song in songs"
            :key="song.docID"
            :song="song"
            class="  animate__animated animate__slideInLeft animate__slow"
          />
        </ol>
        <!-- .. end Playlist -->
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
      maxPerPage: 7,
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

.main-pic {
  height: 500px;
  padding-right: 80px;
  padding-top: 40px;

}
.main-text{
  padding-left: 40px;
  padding-top: 80px;
  font-size: 1rem;
}
.songs-div {
  background: #161616;
}
#playlist{
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
}
button, button::after {
  width: 380px;
  height: 86px;
  font-size: 36px;
  background: linear-gradient(45deg, transparent 5%, #6b2b4a 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  line-height: 88px;
  box-shadow: 6px 0px 0px #6b2b4a;
  outline: transparent;
  position: relative;
  bottom: 20%;
  left: 10%;
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
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #FF013C 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
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
</style>
