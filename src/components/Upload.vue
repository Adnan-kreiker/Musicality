<template>
  <div class="divs rounded border border-green-400 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-green-400">
      <span class="card-title text-white">{{ $t('manage.upload') }}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl" />
    </div>
    <!-- Upload Dropbox -->
    <div class="p-6">
      <div
        class="w-full mb-8 px-10 py-20 rounded text-center cursor-pointer border border-dashed
            border-green-400 text-gray-400 transition duration-500 hover:text-white
            hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5 class=" text-white">
          {{ $t('manage.drop') }}
        </h5>
      </div>
      <label
        class=" border border-green-500 p-3 cursor-pointer"
        for="upload-file"
      >{{
        $t('manage.upload')
      }}</label>
      <input
        id="upload-file"
        type="file"
        multiple
        name="file"
        class=" hidden"
        @change="upload($event)"
      >
      <!-- <input type="file" multiple @change="upload($event)" /> -->
      <hr class="my-6">
      <!-- Progress Bar -->
      <div
        v-for="upload in uploads"
        :key="upload.name"
        class="mb-4"
      >
        <div
          class="font-bold text-sm"
          :class="upload.text_class"
        >
          <i class="upload.icon" /> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from '@/includes/firebase';

export default {
  name: 'Upload',
  props: ['addSong'],
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
  methods: {
    upload($event) {
      this.is_dragover = false;
      const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files];

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          console.log('unsupported file type');
          return;
        }

        if (!navigator.onLine) {
          this.uploads.push({
            taks: {},
            current_progress: 100,
            name: file.name,
            variant: 'bg-red-400',
            icon: 'fas fa-times',
            text_class: 'text-red-400',
          });
          return;
        }

        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${file.name}`);
        const task = songsRef.put(file);

        const uploadIndex = this.uploads.push({
          task,
          current_progress: 0,
          name: file.name,
          variant: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          text_class: '',
        }) - 1;

        task.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].current_progress = progress;
          },
          (error) => {
            this.uploads[uploadIndex].variant = 'bg-red-400';
            this.uploads[uploadIndex].icon = 'fas fa-times';
            this.uploads[uploadIndex].text_class = 'text-red-400';
            console.log(error);
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0,
            };

            song.url = await task.snapshot.ref.getDownloadURL();
            const songRef = await songsCollection.add(song);
            const songSnapshot = await songRef.get();
            this.addSong(songSnapshot);

            this.uploads[uploadIndex].variant = 'bg-green-400';
            this.uploads[uploadIndex].icon = 'fas fa-check';
            this.uploads[uploadIndex].text_class = 'text-green-400';
          },
        );
      });
    },
    // cancelUploads() {
    //   this.uploads.forEach((upload) => {
    //     upload.task.cancel();
    //   });
    // },
  },
};
</script>

<style scoped>
.divs {
  background: #5b5b5b5b;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid rgb(52, 211, 153);
  margin: 1em 0;
  padding: 0;
}
label:hover {
  background: rgb(52, 211, 153);
}
</style>
