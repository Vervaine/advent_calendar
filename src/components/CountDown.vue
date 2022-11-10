<template>
    <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div class="flex flex-col p-2 bg-gray-800 rounded-box text-gray-100 shadow shadow-gray-700">
            <span class="countdown font-mono text-5xl">
                <span :style="'--value:' + months"></span>
            </span> months
        </div>
        <div class="flex flex-col p-2 bg-gray-800 rounded-box text-gray-100 shadow shadow-gray-700">
            <span class="countdown font-mono text-5xl">
                <span :style="'--value:' + days"></span>
            </span> days
        </div>
        <div class="flex flex-col p-2 bg-gray-800 rounded-box text-gray-100 shadow shadow-gray-700">
            <span class="countdown font-mono text-5xl">
                <span :style="'--value:' + hours"></span>
            </span> hours
        </div>
        <div class="flex flex-col p-2 bg-gray-800 rounded-box text-gray-100 shadow shadow-gray-700">
            <span class="countdown font-mono text-5xl">
                <span :style="'--value:' + min"></span>
            </span> min
        </div>
        <div class="flex flex-col p-2 bg-gray-800 rounded-box text-gray-100 shadow shadow-gray-700">
            <span class="countdown font-mono text-5xl">
                <span :style="'--value:' + sec"></span>
            </span> sec
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "CountDown",
    data() {
        return {
            months: null,
            days: null,
            hours: null,
            min: null,
            sec: null,
            interval: null,
        }
    },
    methods: {
        getInterval(){
            const christmas = '2022-12-25:00:00:00';

            let duration = moment.duration(moment(christmas).diff(moment()))
            this.months = duration.months();
            this.days = duration.days();
            this.hours = duration.hours();
            this.min = duration.minutes();
            this.sec = duration.seconds();
        }
    },
    mounted() {
        this.getInterval();
        let self = this;
        this.interval = setInterval(function () {
            self.getInterval();
        }, 1000);
    },
    unmounted() {
        clearInterval(this.interval);
    }
}
</script>

<style scoped>

</style>