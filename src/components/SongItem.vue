<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition
 duration-300 song-item"
    :id="`song-id-${song.docID}`"
    :class="`song-id-${song.docID}`"
  >
    <div>
      <router-link
        :to="{ name: 'Song', params: { id: song.docID } }"
        v-slot="{ navigate }"
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
        custom
        :to="{ name: 'Song', params: { id: song.docID }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
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
