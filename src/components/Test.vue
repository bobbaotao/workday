<template>
  <div>
    <wcTableBody v-bind:wcDatas="sourceDatas" v-bind:wcColumns="columns"
                v-bind:isShowBody="true" v-bind:isShowHeader="false">
    </wcTableBody>
  </div>
</template>

<script>
  import wcTableBody from '@/components/wc-table-body';

  export default {
    name: "Test",
    data() {
      return {
        columns:[
          {label:"User", width:250},
          {label:"Aug 1", width:100},
          {label:"Aug 2", width:100},
          {label:"Aug 3", width:100},
          {label:"Aug 4", width:100},
          {label:"Aug 5", width:100},
          {label:"Aug 6", width:100},
          {label:"Aug 7", width:100},
          {label:"Aug 8", width:100},
          {label:"Aug 9", width:100},
          {label:"Aug 10", width:100},
          {label:"Aug 11", width:100},
          {label:"Aug 12", width:100}
        ],
        sourceDatas: [
          {
            items:[
                    {label:"test 1", colspan: 1},{label:"test 1", colspan: 3},{label:"test 1", colspan: 1},{label:"test 1", colspan: 1},
                    {label:"test 1", colspan: 1},{label:"test 1", colspan: 6}
                  ]
          },
          {
            items:[
                    {label:"test 1", colspan: 2},{label:"test 1", colspan: 1},{label:"test 1", colspan: 4},{label:"test 1", colspan: 1},
                    {label:"test 1", colspan: 3},{label:"test 1", colspan: 2}
                  ]
          },
          {
            items:[
                    {label:"test 1", colspan: 3},{label:"test 1", colspan: 3},{label:"test 1", colspan: 2},{label:"test 1", colspan: 1},
                    {label:"test 1", colspan: 1},{label:"test 1", colspan: 3}
                  ]
          }
        ]
      }
    },
    components: {wcTableBody},
    methods: {

    }

  }

</script>

<style>
</style>
