<template>
    <div id="page-user-list">
        <div class="vx-card p-6" style="min-height: 95vh;">
            <div class="vx-row" >
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <div class="v-row" style="padding-top: 20px;padding-bottom: 20px">
                      <div class="v-row" >
                        <vs-button color="primary" type="border" @click="SystemAPI">SystemAPI - main</vs-button>
                        <vs-button color="primary"  class="pull-right" style="margin-top: 15px;    margin-left: 70px;" type="filled"  @click="updateFile">Обновить файл</vs-button>
                      </div>

                        <h6 class="h6 mb-1" style="margin-top: 20px"> Запуск функции:<span style="cursor: pointer;color: red;" @click="showHystory=!showHystory">История</span></h6>
                        <vs-input type="text" class="w-full" v-model="textSystemAPI"
                        ></vs-input>

                        <h6 class="h6 mb-1" style="margin-top: 20px"> Очередь:</h6>
                        <vs-input type="text" class="w-full" v-model="textSystemAPIConnect"
                        ></vs-input>
                        <vs-button color="primary"  class="pull-right mr-4" style="margin-top: 15px" type="filled"  @click="startSystemAPI">Запустить</vs-button>
                        <vs-button color="primary"  class="pull-right mr-4" style="margin-top: 15px" type="filled"  @click="startSystemAPIJob">Запустить задачу</vs-button>
                        <vs-button color="primary"  class="pull-right mr-4" style="margin-top: 15px" type="filled"  @click="updateCode">Обновить код на серверах</vs-button>
                        <vs-button color="primary"  class="pull-right mr-4" style="margin-top: 15px" type="filled"  @click="updateBack">Обновить бэк</vs-button>
                        <vs-button color="primary"  class="pull-right mr-4" style="margin-top: 15px" type="filled"  @click="updateFront">Обновить фронт</vs-button>
                      <vs-button color="primary"  class="pull-right mr-4" style="margin-top: 15px" type="filled"  @click="clearFolder">Очистить temp</vs-button>
                      <vs-button color="primary"  class="pull-right" style="margin-top: 15px" type="filled"  @click="sendTip">Перенос в типогр.</vs-button>

                      <input type="file" ref="fileInput" class="hidden"  @change="handleClick">
                    </div>


                </div>
                <div class="vx-col sm:w-1/2 w-full mb-2">
                    <div class="v-row" style="padding-top: 20px;padding-bottom: 20px">
                        <vs-button color="primary" class="pull-right" type="filled"  @click="SystemTrashAPI">SystemTrashAPI - main</vs-button>
                        <h6 class="h6 mb-1" style="margin-top: 20px"> Запуск функции:<span style="cursor: pointer;color: red;" @click="showHystoryTrash=!showHystoryTrash">История</span></h6>
                        <vs-input type="text" class="w-full" v-model="textSystemTrashAPI"
                        ></vs-input>
                        <h6 class="h6 mb-1" style="margin-top: 20px"> Очередь:</h6>
                        <vs-input type="text" class="w-full" v-model="textSystemTrashAPIConnect"
                        ></vs-input>
                        <vs-button color="primary"  class="pull-right mr-4" style="margin-top: 15px" type="filled"  @click="startSystemTrashAPI">Запустить</vs-button>
                        <vs-button color="primary"  class="pull-right" style="margin-top: 15px" type="filled"  @click="startSystemTrashAPIJob">Запустить задачу</vs-button>

                    </div>

                </div>
              <div>
                <feather-icon icon="ActivityIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ActivityIcon')" />
                <feather-icon icon="AirplayIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AirplayIcon')" />
                <feather-icon icon="AlertCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AlertCircleIcon')" />
                <feather-icon icon="AlertOctagonIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AlertOctagonIcon')" />
                <feather-icon icon="AlertTriangleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AlertTriangleIcon')" />
                <feather-icon icon="AlignCenterIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AlignCenterIcon')" />
                <feather-icon icon="AlignJustifyIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AlignJustifyIcon')" />
                <feather-icon icon="AlignLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AlignLeftIcon')" />
                <feather-icon icon="AlignRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AlignRightIcon')" />
                <feather-icon icon="AnchorIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AnchorIcon')" />
                <feather-icon icon="ApertureIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ApertureIcon')" />
                <feather-icon icon="ArchiveIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArchiveIcon')" />
                <feather-icon icon="ArrowDownCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowDownCircleIcon')" />
                <feather-icon icon="ArrowDownLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowDownLeftIcon')" />
                <feather-icon icon="ArrowDownRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowDownRightIcon')" />
                <feather-icon icon="ArrowDownIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowDownIcon')" />
                <feather-icon icon="ArrowLeftCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowLeftCircleIcon')" />
                <feather-icon icon="ArrowLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowLeftIcon')" />
                <feather-icon icon="ArrowRightCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowRightCircleIcon')" />
                <feather-icon icon="ArrowRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowRightIcon')" />
                <feather-icon icon="ArrowUpCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowUpCircleIcon')" />
                <feather-icon icon="ArrowUpLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowUpLeftIcon')" />
                <feather-icon icon="ArrowUpRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowUpRightIcon')" />
                <feather-icon icon="ArrowUpIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ArrowUpIcon')" />
                <feather-icon icon="AtSignIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AtSignIcon')" />
                <feather-icon icon="AwardIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('AwardIcon')" />
                <feather-icon icon="BarChart2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BarChart2Icon')" />
                <feather-icon icon="BarChartIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BarChartIcon')" />
                <feather-icon icon="BatteryChargingIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BatteryChargingIcon')" />
                <feather-icon icon="BatteryIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BatteryIcon')" />
                <feather-icon icon="BellOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BellOffIcon')" />
                <feather-icon icon="BellIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BellIcon')" />
                <feather-icon icon="BluetoothIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BluetoothIcon')" />
                <feather-icon icon="BoldIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BoldIcon')" />
                <feather-icon icon="BookOpenIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BookOpenIcon')" />
                <feather-icon icon="BookIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BookIcon')" />
                <feather-icon icon="BookmarkIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BookmarkIcon')" />
                <feather-icon icon="BoxIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BoxIcon')" />
                <feather-icon icon="BriefcaseIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('BriefcaseIcon')" />
                <feather-icon icon="CalendarIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CalendarIcon')" />
                <feather-icon icon="CameraOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CameraOffIcon')" />
                <feather-icon icon="CameraIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CameraIcon')" />
                <feather-icon icon="CastIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CastIcon')" />
                <feather-icon icon="CheckCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CheckCircleIcon')" />
                <feather-icon icon="CheckSquareIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CheckSquareIcon')" />
                <feather-icon icon="CheckIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CheckIcon')" />
                <feather-icon icon="ChevronDownIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChevronDownIcon')" />
                <feather-icon icon="ChevronLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChevronLeftIcon')" />
                <feather-icon icon="ChevronRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChevronRightIcon')" />
                <feather-icon icon="ChevronUpIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChevronUpIcon')" />
                <feather-icon icon="ChevronsDownIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChevronsDownIcon')" />
                <feather-icon icon="ChevronsLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChevronsLeftIcon')" />
                <feather-icon icon="ChevronsRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChevronsRightIcon')" />
                <feather-icon icon="ChevronsUpIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChevronsUpIcon')" />
                <feather-icon icon="ChromeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ChromeIcon')" />
                <feather-icon icon="CircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CircleIcon')" />
                <feather-icon icon="ClipboardIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ClipboardIcon')" />
                <feather-icon icon="ClockIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ClockIcon')" />
                <feather-icon icon="CloudDrizzleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CloudDrizzleIcon')" />
                <feather-icon icon="CloudLightningIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CloudLightningIcon')" />
                <feather-icon icon="CloudOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CloudOffIcon')" />
                <feather-icon icon="CloudRainIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CloudRainIcon')" />
                <feather-icon icon="CloudSnowIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CloudSnowIcon')" />
                <feather-icon icon="CloudIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CloudIcon')" />
                <feather-icon icon="CodeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CodeIcon')" />
                <feather-icon icon="CodepenIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CodepenIcon')" />
                <feather-icon icon="CodesandboxIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CodesandboxIcon')" />
                <feather-icon icon="CoffeeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CoffeeIcon')" />
                <feather-icon icon="ColumnsIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ColumnsIcon')" />
                <feather-icon icon="CommandIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CommandIcon')" />
                <feather-icon icon="CompassIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CompassIcon')" />
                <feather-icon icon="CopyIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CopyIcon')" />
                <feather-icon icon="CornerDownLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CornerDownLeftIcon')" />
                <feather-icon icon="CornerDownRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CornerDownRightIcon')" />
                <feather-icon icon="CornerLeftDownIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CornerLeftDownIcon')" />
                <feather-icon icon="CornerLeftUpIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CornerLeftUpIcon')" />
                <feather-icon icon="CornerRightDownIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CornerRightDownIcon')" />
                <feather-icon icon="CornerRightUpIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CornerRightUpIcon')" />
                <feather-icon icon="CornerUpLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CornerUpLeftIcon')" />
                <feather-icon icon="CornerUpRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CornerUpRightIcon')" />
                <feather-icon icon="CpuIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CpuIcon')" />
                <feather-icon icon="CreditCardIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CreditCardIcon')" />
                <feather-icon icon="CropIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CropIcon')" />
                <feather-icon icon="CrosshairIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('CrosshairIcon')" />
                <feather-icon icon="DatabaseIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('DatabaseIcon')" />
                <feather-icon icon="DeleteIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('DeleteIcon')" />
                <feather-icon icon="DiscIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('DiscIcon')" />
                <feather-icon icon="DollarSignIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('DollarSignIcon')" />
                <feather-icon icon="DownloadCloudIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('DownloadCloudIcon')" />
                <feather-icon icon="DownloadIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('DownloadIcon')" />
                <feather-icon icon="DropletIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('DropletIcon')" />
                <feather-icon icon="Edit2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Edit2Icon')" />
                <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Edit3Icon')" />
                <feather-icon icon="EditIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('EditIcon')" />
                <feather-icon icon="ExternalLinkIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ExternalLinkIcon')" />
                <feather-icon icon="EyeOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('EyeOffIcon')" />
                <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('EyeIcon')" />
                <feather-icon icon="FacebookIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FacebookIcon')" />
                <feather-icon icon="FastForwardIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FastForwardIcon')" />
                <feather-icon icon="FeatherIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FeatherIcon')" />
                <feather-icon icon="FigmaIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FigmaIcon')" />
                <feather-icon icon="FileMinusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FileMinusIcon')" />
                <feather-icon icon="FilePlusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FilePlusIcon')" />
                <feather-icon icon="FileTextIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FileTextIcon')" />
                <feather-icon icon="FileIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FileIcon')" />
                <feather-icon icon="FilmIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FilmIcon')" />
                <feather-icon icon="FilterIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FilterIcon')" />
                <feather-icon icon="FlagIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FlagIcon')" />
                <feather-icon icon="FolderMinusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FolderMinusIcon')" />
                <feather-icon icon="FolderPlusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FolderPlusIcon')" />
                <feather-icon icon="FolderIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FolderIcon')" />
                <feather-icon icon="FramerIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FramerIcon')" />
                <feather-icon icon="FrownIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('FrownIcon')" />
                <feather-icon icon="GiftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GiftIcon')" />
                <feather-icon icon="GitBranchIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GitBranchIcon')" />
                <feather-icon icon="GitCommitIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GitCommitIcon')" />
                <feather-icon icon="GitMergeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GitMergeIcon')" />
                <feather-icon icon="GitPullRequestIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GitPullRequestIcon')" />
                <feather-icon icon="GithubIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GithubIcon')" />
                <feather-icon icon="GitlabIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GitlabIcon')" />
                <feather-icon icon="GlobeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GlobeIcon')" />
                <feather-icon icon="GridIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('GridIcon')" />
                <feather-icon icon="HardDriveIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('HardDriveIcon')" />
                <feather-icon icon="HashIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('HashIcon')" />
                <feather-icon icon="HeadphonesIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('HeadphonesIcon')" />
                <feather-icon icon="HeartIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('HeartIcon')" />
                <feather-icon icon="HelpCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('HelpCircleIcon')" />
                <feather-icon icon="HexagonIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('HexagonIcon')" />
                <feather-icon icon="HomeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('HomeIcon')" />
                <feather-icon icon="ImageIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ImageIcon')" />
                <feather-icon icon="InboxIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('InboxIcon')" />
                <feather-icon icon="InfoIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('InfoIcon')" />
                <feather-icon icon="InstagramIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('InstagramIcon')" />
                <feather-icon icon="ItalicIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ItalicIcon')" />
                <feather-icon icon="KeyIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('KeyIcon')" />
                <feather-icon icon="LayersIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LayersIcon')" />
                <feather-icon icon="LayoutIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LayoutIcon')" />
                <feather-icon icon="LifeBuoyIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LifeBuoyIcon')" />
                <feather-icon icon="Link2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Link2Icon')" />
                <feather-icon icon="LinkIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LinkIcon')" />
                <feather-icon icon="LinkedinIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LinkedinIcon')" />
                <feather-icon icon="ListIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ListIcon')" />
                <feather-icon icon="LoaderIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LoaderIcon')" />
                <feather-icon icon="LockIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LockIcon')" />
                <feather-icon icon="LogInIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LogInIcon')" />
                <feather-icon icon="LogOutIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('LogOutIcon')" />
                <feather-icon icon="MailIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MailIcon')" />
                <feather-icon icon="MapPinIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MapPinIcon')" />
                <feather-icon icon="MapIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MapIcon')" />
                <feather-icon icon="Maximize2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Maximize2Icon')" />
                <feather-icon icon="MaximizeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MaximizeIcon')" />
                <feather-icon icon="MehIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MehIcon')" />
                <feather-icon icon="MenuIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MenuIcon')" />
                <feather-icon icon="MessageCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MessageCircleIcon')" />
                <feather-icon icon="MessageSquareIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MessageSquareIcon')" />
                <feather-icon icon="MicOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MicOffIcon')" />
                <feather-icon icon="MicIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MicIcon')" />
                <feather-icon icon="Minimize2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Minimize2Icon')" />
                <feather-icon icon="MinimizeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MinimizeIcon')" />
                <feather-icon icon="MinusCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MinusCircleIcon')" />
                <feather-icon icon="MinusSquareIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MinusSquareIcon')" />
                <feather-icon icon="MinusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MinusIcon')" />
                <feather-icon icon="MonitorIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MonitorIcon')" />
                <feather-icon icon="MoonIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MoonIcon')" />
                <feather-icon icon="MoreHorizontalIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MoreHorizontalIcon')" />
                <feather-icon icon="MoreVerticalIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MoreVerticalIcon')" />
                <feather-icon icon="MousePointerIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MousePointerIcon')" />
                <feather-icon icon="MoveIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MoveIcon')" />
                <feather-icon icon="MusicIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('MusicIcon')" />
                <feather-icon icon="Navigation2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Navigation2Icon')" />
                <feather-icon icon="NavigationIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('NavigationIcon')" />
                <feather-icon icon="OctagonIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('OctagonIcon')" />
                <feather-icon icon="PackageIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PackageIcon')" />
                <feather-icon icon="PaperclipIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PaperclipIcon')" />
                <feather-icon icon="PauseCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PauseCircleIcon')" />
                <feather-icon icon="PauseIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PauseIcon')" />
                <feather-icon icon="PenToolIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PenToolIcon')" />
                <feather-icon icon="PercentIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PercentIcon')" />
                <feather-icon icon="PhoneCallIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PhoneCallIcon')" />
                <feather-icon icon="PhoneForwardedIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PhoneForwardedIcon')" />
                <feather-icon icon="PhoneIncomingIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PhoneIncomingIcon')" />
                <feather-icon icon="PhoneMissedIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PhoneMissedIcon')" />
                <feather-icon icon="PhoneOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PhoneOffIcon')" />
                <feather-icon icon="PhoneOutgoingIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PhoneOutgoingIcon')" />
                <feather-icon icon="PhoneIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PhoneIcon')" />
                <feather-icon icon="PieChartIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PieChartIcon')" />
                <feather-icon icon="PlayCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PlayCircleIcon')" />
                <feather-icon icon="PlayIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PlayIcon')" />
                <feather-icon icon="PlusCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PlusCircleIcon')" />
                <feather-icon icon="PlusSquareIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PlusSquareIcon')" />
                <feather-icon icon="PlusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PlusIcon')" />
                <feather-icon icon="PocketIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PocketIcon')" />
                <feather-icon icon="PowerIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PowerIcon')" />
                <feather-icon icon="PrinterIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('PrinterIcon')" />
                <feather-icon icon="RadioIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('RadioIcon')" />
                <feather-icon icon="RefreshCcwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('RefreshCcwIcon')" />
                <feather-icon icon="RefreshCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('RefreshCwIcon')" />
                <feather-icon icon="RepeatIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('RepeatIcon')" />
                <feather-icon icon="RewindIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('RewindIcon')" />
                <feather-icon icon="RotateCcwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('RotateCcwIcon')" />
                <feather-icon icon="RotateCwIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('RotateCwIcon')" />
                <feather-icon icon="RssIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('RssIcon')" />
                <feather-icon icon="SaveIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SaveIcon')" />
                <feather-icon icon="ScissorsIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ScissorsIcon')" />
                <feather-icon icon="SearchIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SearchIcon')" />
                <feather-icon icon="SendIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SendIcon')" />
                <feather-icon icon="ServerIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ServerIcon')" />
                <feather-icon icon="SettingsIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SettingsIcon')" />
                <feather-icon icon="Share2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Share2Icon')" />
                <feather-icon icon="ShareIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ShareIcon')" />
                <feather-icon icon="ShieldOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ShieldOffIcon')" />
                <feather-icon icon="ShieldIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ShieldIcon')" />
                <feather-icon icon="ShoppingBagIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ShoppingBagIcon')" />
                <feather-icon icon="ShoppingCartIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ShoppingCartIcon')" />
                <feather-icon icon="ShuffleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ShuffleIcon')" />
                <feather-icon icon="SidebarIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SidebarIcon')" />
                <feather-icon icon="SkipBackIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SkipBackIcon')" />
                <feather-icon icon="SkipForwardIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SkipForwardIcon')" />
                <feather-icon icon="SlackIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SlackIcon')" />
                <feather-icon icon="SlashIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SlashIcon')" />
                <feather-icon icon="SlidersIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SlidersIcon')" />
                <feather-icon icon="SmartphoneIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SmartphoneIcon')" />
                <feather-icon icon="SmileIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SmileIcon')" />
                <feather-icon icon="SpeakerIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SpeakerIcon')" />
                <feather-icon icon="SquareIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SquareIcon')" />
                <feather-icon icon="StarIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('StarIcon')" />
                <feather-icon icon="StopCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('StopCircleIcon')" />
                <feather-icon icon="SunIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SunIcon')" />
                <feather-icon icon="SunriseIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SunriseIcon')" />
                <feather-icon icon="SunsetIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('SunsetIcon')" />
                <feather-icon icon="TabletIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TabletIcon')" />
                <feather-icon icon="TagIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TagIcon')" />
                <feather-icon icon="TargetIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TargetIcon')" />
                <feather-icon icon="TerminalIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TerminalIcon')" />
                <feather-icon icon="ThermometerIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ThermometerIcon')" />
                <feather-icon icon="ThumbsDownIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ThumbsDownIcon')" />
                <feather-icon icon="ThumbsUpIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ThumbsUpIcon')" />
                <feather-icon icon="ToggleLeftIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ToggleLeftIcon')" />
                <feather-icon icon="ToggleRightIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ToggleRightIcon')" />
                <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Trash2Icon')" />
                <feather-icon icon="TrashIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TrashIcon')" />
                <feather-icon icon="TrelloIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TrelloIcon')" />
                <feather-icon icon="TrendingDownIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TrendingDownIcon')" />
                <feather-icon icon="TrendingUpIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TrendingUpIcon')" />
                <feather-icon icon="TriangleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TriangleIcon')" />
                <feather-icon icon="TruckIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TruckIcon')" />
                <feather-icon icon="TvIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TvIcon')" />
                <feather-icon icon="TwitterIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TwitterIcon')" />
                <feather-icon icon="TypeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('TypeIcon')" />
                <feather-icon icon="UmbrellaIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UmbrellaIcon')" />
                <feather-icon icon="UnderlineIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UnderlineIcon')" />
                <feather-icon icon="UnlockIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UnlockIcon')" />
                <feather-icon icon="UploadCloudIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UploadCloudIcon')" />
                <feather-icon icon="UploadIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UploadIcon')" />
                <feather-icon icon="UserCheckIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UserCheckIcon')" />
                <feather-icon icon="UserMinusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UserMinusIcon')" />
                <feather-icon icon="UserPlusIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UserPlusIcon')" />
                <feather-icon icon="UserXIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UserXIcon')" />
                <feather-icon icon="UserIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UserIcon')" />
                <feather-icon icon="UsersIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('UsersIcon')" />
                <feather-icon icon="VideoOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('VideoOffIcon')" />
                <feather-icon icon="VideoIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('VideoIcon')" />
                <feather-icon icon="VoicemailIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('VoicemailIcon')" />
                <feather-icon icon="Volume1Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Volume1Icon')" />
                <feather-icon icon="Volume2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('Volume2Icon')" />
                <feather-icon icon="VolumeXIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('VolumeXIcon')" />
                <feather-icon icon="VolumeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('VolumeIcon')" />
                <feather-icon icon="WatchIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('WatchIcon')" />
                <feather-icon icon="WifiOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('WifiOffIcon')" />
                <feather-icon icon="WifiIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('WifiIcon')" />
                <feather-icon icon="WindIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('WindIcon')" />
                <feather-icon icon="XCircleIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('XCircleIcon')" />
                <feather-icon icon="XOctagonIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('XOctagonIcon')" />
                <feather-icon icon="XSquareIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('XSquareIcon')" />
                <feather-icon icon="XIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('XIcon')" />
                <feather-icon icon="YoutubeIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('YoutubeIcon')" />
                <feather-icon icon="ZapOffIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ZapOffIcon')" />
                <feather-icon icon="ZapIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ZapIcon')" />
                <feather-icon icon="ZoomInIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ZoomInIcon')" />
                <feather-icon icon="ZoomOutIcon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="copy('ZoomOutIcon')" />
              </div>

                <vs-popup class="showHystory" title="История:" :active.sync="showHystory">
                    <template v-if="SystemHistorysArr">
                        <div v-if="SystemHistorysArr.length == 0" style="display: flex">

                        </div>
                        <div v-else>

                            <template v-for="(item,index) in SystemHistorysArr">
                                <div style="margin-left: 10px;margin-right: 10px;color: red" @click="setData(item)" class="hover:text-primary cursor-pointer">
                                    {{ item.name }}
                                </div>

                                <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                            </template>
                        </div>
                    </template>


                </vs-popup>
                <vs-popup class="showHystory" title="История:" :active.sync="showHystoryTrash">
                    <template v-if="SystemHistorysArr">
                        <div v-if="SystemHistorysArr.length == 0" style="display: flex">

                        </div>
                        <div v-else>

                            <template v-for="(item,index) in SystemHistorysArr">
                                <div style="margin-left: 10px;margin-right: 10px;color: red" @click="setDataTrash(item)" class="hover:text-primary cursor-pointer">
                                    {{ item.name }}
                                </div>

                                <hr style="margin-bottom: 5px; margin-top: 5px; border: 0.5px solid #7367f0;">
                            </template>
                        </div>
                    </template>


                </vs-popup>
            </div>
            <div class="vx-row" >
                <div class="vx-col w-full">
                    <SystemHistory></SystemHistory>

                </div>

            </div>
        </div>

    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import r from '../../route'
