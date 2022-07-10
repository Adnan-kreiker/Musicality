<template>
  <li
    :id="`song-id-${song.docID}`"
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition
 duration-300 song-item"
    :class="`song-id-${song.docID}`"
  >
    <div>
      <router-link
        v-slot="{ navigate }"
        :to="{ name: 'Song', params: { id: song.docID } }"
        class="font-bold block text-white composition-name"
      >
        <span @click="navigate"> {{ song.modified_name }}</span>
      </router-link>
      <span class=" text-gray-500 text-sm">
        {{ song.display_name }}
      </span>
    </div>
    <div class="text-gray-600 text-lg">
      <router-link
        v-slot="{ navigate }"
        custom
        :to="{ name: 'Song', params: { id: song.docID }, hash: '#comments' }"
      >
        <span
          class="comments"
          @click="navigate"
        >
          <i class="fa fa-comments text-gray-600" />
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SongItem',
  props: ['song'],
};
</script>

<style scoped>
.song-item:hover {
  background: #353535;
}
li {
  border-radius: 30px;
}
</style>
