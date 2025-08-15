import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogField } from '@core/models/dialog-field.model';

import { CustomDialogComponent } from './custom-dialog.component';

describe('CustomDialogComponent', () => {
  let fixture: ComponentFixture<CustomDialogComponent>;
  let component: CustomDialogComponent;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CustomDialogComponent>>;

  const mockFields: DialogField[] = [
    { key: 'firstName', label: 'First Name', type: 'text' },
    { key: 'age', label: 'Age', type: 'number' },
  ];

  const mockValues = { firstName: 'John', age: 30 };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CustomDialogComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Edit Person',
            fields: mockFields,
            values: { ...mockValues },
          },
        },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dialog title', () => {
    const titleEl = fixture.nativeElement.querySelector('h1');
    expect(titleEl.textContent).toContain('Edit Person');
  });

  it('should render all fields from data', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(mockFields.length);
    expect(inputs[0].nativeElement.value).toBe(mockValues.firstName);
    expect(inputs[1].nativeElement.value).toBe(String(mockValues.age));
  });

  it('should update ngModel when input changes', () => {
    const inputEl: HTMLInputElement = fixture.debugElement.queryAll(
      By.css('input'),
    )[0].nativeElement;
    inputEl.value = 'Jane';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.data.values.firstName).toBe('Jane');
  });

  it('should close dialog with no data on cancel', () => {
    const cancelBtn = fixture.debugElement.queryAll(By.css('button'))[0];
    cancelBtn.nativeElement.click();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close dialog with form data on save', () => {
    const saveBtn = fixture.debugElement.queryAll(By.css('button'))[1];
    saveBtn.nativeElement.click();
    expect(mockDialogRef.close).toHaveBeenCalledWith(component.data.values);
  });
});
