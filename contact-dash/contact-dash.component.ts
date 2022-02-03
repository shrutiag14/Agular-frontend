import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ContactData } from './contact.model';

@Component({
  selector: 'app-contact-dash',
  templateUrl: './contact-dash.component.html',
  styleUrls: ['./contact-dash.component.css']
})
export class ContactDashComponent implements OnInit {

  formValue!: FormGroup
  contactModelObj: ContactData = new ContactData
  allContactData: any
  showAdd!:boolean
  showbtn!:boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: ['']
    })
    this.getAllData()
  }
  clickAddConto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  addConto() {
    this.contactModelObj.name = this.formValue.value.name;
    this.contactModelObj.email = this.formValue.value.email;
    this.contactModelObj.mobile = this.formValue.value.mobile;

    this.api.postContact(this.contactModelObj).subscribe(res => {
      console.log(res);
      alert("Contact Added");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    },
      err => {
        alert("Not Added");
      }
    )
  }

  getAllData() {
    this.api.getContact().subscribe(res => {
      this.allContactData = res;
    })
  }

  deleteConto(data:any){
    this.api.deleteContact(data.id).subscribe(res=>{
      alert("Contact Deleted")
      this.getAllData();
    })
  }

  onEditConto(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.contactModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
  }
  updateConto(){
    this.contactModelObj.name = this.formValue.value.name;
    this.contactModelObj.email = this.formValue.value.email;
    this.contactModelObj.mobile = this.formValue.value.mobile;

    this.api.updateContact(this.contactModelObj,this.contactModelObj.id).subscribe(res=>{
      alert("Contact Updated");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    })
  }
}
