
import wcTableCell from './wc-table-cell';

export default {
  name: "wcTableBody",

  props: {
    wcDatas: {
      type: Array
    },
    wcColumns: Array,
    isShowHeader: Boolean,
    isShowBody: Boolean,
    scrollBarWidth: Number,
    scrollX: Boolean,
    scrollY: Boolean
  },
  computed: {
    tbWidth: function() {
      if(this.wcColumns && this.wcColumns.length > 0) {
        var width = 0;
        for(var item in this.wcColumns)
        {
          width += this.wcColumns[item].width + 2;
        }
        if(this.scrollX) {
          width += this.scrollBarWidth;
        }
        return width;
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    showEditWindow: function(itemData) {
      this.$emit('ShowEditWindow', itemData);
    }
  },
  components: {wcTableCell},
  render(h) {
    return (
      <table cellspacing="0" cellpadding="0" border="0" width={this.tbWidth}>
        <colgroup>
        {
          this._l(this.wcColumns, column =>
          <col width={column.width}>
          </col>)
        }
        {!this.isShowHeader ? '' : <col width={this.scrollBarWidth}></col>}

        </colgroup>
        {
          !this.isShowHeader ? '' : <thead>
            <tr>
              {
                this._l(this.wcColumns, column =>
                <th style='border: 1px solid black;'>
                  <div>
                    {column.label}
                  </div>
                </th>)
              }
              <th></th>
            </tr>
          </thead>
        }
        {
          !this.isShowBody ? '' : <tbody>
            {
              this._l(this.wcDatas, itemData =>
              //   <wcTableRow rowData={itemData} startDate={this.} endDate={}></wcTableRow>
              // )
              <tr>
                {
                  this._l(itemData.items, itemCol =>
                  <td style='border: 1px solid black; ' colspan={itemCol.colspan}>
                    <wcTableCell itemData={itemCol.itemData} on-ShowEditWindow={this.showEditWindow}></wcTableCell>
                  </td>)
                }
              </tr>)
            }
          </tbody>
        }
      </table>
    );
  }
}
