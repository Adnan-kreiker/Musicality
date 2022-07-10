<template>
  <section class="container wrapper text-white mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1 wrapper">
        <app-upload
          ref="upload"
          :add-song="addSong"
        />
      </div>
      <div class="col-span-2 wrapper">
        <div class="divs rounded border border-green-400 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-green-400">
            <span class="card-title">{{ $t('manage.my_songs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl" />
          </div>
          <div class="p-6">
            <composition-item
              v-for="(song, index) in songs"
              :key="song.docID"
              :song="song"
              :update-song="updateSong"
              :index="index"
              :remove-song="removeSong"
              :update-unsaved-flag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import AppUpload from '@/components/Upload.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { songsCollection, auth } from '@/includes/firebase';

export default {
  name: 'Manage',
  components: {
    AppUpload,
    CompositionItem,
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      next(leave);
    }
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'Home' });
  //   }
  // },
};
</script>

<style scoped>
.wrapper{
  background: #161616;
}
.divs {
  background: #5b5b5b5b;
}
</style>
