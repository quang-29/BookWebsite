<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'



const orders = ref([])
const loading = ref(false)

const fetchOrders = async () => {
  loading.value = true
  const token = localStorage.getItem('token')
  const user_info = localStorage.getItem('user-info')
  const user = JSON.parse(user_info)
  console.log(user.id)
  console.log(token)
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/order/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    orders.value = response.data.content
  } catch (err) {
    ElMessage.error('Không thể tải danh sách đơn hàng!')
    console.error(err)
  } finally {
    loading.value = false
  }
}


const statusType = (status) => {
  switch (status) {
    case 'PENDING':
      return 'warning'
    case 'SHIPPED':
      return 'success'
    case 'CANCELLED':
      return 'danger'
    default:
      return 'info'
  }
}


const viewOrder = (orderId) => {
  console.log('Xem đơn hàng:', orderId)

}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="order-list-container">
    <el-table :data="orders" v-loading="loading" style="width: 100%" border stripe highlight-current-row>
      <el-table-column prop="id" label="Mã đơn" width="100" />
      <el-table-column prop="createdAt" label="Ngày đặt" width="180" />
      <el-table-column prop="totalPrice" label="Tổng tiền" width="160">
        <template #default="{ row }">
          {{ row.totalPrice.toLocaleString('vi-VN') }} đ
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Trạng thái">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Hành động" align="center" width="140">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="viewOrder(row.id)">
            Xem
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<style scoped>
.order-list-container {
  padding: 40px;
  background: #f9f9f9;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}
</style>
