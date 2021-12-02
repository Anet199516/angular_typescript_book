import { Component, OnInit } from '@angular/core';
import { AbstractSectionEditorComponent } from "../shared/abstract-forms-editor.components";
import {FormControls, FormKeys, ISearch} from "../../models/forms.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface IFormValue {
  title: string,
  price: string,
  category: string,
}

type Controls = keyof IFormValue;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends AbstractSectionEditorComponent<ISearch> implements OnInit {
  readonly FORM_KEY: FormKeys<Controls> = {
    title: 'title',
    price: 'price',
    category: 'category',
  };

  readonly ERROR_KEY = {
    Required: 'required',
    MaxLength: 'maxlength',
  };

  get FC(): FormControls<Controls> {
    return this.form?.controls as FormControls<Controls>;
  }

  constructor(private FB: FormBuilder) {
    super();
  }

  createForm(): FormGroup {
    const form: FormGroup = this.FB.group({
      title: [this.model?.title, [
        Validators.required,
        Validators.maxLength(500),
      ]],
      price: [this.model?.price, [
        Validators.required,
        Validators.maxLength(500),
      ]],
      category: [this.model?.category, [
        Validators.maxLength(200),
      ]],
    });

    return form;
  }

  mapModelToFormValues(model: ISearch): IFormValue {
    const formModel: IFormValue = {
      title: model?.title,
      price: model?.price,
      category: model?.category
      ,
    };

    return formModel;
  }

  processMaxLengthError(err: { requiredLength: number; actualLength: number; }): string {
    return `Max length is reached. ${err.actualLength}/${err.requiredLength}`;
  }

  ngOnInit(): void {
  }

}
