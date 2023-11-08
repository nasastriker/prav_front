<template>
    <div >
        <template v-if="params.value==0">
            <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px;max-width: 120px;">
                <span style="padding-right: 30px;padding-left: 30px" >нет ответа</span>
            </vs-chip>
        </template>
      <template v-if="params.value==2">
        <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px;max-width: 120px;">
          <span style="padding-right: 30px;padding-left: 30px" >Нет</span>
        </vs-chip>
      </template>
      <template v-if="params.value==1">
        <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px;max-width: 120px;">
          <span style="padding-right: 30px;padding-left: 30px" >Есть</span>
        </vs-chip>
      </template>
      <template v-if="params.value==3">
        <vs-chip  class="ag-grid-cell-chip cursor-pointer" color="warning" style="margin-top: 12px;max-width: 120px;">
          <span style="padding-right: 30px;padding-left: 30px" >Есть *</span>
        </vs-chip>
      </template>



    </div>
</template>

<script>

</script>
