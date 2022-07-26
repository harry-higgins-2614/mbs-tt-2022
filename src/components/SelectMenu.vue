<template>
    <div class="list-box">
        <span class="list-box__label"> {{ props.inputTitle }} </span>
        <div class="list-box__container">
            <div class="list-box__button" @click="open = !open">
                <span class="list-box__selected">
                    <img :src="'square-flags/'
                    + selected.code.toLowerCase() 
                    + '.svg'" class="list-box__flag"
                        @error="replaceImageWithPlaceholder" />
                    <span class="list-box__selected-name">
                        {{ selected.title }}
                    </span>
                </span>
                <span class="select-icon__container">
                    <SelectorIcon class="select-icon" aria-hidden="true" />
                </span>
            </div>

            <transition leave-active-class="list-box__transition--leave-active"
                leave-from-class="list-box__transition--leave-from"
                leave-to-class="list_box__transition--leave-to">
                <div class="list-box__options" v-if="open">
                    <div>
                        <div v-for="currency in currencies" :key="currency" @click="selected = currency; open = false"
                            :class="[currency == selected ? 'list-box__option--active' : 'list-box__option--inactive', 'list-box__option']">
                            <div class="list-box__option__inner">
                                <img :src="'square-flags/' + currency.code.toLowerCase() + '.svg'"
                                    @error="replaceImageWithPlaceholder" class="list-box__flag" />

                                <span
                                    :class="[selected ? 'list-box__inner__name--active' : 'list-box__inner__name--inactive', 'list-box__inner__name']">
                                    {{ currency.title }}
                                </span>
                            </div>

                            <span v-if="currency.code == selected.code"
                                :class="[currency == selected ? 'list-box__option__icon--active' : 'list-box__option__icon--inactive', 'list-box__option__icon']">
                                <CheckIcon class="" aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<style scoped lang="scss">
ul {
    display: block;
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
}


.list-box {
    min-width: 100%;

    &__flag {
        height: 24px;
        width: 24px;
        border-radius: 100%;
    }

    &__option {
        position: relative;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.75rem;
        padding-right: 2.25rem;
        cursor: default;
        user-select: none;
        list-style: none;

        &:hover {
            color: white;
            background: #4F46E5;
            cursor: pointer;
        }

        &__icon {

            display: flex;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            padding-right: 1rem;
            align-items: center;

            &--active {
                color: white;
            }

            &--inactive {
                color: #4F46E5;
            }

            &>* {
                width: 1.25rem;
                height: 1.25rem;
            }
        }

        &__inner {
            display: flex;
            align-items: center;
            column-gap: 0.75rem;
            margin-right: 2.5rem;
        }

        &__name {
            display: block;
            margin-left: 0.75rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &--active {

                font-weight: 600;
            }

            &--inactive {
                font-weight: 400;
            }
        }


        &--inactive {
            color: #111827;
        }

        &--active {
            color: white;
            background-color: #4F46E5;
        }
    }

    &__options {
        width: calc(100% - 10vw);
        overflow: auto;
        overflow-x: clip;
        position: absolute;
        z-index: 10;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        padding-right: 2.5rem;
        margin-top: 0.25rem;
        background-color: #ffffff;
        font-size: 1rem;
        line-height: 1.5rem;

        max-height: 14rem;
        border-radius: 0.375rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

        @media (min-width: 640px) {
            font-size: 0.875rem;
            line-height: 1.25rem;
        }
    }

    &__transition {

        &--leave-active {
            transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
            transition-duration: 100ms;
            transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        }

        &--leave-from {
            opacity: 1;
        }


        &--leave-to {
            opacity: 0;
        }
    }


    &__container {
        margin-top: 1em;
        position: relative;
    }

    &__button {
        position: relative;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.75rem;
        padding-right: 2.5rem;
        background-color: #ffffff;
        text-align: left;
        border-radius: 0.375rem;
        border-width: 1px;
        border-color: #D1D5DB;
        cursor: pointer;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);


        @media (min-width: 640px) {
            font-size: 0.875rem;
            line-height: 1.25rem;
        }

    }

    &__label {
        display: block;
        font-size: 0.9em;
        font-weight: 400;
    }

    &__selected {
        display: flex;
        align-items: center;
    }

    &__selected-name {
        display: block;
        margin-left: 0.75rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #000000;
    }
}

.select-icon {
    color: #9CA3AF;
    width: 1.25rem;
    height: 1.25rem;


    &__container {
        display: flex;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        padding-right: 0.5rem;
        margin-left: 0.75rem;
        align-items: center;
        pointer-events: none;
    }
}
</style>
<script setup>
import {ref, watch, defineProps} from 'vue';
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid';

import ExchangeRateService from '../services/ExchangeRateService';
import global from '../stores/global';


const currencies = ExchangeRateService.currencies;

const selected = ref(currencies[0]);
const open = ref(false);


const replaceImageWithPlaceholder = (e) => {
  e.target.src = 'square-flags/blank.svg';
};

const props = defineProps({
  globalModel: {
    default: '',
    type: String,
    required: true
  },
  inputTitle: {
    default: '',
    type: String,
    required: true
  },
});

watch(selected, () => {
  global().$patch((state) => {
    state[props.globalModel] = selected.value;
  });
}, {immediate: true});

</script>
