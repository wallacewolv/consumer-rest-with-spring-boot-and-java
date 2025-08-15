import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: 'Are you sure?' },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the passed message', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Are you sure?');
  });

  it('should close with false when clicking Cancel', () => {
    const cancelBtn = fixture.debugElement.queryAll(By.css('button'))[0];
    cancelBtn.nativeElement.click();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close with true when clicking Delete', () => {
    const deleteBtn = fixture.debugElement.queryAll(By.css('button'))[1];
    deleteBtn.nativeElement.click();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });
});
