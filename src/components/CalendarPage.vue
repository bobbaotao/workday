<template>
  <div>
    <el-row :gutter="10" class="btgap">
      <el-col :span="8" :offset="2">
        <el-button v-on:click="LoadDataByTag('Next14')">Next 14 Days</el-button>
        <el-button v-on:click="LoadDataByTag('Next21')">Next 21 Days</el-button>
        <el-button v-on:click="LoadDataByTag('Next28')">Next 28 Days</el-button>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-date-picker type="daterange" align="right" placeholder="Please Select Date Range"
          v-model="pickedDateRange" v-bind:picker-options="pickOptions" v-bind:editable="false">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <WCTable v-if="wcDatas.length > 0" :startDate='startDate' :endDate='endDate' :CurrentADAccount='currentAccount'
          v-on:reloadWC="LoadWCDataFromServer" :wcworkItems='wcDatas'></WCTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import WCTable from './WCTable';
    var moment = require('moment');
    //import defaultConfig from '../util/config';

    export default {
      name: "CalendarPage",
      data() {
        return {
            startDate: moment().format("YYYY-MM-DD"),
            endDate: moment().add(14, 'days').format("YYYY-MM-DD"),
            wcDatas:[],
            isLoading: false,
            team: 'MIK-IA',
            department: '',
            errorMsg: '',
            currentAccount: '',
            pickedDateRange:[moment().toDate(), moment().add(14, 'days').toDate()],
            pickOptions: {
              shortcuts: [
                {
                  text: "Current Month",
                  onClick(picker) {
                    const start = moment().date(1).toDate();
                    const end = moment().add(1,"M").date(1).add(-1,'d').toDate();
                    picker.$emit('pick', [start, end]);
                  }
                },
                {
                  text: "Next Month",
                  onClick(picker) {
                    const start = moment().add(1,"M").date(1).toDate();
                    const end = moment().add(2,"M").date(1).add(-1,'d').toDate();
                    picker.$emit('pick', [start, end]);
                  }
                },
                {
                  text: "Last Month",
                  onClick(picker) {
                    const start = moment().add(-1,"M").date(1).toDate();
                    const end = moment().date(1).add(-1,'d').toDate();
                    picker.$emit('pick', [start, end]);
                  }
                }
              ]
            }
        }
      },
      components: { WCTable },
      created: function() {
        this.LoadDataByTag('Next14');
      },
      watch: {
        pickedDateRange: function(newpickedDateRange) {
          this.startDate = moment(newpickedDateRange[0]).format("YYYY-MM-DD");
          this.endDate = moment(newpickedDateRange[1]).format("YYYY-MM-DD");
          this.LoadWCDataFromServer();
        }
      },
      methods: {
        LoadWCDataFromServer: function() {
          var serviceUrl = "../../../_vti_bin/Zeiss.WorkCalendar/WorkCalendar.svc/GetWorkCalendar";
          var requestData = {
            Param : {
                Team: this.team,
                Department: this.department,
                WorkStartDate: this.startDate,
                WorkEndDate: this.endDate
              }
          };
          this.isLoading = true;
          this.errorMsg = null;

          this.axios.post(serviceUrl, requestData).then((response) => {
            this.isLoading = false;
            if(response.data.GetWorkCalendarResult.Status == "success") {
              this.currentAccount = response.data.GetWorkCalendarResult.CurrentADAccount;
              this.wcDatas = response.data.GetWorkCalendarResult.Data;
            } else {
              this.errorMsg = response.data.GetWorkCalendarResult.Message;
            }
          }).catch((error) => {
            this.isLoading = false;
            this.errorMsg = error.message;
          });
        },

        LoadDataByTag(tagName) {
          switch (tagName) {
            case "Next14":
              this.startDate = moment().format("YYYY-MM-DD");
              this.endDate = moment().add(14, 'days').format("YYYY-MM-DD");
              break;
            case "Next21":
              this.startDate = moment().format("YYYY-MM-DD");
              this.endDate = moment().add(21, 'days').format("YYYY-MM-DD");
              break;
            case "Next28":
              this.startDate = moment().format("YYYY-MM-DD");
              this.endDate = moment().add(28, 'days').format("YYYY-MM-DD");
              break;
            default:
              this.startDate = moment().format("YYYY-MM-DD");
              this.endDate = moment().add(15, 'days').format("YYYY-MM-DD");
          }
          this.LoadWCDataFromServer();
          //this.test();
        }
      ,
      test : function() {
        this.wcDatas = [
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
          {ADAccount: "zctaobao",UserName: "Bao Tao",WorkItems: []},
           {
               ADAccount: "zctaobao",
               UserName: "Bao Tao",
               WorkItems: [
                   {
                       Comments: "work2111111111111111111111111111111",
                       WorkEndDate: "2017-08-17",
                       WorkStartDate: "2017-08-15",
                       WorkType: "InternalEvent",
                       ID: 1,
                       IntegrationItemID:1
                   },
                   {
                       Comments: "work3",
                       WorkEndDate: "2017-08-09",
                       WorkStartDate: "2017-08-09",
                       WorkType: "CST",
                       ID: 2,
                       IntegrationItemID:1
                   }
               ]
           },
           {
               ADAccount: "zcwwang",
               UserName: "Wells,Wang Shu Gen",
               WorkItems: [
                   {
                       Comments: "work2ddddddddddddddddddddddddddddddddddddddddddddddddddd",
                       WorkEndDate: "2017-08-09",
                       WorkStartDate: "2017-08-09",
                       WorkType: "PSS",
                       ID: 3,
                       IntegrationItemID:1
                   },
                   {
                       Comments: "work3",
                       WorkEndDate: "2017-08-14",
                       WorkStartDate: "2017-08-12",
                       WorkType: "AnnualLeave",
                       ID: 4,
                       IntegrationItemID:1
                   }
               ]
           }
       ];
      }
    }
    }
</script>

<style scoped>
.btgap {
  padding-bottom: 10px;
}

</style>
