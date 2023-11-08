<template>
    <div id="page-user-list">
        <div class="vx-card p-6">
            <div class="flex flex-wrap justify-between items-center">
                <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
                    <div class="vx-row">
                    <div class="vx-col 1">
                    <vs-dropdown vs-trigger-click class="cursor-pointer">
                        <div class="cursor-pointer flex items-center justify-between font-medium mr-4" style="padding: 0.75rem !important;margin-top: 0px;border: 1px solid #ccc;border-radius: 4px;height: 38px;">
                            <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ TotalReports - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : TotalReports }} of {{ TotalReports }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                        <vs-dropdown-menu>

                            <vs-dropdown-item @click="changePag(20)">
                                <span>20</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="changePag(50)">
                                <span>50</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="changePag(100)">
                                <span>100</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="changePag(150)">
                                <span>150</span>
                            </vs-dropdown-item>
                        </vs-dropdown-menu>
                    </vs-dropdown>
                    </div>
                     <div class="vx-col 2">
                        <v-select  class="w-50 " style="min-width: 200px" :reduce="label => label.id" label="name" :options="StatussArrAndAll"  v-model="status" @input="setStatus" ></v-select>
                     </div>
                   <div class="vx-col 3">
                       <v-select  class="w-50 " style="min-width: 200px" :reduce="label => label.id" label="name" :options="RecoverArrList"  v-model="recov" @input="setRecover" ></v-select>
                   </div>
                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">


                    <vs-button  class="pull-right" type="filled"  @click="showOtchet">Отчеты по расписанию</vs-button>
                    <vs-button color="danger" class="mr-2 sm:mb-0 mb-2" style="margin-left: 15px;" @click="lookUploads()">Отчеты</vs-button>



                </div>

                <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">


                    <vs-button color="success" class="pull-right" type="filled"  @click="popupActive2=!popupActive2">Сформировать</vs-button>


                </div>
            </div>
            <div class="flex flex-wrap justify-between items-center" style="margin-top: 0px">
                <div @click="showConst=!showConst">
                    <h3 style="margin-left: 5px;cursor: pointer;color: skyblue;">Конструктор</h3>
                </div>
            </div>
                <div class="vx-row constructorWrapper" style="padding-top: 20px" v-if="showConst">

                    <div class="vx-col sm:w-1/3 w-full mb-3" >
                        <vs-input class="w-full" v-model="searchQuery" @input="updateSearchQuery" placeholder="Поиск..." />
                        <div style="    max-height: 60vh;
                            margin-top: 10px;
                            overflow: auto;
                        ">
                        <h5 class="mb-1">Все поля</h5>
                        <li class="li-border"
                            v-for="(item, index) in PolesArrFiltr"
                            :key="index"
                            tag="li"
                            @dblclick="addItem(item)"
                        >
                            <strong><span style="cursor: pointer"  >{{ item.name }}</span> </strong>
                        </li>
                        </div>



                    </div>
                    <div class="vx-col sm:w-1/3 w-full mb-3">
                        <v-select  class="w-full" :reduce="name => name.poles" label="name"  :options="User.shab" :value="selected" @input="setPole"  ></v-select>
                        <h5 class="mb-1">Поля отчета<span class="ml-4" style="cursor: pointer;color: red" @click="showDelItem=!showDelItem" title="Нажимите для удаления полей">Удалить</span></h5>
                     <draggable
                                @change="setDataUser"
                                v-model="User.pag.reports.list"
                                tag="ul"
                                class="list-group list-group-flush cursor-move"
                     >
                         <li
                                 class="li-border"
                                 v-for="(item, index) in User.pag.reports.list"

                                 :key="index"
                                 tag="li"
                                 @dblclick="delItem(item)"
                         >
                             <strong    v-if="checkPole(item)"> {{ item.name }}</strong>
                             <strong    v-else style="color:red"> {{ item.name }} <span style="font-size: 10px">добавьте заново</span></strong>
                         </li>


                     </draggable>
                        <vs-button color="warning" class="pull-right mt-4 mr-4" type="border" @click="clear">Очистить</vs-button>
                        <vs-button color="warning" class="pull-right mt-4 mr-4" type="border" @click="popupActive4=!popupActive4">Сохранить поля</vs-button>
                        <vs-button color="warning" class="pull-right mt-4 mr-4" type="border" @click="popupActiveShedule=!popupActiveShedule">Добавить в расписание отчетов</vs-button>
                    </div>
                    <div v-if="showHelp" class="vx-col sm:w-1/3 w-full mb-3">
                        <div class="helperBox mt-4">
                            <div class="helpDescription">
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit!</p> 
                            </div>
                        </div>
                    </div>
                </div>



            <!-- AgGrid Table -->
            <ag-grid-vue
                    ref="agGridTable"
                    :components="components"
                    :gridOptions="gridOptions"
                    class="ag-theme-material w-100 my-4 ag-grid-table"
                    :columnDefs="columnDefs"
                    :defaultColDef="defaultColDef"
                    :rowData="ReportsArr"
                    rowSelection="multiple"
                    :rowDataChanged = "onRowDataChanged"
                    colResizeDefault="shift"
                    :animateRows="true"
                    :floatingFilter="true"
                    :pagination="true"
                    :paginationPageSize="paginationPageSize"
                    :suppressPaginationPanel="true"
                    @rowDoubleClicked="onrowDoubleClicked"
                    :enableRtl="$vs.rtl"
                    :enableBrowserTooltips="true"
                    :overlayLoadingTemplate="'Идёт загрузка'"
                    :overlayNoRowsTemplate="'Нет записей'">
            </ag-grid-vue>

            <vs-pagination
                    :total="totalPages"
                    :max="7"
                    v-model="currentPage" />
             <input type="file" ref="fileInput" class="hidden" accept=".xlsx, .xls" @change="handleClick">
            <vs-popup style="min-height: 300px;" classContent="popup-example popup-preferences" title="Настройки" :active.sync="popupActive2">

                <div class="vx-row">
                    <div class="vx-col w-1/3"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACdCAYAAABWxoEhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDExNi4xNjQ2NTUsIDIwMjEvMDEvMjYtMTU6NDE6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2MUU2MEVGNjgzMzExRUVCQzYzREIxREQzRTBGMTU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ2MUU2MEYwNjgzMzExRUVCQzYzREIxREQzRTBGMTU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDYxRTYwRUQ2ODMzMTFFRUJDNjNEQjFERDNFMEYxNTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDYxRTYwRUU2ODMzMTFFRUJDNjNEQjFERDNFMEYxNTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz41lTDdAAAnvElEQVR42uydCXQc1ZWwb1X1qt67tcuyZXnfMNiAjY0xjklCCDADybCFbCcBYnCGJJwkQJIhIQ4xCUz+JE44TP4Qsk4m8zMTAgHHgAFjgxdsY2NsvGlvqaVWq9Wt3ruW/91Sy2ipUld1V3dLlu4577Qsq2t59dVd3rvvPkoQBJiWadFadEM/UBQ13RsTUP5n+yF8MEMNhn2OFmHYp3Dj1StKojGGFBV17odpsEoNEL7k5kwzkmYa/uLnKGnSEpkWIy1eaOCmwSo9SDT5sAxrhiKclictStoANgIZPw3W+QOTLdOs45i1olitDGBBAlhsGqzJCVQZ+XBmgKIn4CWiqewlgA1MgzU5tJODNFfGZ5oMkiStmwAWnQZrYjrhCJN7gmonJTKQASw9DdbEAMqTgep86Ew+A1f/NFilAYrJAOU+T4AaLWHSupRGkNNgaQeUaxKbPDW+V7sS0zgNVu5AURntVD4FgBouLGltBK7kNFh5yrZtfTPIx40ZkICieSNN8xZi8EYARZHuZHTcKXdNz07yN/x53CUcaa3jwTUNVnaoasnHezA4/qRICFx/qmpo33Kedw3C1ULgSo0HFj2NkKzcoAYqscdZ5kaep5nzvF/w/mZmfExZmQZLRohJuyCHr5liYVvlFOgePWl102Cpc84NpM0ijsH8XL6fThjqpkhXWUg/lU+DpQwqHDqYTVqZIFBzcgqd0vq5U6jLykmfSU5X6aZxOjdqjs46pq9AKmFCsOpzORbPMQumksdAWg0689MaayxUZRktZRn6XSRoX57r8XiOvnCKdaGZ9KF9GqyRUOH41KzRmjudMlya6zGJppufiJbZp1hXlk+DNQgURRqavioZrbMiH/MQDdlWTLEuNZL+tE5psDLjL6ilHJLOd0pvFHh6eT7nIMe4ZAq+r2VTFiwClT4DlVnub/r9nvWQZ/45ceA/ROCcai+teUqClQmLG2CcbM5UwmhOJ4z35nsu4mfN6u2ovnWqmcMpBxaByizlpI+EylQW6Kz6JYFithbnJAHANwlcH5tCYI2Y4jnvJ6EJVDiMMGO8l6ivq3JNMmb+NoGqQfPe1nF/cZQHfmKyxkKFvM+At/pDRONuAgo4gymxzVPbvbsE3f3+DR+9SDjvwcqMr2D0N+bm4gMWd6TfsYFN664j/tClBb6UOM3wbzE6dpfZGt1tdYU6tTow+nI97bVf5tK6u4a7eXpj6nsV9Z3/PQ0WiKkq6JdsyYCwZfNm91N5QOUePZyQjJus4V73tQSma8gDWVFMV6C7uw8ikThUVbnBZjcd0enTz1mdoe1mW7Qv12PGBqzusN+9lefpy6X+X2dIb62c6f1dER/hSQIWP6HAIlBtIh+/HPVrfOPuIICFVEKFQLnPRXo95UuDvcxnjQbzRhhcul50OXz4FAQCg7dhsZigtrYCamo8rMlMbzeVxX/vrOp9V63pSyaMD4FAVYz3dwSunxC4fjUlwSJQ3U4+fi/z317S7iJw/V0BUEzG9ImDdYHO8pWtzYkHOr2BxaFQFK644kJgmOLHKxzHw+uvHwKeH1k2gaZpWLduOej1OqBo4R3iG/0ym28UC1s94YDrWzzHXK3Yz9Oz/1E1q+P/TCmwCFTXk4//VWCWniHt6wSwZhmocOwJJ44NwW7PkubTiUdaWrrnofkZksWLG0RNUWzx+/vhyJHTY35fWemCCy4YmQxB0fxBgyn5K2dl4E3ik7Hn4Ezr9H2+yn9OJw1fA5nB3SxBxB8rZ3U8QlEFrVs1McAiUF1FPl6AwcQxJYK51o+T9kMCWGSUk15D3uYK8jbf29Lc+4lTp9rG3JDdboFLL11c9Ps8caIFvF7/mN+vXLkAXC7ZacUk0WKnCQg95BGZiU+4BG8hzwj1vwhcDxcQrtKDRaDaQD7QvJlz8YVJe5q0gzpDinQ2tYCYhot4jl5HfmdkWQ727DkK6TQ75ourVi0Bm62sqPcajcbB5+sTHfhYLCH+zmo1w+rVS4sOOYkWv0uixb8UGqyS5GMRqFaSj7/mCBVkor1v4g9sauzsi07HQENDDZw+3T7i9waDHpLJVNHBsljMMGdOndhCoYiovZxOW0lcD2JSccrqL4U+j64EUOEChefzVevZpL6+CtrbuyGRSIkPtqGhmoT6HuIwlzb6dTisYiuVUAx/vICHF0oGFpFPkFZd6JMgQAsWzBLNIQnrVZv6dFqANPHoUikB2DSuwBFIdIcTzIN9hx4EHpIi58F1OQxpOj1FIjyiGY2U2CbamDPxrZrc1f5fF+NcpQCru1gnqqhQvnqLI+5YLMpDPCZAMj4IkcqXdMTPCBXCZSqjoIw0o7nklKXK7AP36Y3JRKFOgGUoh3z2UoCFDvsO0j5S6p7GNcvRAZ40ARJxbQMl7N9kQhBbqA8jMuJrWWmw2ge1WbFFZ0j/zFHRd7KQ7tsIi1HsG9y82Y1P8BbSzpYKKJaYuT4/Dx3NLAR6eM2hktOI4X4eOts46OrgIBYpXlFjYgJPlNf5flvg08RLClYGriAM1kRIFhUo8nARpI4WTnzIpaqygKa2p4uDzlYCWLTwgJkssR/QjHLjPmnBysB1lHx8vRjnQrPU38eDt4WFgdDEqdmBgUFPJwc+osFSycIARoDa7qr2HyrC7cRK7byPGH0g7V9IW1eoE6CZQy2VTql7cDxPIIx0QSwehHgCWz+JFGPA8Wni2KcIrDwwtJ5EgwbQ6YxgNNjAbHaB2eQEq6UaTEa7qmvsaufA7qLB6aa1jCaTVmf48WK4q6M1VknBqp3bYgn5PQ9HQzZ06DWvcx4M8MRxVq6hEskQBPrOQH+4HSLRHhGecU0rlxRbMjUA0VgvUYsfTGMiaHZbLbhdjeC01xNY6KxaFa81TkxjRTUNekP+dDE69r+trpC3CI8yMnpjgpKAlVkkisUzzI6KgDcZMz3JpvVf1sxRJt6En/gwSpxyhMcfOEXa+0RD+bRTFQQ2f+Ck2PQ6M5S750FV5dKsmgxNImqv8ioGyqz5wWUwJbcX6ZGOKeNd1LnCTO45AlU2MmLS6Xpa6/6e67L24YImr7uTFyO/8U0dBz29x6Gz+x3i60SL0vvYx27XHJhRs5KYTFfWv3d5aHC4c3eDHeV9GyzOcKHHDVGtnx6qUVrUcazMChkEyiqjslnSniFa6yt5aYkEgcrLZY32+oJN0NLxJgEqUlRNjZ2OpjbQdxaqKhZBfd0q0DHGcU05RrKeytzg4nm6GEmNYanCt7oCA4XHxwSorEPgjJ49TsAqKFRJAlJz2y7oD7WVOGYh1+o/TgBvhlkzLoNyj3zFpKEoNhe4UnETVsxpLfDNSGb36goE1FABWIRKkY3NJ0cI/ZJsUKGWamp9XXS2J4qk2TicadkJwVArNDZcKUaZcnChp+KuUAcXeVGvIB87CzliIrcPD10AqNCPmp0xfYodN+Jn1eRyPjQV40MlQFvHXjjVtGNCQTVcAsGzcOzEM2JUKmtv+kmEG1Q3BsexzEfSSUMhzWFQdvxMSy2VWcTQADnsHUM6YZl6nwXEAUa5MWWM+E41vSQ66BNdcJzs2Pv/Kw5zyD7FXl7tSL0z6Kv4bAGddtk3QZOoMJNvjiUSc3o7EtEyW19X5cswuDuWYun1cRAZEGQcVxZOnt0OoXCHpr2p1zNgNuvBYNCJCzOw21iWFxdMxONpSCZZyGc7ZJrWwcK5HwO7rU7m/wFqZzJiik52553HBRtRZ1XvR8tskT6ttRUxgz6pAEUTH4tAhTDU5qP9Qr3uz6uFCoGSgwo11WmiqbSAyuOxwOrVjbBsWR0sXFgFNptJ7Dy5hmnRLS0BOHasS2wnTnSrAg1fiPfPvAiL518PVkulxP8D+H08VM9gZEfo8XyYpdrU1Emue46F0bnuJmBpXSY8OK7PnI/GIlB5Mr5U7iYgYnERdY3aSnGaMmYKeFtZWb/qbMtr4oBnvmIwMPDIIzfC3LkV48I0uqGmGPo5GIzBnj1NsGPHKQiF4orPrdOZYOnCG8BklF6Q4/QMTv+MFr8/CKdPd5zLrXe5bLBy5ULWURG4yuIY6NEIqijRVm1yUOflYxGoavKFSox4As5bQWXue8Av76x39RzVBCox5Elx8G//9ix5ULk/D6fTDNdcsxh+9KNr4fbbV4LVqsz9ZNkEnDyzXZyblNTyfWPnP32+ABw5cuYcVKJaCQ5g00WCjts11FZZzSqdI1R1oLK4vkw4bGBZ3W2qNFxMkM1lGoh2ixGglhKLpeChh/6WF1xDvtmGDXOJBvwYXHFFo6KJZpz8bm7dJRu4YE7ZcKmsdIPJNHbKta3Nh1H3zVhRR4MuSRJtFdEcrAxUmiyEeOvV1HeOvHPWHQyGlb8qfl7WNznb/ErWieNc4frud58Tfad8pazMAJ/+9ErYtGmN+HPWAKXvtDhaL/eSYfvAsafE1UljzWM/CSyStlCP+4ZC+1Y5gZUxf5qtrun1R69Gn+DgwZOwd+970NnpF/0TWcNOnHW59Bdv1yFIJMNQKBmE63ny9msTXF14YS088MAGqKjIvmKnpWOPmKojJf2Bkf1VU1MuLtn/QFPqYObMKhE6ltX/U56XzY03xJATWJldCJxaPagj+4S1AwPxD0pgR2Jw/HiL6BPISb9MCgyOARVjrCocjhOz+JxmcFVWWuEb31gPtbXjv6vpdBzaO/dL26XESK2FQyB1dRXiErMlS2aLtSHmz58JRqMBBJ5aGu51NeZxySGlG2LSCqHCoQBNix70dHN3jv6d2WwEt1s6CsI8JTlt1ebdWxATKA1XIqO5gpocz2Yzwle+spZoLsu4f9ftf098gSSvadSIPC6MveSSRaL2okeVQo1HLdcX0mlXDFZm8LNW6wfUH4yN2QQJO0LOqZVLKcYEu2B/CxRTEK7vfe95aG/XBi6MFDdvvoz4XPKT8BjGd/oOy/pa6fTwpWfykQHPMlfleJkRNZuP01mgoiDPwU9JDXNG36iTyBfBomRy41ZyUxlynV0cuP6uGVzl5Rbi1F80brSIjnxSJtUnElY2CCsIVGMk6MhFUajadDwbMG7Ivb6CrBh1VTdhcQ60/4sWNYgLS7ESDBYkk9RKEWltlUpHIRBsglIJwvXwwy9oBteyZdWwdu2scaDgobvnmGxgo3jIJmK5PAenPaIJWBkTqHkxqXCvey7H6j4lAkYcSnQ0ly+fN255Iblxq94A1pwSoJSCcH3/+y9qBtf11y8S/a7xtJbUPWPGrNKVPlxap9YchkbntOejsVSlvSgR3H00GrY+BKNKN4//ncHIR0r8fadgIgjCtWXLdk3gwgnua66RT/xDLR0KS6+PUJr5gDVLA97qD6sBS+190DLaCs2fTWuo/G113xF4eqWa7+GCCKk53EQiBPF4H0wUQbh+8IN/QEdHf97HWr16Jrhc8h6InPlPxJQrlWTctLW/u1zJLrKYzJfQBCwtTSCWiw76Ki7pbpnxW45lblL7/aTMSpvQQAdMNNEKLoah4Mor5fcxCA94Zce0VCRSmGMD1t/1tNbdidWXx/m7gVzuQSehrdDAW3LWTBzDhAOuRamEcQX5+VKeoy+GPEbrk0k5sJQvl8N5unSaKxpcjzzyEjzwwFXEf3TkfJyVK+vgb387ARw39v4x0xRXFhkMllHO/eAqJRVFRwy4gIVorntDPZ4zNMMfYPTp/WW2yMEyeySQD1hj0mYy0zaKRthxUjPc69rAccxcgafqiHZqJOEsVmvVbPFpexMrmSF68OjvxJXJSuSJJz5HfKBnwesNFk17Yd7W/fdvFOFSk2YzvD355AE4flx68nve7KvA4x67S3B5NQNWmwauMSX4KUo4SZ4plgnHAi6vb97sfjv7cIZE2kxm3EqRdsEqvgFv1Z+IZvox7opAtNO1BKrFWkKFjrsUVDhvphSqefOqYcmSGfCzn30aGhrKiwbWwEACDh5sz+sYCxfKX6/cKDyb0ihKFqgKYXBjAqy//xhpB7Zt67sjVx/LCgoHQ0O97hW4m2ghH47colO5TpWSiy4aHBcqL7fBT396OzQ2Fq8cd0ODJ6/vL1gwHlhBVX2mkWzKByylvlTBnxDHykSKKrIYFi/+IHfc4SiDf//3TxUNrtmz3Xl9HyepMYtV0vdMSbs+BS5W5C44WKC8NnvuYMnMK2N2pfKHOxIih8MMjz9+G8yfX9gyqJgrb7fnt/IK3d7KSuk4CjMeSgCWXTVYmWiw1GWNRg1VCDLApRQfo7p6bByCcD322C3Eh6kp2LXPnu3RRkW4zTJ9kJb1SwsoUdVgQYk2Lxo/wpAzw2nFb7xclib+/tFHbyoYXA0Nbk2OI5fxINsHBd3RBLhcwDLCZBGKVggWleWhGWDr1n+BCy6o1/wSGxu10VhGo07+rZnAMqHBkus7uRoHuWkEA2zZciNceOHMCWkK5YRh9DLvHDXhwNJPOOplOkmuU8f6G4JirfDww/8My5dro7kwmrNYtBnOSyRYmZfLINNnBX0kplzAYiYcWDJXhBXylAouglAiuGQe4br00vz3Gs93/Grk9Uv7Unq9uRRgQeHBooR4oS9OJ+NemEzK5+A6O5VP4yBc3/72dbBqVWNe1z1njnYj/IGA9AyD3AppRldQU5jIBSxVV6Q3pJsLDpZM4QuT0an4cpub/SphpuHBBz+eF1xaRYRoynt7pcHC6szSfVbQR3IqF7BUiaMicJLRsU+pCUFzcd6ltBZNbKTJqCxd7PRp9QVrEa4HHrgG1q+fr+paq6vtsHZto2YRodcbFpf5S4Jldsto3YJpLKzVcL/iPsznTFUNHY+lEsZfxAess9iUvo7jmDk8R88XePpCQaA0WdmDKSAsO9YJx1LXSqZ2Dhxogk2bNuYE1333fUQcsnjttbFb0FRV2QhA5ecaRoEmk25EtkK+0tQkl8hIgc0qPXOgzz+2T1GUcIQ8v33kZ9zkATMbmjZvdreo6r/hmjcXDWYwJeOkYRUObK8M/T7Sb69ORCyXsGndpTxPrweBysnxMJooyZRbrB/V05u9+MfZs93ET4mA223JQWNS8NWvXiXO12GlGKw6MwQSLtmSSnXRUo4ckS54bCkrlyyKi8GOXq9aYwkUzR/AXCy9MXXA7g4e0RnS3huvXuHP59rzBktOrM6wj7TnyI/PYbntQGfV7USrfU2tlpTbjs0hU5hsTK+RZ71jx7twyy2rczTHFNx995UFh2i0YGJie7t0FofDXicT1FAq70143+IY+Lq9vG/0hll5TwwNByldqE7CctuVM71PG82Jr4LKZTWosaRCaL2+TDSHSuSFF47AZBPMev3c51aIS+ZHi8c1VxqsMkoNVCfdtd2fkYAKQIOlT0UB61yH1PleIZA9rdaBl+uwcrcy57q1tRd27z416eBasqQS7rzz4hGpM+i0oymUkjKLYrASVlfoX8mLXrBC98PBShWjs5xVvU8AJahaXoMbSEqC6moUa3YqkaeffgMmo8yf74EvfnHlObgqZGrCY5AzeniGk8k7YnTcszZ3f3shr3v4EytKrWp8SwzG1FY13zFbpM0h7rxVVb5Y8bDD9u3vThhg0uk0JBIJRb7a3Llu+MIXVoDZZJa939F57slkikSzh+DgwfeJxvZBNBofNtaVzvaWUVqCFS9WpxKthVv3Ks/tIVdZJqO1aqqXZ91Za0ieeOIVsRRRqaWnxw9vvbUX9u3bDwcOvC1CpgSue+65TBzSkHIXLHZ61DmCmRqoA+SlaifnOwZvv31CVGRWd/8+FVzkB1amkghbjI4lb0yKhLd71HzH7pR+iQx6C1SWL1J0jFAoBo888lzJwert7T33czQahcOHcaOo7HBV1+jg8is7iWM/0sRZiLZiRk3I+XxjvQ2brQwomn+bWI1o0cDKSKxYnUvgemX07ziOk81TG9oRXkrqay8VqwwrkX37zsIf/vBmScGy20fOGgzCdYjAld3NdXuSsHa9dwRcdufIx4jFbUOhsX45VvPR6dm/58BF3mAVbTssEua+PGQOw+EonDjRArt2vUPeZvkVOE6ZLdZwh9OZdasUn/s3v9kF//jHsZKBVVdXB5WVIwtORyJROHTosCK4XO4ErNvQDkYjJ0aCoxeodnSMHdvEAiwOhy1tc/W/pGSEqBBgFaV8C47Yd3Z1H9637z3Yv/+4WPAeo5j2dvnt9UxmSnTkpQTNodJxLdSKjz/+IuzceaIkYOGg64IF88Hj8YyCK0L8IGWay+5Iwpr17VBeNTbyw5qjWOR2eC3S2tpyEg3yr5msMSUFPnSagkX8LK6Y5nBgIHR4YGDk6fr6wjD6dyNMQbm8lp7bsFHUXkoEMwe2bn0ennnm7ZLBtWTJYigvHwsXOvSK4LInYeGiVnLPI11jLMk9d+6Mc/XHrNYysVyUwZz4k1JPRWuNJVqmYnXuJeuY/0veqjEBQ1OTfF0G3CsZN+WW1IIGC8ydfZXiXTZQcz355Gvw6KMviPvglAauJZJw7d9/QBFcJlMC5sw5S7RTWiKaHix0u3r1EiyP1OSq8u8vNVhFqRRrtTFpj6fshdG/7+sbICG4fICKW9rK5Wrhxt6zZqxVdR1oEu+55/fEgS7+Bpn48AfhKh+lzSPicIQSuAyGFMyeLQ3XOVIM6adV7AmJO7kxmoKVKbdcNK21fBXzfZ2O4Ybe4Pr6Sli7dtkI/0Bq3AZ3epcNyyuXQm31Raquo7OzHx588BnYskW7Wu5q4Fq2bClUVIyGawDeemufYrgaGs6QfktJ9Jfgc1f3PKvWDdZaY6EEitWpVTW6aEWl9cXKShdcdtlS4tTOIp2UPQ0SJ6dd4/hbGCWqhQvlzTfPwN13/x4efvg5OHiwVXZaRKkoNbGDcC0jcFWMgevNN98SR9KVaa7T5DM5Wls9yejZdDHBkt39S8utTbL7OhTla575R4GnLlT73Z4uTrZGqaiJfIehzbsv52vDVdOXXNIgbis3f36VuAJnvJJEkUhS3HfnxAkfMa0d0NMTIaCuheXLaxWVMcKxPBww9fm6ye85EWz8tFgs5MVbTaAxyJY9GmrptA5aW+cRTScGMonyGb7LDaaE2qCsN5ecrHM8jQMWEouJ30VZqNbfXb4sNmD9L/U3AuDr4GTrlIo+W7AJzra8KrssXY1gOgumIGNdBpNJLy5Rw80vcTWQzxcWwRo7zkaPC9doUBAuHNPy+XznwMJPq9UCa9ZcRq5Bn7XmFsLV1jYP0qxhX01j2+dzuFUsaNupOVgZuFAvF62olK+5/kdYZ0vt97AQBsKVHqc2FJb9Od30MsTiRbPyknBdcEGNosJrCNfBg4egq8s3QnNZrVYRLtRc2eBiWQZ83bP+aq/qfzAXK07AaskVrGxD9ziplShW5xtMyb/m8j2cJ6uqY8ZNyzWbXLBs0SdgRu0l4mKMYgtu77tt224S6SmLPNHnWrHiIqiqGjlCHw6H4Y039hAtmVTQLyzUVDd91AADudQxK4jzPhQhIn5YRbYok9MWZ/hI7hqBRIP1zLj1NzELYkbNSli++GZwOmYVHS4clP31r/fBgQOdiuFauXIFgatqDFx79uxRlBVBUbxZB/HfGITwUrXva6bCo/ZgZeDCq8eksIJXhxVn3Skh5x0nUXPhXsnmLCm6RqNd3NB76cIbwVVEwAwGK4lW18CRtxfD2dNGxXBdfPFK4teNhCsY7Iddu3YrgguH/hiIP6UXQheovOScVykq3hM648zPgAIXD+k8O+sNEKi8F+YFe3kIBZUNFWC9+J7ASXHXB6W1TRV3MOlXh70eKtzzwe1qHJE7dtnlEViwKJY1yhvyuXDAtLOzc4RD73Q64Ior1hGNrVMSdUZYMH2RpZ1HFV5+C1EsqhLYFDnvEnBRGWfeU4hoMRqyVYT8nte1Oh5uRdfbzamocicA7nzfTxrWUo/GApDLnDzWlsAJcVxN43I0iAs/5OSyywdg3oKook3MEa69e/eB19s5wqF3Op2wfv0VsnCNAjfCgXEzy7iVTO+0K9mmN2+whgGGw+KOzDiXZgXbultnfJlL6zZpCStC1efnVG1i9MF3UySK7BOL6WJUybJx8rs0sOJup4KYb48llRjGSIIDB5hMTnHpu1xdBTlZdVkY5i9SDhdmn3q93hGay+VywpVXrpeES0IjJjjKuIljPNkG+HB9YbhoYElAZspEEWiTmUyjM40Z9jmOtrJXhfzuF6FAlQVxTz/cTzqdKu2mTmNN5WCi3kUXD8CMGSFFcLEsK8LV0eEdpblc8KEPXTkGLhlTm+Ap0yZONy5cnQSsUEnAUgEgnkCXgQ8hxDo8liEH0ddc/yjPMdcV8hrwVqMDvLiPMsuWHiqrnQYnTqhnpkUbGvqhri6kaMMB1Fw41dPR0TFKcyFcG8S51mwbFAzCZfwar694bdKCNQ5wpoC3emMybnq+WOfEW8ZpoHA/P+6IfSEEF4ZYHbSopaQKnsyc2U80V7+inSwQrjfeeIOYxa5hmmvQLG7cuPEcXFmCA5bAda9gqHxVS7BKXqar80wDS6D6XrHNDy5AqKlnoHYmAw4XLVuLS6vzYQpxRTUD9Y06MVlR7nxtbU5obXUpHopYu3btmDTn3t4AvPTSy4qyItCKUHzip1Sye4OmL9AEcDO+TtrKUp0cB1QxS2LGbJ0IGf6MEDBMfiDhcVErVdYyMJPAhJ8IsxLD4PU6CGDK4GLIha5fv27MCD2uBNqx4yXFcAGBCxJdHx8TJhd6HKsQsm1bHwL1FkzA+qdiVEj8sBRx9nEbEfwZI0wcPRf4DwDCYrIIIc4SYfKhXj+Y5apFd9bUhIhp7FU0t4gO/c6dr0FXV5doIof8MI/HDR/+8FWKJq5J43nKcD9trn2+JMMNGkGFgzs4hTMXprBgpiyuVK6vrwKjcez7VVUVhlmzehTtFobH2rnzVXEQdQgs/HS73XDNNVeLplNBYMADbbyfLqt7Pp8B0lKaws9OZagSiZS4Qnn37iPQ0tIlm+ff3W0n/69s7x+djoENG9aPmf7x+/3EtCpOu6YFLrGVi7bfDHnMEZcSrLJin/Do0TNw6lQbRCKlXWZ/8mQb7NlzVNRUQxmqnZ294kJTKenpcRC4qhTCpROHG6qrR1b8U1qa/AO4kg+lQ6fvmIxg/RaHr4p1MlxShvUM2tq6Ye/eY2Jrbu5UlPKrtWCy4OhiIPjvM2dGbkdM0cI7OkPqh1ZX6OOMrX9ZiqXvV+JQI1wbN26A2bMbRPOH2RGzZuW0QcIv/vznP39uMjrvmMqBBUJy3dBGoBn+VZph99K0EOV52sZz9FzcwFEQqBGv7PHjzaJWGC0rVy4El8tW1PtGM4gmcGw0ScGaNctwt4yzBnPix57a7l2j/8ZjTV+ro9it5LnRSkbpFYxjZfvbFGmrbr311nfU+Fgl3e1r82b3MQLXFeTHnaSp2hYCyxyabZHvOCsD743+P9yXuq+r8vp00vAlAlg9OrVSRTLQJ3E6rUW/b1xQ6vE4IBAIDXPS3dA4pyZgd1LbPLUd/49mpKfOAxH9864yPqWnucfyeH6cQDHPCJT+RQHofuBT84BLfoZgIZWzhbMkvyRtzaTRWMM0F6bjvEbaHAV/ntIZ0r8or/M9Jdf5HwwX6HRBX8V1rc0Dm997r7lmbMTlhmXL5pTknv3+IBw71iQufZ8xo6Ld6WaedFf7n1O6msZpTm7Q0+xPyfPTqdRCpNMMm1jGs3ukquEZSHh/yHPpa2WOs+62227bPeGHGyTgwhE+rEAzXqbjgTL7wH1ES/WqPf6pdy0f97ZH7/L3hOYQUyTe7JIljVBT4ynJ/ZJ+T/N8+o0yG/dnAtSbFK1+p0GHKaEIruFg8QL9mxRT+WPJA/IpEx/zviQIvEfiOD8nYP3rpAMrA1dFBq5lEv/9E9K+WTu3BQOOnLeNSETLbKffgy/4e6LXzJlTX6XX64o5OMtifSqdnn2ZOOQvmK3R/nwPaDcm1urp9M/JczQpAYsF8w0s7Tgpdzw+2votgWc/JXGctwhYayYlWBm4MJkJq6OtG2KBtDuIP/aHob/Ras1jMm6yhHvd16dT+i/hru2Fuiea5l/VG1PPWt39bxaioKzNEF9F4HpCDq7hYKUox+U8ZZZd6s3H2u8SuNS9EsfpIGDVKwVrguwVNcKhR48Wt5L4AmlbSLtwOFQZ6dXiXJhjX1Hf+Z/ldd0fY3TcHzW/GUrwmyyxO6ob2+7x1Pl2FKpK8UDKvC/FiQmSWVdUMUJy/CR/gZcblzCqu/UJprGUCtFa2AEWLY/pb6v9VDpl+JYmTFGC1+4J3m5xhruL1ScWfewiPZV6kjxTq7yPRT2fYqq+IW2oIx4+0bOD/J1ZQmOdIBpr8aTVWCpE88odFTM7/0gz/A4tfHOzLfrVYkKFEk2XHU7xhi/COJUZKeCv1XM9Ywc9uZgDUoGfw2ACppScVGX+JytVmVl3zYtamSzRX+WtrWh+v7OytyS1KGNs2dGscAnsN/Tpzj8w6e7P0Onu6+hk531Uyv8CeR/Gq53xDzXXoYPJLRhVaep0Oyr6jsfCNtw905XrMYi/VtLquXHOclSgqU/rqfhT8vchrKCE9ApQti/QAGn/OSU0VkZCWh8Qi5PhTlj5HENvTO4vdcck+LKTKcGExUCCGhzuB8S/Ck0ZsDKrtDWvmUoz7MF8nqmjPHhsIvRPkrecSgvmz+fpj+J85WOq+xAmv2iutYzmZM4ai/hX72SbaioqXAKBCyy3kSvLJZMENe8/3XrrrdxUBAsXVGq61Mbm7j8NOW5aRdP8uxOtgwhYbWnKdpMA9C4VX/sP0q685ZZbcpodmPRgZWqmaqq1UOMQX+tsjo776YnYTyyYe5N05Zd4yngnucNXZV4cfElxMHrFTTfddNfNN9+cc0bkZI8KhwR9CKemTjzNtwgcs0h1hxrSLRO5o9K0ezdRJ7tJRGik+OhM4JImEJJYEhJrK5395Cc/qclS3vMCLKK1kv+z/RCGxJpl7BGN1ZGTf1YW906GPhMofVJgnO8BA80Zra9tAATnj/i1PBijY9/PAcZuszUanCT9hX5pZyGgOq/AQq0FGk7zuKp6XyaOuJptWRN6U3LrJOqyHrVLu6aijzVca6E5zDvHCjM5qxvb7sIqOGxKP/4oPCVwZbZIu96YSkySfsKKyAXdJWHSZjfICfG1cFnZLJgWOcGt/Noz9WW1t6/nQXaDnEmMae1vnUeCpq+jUFCdr877cLgwEXBgmqMxULUVylmfEmBlxAtF3EB9Epi/okF1XoOVUfdt03CJsxLtxYTqvHTeJZx5fHlw3aJlCkLVXejoT855P+/BysCFN4cLVh1TBChMJ/IWcpxqGqyRgLnJBy6MPZ9vNpTRVCVJ3ZmSYGXgwnLfuN298Ty7NcxW8BGgoqW8iCkL1jDTWLAdNoos6JTj8EpfMcanpsFSBhhWUsHFGPZJChROeAdKZfamwVJmHlGD2SbB5aYzQAWLPYQwDVZ+GsyViR6ZifS8YHCdIDrmkYlg8qbByt0Hs2RMJGoxukQw4bwnTk2FJ5K5mwZLO8jKMg1hMxXI4ccHgWk3OPaEkV10ImumabAKA5pxWEPzqRvWqCzwcBk/aailMjClJiNIWcGalmnRUujpLpiWQsj/F2AAMr2eODRc7w0AAAAASUVORK5CYII=" class="popup-preferences-img"></div>
                    <div class="vx-col w-2/3">
                        <div class="mb-5">
                        <h6 class="h6 mb-2">Адрес электронной почты:</h6>
                        <vs-input class="w-50 "  v-model="email"  :disabled="local"></vs-input>
                        </div>
                        <div class="mb-5 pb-2">
                        <h6 class="h6 mb-2">Название:</h6>
                        <vs-input class="w-50 "  v-model="name"  ></vs-input>
                        </div>
                        <vs-checkbox class="mt-5"  v-model="local" >Сформировать локально</vs-checkbox>
                        <vs-checkbox class="mt-3"  v-model="fileGen" >Сформировать по файлу</vs-checkbox>
                        <template v-if="fileGen">
                            <div style="margin-top: 15px">
                                <vs-button class="btnx" color="success" type="gradient" @click="open">Файл</vs-button>
                                <a v-auth-href  href="/example_file/?filename=type_reestr_report" >Образец </a> <br>
                            </div>
                        </template>
                        <div class="mt-5 pt-2">
                            <vs-button color="primary" type="filled" @click="generate">Сформировать</vs-button>
                        </div>
                    </div>
                </div>


            </vs-popup>
            <vs-popup style="min-height: 500px;" classContent="popup-example" title="Настройки" :active.sync="popupActive5">
                <h6 class="h6">Адрес электронной почты, через точку с запятой если несколько:</h6>
                <vs-input class="w-100 "  v-model="email" ></vs-input>
                <div class="flex flex-wrap">
                    <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="generate">Сохранить</vs-button>
                </div>
            </vs-popup>


            <vs-popup style="min-height: 500px;" classContent="popup-example" title="Добавить условия" :active.sync="popupActive3">
                <h6 class="h6">Поле:</h6>
                <v-select  class="w-50 " :reduce="label => label.atr" label="name"  :options="User.pag.reports.list"  v-model="uslPole"   ></v-select>
                <label>Знак может быть </label>
                <vs-input class="w-50 "  v-model="uslUsl"  ></vs-input>
                <label>Значение например 0 или 1     </label>
                <vs-input class="w-50 "  v-model="uslData"  ></vs-input>

                <div class="flex flex-wrap">
                    <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="addUsl">Добавить</vs-button>
                </div>

            </vs-popup>

            <vs-popup classContent="popup-example" style="min-width: 800px;" title="Состояния отчетов" :active.sync="popupReport">
                <ReportTaskProcess></ReportTaskProcess>
            </vs-popup>


            <vs-popup style="min-height: 200px!important;" classContent="popup-example" title="Сохранение полей" :active.sync="popupActive4">
                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Название шаблона Полей:</h6>
                <vs-input style="margin-top: 7px;margin-bottom: 7px" v-model="nameShab"  ></vs-input>

                <div class="flex flex-wrap">
                    <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="savePole">Сохранить</vs-button>
                </div>
            </vs-popup>

            <vs-popup style="min-height: 200px!important;" classContent="popup-example" title="Удаление полей" :active.sync="showDelItem">
              <template v-for="item in User.shab">
                <div class="row">
                  <span>{{item.name}}</span> <vs-button  size="small"  danger border @click="delItemShabPole(item)"> Удалить</vs-button>
                </div>
              </template>
            </vs-popup>

            <vs-popup style="min-height: 200px!important;" classContent="popup-example" title="Расписание отчетов" :active.sync="popupActiveShedule">
                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Название отчета:</h6>
                <vs-input style="margin-top: 7px;margin-bottom: 7px"  v-model="DataShedule.name" ></vs-input>
                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Адрес электронной почты, через точку с запятой если несколько:</h6>
                <vs-input style="margin-top: 7px;margin-bottom: 7px;min-width: 200px"  v-model="DataShedule.email" ></vs-input>
                <h6 class="h6" style="margin-top: 7px;margin-bottom: 7px">Время запуска</h6>
                <vs-input style="margin-top: 7px;margin-bottom: 7px" type="time"  v-model="DataShedule.time" ></vs-input>
                <h6 class="h6">Периодичность</h6>
                <v-select  class="w-50 " style="margin-top: 7px;margin-bottom: 7px" :reduce="label => label.id" label="label" :options="DataSheduleRender.PeriodList"    v-model="DataShedule.period"  ></v-select>
                <template v-if="DataShedule.period==3">
                    <v-select  class="w-50 " style="margin-top: 7px" :reduce="label => label.id" label="label" :options="DataSheduleRender.WeekList"    v-model="DataShedule.week"  ></v-select>

                </template>
                <template v-if="DataShedule.period==4">
                    <v-select  class="w-50 " style="margin-top: 7px" :reduce="label => label.id" label="label" :options="DataSheduleRender.MounthList"    v-model="DataShedule.month"  ></v-select>
                </template>

                <h6 class="h6">Дата первого запуска</h6>
                <vs-input type="date" style="top: 7px;margin-bottom: 7px"  v-model="DataShedule.firstdate"></vs-input>



                <div class="flex flex-wrap">
                    <vs-button class="w-1/3 ml-auto"  color="primary" type="filled" @click="saveShedule">Сохранить</vs-button>
                </div>
            </vs-popup>

        </div>

    </div>

</template>

<script>
    import ImportExcel from '@/components/excel/ImportExcel.vue'
    import OpenCreditStatus from '../Debtor/Render/OpenCreditStatus.vue'
    import ReportTaskProcess from './ReportTaskProcess.vue'
    import draggable from 'vuedraggable'
    import { mapActions,mapGetters,mapMutations } from 'vuex'
    import r from '../../route';
    import axios from '../../axios'
    import XLSX from 'xlsx'
    import Vue from 'vue'
    import VueAuthHref from 'vue-auth-href'
    const options = {
      token: () => `${localStorage.getItem('accessToken')}`
    }
    Vue.use(VueAuthHref, options)
    export default {

        components: {
            draggable,
            ImportExcel,
            ReportTaskProcess,
            OpenCreditStatus,
        },
        data () {
            return {
                showHelp:false,
                stop:false,
                fileGen:false,
                showDelItem:false,
                popupActive5:false,
                excelData: {
                    header: null,
                    results: null,
                    meta: null
                },
                selected:{},
                popupReport:false,
                popupActive2:false,
                popupActive3:false,
                popupActive4:false,
                popupActiveShedule:false,
                showConst:true,
                email:'',
                name:'',
                uslUsl:'',
                uslPole:'',
                nameShab:'',
                uslData:'',
                local:true,
                recov:0,
                status:0,
                statusFilter: { label: 'Все', value: 'all' },
                statusOptions: [
                    { label: 'Все', value: 'all' },
                    { label: 'Ошибки', value: 'Ошибки' },

                ],

                results: null,
                help: 'Necessary columns are: login, firstname and lastname',
                tableData: [],
                header: [],
                sheetName: '',
                searchQuery: '',

                // AgGrid
                gridApi: null,
                gridOptions: {

                    alwaysShowVerticalScroll:true
                },
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    suppressMenu: true
                },
                columnDefs: [
                    {
                        headerName: 'Взыскатель',
                        headerTooltip: 'Взыскатель',
                        tooltipField: 'recover',
                        field: 'recover',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Пред. Взыскатель',
                        headerTooltip: 'Предыдущий взыскатель',
                        tooltipField: 'recover1',
                        field: 'recover1',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Статус',
                        headerTooltip: 'Статус',
                        tooltipField: 'id_status',
                        field: 'id_status',
                        hide: false,
                        filter: true,
                        width: 200,

                        cellRendererFramework: 'OpenCreditStatus'
                    },

                    {
                        headerName: '№ Договора',
                        headerTooltip: 'Номер договора',
                        tooltipField: 'number_dog',
                        field: 'number_dog',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Дата договор',
                        headerTooltip: 'Дата договора',
                        tooltipField: 'date_dog',
                        field: 'date_dog',
                        filter: true,
                        hide:false,
                        width: 180
                    },

                    {
                        headerName: 'Фамилия',
                        headerTooltip: 'Фамилия',
                        tooltipField: 'name_family',
                        field: 'name_family',
                        filter: true,
                        hide:false,
                        width: 180
                    },
                    {
                        headerName: 'Имя',
                        headerTooltip: 'Имя',
                        tooltipField: 'name',
                        field: 'name',
                        filter: true,
                        hide:false,
                        width: 150
                    },

                    {
                        headerName: 'Отчество',
                        headerTooltip: 'Отчество',
                        tooltipField: 'name_patronymic',
                        field: 'name_patronymic',
                        filter: true,
                        hide:false,
                        width: 150
                    },
                    {
                        headerName: 'Дата рождения',
                        headerTooltip: 'Дата рождения',
                        tooltipField: 'birthdate',
                        field: 'birthdate',
                        filter: true,
                        hide:false,
                        width: 200
                    },

                ],

                // Cell Renderer Components
                components: {
                    OpenCreditStatus,
                },
                DataShedule: {

                    id:'',
                    name:'',
                    email:'',
                    firstdate:'',
                    period:0,
                    week:0,
                    month:0,
                    time:'',
                    list:[],
                    recov:0,
                    status:0,

                },
                DataSheduleRender:{
                    PeriodList:[{id: 1, label: 'Однократно'},{id: 2, label: 'Ежедневно'},{id: 3, label: 'Еженедельно'},
                        {id: 4, label: 'Ежемесячно'}],
                    WeekList:[{id: 1, label: 'Понедельник'},{id: 2, label: 'Вторник'},{id: 3, label: 'Среда'},{id: 4, label: 'Четверг'},
                        {id: 5, label: 'Пятница'},{id: 6, label: 'Суббота'},{id: 7, label: 'Воскресенье'}],
                    MounthList:[],
                },

            }

        },
        watch: {

            statusFilter (obj) {
                this.setColumnFilter('status', obj.value)
            },

        },
        computed: {
            recovName(){
                if (typeof this.User.pag.reports!='undefined'){
                    for (let i=0;i<this.RecoverersArrAndAllDogovor.length;i++){
                        if(this.RecoverersArrAndAllDogovor[i].id==this.User.pag.reports.recov){
                            return this.RecoverersArrAndAllDogovor[i].name
                        }

                    }
                }
                else{
                    return ''
                }

            },
            totalPages () {
                if (this.gridApi)
                    return Math.ceil(this.TotalReports/this.paginationPageSize)
                else return 0
            },
            paginationPageSize () {
                        if (typeof this.User.pag.reports=='undefined'){
                            return 100
                        }
                        return this.User.pag.reports.limit
            },
            ...mapGetters([
                'ReportsArr','TotalReports','StatussArrAndAll','User','RecoverersArrAndAllDogovor','PolesArr','PolesArrFiltr','ReportsTaskArr',
                'TotalReportsTask','RecoverArrList'

            ]),
            currentPage: {
                get () {
                    if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
                    else return 1
                },
                set (val) {
                    this.setQueryReportsOffset(val-1)
                    this.getDataReports(this.User.pag.reports);
                    this.gridApi.paginationGoToPage(val - 1)
                }
            },

        },
        methods: {
            open(){
              this.$refs.fileInput.click()
            },
            checkPole(item){
                if(this.PolesArr.length>0){
                    let flag=false;
                    for (let i = 0; i < this.PolesArr.length; i++) {
                        if(this.PolesArr[i].atr==item.atr){
                            flag=true;
                        }

                    }
                    return flag;
                }
                return true;

            },
            saveShedule(){

                this.DataShedule.id='New';
                this.DataShedule.list=this.User.pag.reports.list;
                this.DataShedule.status=this.User.pag.reports.status;
                this.DataShedule.recov=this.User.pag.reports.recov;
                this.saveReportShedule(this.DataShedule).then((response) => {
                    if(response){
                        this.$vs.notify({  title:'Успешно', text: 'Сохранено!!!', color: 'success', position: 'top-center' })

                    }
                    else{
                        this.$vs.notify({  title:'Ошибка', text: 'Сохранить не удалось !!!', color: 'danger', position: 'top-center' })
                    }
                })
                this.popupActiveShedule=false;
            },

            PushMounthDate(){
                for(let i=0;i<30;i++){this.DataSheduleRender.MounthList.push({id: i+1, label: (i+1).toString()})};
                this.DataSheduleRender.MounthList.push({id: 31, label: 'Последнее число месяца'});
            },

            getDataReportShed(id){
                axios.get(r("reports.index"), {
                    params: {
                        method: 'getReportShedOnce',
                        param: id

                    }
                }).then((response) => {
                  //  console.log(response)
                    if (response.data.result){
                        this.DataShedule=response.data.DataShedule
                    }
                })
            },
            lookUploads(){
                this.getReportTasks();
                this.popupReport = true;
            },

            showOtchet(){
                this.$router.push('/reports_shed/')
            },
            exportData(data, name, type) {
                this.$vs.loading({color: '#ff8000'})

                axios.post(r("reports.index"), {
                    params: {
                        method: 'importData',
                        param: {data: data, name: name, type: type,  email:this.email,
                            local:this.local,
                            param:this.User.pag.reports

                        }

                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    if (response.data.result) {
                        if(this.local){
                            this.getFile(response.data.filename,'отчет.xlsx')
                        }
                        else{
                            this.$vs.notify({
                                color: 'success',
                                title: 'Сообщение',
                                text: 'Задача создана!!!',
                                position: 'top-center'
                            })
                            this.popupActive2=false;
                        }

                        //  this.debtor=response.data.data
                    } else {
                        this.$vs.notify({
                            title: 'Ошибка !!!',
                            text: response.data.err_mess,
                            color: 'danger',
                            position: 'top-center'
                        })
                    }


                }).catch(error => {
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: error.message,
                        color: 'danger',
                        position: 'top-center'
                    })

                });
            },
            loadDataInTable({results, header, meta, name, type}) {
                this.$vs.loading({color: '#ff8000'})
                this.header = header

                this.tableData = results
                this.sheetName = meta.sheetName
                this.exportData(results, name, type)
                this.$vs.loading.close()

            },
            generateData ({ header, results, meta,name }) {
                this.excelData.header = header

                this.excelData.results = results
                this.excelData.meta = meta
                this.excelData.name = name

                this.excelData.type ='dog' ;

                if (this.loadDataInTable) this.loadDataInTable(this.excelData)
            },
            getHeaderRow (sheet) {
                const headers = []
                const range = XLSX.utils.decode_range(sheet['!ref'])
                let C = undefined
                const R = range.s.r
                /* start in the first row */

                for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */

                    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
                    /* find the cell in the first row */
                    let hdr = `UNKNOWN ${  C}` // <-- replace with your desired default
                    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
                    headers.push(hdr)
                }

                return headers
            },
            handleDragover (e) {
                e.stopPropagation()
                e.preventDefault()
                e.dataTransfer.dropEffect = 'copy'
            },
            handleDrop (e) {
                e.stopPropagation()
                e.preventDefault()
                const files = e.dataTransfer.files
                if (files.length !== 1) {
                    this.$vs.notify({
                        title: 'Login Attempt',
                        text: 'Only support uploading one file!',
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'warning'
                    })
                    return
                }
                const rawFile = files[0] // only use files[0]
                if (!this.isExcel(rawFile)) {
                    this.$vs.notify({
                        title: 'Login Attempt',
                        text: 'Only supports upload .xlsx, .xls, .csv suffix files',
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'warning'
                    })
                    return false
                }
                this.uploadFile(rawFile)
            },
            readerData (rawFile) {
                return new Promise((resolve) => {
                    const reader = new FileReader()

                    reader.onload = e => {
                        const data = e.target.result
                        const workbook = XLSX.read(data, { type: 'array' })
                        //       console.log(data)
                        const firstSheetName = workbook.SheetNames[0]
                        const worksheet = workbook.Sheets[firstSheetName]
                        const header = this.getHeaderRow(worksheet)

                        const results = XLSX.utils.sheet_to_json(worksheet)
                        const name=rawFile.name
                        const meta = { sheetName: firstSheetName }
                        this.generateData({ header, results, meta,name })
                        resolve()
                    }
                    reader.readAsArrayBuffer(rawFile)
                })
            },
            handleClick (e) {
                this.files = e.target.files

            },
            isExcel (file) {
                return /\.(xlsx|xls|csv)$/.test(file.name)
            },
            uploadFile (file) {
                this.$refs['fileInput'].value = null // fix can't select the same excel
                this.readerData(file)
            },
            generateFile(){
                this.$refs.fileInput.click()
            },
            setPole(event){
                this.$store.state.user.user.pag.reports.list=event
                this.setDataUser()
               // console.log(event)
            },
            savePole(){
                if(this.$store.state.user.user.shab==null){
                    this.$store.state.user.user.shab=[];
                }
                this.$store.state.user.user.shab.push({
                    name:this.nameShab,
                    poles:this.$store.state.user.user.pag.reports.list,
                })
                this.setDataUser()
                this.popupActive4=false;
            },



            addItem(item){
                if(this.$store.state.user.user.pag.reports.list==null)this.$store.state.user.user.pag.reports.list=[]
                this.$store.state.user.user.pag.reports.list.push(item)
                this.setDataUser()

            },
            addUsl(){
                if(typeof this.$store.state.user.user.pag.reports.usl=='undefined'){
                    this.$store.state.user.user.pag.reports.usl=[];
                }
                this.$store.state.user.user.pag.reports.usl.push({
                    uslUsl:this.uslUsl,
                    uslPole:this.uslPole,
                    uslData:this.uslData,
                    uslName:this.uslPole+' '+this.uslUsl+' '+this.uslData,
                })
                this.popupActive3=false;
            },
            delUsl(item){
                for(let i=0;i<this.$store.state.user.user.pag.reports.usl.length;i++){
                    if(this.$store.state.user.user.pag.reports.usl[i].uslPole==item.uslPole){
                        this.$store.state.user.user.pag.reports.usl.splice(i, 1);
                    }
                }

                this.setDataUser()
                //  console.log(this.$store.state.user.user.pag.reports)
            },
            clear(){
                this.$store.state.user.user.pag.reports.list=[];
                this.setDataUser()
            },
            delItemShabPole(item){
              for(let i=0;i<this.User.shab.length;i++){
                if(this.User.shab[i].name==item.name){

                  this.User.shab.splice(i, 1);
                }
              }
              this.showDelItem=false

            },
            delItem(item){

                for(let i=0;i<this.$store.state.user.user.pag.reports.list.length;i++){
                    if(this.$store.state.user.user.pag.reports.list[i].id==item.id){
                        this.$store.state.user.user.pag.reports.list.splice(i, 1);
                    }
                }

                this.setDataUser()
              //  console.log(this.$store.state.user.user.pag.reports)
            },
            getFile(file,name){
                this.$vs.loading({color: '#ff8000'})
                axios.get(r("reports.index"), {
                    responseType: 'arraybuffer',

                    params: {
                        method: 'getFile',
                        param:file,




                    }
                }).then((response) => {
                    this.$vs.loading.close()
                    //console.log(response.data);
                    const url = window.URL.createObjectURL(new File([(response.data)], { type: 'application/doc;charset=UTF-8;' }));
                    //  console.log(url);
                    const link = document.createElement('a');
                    link.href = url;

                    let filename=response.headers['content-disposition'].replace('attachment; filename=', '');
                    //console.log(filename);
                    filename= filename.replace('_', '');
                    filename = filename.split('; filename*=utf')[0];

                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();


                }).catch(error => {

                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },
            genFromFile(){
              this.$vs.loading({color: '#ff8000'})
              const formData = new FormData()
              formData.append('document', this.files[0])
              formData.append('param', JSON.stringify(this.User.pag.reports))
              formData.append('email', this.email)
              formData.append('name', this.name)
              formData.append('local', this.local)
              this.popupActive2=false;

              axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`


              axios.post('/reports/document',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  }
              ).then((response) => {
                this.$vs.loading.close()
                if (response.data.result) {
                  this.popupActive2=false

                  if(this.local){
                    this.getFile(response.data.filename,'отчет.xlsx')
                  }
                  else{
                    this.$vs.notify({
                      color: 'success',
                      title: 'Сообщение',
                      text: 'Задача создана!!!',
                      position: 'top-center'
                    })

                  }

                }else{
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: response.message,
                    color: 'danger',
                    position: 'top-center'
                  })
                }
              }).catch(error => {
                this.$vs.loading.close()
                this.$vs.notify({
                  title: 'Ошибка',
                  text: error.message,
                  color: 'danger',
                  position: 'top-center'
                })

              })
            },
            generate(){
                this.stop=false
                if(this.fileGen){
                  return this.genFromFile()
                }
                this.$vs.loading({color: '#ff8000'})
                axios.post(r("reports.update"), {
                    params: {
                        method: 'generate',
                        param:JSON.stringify(this.User.pag.reports),
                        email:this.email,
                        name:this.name,
                        local:this.local,
                    }
                }).then((response) => {


                    if(response.data.result){

                        if(this.local){
                          var self = this;
                          var refreshId = setInterval(function() {

                            self.getAns(response.data.data);
                            console.log(self.stop)
                            if (self.stop) {
                              clearInterval(refreshId);
                              self.popupActive2=false;
                              self.$vs.loading.close()

                            }
                          }, 10000);
                        }
                        else{
                          this.$vs.loading.close()
                          this.popupActive2=false;
                            this.$vs.notify({
                                color: 'success',
                                title: 'Сообщение',
                                text: 'Задача создана!!!',
                                position: 'top-center'
                            })

                        }

                    }
                    else{
                      this.$vs.loading.close()
                        this.$vs.notify({
                            title: 'Ошибка',
                            text: 'Ошибка!!!',
                            color: 'danger',
                            position: 'top-center'
                        })
                    }


                }).catch(error => {
                    this.popupActive2=false;
                    this.$vs.loading.close()
                    this.$vs.notify({
                        title: 'Ошибка',
                        text: 'Ошибка!!!',
                        color: 'danger',
                        position: 'top-center'
                    })

                });

            },
            getAns(id){
              if(!this.stop){
                axios.post(r("reports.update"), {
                  params: {
                    method: 'getAns',
                    param:id,

                  }
                }).then((response) => {


                  if(response.data.result){
                    this.stop=true
                    this.popupActive2=false;
                    this.getFile(response.data.filename,'отчет.xlsx')


                  }

                }).catch(error => {
                  this.stop=true
                  this.$vs.loading.close()
                  this.$vs.notify({
                    title: 'Ошибка',
                    text: error.message,
                    color: 'danger',
                    position: 'top-center'
                  })

                });
              }
          },
            setRecover(){
              //  this.recov=this.RecoverersArrAndAllDogovor[index].name
                if(this.recov==null)this.recov=0

                this.User.pag.reports.recov=this.recov
                for (let i=0;i<this.RecoverArrList.length;i++){

                    if(this.RecoverArrList[i].id==this.recov){
                        this.User.pag.reports.id_recover=this.RecoverArrList[i].num
                        this.User.pag.reports.num_recover=this.RecoverArrList[i].id
                        this.User.pag.reports.cession=this.RecoverArrList[i].cession
                        this.User.pag.reports.typeRecover=this.RecoverArrList[i].typeRecover
                    }

                }
                this.setDataUser()
                this.getDataReports(this.User.pag.reports);
            },
            setStatus(){
                if(this.status==null)this.status=0
                // this.status=this.StatussArrAndAll[index].name
                this.User.pag.reports.status=this.status
                this.setDataUser()
                this.getDataReports(this.User.pag.reports);
            },
            ...mapMutations([
                'setQueryReportsLimit','setQueryReportsOffset'

            ]),
            changePag(pag){

                this.User.pag.reports.limit=pag
                this.setDataUser()
                this.getDataReports(this.User.pag.reports);
                this.setQueryReportsLimit(pag);
                this.gridApi.paginationSetPageSize(pag)
            },
            onrowDoubleClicked(event){
                this.$router.push('/credit/'+event.data.id)
            },
            setColumnFilter (column, val) {
                const filter = this.gridApi.getFilterInstance(column)
                let modelObj = null

                if (val !== 'all') {
                    modelObj = { type: 'equals', filter: val }
                }

                filter.setModel(modelObj)
                this.gridApi.onFilterChanged()
            },
            resetColFilters () {
                // Reset Grid Filter
                this.gridApi.setFilterModel(null)
                this.gridApi.onFilterChanged()

                // Reset Filter Options
                this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

                this.$refs.filterCard.removeRefreshAnimation()
            },
            saveColumn(){
                axios.post(r("setting.index"), {
                    params: {
                        method: 'saveColumnDefs',
                        param:  this.columnDefs

                    }
                }).then((response) => {
                    if (response.data.result){

                    }


                })
            },

            hideCol(index){

                this.columnDefs[index].hide=!this.columnDefs[index].hide;
                let a=this.columnDefs

                this.columnDefs=JSON.parse(JSON.stringify(a))
                this.saveColumn();
            },

            onValidate(results) {
                this.results = results;
            },
            ...mapMutations([
                'setPolesFilter'
            ]),
            ...mapActions([
                'getDataReports','getDataStatuss','setDataUser','getDataReestrsAndPravDogovor','getDataPoles','getReportTasks','saveReportShedule',
                'getRecoverArrList','getDataUser'
            ]),
            updateSearchQuery (val) {
                this.setPolesFilter(this.searchQuery)

            },
            onRowDataChanged () {
                Vue . nextTick (() => {
                        this.gridOptions.api.sizeColumnsToFit();
                    }
                );
            },

        },
        mounted () {
            this.gridApi = this.gridOptions.api
            this.PushMounthDate();
            this.getRecoverArrList()
            this.getDataReestrsAndPravDogovor();
            this.getDataStatuss();
            this.getDataUser().then((response)=>{
                if(typeof this.User.pag.reports.num_recover != 'undefined')this.recov=this.User.pag.reports.num_recover
                else this.recov=0
                if(typeof this.User.pag.reports.status!='undefined' ){
                    for (let i=0;i<this.StatussArrAndAll.length;i++){
                        if(this.StatussArrAndAll[i].id==this.User.pag.reports.status){
                            this.status=this.StatussArrAndAll[i].name
                        }

                    }
                    this.getDataReports(this.User.pag.reports);
                }

            })


            this.getDataPoles();

        }
    }


</script>

<style lang="scss">
    .constructorWrapper .li-border {
        width: 99%;
        outline: 0.5px solid #8c8989;
        border: 3px solid #fff;
        border-radius: 10px;
        margin: 0 1px 1px 1px;
    }
    .helpDescription{
        position: relative;
        width: 230px;
        height: 200px;
        font-size: 15px;
    }
    .helpDescription p{
        position: absolute;
        bottom: 40px;
        right: -100px;
        width: 100%;
        font-family: cursive;
        color: #7367f0;
    }
    .helpDescription::before{
        content:'';
        display: block;
        width: 150px;
        height: 150px;
        background-image: url('../../../assets/images/arrow_svg.svg');
        transform: rotate(-35deg);
        position: absolute;
    }
    #page-user-list {
    .user-list-filters {
    .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
    }
    }
    }
    .li-border{
        width: 100%;
        outline: 0.5px solid #8c8989;
        border: 3px solid #fff;
        border-radius: 10px;
    }
    .ag-row{
        height: 23px!important;

        padding: 0px!important; margin: 0px!important;
    }
    .ag-cell{

        padding: 0px!important; margin: 0px!important;

    }
    .ag-header-row{
        height: 26px!important;
    }
    .ag-theme-material .ag-cell {
         line-height:15px!important;
    }

    .popup-preferences.vs-popup--content {
        min-height: 300px!important;
        padding: 2rem!important;

        .vs-con-input-label {
            width: 280px;
        }

        .popup-preferences-img {
            max-width: 150px;
            margin-left: auto;
            margin-right: auto;
            display: block;
        }
    }

</style>
