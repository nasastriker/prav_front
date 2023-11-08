<template>
    <div>
        <div id="container" style="min-height: 95vh"></div>
        <div id="sidebar" style="min-height: 95vh; background-color: rgb(250 255 254)!important">
            <EditForm ref="form" @change="changeObjectValues" :cell-data="currentCell"/>
            <vs-button color="primary" class="pull-right" type="filled"  @click="save">Сохранить</vs-button>
        </div>
    </div>
</template>

<script>
    import mxgraph from 'mxgraph';
    import EditForm from "./EditForm";
    import { mapActions,mapGetters } from 'vuex'
    import r from '../../../route';
    import axios from '../../../axios'
    import vSelect from 'vue-select'
    // если планируется использовать встроенные интерфейсы то нужно указать пути к ресурсам
    const graphConfig = {
        mxBasePath: '/mx/', //Specifies the path in mxClient.basePath.
        mxImageBasePath: '/mx/images', // Specifies the path in mxClient.imageBasePath.
        mxLanguage: 'en', // Specifies the language for resources in mxClient.language.
        mxDefaultLanguage: 'en', // Specifies the default language in mxClient.defaultLanguage.
        mxLoadResources: false, // Specifies if any resources should be loaded.  Default is true.
        mxLoadStylesheets: false, // Specifies if any stylesheets should be loaded.  Default is true
    };

    const {
        mxClient, mxUtils, mxEvent, mxEditor, mxRectangle, mxGraph, mxGeometry, mxCell,
        mxImage, mxDivResizer, mxObjectCodec, mxCodecRegistry, mxConnectionHandler
    } = mxgraph(graphConfig);

    window.mxClient = mxClient;
    window.mxUtils = mxUtils;
    window.mxRectangle = mxRectangle;
    window.mxGraph = mxGraph;
    window.mxEvent = mxEvent;
    window.mxGeometry = mxGeometry;
    window.mxCell = mxCell;
    window.mxImage = mxImage;
    window.mxEditor = mxEditor;
    window.mxDivResizer = mxDivResizer;
    window.mxObjectCodec = mxObjectCodec;
    window.mxCodecRegistry = mxCodecRegistry;
    window.mxConnectionHandler = mxConnectionHandler;

    var editor;

    // CustomUserObject
    window.CustomUserObject = function (name, type) {
        this.name = name || 'Название';
        this.type = type || 'Тип';
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    export default {
        name: 'graph-wrapper',
        components: {EditForm},
        data() {
            return {
                currentCell: null
            }
        },
        computed: {

            ...mapGetters([
                'StatussArr','TotalStatuss','FuncsArr','TotalFuncs',

            ]),

        },
        methods: {
            // изменение выбранных в отдельной панели
            // перенос объекта в среду VUE
            selectionChanged() {
                let cell = editor.graph.getSelectionCell();
                this.$set(this, 'currentCell', cell);
            },
            // возврат обновленного значения в среду mxGraph
            changeObjectValues(newCellValue) {
                editor.graph.model.setValue(this.currentCell, newCellValue);
            },
            // добавление элементов sidebar
            addSidebarIcon: function (graph, sidebar, prototype) {
                let funct = function (graph, evt) {
                    graph.stopEditing(false);

                    let pt = graph.getPointForEvent(evt);

                    let parent = graph.getDefaultParent();
                    let model = graph.getModel();

                    let v1 = model.cloneCell(prototype);

                    model.beginUpdate();
                    try {
                        v1.geometry.x = pt.x;
                        v1.geometry.y = pt.y;
                        v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();
                        v1.geometry.alternateBounds = new mxRectangle(0, 0, v1.geometry.width, v1.geometry.height, '');

                        graph.addCell(v1, parent);
                    } finally {
                        model.endUpdate();
                    }

                    graph.setSelectionCell(v1);
                };

                // Creates the image which is used as the sidebar icon (drag source)
                let wrapper = document.createElement('div');
                wrapper.style.cursor = 'pointer';
                wrapper.style.backgroundColor = '#c3d9ff';
                wrapper.style.margin = '10px';
                wrapper.style.width = '200px';
                wrapper.style.height = '50px';
                wrapper.style.textAlign = 'center';
                wrapper.style.display = 'flex';
                wrapper.style.flexWrap = 'wrap';
                wrapper.style.alignItems = 'center';
                wrapper.style.justifyContent = 'center';
                wrapper.style.border = '2px dashed #0b7824';
                wrapper.innerHTML = '<div>Статус</div><div style="color: #8C8C8C"></div>';
                sidebar.appendChild(wrapper);

                // Creates the image which is used as the drag icon (preview)
                let dragImage = wrapper.cloneNode(true);
                mxUtils.makeDraggable(wrapper, graph, funct, dragImage);

                let wrapper1 = document.createElement('div');
                wrapper1.style.cursor = 'pointer';
                wrapper1.style.backgroundColor = '#c3d9ff';
                wrapper1.style.margin = '10px';
                wrapper1.style.width = '200px';
                wrapper1.style.height = '50px';
                wrapper1.style.textAlign = 'center';
                wrapper1.style.display = 'flex';
                wrapper1.style.flexWrap = 'wrap';
                wrapper1.style.alignItems = 'center';
                wrapper1.style.justifyContent = 'center';
                wrapper1.style.border = '2px dashed #0b7824';
                wrapper1.innerHTML = '<div>Функция</div><div style="color: #8C8C8C"></div>';
                sidebar.appendChild(wrapper1);

                // Creates the image which is used as the drag icon (preview)
                let dragImage1 = wrapper1.cloneNode(true);
                mxUtils.makeDraggable(wrapper1, graph, funct, dragImage1);

            },
            // создание и настройка редактора
            createGraph() {
                // Checks if the browser is supported
                if (!mxClient.isBrowserSupported()) {
                    // Displays an error message if the browser is not supported.
                    mxUtils.error('Browser is not supported!', 200, false);
                } else {
                    mxConnectionHandler.prototype.connectImage = new mxImage(require('@assets/images/handle-connect.png'), 16, 16);

                    let container = document.getElementById('container');
                    container.style.position = 'absolute';
                    container.style.overflow = 'hidden';
                    container.style.left = '250px';
                    container.style.top = '0px';
                    container.style.right = '0px';
                    container.style.bottom = '0px';
                    container.style.background = `url("${require('@assets/images/grid.gif')}")`;

                    let sidebar = document.getElementById('sidebar');
                    sidebar.style.position = 'absolute';
                    sidebar.style.overflow = 'hidden';
                    sidebar.style.padding = '0px';
                    sidebar.style.left = '0px';
                    sidebar.style.top = '0px';
                    sidebar.style.width = '250px';
                    sidebar.style.bottom = '0px';
                    sidebar.style.display = 'flex';
                    sidebar.style.flexDirection = 'column-reverse';
                    sidebar.style.alignItems = 'center';
                    sidebar.style.justifyContent = 'flex-end';
                    sidebar.style.backgroundColor = '#eff1fd';

                    if (mxClient.IS_QUIRKS) {
                        document.body.style.overflow = 'hidden';
                        new mxDivResizer(container);
                        new mxDivResizer(sidebar);
                    }

                    editor = new mxEditor();
                    editor.setGraphContainer(container);

                    // глобальное управление подключениями
                    editor.graph.setConnectable(true);
                    editor.graph.setCellsDisconnectable(true);
                    editor.graph.setPanning(true);
                    editor.graph.setAllowDanglingEdges(false);

                    // изменение выбранных в отдельной панели
                    editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, () => {
                        this.selectionChanged();
                    });
                    this.selectionChanged();

                    editor.graph.centerZoom = false;
                    editor.graph.swimlaneNesting = false;
                    editor.graph.dropEnabled = true;

                    // Fields are dynamically created HTML labels
                    editor.graph.isHtmlLabel = function (cell) {
                        return !this.isSwimlane(cell) &&
                            !this.model.isEdge(cell);
                    };

                    // not editable
                    editor.graph.isCellEditable = function () {
                        return false
                    };

                    // Returns the name propertie of the user object for the label
                    editor.graph.convertValueToString = function (cell) {
                        if (cell.value != null && cell.value.name != null) {
                            return cell.value.name;
                        }
                        return mxGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
                    };

                    // Creates a dynamic HTML label for properties
                    var that=this
                    editor.graph.getLabel = function (cell) {
                        // console.log('getLabel ', cell);

                        if (cell && this.isHtmlLabel(cell) && cell.value) {
                            let  stat=''
                            for(let a=0;a<that.StatussArr.length;a++){
                                if(that.StatussArr[a].id==cell.value.name){
                                    cell.value.nameStat=that.StatussArr[a].name
                                }
                            }


                            // TODO тут код html для содержимого Field
                            let label = '';
                            label += '<div style="width: 100%;display: flex; justify-content: space-between;align-items: center">';
                            label += '<div style="width: 100px;margin-left: 10px; font-weight: 600">' +
                                '<strong>' + mxUtils.htmlEntities(cell.value.nameStat, false) + '</strong>' +
                                '</div>';
                            label += '<div style="width: 100px;margin-right: 10px"><strong style="opacity: 0.7">' + mxUtils.htmlEntities(` \t ${cell.value.type}`, false) + '</strong></div>';
                            label += '</div>';

                            return label
                        }

                        return mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
                    };

                    // Adds sidebar icon for the propertie object
                    let customObject = new window.CustomUserObject();

                    let object = new mxCell(customObject, new mxGeometry(0, 0, 200, 50), '');
                    object.setVertex(true);
                    object.setConnectable(true);

                    this.addSidebarIcon(editor.graph, sidebar, object);
                }
            },
            save(){
                let cell = editor.graph.getSelectionCell();
               console.log(cell)
            },
            // настройка параметров
            init() {
                //////////////////////////////////////////
                // КОДЕКИ КАСТОМНЫХ ПОЛЕЙ для импорта экспорта
                //////////////////////////////////////////
                let codecCustomUserObject = new mxObjectCodec(new window.CustomUserObject());
                codecCustomUserObject.encode = function (enc, obj) {
                    let node = enc.document.createElement('CustomUserObject');
                    mxUtils.setTextContent(node, JSON.stringify(obj));

                    return node;
                };
                codecCustomUserObject.decode = function (dec, node) {
                    let obj = JSON.parse(mxUtils.getTextContent(node));
                    let beatyObj = new window.CustomUserObject();
                    obj = Object.assign(beatyObj, obj);
                    return obj;
                };
                mxCodecRegistry.register(codecCustomUserObject);

                this.createGraph();
            },
        },
        mounted() {
            this.init();
        }
    }
</script>
