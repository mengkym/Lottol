<template>
  <div class="home-container">
    <div class="h-2/5">
        <div class="flex p-8">
          <van-icon class="text-xl" name="wap-nav" color="#dad7f3"/>
        </div>

        <div class="mx-8 mb-6 flex flex-col text-white text-2xl">
          <h1 class="font-bold">Choose</h1>
          <p>5 numbers</p>
        </div>

        <div class="number-input-wrap h-2/5 px-8 flex items-center space-x-4">
          <div class="w-1/5 h-4/6 p-3 bg-white rounded-full flex flex-col items-center justify-between text-xl font-semibold"
            v-for="index of 5" :key="index">
            <p>{{index}}</p>
            <van-icon v-if="index % 2 == 0" name="fire" color="#ff5959"/>
          </div>
        </div>
    </div>
    <div class="number-choose-wrap h-3/5 bg-white rounded-3xl rounded-b-none">
      <div class="w-full h-full p-8 rounded-3xl shadow">
          <div class="flex justify-between">
            <span class="text-xl font-semibold">02:41</span>
            <div class="text-xl space-x-4">
              <van-icon name="bar-chart-o" color="#dad7f3"/>
              <van-icon name="apps-o" color="#dad7f3"/>
            </div>
          </div>
          <!-- <div class="mt-4 flex flex-wrap space-y-2">
            <button class="number-block rounded-xl h-10 w-1/6" v-for="index of 30" :key="index">
              {{index}}
            </button>
          </div> -->
          <div class="mt-4 grid grid-cols-6 gap-4">
            <button class="number-block rounded-xl font-semibold"
              v-for="index of 30" :key="index"
              :class="{'checked': numbers.indexOf(index)!= -1}"
              @click="onSelect(index)">
              {{index}}
            </button>
          </div>
          <div class="1/6">
            <button class="payment-btn mt-8 rounded w-full h-16 text-white text-lg font-semibold shadow-xl">
              Make a Payment
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, unref, computed } from 'vue';
import { Button, ActionSheet, Dialog, Notify } from 'vant';
export default defineComponent({
    components: {
      [Button.name]:Button,
      [ActionSheet.name]:ActionSheet,
      [Dialog.Component.name]: Dialog.Component
    },
    setup() {
      const numbers = ref([])

      const isChecked = computed(() => {
        return false
      });

      function onSelect(index) {
        let findIdx = numbers.value.indexOf(index);
        if(findIdx == -1) {
          numbers.value.push(index)
        } else {
          numbers.value.splice(findIdx, 1);
        }
      }

      return {
        numbers,
        isChecked,
        onSelect
      }
    }
})
</script>

<style lang="less" scoped>
  .home-container {
    width: 100%;
    height: 100%;
    background-color: #443bc8;
      .number-input-wrap {
        color: #443bc8;
      }

    .number-choose-wrap {
      color: #443bc8;
      .number-block {
        width: 2.5rem;
        height: 2.5rem;
        background: #f3f3fb;
        &.checked {
          color: white;
          background: #ff5959;
        }
      }
      .payment-btn {
        background: #443bc8;
      }
    }
  }
</style>