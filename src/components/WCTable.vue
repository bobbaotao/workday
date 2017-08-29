<template>
  <div class="wcTableContainer">
  <el-dialog title="Calendar Item Detail" :visible.sync="dialogWindowVisable">
      <el-form :model="dialogItem" label-width="120px" :label-position="right">
        <el-form-item label="User Name">
          {{dialogItem.FullName}}
        </el-form-item>
        <el-form-item label="Type">
          <el-select :size="large" :disabled="!dialogItem.AllowEdit" v-model="dialogItem.WorkType" placeholder="Please Select">
              <el-option  v-if="dialogItem.AllowEdit" v-for="item in worktypeOptions" :key="item.value"
              :label="item.label" :value="item.value"></el-option>
              <el-option v-if="!dialogItem.AllowEdit" v-for="item in worktypeOptionsReadOnly" :key="item.value"
              :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Date">
            <el-date-picker  :size="large" :disabled="!dialogItem.AllowEdit" v-model="dialogItem.DateRange" type="daterange" placeholder="Please Select Date Range">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="Comments">
            <el-input type="textarea" :disabled="!dialogItem.AllowEdit" v-model="dialogItem.Comments" placeholder="Please Input Comments" :autosize="{minRows:2, maxRows:6}">
            </el-input>
        </el-form-item>
        <el-form-item label="Url" v-if="dialogItem.IntegrationItemID && dialogItem.IntegrationItemID != ''">
          <a v-bind:href="dialogItem.IntegrationItemID" target="_blank">Click to View Detail</a>
        </el-form-item>
        <el-form-item>
            <el-button v-if="dialogItem.AllowEdit" v-on:click="SubmitItem(dialogItem)">{{dialogItem.ID ? "Update Item": "Create Item"}}</el-button>
            <el-button v-if="dialogItem.AllowEdit && dialogItem.ID" v-on:click="DeleteItem(dialogItem.ID)">Delete item</el-button>
            <el-button v-on:click="dialogWindowVisable = false">Close</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
    <div class="WCTable wcLockHeaderTB" ref="wcHeader">
      <wcTableBody v-bind:wcDatas="wcDataitems" v-bind:wcColumns="wccolumnHeaders"
                  v-bind:isShowBody="false" v-bind:isShowHeader="true" v-bind:scrollX="true" v-bind:scrollBarWidth="tableLayout.gutterWidth">
      </wcTableBody>
    </div>
    <div class="WCTable wcDataTable" ref="wcBody">
      <wcTableBody v-bind:wcDatas="wcDataitems" v-bind:wcColumns="wccolumnHeaders"
                  v-bind:isShowBody="true" v-bind:isShowHeader="false" v-on:ShowEditWindow="showEditWindow">
      </wcTableBody>
    </div>
    <div class="WCTable wcFixedColumnTB" ref="wcFixed">
    </div>
  </div>
</template>

