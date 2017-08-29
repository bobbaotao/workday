export default {
    name: "wcTableCell",

    data() {
        return {

        }
    },

    methods: {
        showEditWindow: function() {
            this.$emit('ShowEditWindow', this.itemData);
        }
    },

    computed: {
        cellClass: function() {
            if (!this.itemData) {
                return "wc-cell-None";
            }
            switch (this.itemData.WorkType) {
                case "InternalEvent":
                    return "wc-cell-InternalEvent wc-cell";
                case "CST":
                    return "wc-cell-CST wc-cell";
                case "PSS":
                    return "wc-cell-PSS wc-cell";
                case "Holiday":
                    return "wc-cell-Holiday wc-cell";
                case "AnnualLeave":
                    return "wc-cell-AnnualLeave wc-cell";
                case "ASS":
                    return "wc-cell-ASS wc-cell";
                case "Demo":
                    return "wc-cell-Demo wc-cell";
                case "None":
                    return "wc-cell-None wc-cell";
                default:
                    return "wc-cell-None wc-cell";
            }
        },
        itemValue: function() {
            if (!this.itemData || !this.itemData.Comments) {
                return "";
            }
            return this.itemData.Comments;
        }
    },

    props: {
        // type: {
        //   type: String,
        //   default: "default"
        // },
        // value: String,
        itemData: Object
    },

    render(h) {
        return ( <div class = 'wc-cell'>
                  {
                    this.itemData.ShowIcon && this.itemData.AllowEdit ? <i class = "el-icon-edit wc-cell-EditIcon" onClick = {this.showEditWindow }> </i> :""
                  }
                  {
                        this.itemData.ShowIcon && !this.itemData.AllowEdit ? <i class = "el-icon-view wc-cell-EditIcon" onClick = { this.showEditWindow }> </i>: ""
                  }
                  { this.itemValue } </div>
                );
            }
        }
