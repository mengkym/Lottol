<template>
  <div class="home-container">
    <div class="h-2/5">
        <div class="flex p-8">
          <van-icon class="text-xl" name="wap-nav" color="#dad7f3"/>
        </div>

        <div class="mx-8 mb-6 flex flex-col text-white text-2xl">
          <h1 class="font-bold">Choose</h1>
          <p>{{len}} Numbers</p>
        </div>

        <div class="number-input-wrap h-2/5 px-8 mx-auto overflow-hidden flex items-center justify-center space-x-2">
          <div class="number-cell p-3 bg-black bg-opacity-10 rounded-full flex-none flex flex-col items-center justify-between text-lg font-semibold"
            :class="{'inputed': !!sortedArr[index - 1]}"
            v-for="index of len - 1" :key="index">
            <p>{{sortedArr[index - 1]}}</p>
            <van-icon v-if="sortedArr[index - 1] % 2 == 0" name="fire" color="#ff5959"/>
          </div>
          <div class="number-cell p-3 bg-black bg-opacity-50 rounded-full flex-none flex flex-col items-center justify-between text-lg font-semibold"
            :class="{'inputed': blueNumber}">
            <p>{{blueNumber}}</p>
          </div>
        </div>
    </div>
    <div class="number-choose-wrap h-3/5 bg-white rounded-3xl rounded-b-none enter-y">
      <div class="w-full h-full p-8 rounded-3xl shadow overflow-hidden flex flex-col">
          <div class="flex justify-between">
            <span class="text-xl font-semibold">{{time}}</span>
            <div class="text-xl space-x-4 pr-2">
              <van-icon class="number-choose-tool mr-1" name="replay" color="#dad7f3" @click="random(0)"/>
              <van-icon class="number-choose-tool" name="cluster-o" color="#dad7f3"/>
            </div>
          </div>
          <div class="number-block-wrap mt-4 grid grid-cols-6 gap-4">
            <button class="number-block rounded-xl font-semibold"
              v-for="index of endRed" :key="index"
              :class="{'checkedRed': redNumbers.indexOf(index)!= -1, 'checkedBlue': blueNumber == index}"
              @click="onSelectRed(index)">
              {{index}}
            </button>
            <!-- <button class="number-block rounded-xl font-semibold"
              v-show="isLastOne"
              v-for="index of endBlue" :key="index"
              :class="{'checked': blueNumber == index}"
              @click="onSelectBlue(index)">
              {{index}}
            </button> -->
          </div>
          <button class="payment-btn mt-4 rounded w-full h-16 text-white text-lg font-semibold shadow-xl">
              Make a Payment
          </button>
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
      const len = ref(7);
      const endRed = 33;
      const endBlue = 16;
      const redNumbers: any = ref([]);
      const blueNumber: any = ref();
      const time: any = ref(moment().format('HH:mm'));

      const sortedArr = computed(() => {
        return redNumbers.value.sort((a,b)=>{
          return a - b
        });
      });

      const isLastOne = computed(() => {
        return redNumbers.value.length == len.value - 1;
      });

      const timer = setInterval(() => { 
        time.value = moment().format('HH:mm')
      }, 1000);

      function random(index) {
        let ary: Array<number> = [];
        for(var i = 0; i < endRed; i++){
          ary[i] = i+1;
        }
        ary.sort(function(){
        　　return 0.5 - Math.random();
        });
        for(var i = 0; i < len.value - 1 ; i++) {
          redNumbers.value[i] = ary[i];
        }   

        blueNumber.value = Math.floor(Math.random() * (endBlue - 1)) + 1;
      }

      function onSelectRed(index: number) {
        let findIdx = redNumbers.value.indexOf(index);
        if(findIdx == -1) {
          if(redNumbers.value.length < len.value - 1) {
            redNumbers.value.push(index)
          } else {
            redNumbers.value.pop();
            redNumbers.value.push(index);
          }
        } else {
          redNumbers.value.splice(findIdx, 1);
        }
      }

      function onSelectBlue(index: number) {
        if(blueNumber.value != index) {
          blueNumber.value = index;
        } else {
          blueNumber.value = null;
        }
        
      }

      onBeforeUnmount(()=>{
        clearInterval(timer)
      })

      return {
        len,
        endRed,
        endBlue,
        redNumbers,
        blueNumber,
        time,
        timer,
        sortedArr,
        isLastOne,
        random,
        onSelectRed,
        onSelectBlue
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
          width: 2.5rem;
          height: 5rem;
          &.inputed {
            background: white;
            opacity: 1;
          }
        }
      }

    .number-choose-wrap {
      color: @theme-blue;
      .number-choose-tool {
        font-size: 26px;
        &:active {
          color: @theme-blue !important;
        }
      }

      .number-block-wrap {
        margin: auto;
        margin-top: 1rem;
        .number-block {
          width: 2.5rem;
          height: 2.5rem;
          background: #f3f3fb;
          &.checkedRed {
            color: white;
            background: @theme-red;
          }
          &.checkedBlue {
            color: white;
            background: @theme-blue;
          }
          &.checkedRed.checkedBlue {
            background: linear-gradient(45deg, @theme-red 0%, @theme-red 50%, @theme-blue 0%, @theme-blue 50%);
          }
        }
      }
      
      .payment-btn {
        flex-shrink: 0;
        background: @theme-blue;
      }
    }
  }
</style>