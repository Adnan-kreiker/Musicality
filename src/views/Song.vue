<template>
  <main
    id="player"
    class=" min-h-screen"
  >
    <!-- Music Header -->
    <section
      id="musicHeader"
      class=" mb-8 py-14 text-center text-white relative"
    >
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          id="play-button"
          type="button"
          class="z-50 h-24  w-24 text-3xl bg-white text-black rounded-full
        focus:outline-none"
          @click.prevent="newSong(song)"
        >
          <i
            class="fa text-gray-500 text-xl"
            :class="{ 'fa-play': !playing, 'fas fa-reply': playing }"
          />
          <!-- <i class="fas fa-play"></i> -->
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">
            {{ song.modified_name }}
          </div>
          <div>{{ song.genre }}</div>
          <div class="song-price">
            {{ $n(1, 'currency') }}
          </div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section
      id="comments"
      class="container mx-auto mt-6"
    >
      <div class=" comments-section rounded relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-green-400">
          <!-- Comment Count -->
          <span class="card-title">
            {{
              $tc('song.comment_count', song.comment_count, {
                count: song.comment_count,
              })
            }}</span>
          <select
            v-model="sort"
            class=" mt-4 py-1.5 inline text-white comments-section border border-green-500
            bg-gray-700
          "
          >
            <option value="1">
              {{ $t('song.sort1') }}
            </option>
            <option value="2">
              {{ $t('song.sort2') }}
            </option>
          </select>
          <i class="fa fa-comments float-right text-green-400 text-2xl" />
        </div>
        <div class="p-6">
          <div
            v-if="comment_show_alert"
            class="text-white text-center font-bold p-4 mb-4"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form
            v-if="userLoggedIn"
            :validation-schema="schema"
            @submit="addComment"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 transition
              duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            />
            <ErrorMessage
              class="text-red-600 block"
              name="comment"
            />
            <button
              :disabled="comment_in_submission"
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600"
            >
              {{ $t('song.button') }}
            </button>
          </vee-form>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        v-for="comment in sortedComments"
        :key="comment.docID"
        class=" p-3  mt-3 single-comment"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">
            {{ comment.name }}
          </div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>
          {{ comment.content }}
        </p>
      </li>
    </ul>
  </main>
</template>
<script>
import { songsCollection, commentsCollection, auth } from '@/includes/firebase';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Song',
  async beforeRouteEnter(to, from, next) {
    const docSnapshot = await songsCollection.doc(to.params.id).get();

    next((vm) => {
      if (!docSnapshot.exists) {
        vm.$router.push({ name: 'Home' });
        return;
      }
      const { sort } = vm.$route.query;
      // eslint-disable-next-line no-param-reassign
      vm.sort = sort === '1' || sort === '2' ? sort : '1';
      // eslint-disable-next-line no-param-reassign
      vm.song = docSnapshot.data();
      vm.getComments();
    });
  },
  data() {
    return {
      song: {},
      schema: {
        comment: 'required|min:3',
      },
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: 'bg-blue-500',
      comment_alert_message: 'Please wait! Your comment is being submitted',
      logged: false,
      comments: [],
      sort: '1',
    };
  },
  methods: {
    ...mapActions(['newSong']),
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = 'bg-blue-500';
      this.comment_alert_message = 'Please wait! Your comment is being submitted';

      const comment = {
        content: values.comment,
        datePosted: new Date().toLocaleString(),
        sid: this.$route.params.id,
        name: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(comment);
      this.song.comment_count += 1;
      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count,
      });
      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = 'bg-green-500';
      this.comment_alert_message = 'Comment added!';

      resetForm();
    },
    async getComments() {
      const snapshot = await commentsCollection.where('sid', '==', this.$route.params.id).get();

      this.comments = [];
      snapshot.forEach((doc) => [
        this.comments.push({
          docID: this.$route.params.id,
          ...doc.data(),
        }),
      ]);
    },
  },
  computed: {
    ...mapState({
      userLoggedIn: (state) => state.auth.userLoggedIn,
    }),
    ...mapGetters(['playing']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
    // sortedComments() {
    //   return this.comments.slice().sort();
    // },
  },
  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) {
        return;
      }
      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>

<style scoped>
main {
  color: white;
}
.comments-section {
  background-color: #161616;
}
.single-comment {
  background: #161616 !important;
}
.card-title {
  padding-right: 20px;
}
#musicHeader {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #20d862);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  margin: 0 20px;
  border-radius: 20px;
  min-height: 250px;
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
