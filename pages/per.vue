<template>
    <div class="main-container">
        <el-card class="box-card" v-loading="loading"  element-loading-spinner="el-icon-loading" >
            <div slot="header" class="clearfix">
                <div class="title">
                    结算 
                    <el-button type="primary" @click="openDialog" class="balance">结算</el-button>
                    
                </div>
            </div>
            <div id="capture">
                <el-table
                    :data="perData"
                    stripe
                    style="width: 100%"
                    class="pc-table">
                     <el-table-column
                        prop="username"
                        label="成员">
                    </el-table-column>
                    <el-table-column
                        prop="perpay"
                        label="支出（元）">
                    </el-table-column>
                    <el-table-column
                        prop="per"
                        label="人均（元）">
                    </el-table-column>
                    <el-table-column
                        label="结算（元）">
                        <template slot-scope="scope">
                            {{Math.round((scope.row.perpay - scope.row.per) * 100) / 100}}
                        </template>
                    </el-table-column>
                </el-table>
                <el-table
                    :data="perData"
                    style="width: 100%"
                    class="mobile-table">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="成员:">
                                    <span>{{ props.row.username }}</span>
                                </el-form-item>
                                <br>
                                <el-form-item label="支出:">
                                    <span>￥{{ props.row.perpay }}</span>
                                </el-form-item>
                                <el-form-item label="人均:">
                                    <span>￥{{ props.row.per }}</span>
                                </el-form-item>
                                <el-form-item label="结算:">
                                    <span>￥{{Math.round((props.row.perpay - props.row.per) * 100) / 100}}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="成员">
                    </el-table-column>
                    <el-table-column
                        label="结算（元）">
                        <template slot-scope="scope">
                            {{Math.round((scope.row.perpay - scope.row.per) * 100) / 100}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog 
            title="提示"
            :visible.sync="dialogVisible"
            width="300px">
            <span>确定结算账单？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBillStatus">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getPerData } from '../api/main'
import html2canvas from 'html2canvas'
import Canvas2Image from '../plugins/canvas2image.js'
export default {
    head () {
        return {
            title: '结算',
        }
    },
    data() {
      return {
        perData: [],
        loading: false,
        dialogVisible: false,
        billItem: {},
      }
    },
    // async asyncData () {
    //     let { data } = await getPerData();
    //     // console.log(process.client)
    //     // console.log(process.client)
    //     return { perData : data.msg };
    // },
    methods: {
        getPerData() {
            this.loading = true;
            this.$store.dispatch('getPerData').then((res) => {
                this.perData = res.msg;
                this.loading = false;
            })
        },
        openDialog() {
            this.dialogVisible = true;
        },
        updateBillStatus() {
            this.$store.dispatch('updateBillStatus').then((res) => {
                if(res.code === '0000') {
                    this.$message.success(res.msg);
                    this.saveImg();
                    this.getPerData();
                } else {
                    this.$message.error(res.msg);
                }

                this.dialogVisible = false;
            })
        },
        saveImg() {
            const shareContent = document.querySelector("#capture");
            const width = shareContent.offsetWidth;
            const height = shareContent.offsetHeight;
            const canvas = document.createElement("canvas");
            const scale = 2;

            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.getContext("2d").scale(scale, scale);

            
            const opts = {
                scale: scale,
                canvas: canvas,
                logging: true,
                width: width,
                height: height
            };
            html2canvas(shareContent, opts).then(function (canvas) {
                const context = canvas.getContext('2d');
                Canvas2Image().saveAsPNG(canvas, canvas.width, canvas.height);
            });
        }
    },
    mounted() {
        this.getPerData();
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
                position: relative;

                .balance {
                   position: absolute;
                   right:20px;
                }
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

