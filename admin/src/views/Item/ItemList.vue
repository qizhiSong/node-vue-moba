<template>
  <div class="category_list">
    <h1>装备列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="装备名称"></el-table-column>
      <el-table-column prop="icon" label="装备图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" :alt="scope.row.name" style="height:3rem; border-radius:3rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 2rem; float: right;"
      @size-change="pageSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      firstid: '',
      lastid: '',
      pageSizes: [10, 20, 50, 100],
      pagesize: 10,
      querySize: 0,
      currentPage: 1,
      totalCount: 0,
    };
  },
  methods: {
    pageSizeChange(val){
      this.pagesize = val
      this.currentPage = 1
      this.querySize = this.pagesize * this.currentPage
      this.lastid = ''
      this.fetch()
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.fetch()
    },
    async fetch() {
      const res = await this.$http.get('rest/items', {
        params: {
          lastid: this.lastid, 
          pagesize: this.pagesize
          }
        });
      this.items = res.data.datas
      this.totalCount = res.data.totalCount
      this.firstid
      this.lastid = this.items.length > 0 && this.items[this.items.length - 1]._id
    },
    async remove(row) {
      this.$confirm(`是否确定要删除装备 "${row.name}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        const res = await this.$http.delete(`rest/items/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      })
    }
  },
  created() {
    this.fetch();
  }
};
</script>