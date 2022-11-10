<template>
    <div class="my-4 flex justify-center">
        <h1 class="text-4xl font-bold tracking-widest">Pick a day to edit</h1>
    </div>
    <RadioGroup v-model="daySelected" class="mt-2">
        <div class="flex gap-4 justify-center">
            <RadioGroupOption as="template" v-for="day in days" :key="day.nb" :value="day" v-slot="{ active, checked }"
                              class="card py-6">
                <div
                    :class="[active ? 'ring-2 ring-offset-2 ring-indigo-500' : '', checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-gray-700 border-gray-900 hover:bg-gray-600', 'cursor-pointer focus:outline-none border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1']">
                    <RadioGroupLabel as="span" class="card-title text-2xl">{{ day.nb }}</RadioGroupLabel>
                </div>
            </RadioGroupOption>
        </div>
    </RadioGroup>
    <hr/>
    <EditDayForm v-if="daySelected" :day="daySelected"></EditDayForm>
</template>

<script>
import {RadioGroup, RadioGroupLabel, RadioGroupOption} from '@headlessui/vue'
import EditDayForm from "../components/EditDayForm.vue";

export default {
    name: "Odd",
    components: {
        EditDayForm,
        RadioGroup, RadioGroupLabel, RadioGroupOption
    },
    data() {
        return {
            daySelected: null,
            days: []
        }
    },
    mounted() {
        for (let i = 1; i <= 25; i += 2) {
            this.days.push({
                'nb': i
            })
        }
    }

}
</script>