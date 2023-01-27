import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { addpatient } from '../shared/form';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  feedback!: addpatient;
  display: boolean = false;
  current: any = {
    name: 'Charles judah',
    phone: '080422332733',
    id: 1
  };
  active = 1;
  total = 0;
  time = 60;
  peoples = [
    {
      name: 'Adejo Emmanuel',
      id: 2,
      phone: '080422332733'
    },
    {
      name: 'Akanbi Joseph',
      id: 3,
      phone: '08113732323'
    },
    {
      name: 'John Doe',
      id: 4,
      phone: '07032233234'
    },
    {
      name: 'Ameh Aromeh',
      id: 5,
      phone: '09832322442'
    }
  ];

  formErrors: any = {
    name: '',
    phone: ''
  };

  validationMessages: any = {
    name: {
      required: 'required.'
    },
    phone: {
      required: 'required.'
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  serveNext() {
    this.active += 1;
    if (this.peoples.length == 0 && !this.current) {
      this.active = 0;
      this.time = 0;
      this.current = undefined;
    } else {
      this.current = this.peoples[0];
      this.time = 60;
      this.total += 1;
      this.peoples.shift();
    }
  }

  setTime() {
    setTimeout(() => {
      if (this.time < 1) {
        this.serveNext();
      } else {
        if (this.peoples?.length == 0 && !this.current) {
          this.active = 0;
          this.time = 0;
        } else {
          this.time -= 1;
        }
      }
      this.setTime();
    }, 1000);
  }

  // create form
  createForm() {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(data)
    );
    this.onValueChanged(); // (re)set validation messages now
  }

  // check for errors in form
  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] = messages[key];
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.onValueChanged();
    const feed = this.feedbackFormDirective.invalid;
    if (feed) {
    } else {
      this.feedback = this.feedbackForm.value;
      if (this.peoples?.length == 0 && !this.current) {
        const get_id = this.peoples?.length;
        this.current = {
          name: this.feedback.name,
          phone: this.feedback.phone,
          id: get_id + 1
        };
        this.active += 1;
        this.time = 60;
      } else {
        const get_id = this.peoples?.length - 1;
        this.peoples.push({
          name: this.feedback.name,
          phone: this.feedback.phone,
          id: this.peoples[get_id]?.id + 1 || 2
        });
      }
      // remove dialog
      this.display = false;
      // clear form
      this.feedbackFormDirective.resetForm();
    }
  }

  // display dialog box
  showDialog() {
    this.display = true;
  }

  // remove dialog box
  cancel() {
    this.display = false;
  }

  ngOnInit(): void {
    this.setTime();
  }
}
