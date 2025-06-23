<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')

const hello = "MY NAME IS QUANG";
import {ref,reactive, computed} from 'vue';


const book = reactive({
  title: "Tôi thấy hoa vàng trên cỏ xanh",
  author: "Nguyễn Nhật Ánh",
  price: 200000,
});

const show = ref(false);

const student = reactive({ name: 'Ngo Van Giang'});
const student2 = ref({ name: 'Ngo Van Giang'});

student = { name: 'Ngo Van Quang'}
student2.value = { name: 'Ngo Van Quang'}

const total = computed(() => {

})


const count = ref();
count.value = 1;

const OnClick = () => {
  show.value = !show.value
}
const increase = () => {
  count.value++;
}

// watch( () => props.categoryId,()) => { print(...)}, { deep: true } )
</script>
<template>


</template>

<style>
.header {
  color: green;
}
.button {
  padding: 16px 8px;
  border-radius: 12px;
  border: none;
  background-color: linear-gradient(#220336,#6c40c9);
}
.showInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.result {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
