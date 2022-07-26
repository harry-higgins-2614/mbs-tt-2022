<script setup>
import ExchangeRateService from '../services/ExchangeRateService';
import useGlobalStore from '../stores/global';
import SelectMenu from './SelectMenu.vue';
import NumberInput from './NumberInput.vue';
import BaseButton from './BaseButton.vue';


const global = useGlobalStore();

const convert = () => {

  // Why waste  a request if the input amount hasn't been filled?
  if (global.inputAmount === null || global.inputAmount === 0) {
    global.error = 'Please enter an amount to convert.';
    return;
  }


  // The "self" currency rate won't be present in the JSON, so would error in an ugly way if we didn't catch it here.
  if (global.inputCurrency?.code === global.outputCurrency?.code) { 
    global.error = "Please ensure currencies are different from one another.";
    return;
  }

  
  new ExchangeRateService(global.inputCurrency.code).getExchangeRates()
      .then((data) => {
        // Reset error state since we've achieved a response.
        global.error = null;
        
        // Get the rate from the response - toLowerCase the code to ensure property match.
        const rate = data.data[global.outputCurrency.code.toLowerCase()].rate;
        
        // the output will be the rate of conversion * the input amount.
        global.outputAmount = (rate * global.inputAmount)
        // to 2 decimal places.
            .toFixed(2);
      }).catch((error) => {
        // for any more obscure errors, display them to user. Not ideal but at this point they're unknowns.
        global.error = error;
      });
};

global.$subscribe((mutation) => {
  // So long as the current mutation is not changing the outputAmount state,
  // we should reset it (because the form has changed)
  if (mutation.events.key !== 'outputAmount') {
    global.outputAmount = null;
  }
});
</script>

<template>
  <div class="exchange-app" >
      <SelectMenu globalModel="inputCurrency" inputTitle="Exchange from"/>

      <NumberInput globalModel="inputAmount" inputTitle="How much?"/>

      <SelectMenu globalModel="outputCurrency" inputTitle="Exchange to"/>

        <div @click="convert">
        <BaseButton>
          <template #button-text>Exchange</template>
        </BaseButton>
        </div>


      <div v-if="global.outputAmount" class="output">
        Result
        <div>
          {{global.outputCurrency.symbol}} {{ global.outputAmount}}
        </div>
      </div>
      <div class="output--error" v-if="global.error">
        {{ global.error}}
      </div>

  </div>

</template>

<style scoped lang="scss">
.output {
  margin-top: 32px;
  line-height: 40px;
  border: 1px solid white;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 800;

  &--error {
    color: red;
  }
}
.exchange-app {
  margin-top: 32px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
  margin: 0 10vw;

}
</style>
