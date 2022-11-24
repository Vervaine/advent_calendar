<template>
    <label class="swap card place-content-stretch">
        <input type="checkbox" class="hidden"/>
        <div class="card-body" :class="isAllowedToBeDisplayed ? 'swap-off' : ''">
            <h3 class="text-center font-bold text-3xl backdrop-blur-sm bg-black/30 rounded-full w-16 px-1 py-2">{{ index }}</h3>
        </div>
        <div class="swap-on bg-white text-black py-3 px-4 font-semibold overflow-auto" style="box-shadow: inset 0 0 10px 2px rgba(0,0,0,0.75)" v-if="isAllowedToBeDisplayed">
            <p v-for="idea in sortedIdeas">
                <i v-if="idea.type === 1" class="ri-fire-fill text-red-500"></i>
                <i v-else-if="idea.type === 2" class="ri-hearts-fill"></i>
                <i v-else class="ri-mickey-line"></i>
                {{ idea.desc }}
            </p>
        </div>
    </label>
</template>

<script>
import moment from 'moment';

export default {
    name: "DayCard",
    props: ['ideas', 'index'],
    computed: {
        sortedIdeas() {
            return this.ideas.sort(function(ideaA, ideaB) {
                return (ideaA.type > ideaB.type) ? 1 : ((ideaB.type > ideaA.type) ? -1 : 0);
            } )
        },
      isAllowedToBeDisplayed() {
          const cardDate = moment('2022-12-' + this.index, 'YYYY-MM-DD');
          const today = moment();
          console.log(cardDate);
          console.log(today);
          console.log(today.isAfter(cardDate))
          return today.isAfter(cardDate);
      }
    },
}
</script>