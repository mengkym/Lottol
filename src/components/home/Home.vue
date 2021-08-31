<template>
  <div class="home-container">
    <div class="h-2/5">
        <div class="flex p-8">
          <van-icon class="text-xl" name="wap-nav" color="#dad7f3"/>
        </div>

        <div class="mx-8 mb-6 flex flex-col text-white text-2xl">
          <h1 class="font-bold">Choose</h1>
          <p>{{len}} numbers</p>
        </div>

        <div class="number-input-wrap h-2/5 px-8 flex items-center space-x-4">
          <div class="number-cell min-w-1/5 w-1/5 h-4/6 p-3 bg-black bg-opacity-10 rounded-full flex flex-col items-center justify-between text-xl font-semibold"
            :class="{'inputed': !!sortedArr[index - 1]}"
            v-for="index of len" :key="index">
            <p>{{sortedArr[index - 1]}}</p>
            <van-icon v-if="sortedArr[index - 1] % 2 == 0" name="fire" color="#ff5959"/>
          </div>
        </div>
    </div>
    <div class="number-choose-wrap h-3/5 bg-white rounded-3xl rounded-b-none enter-y">
      <div class="w-full h-full p-8 rounded-3xl shadow">
          <div class="flex justify-between">
            <span class="text-xl font-semibold">{{time}}</span>
            <div class="text-xl space-x-4">
              <van-icon name="replay" color="#dad7f3" @click="random(0)"/>
              <van-icon name="cluster-o" color="#dad7f3"/>
            </div>
          </div>
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

<script lang="ts">
import { defineComponent, ref, unref, computed, onBeforeUnmount } from 'vue';
import { Button, ActionSheet, Dialog, Notify } from 'vant';
import moment from 'moment';
export default defineComponent({
    components: {
      [Button.name]:Button,
      [ActionSheet.name]:ActionSheet,
      [Dialog.Component.name]: Dialog.Component
    },
    setup() {
      const len = ref(5);
      const end = 30;
      const numbers: any = ref([]);
      const time: any = ref(moment().format('HH:mm'));

      const sortedArr = computed(() => {
        return numbers.value.sort((a,b)=>{
          return a - b
        });
      });

      const timer = setInterval(() => { 
        time.value = moment().format('HH:mm')
      }, 1000);

      function random(index) {
        let ary: Array<number> = [];
        for(var i = 0; i < end; i++){
          ary[i] = i+1;
        }
        for(var i = 0; i < len.value ; i++) {
          let id = 0;
          id = Math.ceil(Math.random() * end - 1);
          numbers.value[i] = ary[id];
        }   
      }

      function onSelect(index: number) {
        let findIdx = numbers.value.indexOf(index);
        if(findIdx == -1) {
          if(numbers.value.length < len.value) {
            numbers.value.push(index)
          } else {
            numbers.value.pop();
            numbers.value.push(index);
          }
        } else {
          numbers.value.splice(findIdx, 1);
        }
      }

      onBeforeUnmount(()=>{
        clearInterval(timer)
      })

      return {
        len,
        numbers,
        time,
        timer,
        sortedArr,
        random,
        onSelect
      }
    }
})
</script>

<style lang="less" scoped>
@import '../../style/color.less';
  .home-container {
    width: 100%;
    height: 100%;
    background-color: @theme-blue;
      .number-input-wrap {
        color: @theme-blue;
        .number-cell {
          &.inputed {
            background: white;
            opacity: 1;
          }
        }
      }

    .number-choose-wrap {
      color: @theme-blue;
      .number-block {
        width: 2.5rem;
        height: 2.5rem;
        background: #f3f3fb;
        &.checked {
          color: white;
          background: @theme-red;
        }
      }
      .payment-btn {
        background: @theme-blue;
      }
    }
  }
</style>