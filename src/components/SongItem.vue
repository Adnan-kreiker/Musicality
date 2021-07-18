<template>
<li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition
 duration-300 hover:bg-gray-50 example " :id="`song-id-${song.docID}`"
 :class="`song-id-${song.docID}`">
  <div>
    <router-link :to="{ name: 'Song', params: { id: song.docID }, hash: '#musicHeader'}"
      v-slot="{ navigate }"
      class="font-bold block text-gray-600 composition-name">
   <span @click="navigate"> {{ song.modified_name }}</span>
    </router-link>
    <span class="text-gray-500 text-sm">
      {{ song.display_name }}
    </span>
  </div>
  <div class="text-gray-600 text-lg">
    <router-link custom :to="{ name: 'Song', params: { id: song.docID}, hash: '#comments'}"
      v-slot="{ navigate }">
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

<style>

</style>
