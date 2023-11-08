
///route('home',['1'])
export default function (url,obj) {

    if(url[0]=='/'){
        url = url.slice(1)
    }
    let str=window.location.origin+':5000/'+url

    let flag=false
    if(obj){
        if(obj.offset){

            if(!flag){
                str=str+'?offset='+obj.offset
            }else{
                str=str+'&offset='+obj.offset
            }
            flag=true

        }
        if(obj.limit){

            if(!flag){
                str=str+'?limit='+obj.limit
            }else{
                str=str+'&limit='+obj.limit
            }
            flag=true
        }
        if(obj.id){

            if(!flag){
                str=str+'?id='+obj.id
            }else{
                str=str+'&id='+obj.id
            }
            flag=true
        }
        if(obj.find){

            if(!flag){
                str=str+'?find='+obj.find
            }else{
                str=str+'&find='+obj.find
            }
            flag=true
        }
        if(obj.status){

            if(!flag){
                str=str+'?status='+obj.status
            }else{
                str=str+'&status='+obj.status
            }
            flag=true
        }
    }


    return str
}