<script>
    import wcTableBody from './wc-table-body';
    var array = require('array');
    var moment = require('moment');
    import WCTableLayout from './wc-table-layout';

    export default{
      name: "WCTable",
      components: {wcTableBody},
      props:['startDate','endDate','wcworkItems','CurrentADAccount'],
      data() {
        const tableLayout = new WCTableLayout();
        return {
          tableLayout,
          columnWidthTeam: 100,
          columnWidthUserName: 150,
          columnWidthWorkDay: 120,
          columnWidthHoliday: 60,
          tbHeaderHeight: 40,
          dialogWindowVisable: false,
          dialogItem: {
            ADAccount: "",
            FullName:"",
            WorkStartDate: "",
            WorkEndDate: "",
            WorkType: "",
            Comments: "",
            ID: "",
            IntegrationItemID: "",
            DateRange:null,
            AllowEdit: false,
            ShowIcon: false
          },
          worktypeOptions: [
            {value: "InternalEvent", label: "Internal Event"},
            //{value: "CST", label: "Customer Support & Training"},
            {value: "PSS", label: "Pre-sales Support"},
            {value: "AnnualLeave", label: "Annual Leave"},
            {value: "Demo", label: "Demo"},
            {value: "ASS", label: "After Sales Support"}
          ],
          worktypeOptionsReadOnly: [
            {value: "InternalEvent", label: "Internal Event"},
            {value: "CST", label: "Customer Support & Training"},
            {value: "PSS", label: "Pre-sales Support"},
            {value: "AnnualLeave", label: "Annual Leave"},
            {value: "Demo", label: "Demo"},
            {value: "ASS", label: "After Sales Support"}
          ]
        }
      },
      methods: {
        DeleteItem: function(id) {
          var serviceUrl = "../../../_vti_bin/Zeiss.WorkCalendar/WorkCalendar.svc/DeleteWorkItem";
          this.isLoading = true;

          this.axios.get(serviceUrl + "/" + id).then((response) => {
            this.isLoading = false;

            if(response.data.DeleteWorkItemResult.Status == "success") {
              this.dialogWindowVisable = false;
              this.$emit("reloadWC");
            } else {
              this.$message.error('update item failed! inner message:' + response.data.DeleteWorkItemResult.Message);
            }
          }).catch((error) => {
            this.isLoading = false;
          });
        },
        SubmitItem: function(newItem) {
          if(!this.ValidateEditItem(newItem)) return;
          var serviceUrl = "../../../_vti_bin/Zeiss.WorkCalendar/WorkCalendar.svc/AddWorkItem";
          var requestData = {
            Param : {
                ID: newItem.ID != undefined ? newItem.ID : "NewItem",
                IntegrationItemID: newItem.IntegrationItemID,
                ADAccount: newItem.ADAccount,
                WorkStartDate: moment(newItem.DateRange[0]).format("YYYY-MM-DD"),
                WorkEndDate: moment(newItem.DateRange[1]).format("YYYY-MM-DD"),
                WorkType: newItem.WorkType,
                Comments: newItem.Comments
              }
          };
          this.isLoading = true;

          this.axios.post(serviceUrl, requestData).then((response) => {
            this.isLoading = false;

            if(response.data.AddWorkCalendarResult.Status == "success") {
              this.dialogWindowVisable = false;
              this.$emit("reloadWC");
            } else {
              this.$message.error('update item failed! inner message:' + response.data.AddWorkCalendarResult.Message);
            }

          }).catch((error) => {
            this.isLoading = false;
          });
        },
        ValidateEditItem: function(newItem) {
          if(newItem.WorkType == "" || newItem.WorkType == "None")
          {
              this.$message.error('Please Select a Work Type');
              return false;
          } else if (newItem.DateRange == null || newItem.DateRange.length != 2) {
              this.$message.error('Please Select Work Day');
              return false;
          } else if (newItem.Comments == null || newItem.Comments.trim() == "") {
            this.$message.error('Please input some comments');
            return false;
          }
          return true;
        },
        bindEvent: function() {
          const refs = this.$refs;
          this.$refs.wcBody.addEventListener('scroll', function(){
            refs.wcHeader.scrollLeft = this.scrollLeft;
          });
        },
        showEditWindow: function(itemData) {
          this.dialogItem = itemData;
          this.dialogWindowVisable = true;
        }
      },
      mounted() {
        this.bindEvent();
      },
      computed: {
        wccolumnHeaders: function() {
          var chArray = new array();
          chArray.push({label:"Team", width:this.columnWidthTeam, isFixed: true});
          chArray.push({label:"User", width:this.columnWidthUserName, isFixed: true});
          var mStart = moment(this.startDate);
          var mEnd = moment(this.endDate);
          while (mStart.toDate() <= mEnd.toDate()) {
            chArray.push({
              label: mStart.format("MMM DD"),
              width: (mStart.day() == 0 || mStart.day() ==6) ? this.columnWidthHoliday : this.columnWidthWorkDay,
              isFixed: false
            });
            mStart.add(1,"days");
          }

          return chArray.toArray();
        },
        wcDataitems: function() {
          var result = new array();
          for(var witem = 0; witem < this.wcworkItems.length; witem++) {
            var objItem = this.wcworkItems[witem];
            var singleItemDatas = new array();
            var mStart = moment(this.startDate);
            var mEnd = moment(this.endDate);

            // Add user name
            singleItemDatas.push({
              //type:'None',
              //value: objItem.UserName,
              itemData: {
                ADAccount: objItem.ADAccount,
                FullName: objItem.UserName,
                WorkStartDate: "",
                WorkEndDate: "",
                WorkType: "None",
                Comments: objItem.Team,
                ID: "",
                IntegrationItemID: "",
                DateRange:null,
                IsWorkdayItem: false,
                AllowEdit: false,
                ShowIcon: false
              },
              colspan: 1
            });
            singleItemDatas.push({
              itemData: {
                ADAccount: objItem.ADAccount,
                FullName: objItem.UserName,
                WorkStartDate: "",
                WorkEndDate: "",
                WorkType: "None",
                Comments: objItem.UserName,
                ID: "",
                IntegrationItemID: "",
                DateRange:null,
                IsWorkdayItem: false,
                AllowEdit: false,
                ShowIcon: false
              },
              colspan: 1
            });

            if(objItem.WorkItems && objItem.WorkItems.length > 0) {
                for(var wcItem = 0; wcItem < objItem.WorkItems.length; wcItem++) {
                  var objWCItem = objItem.WorkItems[wcItem];
                  var mIStart = moment(moment(objWCItem.WorkStartDate).format('YYYY-MM-DD'),'YYYY-MM-DD');
                  var mIEnd = moment(moment(objWCItem.WorkEndDate).format('YYYY-MM-DD'),'YYYY-MM-DD');
                  //add workday before startDate
                  while (mStart.toDate() < mIStart.toDate() && mStart.toDate() <= mEnd.toDate()) {
                    singleItemDatas.push({
                      itemData: {
                        ADAccount: objItem.ADAccount,
                        FullName: objItem.UserName,
                        WorkStartDate: mStart.toDate(),
                        WorkEndDate: mStart.toDate(),
                        WorkType: (mStart.day() == 0 || mStart.day() == 6) ? "Holiday":"None",
                        Comments: "",
                        ID: "",
                        IntegrationItemID: "",
                        DateRange: [mStart.toDate(),mStart.toDate()],
                        IsWorkdayItem: (mStart.day() == 0 || mStart.day() == 6) ? false: true,
                        AllowEdit: (mStart.day() == 0 || mStart.day() == 6 ) ? false : (objItem.ADAccount.toUpperCase() == this.CurrentADAccount.toUpperCase() || (objItem.AccountAllowEdit.toUpperCase().indexOf(this.CurrentADAccount.toUpperCase() + ";") > -1)),
                        ShowIcon: (mStart.day() == 0 || mStart.day() == 6) ? false : (objItem.ADAccount.toUpperCase() == this.CurrentADAccount.toUpperCase() || (objItem.AccountAllowEdit.toUpperCase().indexOf(this.CurrentADAccount.toUpperCase() + ";") > -1))
                      },
                      colspan: 1
                    });
                    mStart.add(1,'days');
                  }
                  //add workday of cur item
                  var curItemDays = 0;
                  while(mStart.toDate() <= mIEnd.toDate()  && mStart.toDate() <= mEnd.toDate()) {
                    curItemDays = curItemDays + 1;
                    mStart.add(1,'days');
                  }
                  if(curItemDays > 0) {
                    singleItemDatas.push({
                      itemData: {
                        ADAccount: objItem.ADAccount,
                        FullName: objItem.UserName,
                        WorkStartDate: mIStart.toDate(),
                        WorkEndDate: mIEnd.toDate(),
                        WorkType: objWCItem.WorkType,
                        Comments: objWCItem.Comments,
                        ID: objWCItem.ID,
                        IntegrationItemID: objWCItem.IntegrationItemID,
                        DateRange: [mIStart.toDate(),mIEnd.toDate()],
                        IsWorkdayItem: true,
                        AllowEdit: objWCItem.WorkType != 'CST' ? (objItem.ADAccount.toUpperCase() == this.CurrentADAccount.toUpperCase() || (objItem.AccountAllowEdit.toUpperCase().indexOf(this.CurrentADAccount.toUpperCase() + ";") > -1)) : false,
                        ShowIcon: true
                      },
                      colspan: curItemDays
                    });
                  }
                }
            }
              while (mStart.toDate() <= mEnd.toDate()) {
                singleItemDatas.push({
                  itemData: {
                    ADAccount: objItem.ADAccount,
                    FullName: objItem.UserName,
                    WorkStartDate: mStart.toDate(),
                    WorkEndDate: mStart.toDate(),
                    WorkType: (mStart.day() == 0 || mStart.day() == 6) ? "Holiday":"None",
                    Comments: "",
                    ID: "",
                    IntegrationItemID: "",
                    DateRange: [mStart.toDate(),mStart.toDate()],
                    IsWorkdayItem: (mStart.day() == 0 || mStart.day() == 6) ? false: true,
                    AllowEdit: (mStart.day() == 0 || mStart.day() == 6)? false : (objItem.ADAccount.toUpperCase() == this.CurrentADAccount.toUpperCase() || (objItem.AccountAllowEdit.toUpperCase().indexOf(this.CurrentADAccount.toUpperCase() + ";") > -1)),
                    ShowIcon: (mStart.day() == 0 || mStart.day() == 6)? false : (objItem.ADAccount.toUpperCase() == this.CurrentADAccount.toUpperCase() || (objItem.AccountAllowEdit.toUpperCase().indexOf(this.CurrentADAccount.toUpperCase() + ";") > -1))
                  },
                  colspan: 1
                });
                mStart.add(1,'days');
              }
              result.push({
                items: singleItemDatas.toArray()
              });
          }

          return result.toArray();
        }
      }
    }
</script>

<style scoped>
  .wcTableContainer{
    width: 100%;
    height: 500px;
    overflow: hidden;
    position: relative;
  }
  .WCTable {
    border: 1px solid black;
      width: 99%;
  }
  .wcLockHeaderTB {
    float: left;
    overflow: hidden;
  }
  .wcFixedColumnTB
  {
    overflow: hidden;
    position: absolute;
    top: 0px;
    left:0px;
  }
  .wcDataTable {
    float: left;
    height: 450px;
    overflow: scroll;
  }

</style>
