<script>
import axios from 'axios';
import { MD5 } from 'crypto-js';

export default {
  data() {
    return {
      ma_khang: '',
      id_hoa_don: '',
      ma_don_vi_quan_ly: '',
      data: {
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
      }
    };
  },
  methods: {
    submitValue() {
      const headers = {
        'Content-Type': 'application/json',
      };

      let auth = MD5(this.ma_khang + Date.now() + '|security').toString();

      const data = {
        "ma_khang" : this.ma_khang,
        "nam": "2023",
        "time": 1689234144,
        "auth": auth
      };

      axios.post('http://localhost:8080/evn-hcm/tthd', data, {headers})
        .then(response => {
          this.apiData = response.data;
          this.data = response.data.data[0];
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
        <br>
        <br>
        <br>

        <div><strong class="title">Ma Khang: {{ data.MA_KHANG }}</strong></div>
        <br>
        <div>
          <div><strong class="title">Ten Khach hang</strong>: {{ data.TEN_KHANG }}</div>
          <br>
          <div><strong class="title">ID Hoa don</strong>: {{ data.ID_HDON }}</div>
          <br>
          <div><strong class="title">Ma Khach hang</strong>: {{ data.MA_KHANG }}</div>
          <br>
          <div><strong class="title">Ma Don vi quan ly</strong>: {{ data.MA_DVIQLY }}</div>
          <br>
          <div><strong class="title">Ky</strong>: {{ data.KY }}</div>
          <br>
          <div><strong class="title">Thang</strong>: {{  data.THANG }}</div>
          <br>
          <div><strong class="title">Số kWH</strong>: {{ data.DIEN_TTHU }}</div>
          <br>
          <div><strong class="title">Tong tien</strong>: {{ data.TONG_TIEN }}</div>
        </div>
        <br>
        <br>
      </div>
    
    
</template>

<style scoped>
.title {
  font-weight: bold;
}
</style>