import axios from '../../axios'
import SystemHistory from './SystemHistory.vue'
export default {
  components: {
    SystemHistory
  },
  data () {

    return {
      path:'',
      searchQuery: '',
      textSystemTrashAPIConnect:'',
      textSystemAPIConnect:'',
      showHystoryTrash:false,
      showHystory:false,
      textSystemTrashAPI:'',
      textSystemAPI:'',
      loadX: false

    }
  },

  computed: {
    ...mapGetters(['SystemHistorysArr']),


  },
  methods: {
    handleClick (evt) {


      this.$vs.loading({color: '#ff8000'})
      const formData = new FormData()
      formData.append('document', evt.target.files[0])
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
      axios.post('/system/file',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then((response) => {
        this.$vs.loading.close()
        if (response.data.result) {
          this.$vs.notify({
            title: 'Успешно',
            text: 'Сохранено!!!',
            color: 'success',
            position: 'top-center'
          })

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
      this.$refs.fileInput.value = '';

    },
    updateFile(){
      this.$refs.fileInput.click()
    },
    copy (data) {

      this.$copyText(data)
      this.copied = true
      setTimeout(() => { this.copied = false }, 750)

    },
    sendTip(){
      axios.get(r('system.index'), {
        params: {
          method: 'sendTip',
          param: ''

        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    clearFolder(){
      axios.get(r('system.index'), {
        params: {
          method: 'clearFolder',
          param: ''

        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    updateBack () {
      axios.get(r('system.index'), {
        params: {
          method: 'updateBack',
          param: ''

        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    updateFront () {
      axios.get(r('system.index'), {
        params: {
          method: 'updateFront',
          param: ''

        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    updateCode () {
      axios.get(r('system.index'), {
        params: {
          method: 'updateCode',
          param: ''

        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    setData (item) {
      this.textSystemAPI = item.name
      this.textSystemAPIConnect = item.connect
      this.showHystory = false
    },
    setDataTrash (item) {
      this.textSystemTrashAPI = item.name
      this.textSystemTrashAPIConnect = item.connect
      this.showHystoryTrash = false
    },
    SystemAPI () {
      axios.get(r('system.index'), {
        params: {
          method: 'main',
          param: ''

        }
      }).then((response) => {
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    SystemTrashAPI () {
      this.loadX = true
      axios.get(r('systemTrash.index'), {
        params: {
          method: 'main',
          param: ''

        }
      }).then((response) => {
        this.loadX = false
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    startSystemAPI () {
      axios.get(r('system.index'), {
        params: {
          method: 'start',
          param: this.textSystemAPI

        }
      }).then((response) => {
        this.getDataSystemHistorys()
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    startSystemAPIJob () {
      axios.get(r('system.index'), {
        params: {
          method: 'startJob',

          param: {
            func:this.textSystemAPI,
            connect:this.textSystemAPIConnect
          }

        }
      }).then((response) => {
        this.getDataSystemHistorys()
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    startSystemTrashAPI () {
      this.loadX = true
      axios.get(r('system.index'), {
        params: {
          method: 'start',
          param: this.textSystemTrashAPI

        }
      }).then((response) => {
        this.getDataSystemHistorys()
        this.loadX = false
        if (response.data.result) {
          this.$vs.notify({  title:'Успешно', text: response.data.mess, color: 'success', position: 'top-center' })
        } else {
          this.$vs.notify({  title:'Ошибка', text: response.data.mess, color: 'danger', position: 'top-center' })
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
    startSystemTrashAPIJob () {
      this.loadX = true
      axios.get(r('system.index'), {
        params: {
          method: 'startJob',
          param: {
            func: this.textSystemTrashAPI,
            connect: this.textSystemTrashAPIConnect
          }
        }


      }).then((response) => {
        this.getDataSystemHistorys()
        this.loadX = false
        if (response.data.result) {
          this.$vs.notify({
            title: 'Успешно',
            text: response.data.mess,
            color: 'success',
            position: 'top-center'
          })
        } else {
          this.$vs.notify({
            title: 'Ошибка',
            text: response.data.mess,
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
    ...mapActions(['getDataSystemHistorys'])
  },
  mounted () {
    this.getDataSystemHistorys()
  }
}

</script>

<style lang="scss">
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
</style>
