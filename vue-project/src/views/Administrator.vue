<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu
          :default-active="activeTab"
          @select="handleMenuSelect"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="orders">
            <el-icon><document /></el-icon>
            <span>Quản lý đơn hàng</span>
          </el-menu-item>
          <el-menu-item index="books">
            <el-icon><collection /></el-icon>
            <span>Quản lý sách</span>
          </el-menu-item>
          <el-menu-item index="users">
            <el-icon><user /></el-icon>
            <span>Quản lý người dùng</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <div v-if="activeTab === 'orders'">
            <h3>Danh sách đơn hàng</h3>
            <el-table :data="tableData">
              <el-table-column prop="date" label="Ngày" width="140" />
              <el-table-column prop="name" label="Khách hàng" width="120" />
              <el-table-column prop="address" label="Địa chỉ" />
            </el-table>
          </div>

          <div v-else-if="activeTab === 'books'">
            <h3>Danh sách sách</h3>
            <el-table :data="bookData">
              <el-table-column prop="title" label="Tiêu đề" />
              <el-table-column prop="author" label="Tác giả" />
              <el-table-column prop="year" label="Năm" width="100" />
            </el-table>
          </div>

          <div v-else-if="activeTab === 'users'">
            <h3>Danh sách người dùng</h3>
            <el-table :data="userData">
              <el-table-column prop="username" label="Tên đăng nhập" />
              <el-table-column prop="email" label="Email" />
              <el-table-column prop="role" label="Vai trò" width="100" />
            </el-table>
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Setting,
  Document,
  Collection,
  User,
} from '@element-plus/icons-vue'

const activeTab = ref('orders')

const handleMenuSelect = (key: string) => {
  activeTab.value = key
}

const tableData = ref([
  { date: '2025-07-01', name: 'Tom', address: 'Hà Nội' },
  { date: '2025-07-01', name: 'Anna', address: 'Hồ Chí Minh' },
])

const bookData = ref([
  { title: 'Sách A', author: 'Tác giả A', year: 2020 },
  { title: 'Sách B', author: 'Tác giả B', year: 2022 },
])

const userData = ref([
  { username: 'user1', email: 'user1@example.com', role: 'ADMIN' },
  { username: 'user2', email: 'user2@example.com', role: 'USER' },
])
</script>

<style scoped>
.layout-container-demo .el-header {
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
