import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalFService {
public todoList:any;
  constructor(private apiWeb:ApiService) { }

todoListService(user_id){
  let bodyTodoList = {operation_type:"select",service_type:"todoList",user_id:user_id,detail_id:0,status:0};
            this.apiWeb.webService(bodyTodoList).subscribe(data=>{
             
              this.todoList=data;
                
              console.log(this.todoList);
                 
            })
}



  todoDelete(no,is_no,view,user_id){
    /*
    $no=$gelen_data->no;
$is_no=$gelen_data->is_no;
$view=$gelen_data->view;
    */
    console.log("sil:"+no);
    let bodyTodoList = {operation_type:"delete",service_type:"todo",user_id:user_id,is_no:is_no,no:no,view:view};
            this.apiWeb.webService(bodyTodoList).subscribe(data=>{
                 return data.data;
                  console.log(this.todoList);
                  let baslik="Kayıt Silme";
                  let mesaj="Başarı ile silindiiii";
                  this.apiWeb.presentToast(baslik,mesaj);
                  /// User bilgileri local hafızaya kayit işlemi yapilacak
                 // localStorage.setItem('userJSON',JSON.stringify(this.userData.data));
            })
  }


}
