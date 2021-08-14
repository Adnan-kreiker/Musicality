<template>
  <main>
    <!-- Introduction -->
    <section class=" h-screen"
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
    </section>
    <!-- Main Content -->
    <section class="">
      <div class=" songs-div  relative text-white flex flex-col">
        <div
          class="px-6 pt-6 pb-5 font-bold text-2xl headset-icon"
          v-icon-secondary="{ icon: 'headphones-alt', right: true}"
        >
          <span class="card-title">Songs</span>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item
            v-for="song in songs"
            :key="song.docID"
            :song="song"
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
  padding-right: 40px;

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
</style>
