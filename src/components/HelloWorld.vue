<script>
import axios from 'axios';

export default {
  data() {
    return {
      ma_khang: '',
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

      const data = {
        "ma_khang" : this.ma_khang,
        "nam": "2024",
        "time": 1689234144,
        "auth": "4db829937fc692ef6341383d368f66a1"
      };

      axios.post('http://localhost:8080/evn-hcm', data, {headers})
        .then(response => {
          this.apiData = response.data;
          this.data = response.data.data;
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
  
    <input type="text" v-model="ma_khang" placeholder="Enter a value" />
    <button @click="submitValue">Submit</button>
    
    <div v-for="(item, index) in data" :key="item.id">
      <div>
        <div>Ma Khang: {{ item.MA_KHANG }}</div>
        <div>
          Ten Khach hang:
          <div>ID Hoa don: {{ item.ID_HDON }}</div>
          <div>Ma Khach hang: {{ item.MA_KHANG }}</div>
          <div>Ma Don vi quan ly: {{ item.MA_DVIQLY }}</div>
        </div>
        <br>
        <br>
      </div>
    </div>
    
</template>

<style scoped>

</style>
