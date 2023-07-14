<script>
import axios from 'axios';
import { MD5 } from 'crypto-js';

export default {
  data() {
    return {
      ma_khang: 'PE09000197468',
      id_hoa_don: '',
      ma_don_vi_quan_ly: '',
      data: []
    };
  },
  methods: {
    submitValue() {
      const headers = {
        'Content-Type': 'application/json',
      };
      let now = Date.now()
      let lonhonnow = now + 33
      
      
      var currentDate = new Date();

        var day = String(currentDate.getDate()).padStart(2, '0');
        var month = String(currentDate.getMonth() + 1).padStart(2, '0');
        var year = currentDate.getFullYear();

        var formattedDate = day + '/' + month + '/' + year ;
        const authStr = formattedDate + "10/07/2023" + this.ma_khang + lonhonnow + '|security'
        console.log(authStr)
        let auth = MD5(authStr).toString();
      const data = {
        "from": "10/07/2023",
        "to": formattedDate,
        "makh": this.ma_khang,
        "time": now,
        "auth": auth
      }

      axios.post('http://localhost:8080/evn-hcm/sld', data, {headers})
        .then(response => {
          console.log(response);
          this.data = response.data.data.ds_sanluong;
          
        })
        .catch(error => {
          console.error('Error fetching API data:', error);
        });
    }
  }
};
</script>

<template>
    <h1> San luong dien </h1>

     
    <input type="text" v-model="ma_khang" placeholder="Enter a value" />
    <button @click="submitValue">Submit</button>

    <router-link :to="{ name: 'thongtinhoadon' }">
                                LInk to hoa don
                            </router-link>
    
    
      <div>
        <br>
        <br>
        <br>

        <div><strong class="title">Ma Khang: {{ data.MA_KHANG }}</strong></div>
        <br>
        <li v-for="item in data" :key="item.id">
            <br>
            <br>
            <div>Thoi gian: {{ item.thoiGian }}</div>
            <br>
            <div>Tong: {{ item.Tong }}</div>
            <br>
            <br>
        </li>
        <br>
        <br>
      </div>
    
    
</template>

<style scoped>
.title {
  font-weight: bold;
}
</style>