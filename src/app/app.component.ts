import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { User } from './user';
import { UserServiceService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task';
  myReactiveForm:FormGroup |any;
  submitted: boolean = false;
  file:any
  user: boolean = false;
  edituser: boolean = false;
  formTitle: string = 'Add User';
  btnName: string = "Submit";
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  adduser:boolean=false;
  tableData:User[]=[];
  userData:User=new User();
  data:User=new User();
  details:User[]=new Array<User>();
  addData:User=new User();
  reset: any;

constructor(  private _userservice:UserServiceService){}

ngOnInit(): void {

  var res = this._userservice.getUsersFromData();
  if (this.details.length == 0) {
    console.log(res);
    this.details = this.details.concat(res);
  }
    this.myReactiveForm=new FormGroup({
      'fullName':new FormControl('',[Validators.required,Validators.minLength(3)]),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'mobile':new FormControl(''),
      'address':new FormControl(''),
      'photo':new FormControl('', [Validators.required]),
    })
}
submituser(obj: any) {
  this.formTitle = 'Add User';
  this.btnName = "Save User"
  this.user = true;
}
editdata(obj: User) {
  this.formTitle = 'Edit User';
  this.btnName = "Update User"
  this.user = true;
  this.data = obj;
}
close(){
  this.user = false;
}
deleteUser(item:User) {
  if(confirm("Are you sure to delete "+item.fullName+ " record !")) {
  const index = this.details.indexOf(item);
  if (index > -1) {
    this.details.splice(index, 1);
    localStorage.setItem('userdetails', JSON.stringify(this.details));
  }
}
}
addUserData() {
  debugger;
  if(Object.keys(this.data).length !== 0){
    if (this.data.id > 0) {
      //update
      if(confirm("Are you sure to update "+this.data.fullName +" record !")) {
      let index = this.details.indexOf(this.data);
      this.details[index] = this.data;
      console.log(this.data);
      }
    } else {
      //add
        var res = this._userservice.getUsersFromData();
        this.data.id = res.length > 0 ? res.length + 1 : 1;
        this.details.push(this.data);
        console.log(this.details);
        console.log(this.data);
    }
    this.data = new User();
   
    localStorage.setItem('userdetails', JSON.stringify(this.details));
  }
}
onSubmit(){
  this.submitted = true;
  console.log(this.myReactiveForm.value);
}
// filechange(event:any){
//   console.log(event.target.files[0].size);
//   const maxFileSize=2*1024*1024;
//   debugger;
//   const fileSize=event.target.files[0].size;
//     if(fileSize >maxFileSize){
//       alert("can't upload max size 2Mb")
//       this.reset.myReactiveForm.value.photo;
      
      
      
      
//     }
//     else{
     
    
        
//       }
// }

filechange(inputRef:any){
  debugger;
if (!inputRef.files || inputRef.files.length === 0) {
  console.error("No files uploaded");
} else {
  const file = inputRef.files[0];
  if (['application/pdf', 'image/jpeg'].includes(file.type)) {
    console.error('File should be a pdf or a jpeg');
  } else if (file.size > 2e+6) {
    alert('File is too large. Over 2MB');
  } else {
    alert('File is valid');
  }
}
}
}