<template>
<div class="number-input">
  <label :for="props.inputTitle" class="number-input__label">{{ props.inputTitle}}</label>
  <div class="number-input__container">
    <div class="number-input__prefix">
      <span class=""> {{global().inputCurrency?.symbol }} </span>
    </div>
    <input type="number" v-model="inputAmount" :name="props.inputTitle" :id="props.inputTitle" class="number-input__input" placeholder="">
  </div>
</div>
</template>

<style scoped lang="scss">
.number-input { 

    &__label { 
        display: block;
        align-self: flex-start;
        font-size: 0.9em;

        font-weight: 400;
    }

    &__container { 
        width: 100%;
        margin-top: 0.25rem;
        position: relative;
        border-radius: 0.25rem;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }
    &__prefix { 
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        padding-left: 0.75rem;
        display: flex;
        align-items: center;
        pointer-events: none;
        color: gray;
    }

    &__input { 
        width: calc(100% - 4rem);
        margin-top: 0.85rem;
        height: 40px;
        display: block;
        padding-left: 4rem;
        border-radius: 0.5rem;
        color: gray;
        outline: none;
        border: none;
        
    }
}
</style>

<script setup>
import global from '../stores/global';
import { defineProps, watch, ref } from 'vue';


const props = defineProps({
    globalModel: { 
        default: '',
        required: true,
        type: String
    },
    inputTitle: { 
        default: '',
        required: true,
        type: String
    }
})

const inputAmount = ref(0);



watch(inputAmount, () => { 
    global().$patch((state) => { 
        state[props.globalModel] = inputAmount.value
    })
})

</script>