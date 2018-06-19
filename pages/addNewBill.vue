<template>
     <div class="main-container">
        <el-card class="box-card" v-loading="loading"  element-loading-spinner="el-icon-loading">
            <el-form :model="billForm" ref="billForm" :rules="rules" label-position="right">
                <el-form-item label="时间" prop="time">
                    <br>
                    <el-date-picker type="date" placeholder="选择日期" v-model="billForm.time" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <br>
                    <el-select v-model="billForm.type" placeholder="请选择类型">
                        <el-option :label="item.value" :value="item.key" v-for="(item,index) in typeOptions" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额" prop="money">
                    <el-input type="number" v-model="billForm.money" placeholder="请输入金额"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="descr">
                     <el-input type="textarea" v-model="billForm.descr" placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item label-width="200px">
                    <el-button type="primary" @click="submitForm('billForm')">
                        提  交
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
function simpleFormat (date) {
    return date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
}
export default {
    head () {
      return {
          title: '添加账单',
      }
    },
    data() {
        return {
            billForm: {
                time: simpleFormat(new Date()),
                type: '',
                money: '',
                descr: '',
            },
            rules: {
                time: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                money: [
                    { required: true, message: '请输入金额', trigger: 'blur'}
                ],
                descr: [
                    {required: true, message: '请输入备注', trigger: 'blur'}
                ],

            },
            loading:false,
            typeOptions:[],
            id:''
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.billForm)
                    if(this.id) {
                        this.updateBillLogInfo(this.billForm);
                    } else {
                        this.addBill(this.billForm);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        getBillType() {
            this.$store.dispatch('getBillType').then( (res) => {
                this.typeOptions = res.msg;
            })
        },

        addBill(params) {
            this.$store.dispatch('addBill', params).then( (res) => {
                if(res.code === '0000') {
                    this.$message.success(res.msg);
                    this.$router.push({path:'main'});
                } else {
                    this.$message.error(res.msg);
                }
            })
        },

        getBillLogInfo(id) {
            this.$store.dispatch('getBillLogInfo', {id: id}).then((res) => {
                console.log(res);
                if(res.code === '0000') {
                    const data = res.msg;
                    this.billForm = {
                        time: simpleFormat(new Date(data.time)),
                        money: data.money,
                        descr: data.descr,
                        type: data.typeName,
                    }
                }
            })
        },

        updateBillLogInfo(params) {
            for(let item in this.typeOptions) {
               if(this.typeOptions[item].value === params.type) {
                   params.type = this.typeOptions[item].key;
                   break;
               }
            }

            params.id = this.id;
            this.$store.dispatch('updateBillLogInfo', params).then( (res) => {
                if(res.code === '0000') {
                    this.$message.success(res.msg);
                    this.$router.push({path:'main'});
                } else {
                    this.$message.error(res.msg);
                }
            })
        }
    },
    mounted() {
        this.getBillType();
        if(this.$route.query.id) {
            this.id = this.$route.query.id;
            this.getBillLogInfo(this.id);
        }

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
</style>


