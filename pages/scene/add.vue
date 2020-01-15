<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item>场景</a-breadcrumb-item>
            <a-breadcrumb-item>新增场景</a-breadcrumb-item>
        </a-breadcrumb>
        <a-divider />
        <a-form :form="form">
            <a-form-item label="场景名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input v-model="form.scenename"/>
            </a-form-item>
            <a-form-item label="场景描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-textarea v-model="form.scenedescribe" autosize />
            </a-form-item>
            <a-form-item label="道路类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input v-model="form.routetype"/>
            </a-form-item>
            <a-form-item label="场景类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input v-model="form.scenetype"/>
            </a-form-item>
            <a-form-item label="场景来源" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-input v-model="form.scenefrom"/>
            </a-form-item>
            <a-form-item label="场景所属" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-cascader :options="scenelogList" v-model="scenelog" placeholder="请选择所属场景" />
            </a-form-item>
            <a-form-item label="视频上传" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-upload
                    name="file"
                    class="avatar-uploader"
                    :action="uploadurl"
                    :defaultFileList="defaultFileList"
                    supportServerRender
                    @change="handleChange">
                <a-button> <a-icon type="upload" /> 选择上传视频 </a-button>
                </a-upload>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" @click="save">
                    提交
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                scenedata:"",
                scenefrom:"车载采集",
            },
            scenelog:[],
            scenelogList:[],
            uploadurl,
            defaultFileList:[]
        }
    },
    mounted(){
       this.getLogData() 
    },
    methods:{
        getLogData(){
            let that=this
            fetch("/scene/FindScenelog").then(res=>{
                let result=res.data
                let parents=result.filter(item=>{return item.lv==1}).map((it,index)=>{
                    return {
                        jkey:it.id,
                        label: it.name,
                        value: it.name,
                        children: [],
                    }
                })
                
                for(let i=0;i<parents.length;i++){
                    for(let ff=0;ff<result.length;ff++){
                        if(result[ff].parentid==parents[i].jkey&&result[ff].lv==2){
                            parents[i].children.push({
                                label: result[ff].name,
                                value: result[ff].name,
                            })
                        }
                    }
                }
                console.log(that.scenelogList)

                that.scenelogList.push(...parents)
            })
        },
        save(){
            console.log(this.form)
            console.log(this.scenelog);
            this.form.scenelog=this.scenelog[this.scenelog.length-1]
            // this.form.scenetype=this.scenelog[this.scenelog.length-1]
            // this.form.scenedescribe=`用于"${this.scenelog[this.scenelog.length-1]}"场景实验`
            let that=this
            fetch("/scene/SaveScene",{...this.form}).then(res=>{
                console.log(res)
                if(res.success){
                    this.$router.push("/")
                }else{
                    this.$message.error("保存失败")
                }
            })
        },
        handleChange(info) {
            if (info.file.status === 'uploading') {
                this.loading = true;
                return;
            }
            if (info.file.status === 'done') {
                console.log(info.file)
                if(info.file.response.success){
                    this.$message.success(info.file.response.msg)
                    this.form.scenedata=info.file.response.data
                }else{
                    this.$message.error(info.file.response.msg)
                }
                
            }
        },
    }
}
</script>