<template>
    <div class="container">

        <search @search="search"></search>
        <spinner :loading="loading" style="width: 100px; height: 100px; margin: 20px auto"></spinner>

        <div class="userContainer" v-if="!loading">


            <div class="container userListContainer">
                <div class="userCard" v-for="user in users">
                    <img v-if="user.avatar != ''" :src="'https://lucrez-ceva-test.herokuapp.com/' + user.avatar" class="userAvatar">
                    <img v-else src="https://lucrez-ceva-test.herokuapp.com/unauthenticated/man-default.jpg" class="userAvatar">

                    <p class="userName">{{user.name}}</p>
                    <p class="userLocation"><i class="fa fa-map-marker iconColor"></i>
                        <span v-if="user.location!=null">{{user.location}}</span>
                        <span v-else>Cluj-Napoca</span>
                    </p>
                    <p class="userPhone"><i class="fa fa-phone iconColor"></i>
                        <span v-if="user.phone!=null">{{user.phone}}</span>
                        <span v-else>0751929003</span>
                    </p>

                    <i class="fa fa-times userEdit" @click="selectedUser = user.id" data-toggle="modal" data-target="#myModal"></i>
                </div>
            </div>

            <pagination @paginate="paginate" :pagination="pagination" :link="linkClient"></pagination>
            <dialog-component :title="'Delete'" :body="'Are you sure you want to delete?'" @action="deleteUser"></dialog-component>
        </div>
    </div>

</template>

<script>
    import DialogComponent from '../page/DialogComponent';

    export default {
        components: {DialogComponent},
        data(){
            return {
                loading: 0,

                linkClient: '/users/list?page=',
                linkServer: 'https://lucrez-ceva-test.herokuapp.com/admin/users/',
                wordSearch: '',

                selectedUser: 0,
                pagination:{
                    last_page: 3,
                    current_page : 1,
                    per_page: 6
                },
                users:[]
            }
        },
        mounted(){
            let page = this.$route.query.page;
            let word = this.$route.query.word;
            if(page !=  null) {
                if (page > 1) {
                    this.pagination.current_page = parseInt(this.$route.query.page);
                }

                if(word!=null){
                    this.wordSearch = word;
                    this.linkClient = '/users/list?word=' + this.wordSearch + '&page=';
                    this.linkServer = 'https://lucrez-ceva-test.herokuapp.com/admin/users_search/' + this.wordSearch + '/';
                }
            }
            this.paginate();

        },
        methods:{
            paginate(){
                this.loading=1;
                axios.defaults.headers.common["Authorization"] = 'Bearer ' + this.$store.getters.user.token;
                axios.get(this.linkServer + (this.pagination.current_page-1) + '-' + this.pagination.per_page)
                    .then(res=>{
                        this.users=res.data;
                        this.loading=0;
                    })
                    .catch(err=>{
                        this.loading=0;
                    });
            },
                deleteUser(){
                console.log(this.selectedUser);
            },
            search(word){
                this.wordSearch = word;
                this.linkClient = '/users/list?word=' + this.wordSearch + '&page=';
                this.linkServer = 'https://lucrez-ceva-test.herokuapp.com/admin/users_search/' + this.wordSearch + '/';
                this.paginate();
            }
        }
    }
</script>

<style>
    ::placeholder{
        color: #2FA0CB;
    }

    .userListContainer{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    @media (max-width: 1199px){
        .userListContainer{
            justify-content: center;
        }
    }

    .userCard{
        padding: 10px;
        -webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        -webkit-transition: 0.3s;
        transition: 0.3s;
        width: 30%;
        background-color: #f5f5f5eb;
        min-width: 325px;
        margin: 10px;
        position: relative;
        height: 308px;
    }

    .userCard:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        background-color: #f5f5f5f2;
    }

    .userAvatar{
        margin: 6px;
        width: 174px;
        border-radius: 50%;
        -webkit-box-shadow: 0 0 2px 1px #2fa0cb45;
        box-shadow: 0 0 2px 1px #2fa0cb45;
    }

    .userName{
        font-size: 31px;
    }

    .userLocation{
        font-size: 19px;
        text-align: left;
        position: relative;
        left: 19px;
        top: 2px;
    }

    .userPhone{
        position: relative;
        text-align: right;
        bottom: 41px;
        right: 20px;
        font-size: 19px;
    }

    .iconColor{
        color: #2fa0cb;
    }

    .userEdit{
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 21px;
        color: #2b6175;
        cursor: pointer;
    }
</style>
