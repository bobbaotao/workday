    var array = require('array');
    var moment = require('moment');

    export default {
      name: "wcTablerRow",
      data() {
        return {

        }
      },
      props: ['rowData','startDate','endDate'],

      computed: {
        getColumns: function () {
          var columns = new array();
          var mStart = moment(startDate);

          var mEnd = moment(endDate);

          if(this.rowData) {
            columns.push({
              type: 'None',
              value: this.rowData.UserName,
              colspan: 1
            });

            if(this.rowData.WorkItems && this.rowData.WorkItems.length > 0) {
                for(wcItem in this.rowData.WorkItems) {
                  var objWCItem = this.rowData.WorkItems[wcItem];
                  var mIStart = moment(moment(objWCItem.WorkStartDate).format('YYYY-MM-DD'),'YYYY-MM-DD');
                  var mIEnd = moment(moment(objWCItem.WorkEndDate).format('YYYY-MM-DD'),'YYYY-MM-DD');
                  //add workday before startDate
                  while (mStart.toDate() < mIStart.toDate() && mStart.toDate() <= mEnd.toDate()) {
                    columns.push({
                      type:'None',
                      value: "",
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
                  columns.push({
                    type: this.objWCItem.WorkType,
                    value: this.objWCItem.Comments,
                    colspan: curItemDays
                  });
                }
            }
              while (mStart.toDate() <= mEnd.toDate()) {
                columns.push({
                  type:'None',
                  value: this.rowData.UserName,
                  colspan: 1
                });
                mStart.add(1,'days');
              }

          }
          return columns.toArray();
        }
      },
      render(h) {

        return <tr>
                    {
                      this._l(itemData.getColumns, itemCol =>
                      <td style='border: 1px solid black;' colspan={itemCol.colspan}>
                        <wcTableCell value={itemCol.value} type={itemCol.type}></wcTableCell>
                      </td>)
                    }
                </tr>;

      }
    }

    //mock data
    // {
    //            "ADAccount": "zctaobao",
    //            "UserName": "Bao Tao",
    //            "WorkItems": [
    //                {
    //                    "Comments": "work1",
    //                    "WorkEndDate": "/Date(1501689600000+0800)/",
    //                    "WorkStartDate": "/Date(1501516800000+0800)/",
    //                    "WorkType": "Test"
    //                },
    //                {
    //                    "Comments": "work2",
    //                    "WorkEndDate": "/Date(1502380800000+0800)/",
    //                    "WorkStartDate": "/Date(1502294400000+0800)/",
    //                    "WorkType": "Test"
    //                },
    //                {
    //                    "Comments": "work3",
    //                    "WorkEndDate": "/Date(1502985600000+0800)/",
    //                    "WorkStartDate": "/Date(1502985600000+0800)/",
    //                    "WorkType": "Test"
    //                }
    //            ]
    //        }
