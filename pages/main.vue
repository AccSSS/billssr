<template>
    <div class="main-container">
        <el-card class="box-card" v-loading="loading"  element-loading-spinner="el-icon-loading">
            <div slot="header" class="clearfix">
                <div class="title">
                    总览
                </div>
            </div>
            <div>
                <div class="total-money">
                    总计： {{mainData.sum}} 人均 ：{{mainData.per}}
                </div>
                <el-table
                    :data="mainData.billList"
                    stripe
                    style="width: 100%"
                    class="pc-table">
                    <el-table-column
                    prop="time"
                    label="日期"
                    width="100px">
                    </el-table-column>
                    <el-table-column
                    prop="type"
                    label="类型">
                    </el-table-column>
                    <el-table-column
                    prop="money"
                    label="花费">
                    </el-table-column>
                    <el-table-column
                    prop="username"
                    label="成员">
                    </el-table-column>
                    <el-table-column
                    prop="descr"
                    label="备注">
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    width="120px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="jumpToBill(scope.row)"></el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteBill(scope.row)"></el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <el-table
                    :data="mainData.billList"
                    style="width: 100%"
                    class="mobile-table">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="时间:">
                                    <span>{{ props.row.time }}</span>
                                </el-form-item>
                                <el-form-item label="类型:">
                                    <span>{{ props.row.type }}</span>
                                </el-form-item>
                                <el-form-item label="花费:">
                                    <span>{{ props.row.money }}</span>
                                </el-form-item>
                                <el-form-item label="成员:">
                                    <span>{{ props.row.username }}</span>
                                </el-form-item>
                                <el-form-item label="备注:">
                                    <span>{{ props.row.descr }}</span>
                                </el-form-item>
                                <el-form-item label="操作:">
                                    <span>
                                        <el-button type="primary" icon="el-icon-edit" @click="jumpToBill(props.row)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" @click="deleteBill(props.row)"></el-button>
                                    </span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="时间"
                    prop="time"
                    width="100px">
                    </el-table-column>
                    <el-table-column
                    label="花费"
                    prop="money">
                    </el-table-column>
                    <el-table-column
                    label="成员"
                    prop="username">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog 
            title="提示"
            :visible.sync="dialogVisible"
            width="300px">
            <span>确定删除账单？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doDeleteBill">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getMainData } from '../api/main'
import { baseURL } from '../config/index.js'
export default {
    head () {
      return {
          title: '总览',
      }
    },
    data() {
      return {
        mainData: {
            sum: 0,
            per: 0,
            billList:[]
        },
        loading: false,
        dialogVisible: false,
        billItem: {},
      }
    },
    async asyncData () {
        let { data } = await getMainData()
        // console.log(process.client)
        // console.log(process.client)
        
         return { mainData : data.msg };
    },
    methods: {
        getMainData() {
            this.loading = true;
            this.$store.dispatch('getMainData').then((res) => {
                this.mainData = res.msg;
                this.loading = false;
            })
        },
        doDeleteBill() {
            this.$store.dispatch('delBillLog', {id: this.billItem.id}).then((res) => {
                if(res.code === '0000') {
                    this.$message.success(res.msg);
                    this.getMainData();
                } else {
                    this.$message.error(res.msg);
                }

                this.dialogVisible = false;
            })
        },
        deleteBill(item) {
            this.dialogVisible = true;
            this.billItem = item;
        },
        jumpToBill(item) {
            this.$router.push({path: 'addNewBill', query:{id: item.id}});
        }
    },
    mounted() {
        this.getMainData();
        // console.log(baseURL)
    }
}
</script>

<style lang="scss">
    .main-container {
        min-width:320px;
        margin: 20px auto;
        max-width: 600px;

        .box-card {
            .title {
                font-size:24px;
            }

            .total-money {
                font-size: 18px;
            }
        }
    }
@media screen and (max-width: 560px) {
    .mobile-table {
        display: block !important;
    }
    .pc-table {
        display: none !important;
    }
}

@media screen and (min-width: 560px) {
    .mobile-table {
        display: none !important;
    }
    .pc-table {
        display: block !important;
    }
}
</style>

