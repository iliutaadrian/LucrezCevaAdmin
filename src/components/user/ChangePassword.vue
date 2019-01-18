<template>
    <div>
        <div class="changeContainer" @keydown.enter="change">
            <h1 class="changeTitle">Change Password</h1>

            <p class="errorText" v-if="error !== ''">{{ error }}</p>

            <div class="changeInputContainer">
                <label class="changeLabel">Password</label>

                <input :type="passwordView1" class="form-control changeInput" v-model="form.password" placeholder="password">
                <i class="fa fa-eye passwordIcon" @click="passwordView1=='password' ? passwordView1='text' : passwordView1='password'"></i>
            </div>

            <div class="changeInputContainer">
                <label class="changeLabel">Password confirmation</label>

                <input :type="passwordView2" class="form-control changeInput" v-model="form.password_confirmation" placeholder="password">
                <i class="fa fa-eye passwordIcon" @click="passwordView2=='password' ? passwordView2='text' : passwordView2='password'"></i>
            </div>

            <div>
                <button-custom :loading="loading" :text="'Change Password'" @click.native="change"></button-custom>
            </div>
        </div>
    </div>

</template>

<script>
    import {setClientAuthorization} from "../helpers/general";
    import ButtonCustom from '../page/ButtonCustom.vue';
    import axios from 'axios';

    export default {
        components: {ButtonCustom},
        data(){
            return {
                form:{
                    password: '',
                    password_confirmation: '',
                    grant_type: 'password'

                },
                error:'',
                loading: 0,
                passwordView1: 'password',
                passwordView2: 'password'
            }
        },
        methods:{
            change(){
                this.loading = 1;

                this.error = '';

            }
        },
        comments:{
            ButtonCustom
        }
    }
</script>

<style scoped>
    ::placeholder{
        color: #2FA0CB;
    }

    .changeContainer{
        margin: 50px auto 50px;
        max-width: 365px;
        text-align: center;
        text-shadow: 0 1px 0 rgba(147, 147, 147, 0.44);
        position: relative;
        background-color: white;
        height: 340px;
        padding: 15px 25px 25px;
        border-radius: 13px;
        box-shadow: 0 0 3px 0 black;
        color: #2FA0CB;
    }

    .changeTitle{
        font: 400 25px Helvetica,Arial,sans-serif;
        letter-spacing: -.05em;
        line-height: 20px;
        margin: 10px 0 30px;
    }

    .passwordIcon{
        position: relative;
        float: right;
        bottom: 28px;
        right: 11px;
        cursor: pointer;
        color: #2a81a2;
    }

    .passwordIcon:hover{
        color: black;
    }

    .changeInputContainer{
        margin-bottom: 20px;
    }

    .changeLabel{
        float: left;
        padding-left: 4px;
        color: #2a81a2;
    }

    .changeInput{
        border-radius: 7px;
        border: 1px solid #2a81a2;
        position: relative;
        padding-right: 33px;
        padding-left: 15px;
    }

    .changeInput:focus{
        -ms-box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
        -o-box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
        box-shadow: 0 0 2px 0 #d2d2d2ab, inset 0 0 2px 0 #2a81a2d9;
    }

    .errorText{
        margin-top: 5px;
        font-size: 21px;
        color: red;
        margin-bottom: 10px;
        margin-left: 5px;
    }
</style>

