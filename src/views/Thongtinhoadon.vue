<script>
import axios from 'axios';
import { MD5 } from 'crypto-js';

export default {
  data() {
    return {
      ma_khang: '',
      id_hoa_don: '',
      ma_don_vi_quan_ly: '',
      data: [{
        "ID_HDON": "",
        "MA_KHANG": "",
        "MA_DVIQLY": "",
        "TEN_KHANG": "",
        "KY": "",
        "THANG": "",
        "NAM": "",
        "NGAY_DKY": "",
        "NGAY_CKY": "",
        "DIEN_TTHU": "",
        "TONG_TIEN": "",
      }],
    };
  },
  methods: {
    submitValue() {
      const headers = {
        'Content-Type': 'application/json',
      };
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      let auth = MD5(this.ma_khang + '2023' + tomorrow.getTime() + '|2k9ef340452dsg4258sfj6n3257').toString();
      
      const data = {
        "ma_khang" : this.ma_khang,
        "nam": "2023",
        "time": tomorrow.getTime(),
        "auth": auth
      };

      axios.post('https://api.sandbox.evnpoint.com/20984/gup2start/rest/evn-mock/evn-hcm/tthd', data, {headers})
        .then(response => {
          this.apiData = response.data;
          this.data[0] = response.data.data[0];
          this.data.push(response.data.data[1]);
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching API data:', error);
        });
    }
  }
};
</script>

<template>
    <h1> Thong tin hoa don </h1>

     
    <input type="text" v-model="ma_khang" placeholder="Enter a value" />
    <button @click="submitValue">Submit</button>

    <router-link :to="{ name: 'thongtinhoadon' }">
                                LInk to hoa don
                            </router-link>
    
    
      <div>
      
        <ul v-for="hdd in data">
          <br>
        <br>
        <br>
        <div><strong class="title">Ma Khang: {{ hdd.MA_KHANG }}</strong></div>
        <br>
        <div>
          <div><strong class="title">Ten Khach hang</strong>: {{ hdd.TEN_KHANG }}</div>
          <br>
          <div><strong class="title">ID Hoa don</strong>: {{ hdd.ID_HDON }}</div>
          <br>
          <div><strong class="title">Ma Khach hang</strong>: {{ hdd.MA_KHANG }}</div>
          <br>
          <div><strong class="title">Ma Don vi quan ly</strong>: {{ hdd.MA_DVIQLY }}</div>
          <br>
          <div><strong class="title">Ky</strong>: {{ hdd.KY }}</div>
          <br>
          <div><strong class="title">Thang</strong>: {{  hdd.THANG }}</div>
          <br>
          <div><strong class="title">Số kWH</strong>: {{ hdd.DIEN_TTHU }}</div>
          <br>
          <div><strong class="title">Tong tien</strong>: {{ hdd.TONG_TIEN }}</div>
        </div>
      </ul>
        <br>
        <br>
      </div>
    
    
</template>

<style scoped>
.title {
  font-weight: bold;
}
</style>