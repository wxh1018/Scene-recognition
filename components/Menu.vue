<template>
    <div>
        <a-menu
            mode="inline"
            theme="dark"
            :inlineCollapsed="collapsed">
            <template v-for="item in list">
                <a-menu-item v-if="!item.children" :key="item.key" @click="Jump(item)">
                    <span>{{item.title}}</span>
                </a-menu-item>
                <SubMenu v-else :menu-info="item" :key="item.key"/>
            </template>
        </a-menu>
    </div>
</template>
<script>
import SubMenu from '~/components/SubMenu'; 
export default {
    components:{
        SubMenu
    },
    data(){
        return{
            list: [],
            collapsed:true,
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        Jump(info){
            console.log("jump"+JSON.stringify(info))
        },
        getData(){
            let that=this
            fetch("/scene/FindScenelog").then(res=>{
                let result=res.data
                let parents=result.filter(item=>{return item.lv==1}).map((it,index)=>{
                    return {
                        key: it.id,
                        title: it.name,
                        children: [],
                    }
                })
                
                for(let i=0;i<parents.length;i++){
                    for(let ff=0;ff<result.length;ff++){
                        if(result[ff].parentid==parents[i].key&&result[ff].lv==2){
                            parents[i].children.push({
                                key: result[ff].id,
                                title: result[ff].name,
                            })
                        }
                    }
                }
                that.list.push(...parents)

            })
        }
    }
}
</script>