<script setup>
import { ref, computed, onMounted } from 'vue'
import { Trash } from 'lucide-vue-next'
import { useFormatPrice } from '@/composable/useFormatPrice'


const { formatPrice } = useFormatPrice()
const cartItems = ref([])
onMounted(async() => {
    try {
        const response = await fetch('http://localhost:8080/api/book/getAllBooks?pageSize=4')
        const json = await response.json();
        cartItems.value = json.content.map(item => ({
        ...item,
        checked: false,
        quantity: 1
        }))
    } catch (err) {
        console.error("Failed to fetch cart: ", err)
    }
    })

const allChecked = computed({
  get: () => cartItems.value.every(item => item.checked),
  set: (val) => {
    cartItems.value.forEach(item => (item.checked = val))
  }
})

const totalPrice = computed(() =>
  cartItems.value
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const increaseQty = (item) => item.quantity++
const decreaseQty = (item) => {
  if (item.quantity > 1) item.quantity--
}
const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id)
}
</script>

<template>
  <div class="cart-wrapper">
    <div class="cart-left">
      <h2>GIỎ HÀNG ({{ cartItems.length }} sản phẩm)</h2>
      <div class="select-all">
        <input type="checkbox" v-model="allChecked" />
        <span>Chọn tất cả ({{ cartItems.length }} sản phẩm)</span>
      </div>

      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <input type="checkbox" v-model="item.checked" />

        <img :src="item.imagePath" class="thumb" />

        <div class="item-info">
          <p class="title">{{ item.title }}</p>
          <div class="prices">
            <span class="sale">{{ formatPrice(item.price) }}</span>
            <span class="original">500.000đ</span>
          </div>
        </div>

        <div class="qty">
          <button @click="decreaseQty(item)">-</button>
          <input type="text" :value="item.quantity" readonly />
          <button @click="increaseQty(item)">+</button>
        </div>

        <div class="subtotal">
          {{ formatPrice(item.price * item.quantity) }}
        </div>

        <button class="delete" @click="removeItem(item.id)"><Trash /></button>
      </div>
    </div>

    <div class="cart-right">

      <div class="summary">
        <p>Thành tiền:</p>
        <p>{{ formatPrice(totalPrice) }}</p>
        <p><strong>Tổng Số Tiền (gồm VAT):</strong></p>
        <h2>{{ formatPrice(totalPrice) }}</h2>
        <button class="checkout-btn" :disabled="totalPrice === 0">
          THANH TOÁN
        </button>
        <p class="note">(*Giảm giá trên web chỉ áp dụng cho bán lẻ)</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-wrapper {
  display: flex;
  gap: 32px;
  padding: 40px;
  background: #f4f4f4;
  color: black;
  font-size: 20px;
}

.cart-left {
  flex: 3;
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.cart-right {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-weight: 500;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #eee;
}

.thumb {
  width: 80px;
  height: 110px;
  object-fit: cover;
  border: 1px solid #ccc;
}

.item-info {
  flex: 1;
}

.item-info .title {
  font-size: 16px;
  font-weight: 500;
}

.prices {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.sale {
  color: red;
  font-weight: 600;
}

.original {
  color: #999;
  text-decoration: line-through;
}

.qty {
  display: flex;
  align-items: center;
  gap: 6px;
}

.qty button {
  padding: 4px 10px;
}

.qty input {
  width: 40px;
  text-align: center;
}

.subtotal {
  width: 100px;
  color: red;
  font-weight: bold;
  text-align: right;
}

.delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.promo, .gift {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
}

.btn-small {
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 8px;
  cursor: pointer;
}

.summary {
  background: white;
  padding: 20px;
  border-radius: 8px;
  font-size: 16px;
}

.summary h2 {
  color: red;
  margin: 8px 0;
}

.checkout-btn {
  width: 100%;
  padding: 12px;
  background: red;
  color: white;
  border: none;
  font-weight: bold;
  font-size: 16px;
  margin-top: 12px;
  border-radius: 6px;
  cursor: pointer;
}

.checkout-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.note {
  font-size: 12px;
  color: #888;
  text-align: center;
  margin-top: 10px;
}
</style>
