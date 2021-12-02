import { AfterContentInit, EventEmitter, Input, OnDestroy, Output, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil, filter, tap } from 'rxjs/operators';
import { IEditableSectionModelChangeEvent } from '../../models/forms.model';
import { ISaveResult } from '../../models/forms.model';

const defaultSaveResult = {
  error: null,
  value: null
};

@Component({
  template: ''
})
export abstract class AbstractSectionEditorComponent<T> implements OnDestroy, AfterContentInit {

  @Input() set model(value: T) {
    this.onModelChange(value);
  }

  // @ts-ignore
  @Input() saveResult$: Observable<ISaveResult<T>> = of(defaultSaveResult);

  @Output() modelChange: EventEmitter<IEditableSectionModelChangeEvent<T>> = new EventEmitter<IEditableSectionModelChangeEvent<T>>();

  // @ts-ignore
  canSaveChanges: Observable<boolean>;
  isDirtyChanges: Observable<boolean>;

  // @ts-ignore
  prevModel: T;
  // @ts-ignore
  currentModel: T;

  // @ts-ignore
  form: FormGroup;

  get dirty(): boolean {
    return this.form.dirty;
  }
  get invalid(): boolean {
    return this.form.invalid;
  }
  get value(): boolean {
    return this.form.value;
  }

  protected isDirtyChangesSubj = new BehaviorSubject<boolean>(false);
  protected destroy$ = new Subject<any>();

  constructor() {
    this.isDirtyChanges = this.isDirtyChangesSubj
      .asObservable()
      .pipe(
        distinctUntilChanged()
      );
  }

  ngAfterContentInit(): void {
    if (this.form) {
      this.canSaveChanges = this.form.statusChanges.pipe(
        startWith(this.form.status),
        map(status => status === 'VALID'),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      );
    }
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.destroy$.next(); // what argument???
    this.destroy$.complete();
  }

  getData(): T {
    return this.form.getRawValue();
  }

  revertData(): void {
    this.model = this.prevModel;
    this.markAsPristine();
  }

  markAsPristine(): void {
    this.form.markAsPristine();
    this.updateIsDirty();
  }

  getSaveResult(): Observable<ISaveResult<T>> {
    return this.saveResult$.pipe(
      filter((result) => result && !result.error)
    );
  }

  protected abstract createForm(): FormGroup;

  protected abstract mapModelToFormValues<R>(model: T): R | any;

  protected onModelChange(value: any): void {
    this.prevModel = { ...value };
    this.currentModel = { ...value };

    if (!this.form) {
      this.formInit();
    }

    this.formSet(value);
  }

  protected formInit(): void {

    this.form = this.createForm();

    this.form.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe((value: T) => {
        this.modelChange.emit({
          model: value
        });
        this.updateIsDirty();
      });
  }

  protected formSet(model: T): void {
    this.form.patchValue(this.mapModelToFormValues(model), { emitEvent: false });
  }

  protected updateIsDirty(): void {
    this.isDirtyChangesSubj.next(this.form.dirty);
  }

}
