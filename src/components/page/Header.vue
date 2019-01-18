<template>
    <nav class="navbar navbar-expand-lg navbar-light" v-if="user!=null">
        <a class="navbar-brand"><img src="/static/logo_small.png"> Lucrez ceva</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/users/list" class="nav-link"><i class="fa fa-users"></i> Users</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/jobs/list"><i class="fa fa-briefcase"></i> Jobs</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/statistics"><i class="fa fa-clipboard"></i> Statistics</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img :src="user.avatar" class="avatarUserIcon"> {{user.name}}
                    </a>
                    <div class="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                        <img :src="user.avatar" class="avatarUser">
                        <div class="dropdown-divider"></div>
                        <router-link class="dropdown-item" to="/change-password"><i class="fa fa-key"></i>  Change password</router-link>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" @click.prevent="logout"><i class="fa fa-arrow-left"></i> Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import axios from 'axios';

    export default {
        computed:{
            user(){
                return this.$store.getters.user;
            }
        },
        methods:{
            logout(){
                axios.defaults.headers.common["Authorization"] = 'Bearer ' + this.user.token;
                axios.post('https://lucrez-ceva-test.herokuapp.com/authenticated/logout')
                    .then(res=>{
                    this.$store.commit('logout');
                    this.$router.push('/');
                })
            }
        }
    }
</script>

<style scoped>
    .navbar{
        background-color: #f8f9fae8;
    }

    .avatarUser{
        margin: 6px;
        width: 120px;
        border-radius: 50%;
        border: 1px solid #2fa0cb;
    }

    .avatarUserIcon{
        margin-bottom: 6px;
        width: 20px;
        border-radius: 50%;
        border: 1px solid #2fa0cb;
        margin-right: 2px;
    }
</style>
